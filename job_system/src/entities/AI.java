package entities;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.List;
import java.util.concurrent.TimeUnit;
import javax.net.ssl.HttpsURLConnection;
import org.json.*;


public class AI {

	public String id;
	public String name, address, version, publicKey;
	public List<String> channels;
	
	public AI(String id, String name, String address, String version, String publicKey, List<String> channels) {
		
		this.id = id;
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
			
			String endpoint = "http://www.cleverbot.com/getreply?key=CC8ktzqcHDfaOP5T7OnM432weZA&MXYxCTh2MQlBdkFZQVNONlVUN0oJMUZ2MTUyNzE0MTMwOAk2NGlNw6RkY2hlbi4J";
			
			String encodedUrlParam = URLEncoder.encode(question.text, "UTF-8");
			String urlEndpoint = endpoint + "&input=" + encodedUrlParam;
			
			String res = getJSON(urlEndpoint);
			
			JSONObject jsonResponse = new JSONObject(res);
			
			String output = jsonResponse.getString("output");
		        
			return output;//"Result of the asynchronous computation";
		} catch (Exception e) {

			throw new IllegalStateException(e);
		}
	}

	//No connection or timeout set for async call
	public String getJSON(String url) {
	    HttpURLConnection c = null;
	    try {
	        URL u = new URL(url);
	        c = (HttpURLConnection) u.openConnection();
	        c.setRequestMethod("GET");
	        c.setRequestProperty("Content-length", "0");
			c.setRequestProperty("User-Agent", "Mozilla/5.0");
			c.setRequestProperty("Accept-Language", "en-US,en;q=0.5");
			
	        c.setUseCaches(false);
	        c.setAllowUserInteraction(false);
	        //c.setConnectTimeout(timeout);
	        //c.setReadTimeout(timeout);
	        c.connect();
	        int status = c.getResponseCode();

	        switch (status) {
	            case 200:
	            case 201:
	                BufferedReader br = new BufferedReader(new InputStreamReader(c.getInputStream()));
	                StringBuilder sb = new StringBuilder();
	                String line;
	                while ((line = br.readLine()) != null) {
	                    sb.append(line+"\n");
	                }
	                br.close();
	                return sb.toString();
	        }

	    } catch (MalformedURLException ex) {
	        //Logger.getLogger(getClass().getName()).log(Level.SEVERE, null, ex);
	    } catch (IOException ex) {
			System.out.println(ex.getMessage());
	        //Logger.getLogger(getClass().getName()).log(Level.SEVERE, null, ex);
	    } finally {
	       if (c != null) {
	          try {
	              c.disconnect();
	          } catch (Exception ex) {
	             //Logger.getLogger(getClass().getName()).log(Level.SEVERE, null, ex);
	          }
	       }
	    }
	    return null;
	}
	
	public void GoogleCallCode() {
		
		//URL url = new URL("http://www.google.com/search?q=mkyong");
		/*URL url = new URL("https://www.cleverbot.com/getreply?key=CC8ktzqcHDfaOP5T7OnM432weZA&MXYxCTh2MQlBdkFZQVNONlVUN0oJMUZ2MTUyNzE0MTMwOAk2NGlNw6RkY2hlbi4J&input=Hello");			
		
		URLConnection con = url.openConnection();
		HttpURLConnection http = (HttpURLConnection)con;
		http.setRequestMethod("GET"); // PUT is another valid option
		http.setDoOutput(true);
		*/
		//TimeUnit.SECONDS.sleep(5);
		
		//make the web call
	    //return the answer
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
}
