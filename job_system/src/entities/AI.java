package entities;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
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
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;


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
			
			String encodedUrlParam = URLEncoder.encode(question.text, "UTF-8");
			String urlEndpoint = this.address + "&input=" + encodedUrlParam;
			
			String res = getJSON(urlEndpoint);
			
			JSONObject jsonResponse = new JSONObject(res);
			
			String output = jsonResponse.getString("output");
		        
			return output;//"Result of the asynchronous computation";
		} catch (Exception e) {

			throw new IllegalStateException(e);
		}
	}
	
	public String askNews() {

		String newsBotEndPoint = "http://127.0.0.1:5420/_status/latestdata";
		try {
			
			String res = getJSON(newsBotEndPoint);
			
			JSONObject jsonResponse = new JSONObject(res);
			
			String output = jsonResponse.getString("stock");
		        
			return output;//"Result of the asynchronous computation";
		} catch (Exception e) {

			throw new IllegalStateException(e);
		}
	}

	/**
	 * 
	 * @param url
	 * @return
	 */
	public String getJSON(String url) {
	    HttpURLConnection c = null;
	    try {

	    	c = getHttpClient(url);
	        c.connect();
	        int status = c.getResponseCode();
	        
	        boolean redirect = isRedirected(status);
	    	
    		// get redirect url from "location" header field	    	
	    	if (redirect) {

	    		c = getRedirectedClient(c);
	    		c.connect();
	    		status = c.getResponseCode();
	    	}

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

	        //TODO - Add logging here
	    } catch (MalformedURLException ex) { }
	    catch (IOException ex) {
			System.out.println(ex.getMessage());
	    } finally {
	       if (c != null) {
	          try {
	              c.disconnect();
	          } catch (Exception ex) { }
	       }
	    }
	    return null;
	}
	
	/**
	 * 
	 * @param url
	 * @return
	 */
	public HttpURLConnection getHttpClient(String url) {
		
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
			//c.setConnectTimeout(timeout);	//TODO - No connection or timeout set for async call
			//c.setReadTimeout(timeout);
        
			return c;
		}
		catch (MalformedURLException ex) { }
		catch (IOException ex) { }
		finally {
			if (c != null) {
				try {
					c.disconnect();
				} catch (Exception ex) { }
			}
		}

		return null;
	}

	/**
	 * 
	 * @param c
	 * @return
	 */
	public HttpURLConnection getRedirectedClient(HttpURLConnection c) {
		
		// get redirect url from "location" header field
		String newUrl = c.getHeaderField("Location");

		// get the cookie if need, for login
		String cookies = c.getHeaderField("Set-Cookie");

		try {
			// open the new connnection again
			c = (HttpURLConnection) new URL(newUrl).openConnection();
			c.setRequestProperty("Cookie", cookies);
			c.addRequestProperty("Accept-Language", "en-US,en;q=0.8");
			c.addRequestProperty("User-Agent", "Mozilla");
			c.addRequestProperty("Referer", "google.com");
		
			return c;
		}
		 catch (MalformedURLException ex) {
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
	
	/**
	 * 
	 * @param status
	 * @return
	 */
	public boolean isRedirected(int status) {
		
		boolean redirect = false;
		if (status != HttpURLConnection.HTTP_OK) {
    		if (status == HttpURLConnection.HTTP_MOVED_TEMP
    			|| status == HttpURLConnection.HTTP_MOVED_PERM
    				|| status == HttpURLConnection.HTTP_SEE_OTHER)
    		redirect = true;
    	}
		
		return redirect;
	}
	
	/**
	 * 
	 */
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
	
	/**
	 * 
	 */
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
	
	/**
	 * This is future work for webscraping
	 */
	static void parsePostCallFromSite() {
		
		try {
			Document doc1 = Jsoup.connect("http://example.com/").get();
			String title = doc1.title();
			File input = new File("C:\\Users\\whizkid\\Documents\\changedFile.html");
			Document doc = Jsoup.connect("http://www.square-bear.co.uk/mitsuku/nfchat.htm").get();
		
			Document doc2 = Jsoup.parse(input, "UTF-8", "http://www.square-bear.co.uk/mitsuku/nfchat.htm");
		
			String res = doc2.toString();
		
			Element content = doc.getElementById("content");
			Elements links = content.getElementsByTag("a");
			for (Element link : links) {
				String linkHref = link.attr("href");
				String linkText = link.text();
			}
		}
		catch(Exception e) {

			System.out.println(e.getMessage());
		}
	}
}
