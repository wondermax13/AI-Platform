package entities;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.TimeUnit;

import javax.net.ssl.HttpsURLConnection;

import org.omg.CORBA.NameValuePair;

import sun.net.www.http.HttpClient;

public class AI {

	public AI(String name, String address, String version, String publicKey, List<String> channels) {
		
		this.name = name;
		this.address = address;
		this.version = version;
		this.publicKey = publicKey;
		this.channels = channels;
	}
	public boolean pingAI() {
		
		return true;
	}
	
	public String askQuestion(Question question) {

		try {
			
			URL url = new URL("http://www.google.com/search?q=mkyong");
			URLConnection con = url.openConnection();
			HttpURLConnection http = (HttpURLConnection)con;
			http.setRequestMethod("GET"); // PUT is another valid option
			http.setDoOutput(true);
			
			TimeUnit.SECONDS.sleep(5);
			
			//make the web call
		    //return the answer
		        
			return "Result of the asynchronous computation";
		} catch (Exception e) {

			throw new IllegalStateException(e);
		}
	}
	
	public void sendPost() {

		try {
		String url = "https://selfsolve.apple.com/wcResults.do";
		URL obj = new URL(url);
		HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

		//add reuqest header
		con.setRequestMethod("POST");
		con.setRequestProperty("User-Agent", "Mozilla/5.0");
		con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");

		String urlParameters = "sn=C02G8416DRJM&cn=&locale=&caller=&num=12345";
		
		// Send post request
		con.setDoOutput(true);
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		wr.writeBytes(urlParameters);
		wr.flush();
		wr.close();

		int responseCode = con.getResponseCode();
		System.out.println("\nSending 'POST' request to URL : " + url);
		System.out.println("Post parameters : " + urlParameters);
		System.out.println("Response Code : " + responseCode);

		BufferedReader in = new BufferedReader(
		        new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();
		
		//print result
		System.out.println(response.toString());
		}
		catch(Exception e) { }

	}
		
	public boolean askDummyAI(String question) {
		
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return true;
	}
	
	public String name, address, version, publicKey;
	public List<String> channels;
}
