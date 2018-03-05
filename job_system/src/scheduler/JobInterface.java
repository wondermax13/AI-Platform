package scheduler;

import java.util.List;

import entities.AI;
import entities.AIAnswer;

public interface JobInterface {

	boolean askQuestion(long requestId, String question);
	
	void registerAI(long requestId, AI ai);
	
	List<AIAnswer> getAnswersForQuestion(long requestId, long questionId);
}
