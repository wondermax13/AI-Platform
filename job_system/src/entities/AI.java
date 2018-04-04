package entities;

import java.util.List;

public class AI {

	public AI(String address, String version, String publicKey, List<String> channels) {
		
		this.address = address;
		this.version = version;
		this.publicKey = publicKey;
		this.channels = channels;
	}
	public boolean pingAI() {
		
		return true;
	}
	
	public boolean askQuestion(String question) {
		
		return true;
	}
	
	public String address, version, publicKey;
	public List<String> channels;
}
