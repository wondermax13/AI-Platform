package entities;

import java.util.Date;
import java.util.List;

public class AIAnswer {

	public AIAnswer(
			String aiName, String answer, Date responseTime) {
		
		this.aiName = aiName;
		this.answer = answer;
		this.responseTime = responseTime;
	}

	public String aiName;
	public String answer;
	public Date askTime, responseTime;
}
