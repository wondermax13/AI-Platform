package entities;

import java.util.Date;
import java.util.List;

public class Question {

	public String text;
	public Date askTime;
	public List<String> channels;
	
	public Question(String text, Date time, List<String> channels) {
		
		this.text = text;
		this.askTime = time;
		this.channels = channels;
	}
}
