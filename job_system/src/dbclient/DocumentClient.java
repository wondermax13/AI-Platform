package dbclient;

import java.net.UnknownHostException;

import com.mongodb.client.FindIterable;
//import com.mongodb.client.model.*;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

import entities.AI;
import entities.AIAnswer;
import entities.Question;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.ServerAddress;

import org.bson.*;
import org.bson.types.ObjectId;

import java.util.Arrays;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

public class DocumentClient {

	//TODO - Move this to config
	private static MongoClientURI uri = new MongoClientURI("mongodb://dbuser1:ai2ai2ai@ds117469.mlab.com:17469/a01001001");
	private static MongoClient client = new MongoClient(uri);
	
    // get handle to "mydb" database
    private static MongoDatabase database = client.getDatabase(uri.getDatabase());
	
	public void createQuestion(Question question) {
		
		Document document 
			= new Document(
					"Text" , question.text)
			.append("QuestionedTime", question.askTime);
		
		MongoCollection<Document> collection = database.getCollection("questions");

		collection.insertOne(document);
	}
	
	/**
	 *	Sample AI document
	 * 
	 {
    "_id": {
        "$oid": "5aae518bf36d284c92250d44"
    },
    "name": "sample_name",
    "address": "https://localhost:9191/ask",
    "version": "v2",
    "publicKey": "sample_public_key",
    "channels": [
        "sampleChannel1"
    ]
	}
	 */
	public List<AI> getAIForChannels(List<String> channels) {
	
		String targetCollection = "ai";

		if(channels.size() > 0 && channels.contains("FinancialNewsAI") ) {	//TODO - This is a hack to separate the flows for news and text AIs
			
			targetCollection = "financialNewsAI";
		}
		
		List<AI> result = new ArrayList<AI>();
		
		MongoCollection<Document> collection = database.getCollection(targetCollection);
		
		MongoCursor<Document> cursor = collection.find().iterator();	//TODO - This has to use channels
		
		try {
            while (cursor.hasNext()) {
                Document doc = cursor.next();
                
                result.add(
                		new AI( (String)doc.get("id"),
                				(String)doc.get("name"),
                				(String)doc.get("address"),
                				(String)doc.get("version"),
                				(String)doc.get("publicKey"),
                				(List<String>)doc.get("channels")));		//TODO - Add channels to AI schema
                
                System.out.println(
                        " AI found: " + doc.get("name")
                    );
            }
        } finally {
            cursor.close();
        }
		
		return result;
	}	

	
	/**
	 * Sample question document
	 * 
	{
    "_id": {
        "$oid": "5aeac5943e4dcd0e3c19db66"
    },
    "channels": [
        "#main",
        "#other",
        "@linda",
        "@armonio"
    ],
    "answers": [],
    "question": "Is this going to pay off?",
    "askTime": {
        "$date": "2018-05-03T08:17:24.587Z"
    },
    "__v": 0
	}
	 */
	public List<Question> findNewQuestions(Date currentTime, Date lastQueryTime) {
		
		List<Question> newQuestions = new ArrayList<Question>();
		
		MongoCollection<Document> collection = database.getCollection("questions");
		
		/*Document findQuery
			= new Document(
					"askTime", new Document("$gte",lastQueryTime))
					.append("answered", "false");*/
		
		Document findQuery
		= new Document(
				"__v", 0)
				.append("answered", "false");

		
		MongoCursor<Document> cursor = collection.find(findQuery).iterator();
		
		List<ObjectId> toBeUpdatedDocs = new ArrayList<ObjectId>();

        try {
            while (cursor.hasNext()) {
                
            	Document doc = cursor.next();
            	
                newQuestions.add(
                		new Question(
                				(String)doc.get("question"),
                				(Date)doc.get("askTime"),
                				(List<String>)doc.get("channels")));
                
                toBeUpdatedDocs.add((ObjectId)doc.get("_id"));
            }
        }
        catch(Exception e) {
        	
        	System.out.println(e.getMessage());
        }finally {
            cursor.close();
        }
        
        updatedRetrievedDocs(collection, toBeUpdatedDocs);

		return newQuestions;
	}
	
	void updatedRetrievedDocs(MongoCollection<Document> collection, List<ObjectId> toBeUpdatedDocIds) {
		
		Document updateValue
    	= new Document(
    			"$set", new Document("__v", 1));	//TODO - This should be done after the last answer
    	
		for(ObjectId docId : toBeUpdatedDocIds) {
			
			Document findQuery = new Document("_id", docId);
			
			//MongoCursor<Document> cursor = collection.find(findQuery).iterator();
			
			collection.updateOne(findQuery, updateValue);
			//cursor.close();
		}
	}
	
	//TODO
	/**
	 * 
	 * @param questionText
	 * @param aiName
	 * @param responseTime
	 * @param answer
	 */
	public void updateQuestionWithAIAnswer(
			String questionText, String aiId, Date responseTime, String answer) {
			
		List<Document> aiAnswers = null;
		
		MongoCollection<Document> collection = database.getCollection("questions");
		
		Document findQuery = new Document("question", questionText);

		MongoCursor<Document> cursor = collection.find(findQuery).iterator();

        try {

        	Document doc = cursor.next();
            aiAnswers = (List<Document>) doc.get("answers");
            	
            List<Document> tmp = new ArrayList<Document>();
            	
            for(int index = 0; index < aiAnswers.size(); index++) {
            		
            	tmp.add(index, aiAnswers.get(index));
            }
            
            tmp.add(new Document("answer", answer).append("aiId", aiId));
            	
            Document updateQuery = new Document("question", questionText);
            Document updateValue
            	= new Document(
            			"$set", new Document("answers", tmp).append("answered", "true"));	//TODO - This should be done after the last answer
            
        	collection.updateOne(updateQuery, updateValue);
        	
        	/*updateValue = new Document(
        					"$set", new Document("answered", "true"));*/	//TODO - This should be done after the last answer
        	
        	System.out.println(" DocumentClient: Persisted answer: " + answer);
        }
        catch(Exception e) {
        	
        	System.out.println(e.getMessage());
        }finally {
            cursor.close();
        }
	}
	
	
	public void insertFinancialNewsAIResponse(
			String answer) {
		
		MongoCollection<Document> collection = database.getCollection("newsAIResponses");
		
		Document aiRespDoc = new Document("response", answer);

        try {

        	collection.insertOne(aiRespDoc);
        	
        	System.out.println(" DocumentClient: Persisted answer: " + answer);
        }
        catch(Exception e) {
        	
        	System.out.println(e.getMessage());
        	
        }finally {
            
        }
	}
	
	/**
	 * Delete question for question text
	 * @param questionText
	 */
	public void deleteQuestionForQuestionText(
			String questionText) {
		
		MongoCollection<Document> collection = database.getCollection("questions");
		
		try {
			
			Document findQuery = new Document("question", questionText);
			collection.deleteOne(findQuery);
			
			System.out.println(" DocumentClient: Deleting question for text: " + questionText);
		}
		catch(Exception e) {
        	
        	System.out.println(e.getMessage());
        }
		finally { }        
	}
	
	/**
	 * 
	 * @param ai
	 */
    public void createAI(AI ai) {
		
		Document document 
			= new Document(
					"Address" , ai.address)
			.append("Version", ai.version)
			.append("PublicKey", ai.publicKey)
			.append("Channels", ai.channels);
		
		MongoCollection<Document> collection = database.getCollection("ai");
		
		collection.insertOne(document);
	}
}
