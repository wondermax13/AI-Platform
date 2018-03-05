package scheduler;

import java.util.List;

import entities.AI;
import entities.AIAnswer;
import job.AbstractJob;

public interface JobSchedulerInterface {

	void scheduleJob(AbstractJob jobId);
	
	void registerAI(long requestId, AI ai);
	
	List<AIAnswer> getAnswersForQuestion(long requestId, long questionId);
}
