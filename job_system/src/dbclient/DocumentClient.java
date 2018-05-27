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
	
		List<AI> result = new ArrayList<AI>();
		
		MongoCollection<Document> collection = database.getCollection("ai");
		
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
		
		Document findQuery = new Document("askTime", new Document("$gte",lastQueryTime));

		MongoCursor<Document> cursor = collection.find(findQuery).iterator();

        try {
            while (cursor.hasNext()) {
                
            	Document doc = cursor.next();
            	
                newQuestions.add(
                		new Question(
                				(String)doc.get("question"),
                				(Date)doc.get("askTime"),
                				(List<String>)doc.get("channels"))); 
            }
        }
        catch(Exception e) {
        	
        	System.out.println(e.getMessage());
        }finally {
            cursor.close();
        }

		return newQuestions;
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
			String questionText, String aiName, Date responseTime, String answer) {
			
		List<String> aiAnswers = null;
		
		MongoCollection<Document> collection = database.getCollection("questions");
		
		Document findQuery = new Document("question", questionText);

		MongoCursor<Document> cursor = collection.find(findQuery).iterator();

        try {

        	Document doc = cursor.next();
            aiAnswers = (List<String>) doc.get("answers");
            	
            List<String> tmp = new ArrayList<String>();
            	
            for(int index = 0; index < aiAnswers.size(); index++) {
            		
            	tmp.add(index, aiAnswers.get(index));
            }
            	
            //TODO - Change schema to store AI Id and response time in answer attribute of question separately
            String newEntry = answer; //aiName + " " + responseTime  + " " + answer;
            tmp.add(newEntry);
            	
            Document updateQuery = new Document("question", questionText);
        	collection.updateOne(updateQuery, new Document("$set", new Document("answers", tmp)));
        }
        catch(Exception e) {
        	
        	System.out.println(e.getMessage());
        }finally {
            cursor.close();
        }
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
