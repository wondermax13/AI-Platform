package dbclient;

import java.net.UnknownHostException;

//import com.mongodb.client.model.*;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.ServerAddress;

import org.bson.*;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

public class DocumentClient {

	//MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
	
	MongoClientURI uri  = new MongoClientURI("mongodb://<dbuser>:<dbpassword>@ds117469.mlab.com:17469/a01001001"); //mongodb://<dbuser>:<dbpassword>@ds117469.mlab.com:17469/a01001001
    MongoClient client = new MongoClient(uri);
    MongoDatabase db = client.getDatabase(uri.getDatabase());

    //MongoClient mongoClient = new MongoClient(new MongoClientURI(""));

    // get handle to "mydb" database
    MongoDatabase database = client.getDatabase("mydb");


    // get a handle to the "test" collection
    MongoCollection<Document> collection = database.getCollection("ai");

    Document doc = new Document("name", "MongoDB")
            .append("type", "database")
            .append("count", 1)
            .append("versions", Arrays.asList("v3.2", "v3.0", "v2.6"))
            .append("info", new Document("x", 203).append("y", 102));
    
    collection.insertOne(doc);
    
    //System.out.println("Collection has " + collection.count() + " documents");

    // close resources
    //mongoClient.
    //System.out.println("======= Finish =======");
    
    List<Document> documents = new ArrayList<Document>();
    for (int i = 0; i < 100; i++) {
    	
        documents.add(new Document("i", i));
    }
}
