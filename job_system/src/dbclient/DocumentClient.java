package dbclient;

import java.net.UnknownHostException;

//import com.mongodb.client.model.*;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import entities.AI;
import entities.AIAnswer;
import entities.Question;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.ServerAddress;

import org.bson.*;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

public class DocumentClient {

	private static MongoClientURI uri = new MongoClientURI("mongodb://dbuser1:ai2ai2ai@ds117469.mlab.com:17469/a01001001");
	private static MongoClient client = new MongoClient(uri);
	
    // get handle to "mydb" database
    private static MongoDatabase database = client.getDatabase(uri.getDatabase());
	
    /*
	public static void main(String[] args) {

		// get a handle to the "test" collection
		MongoCollection<Document> collection = database.getCollection("ai");
    
		List<Document> documents = new ArrayList<Document>();
		for (int i = 6; i < 7; i++) {
    	
			documents.add(new Document(" New document i", i));
		}
		collection.insertMany(documents);
	}*/
	
	protected void createAI(AI ai) {
		
		Document document 
			= new Document(
					"Address" , ai.address)
			.append("Version", ai.version)
			.append("PublicKey", ai.publicKey)
			.append("Channels", ai.channels);
		
		MongoCollection<Document> collection = database.getCollection("ai");
		
		collection.insertOne(document);
	}
	
	protected void createQuestion(Question question) {
		
		Document document 
			= new Document(
					"Text" , question.text)
			.append("QuestionedTime", question.askTime);
		
		MongoCollection<Document> collection = database.getCollection("questions");

		collection.insertOne(document);
	}
	
	//TODO
	protected void updateQuestionWithAIAnswer(long questionId, AIAnswer aiAnswer) {
		
		MongoCollection<Document> collection = database.getCollection("questions");
		
		//collection.find({_id : "54d0232ef83ea4000d2c0610"}, null, null);
	}
	
	List<AI> getAIForChannels(List<String> channels) {
	
		List<AI> result = new ArrayList<AI>();
		
		return result;
	}
}
