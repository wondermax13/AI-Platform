package scheduler;

import java.util.ArrayList;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

import entities.AI;
import entities.AIAnswer;
import job.AbstractJob;
import message.GenericMessage;

public class JobScheduler {
	
	private static Queue<GenericMessage> eventMessages;
	private static Map<Long, AbstractJob> activeJobs;
	
	JobScheduler() {		
		
		eventMessages = new LinkedList<GenericMessage>();
		activeJobs    = new HashMap<Long, AbstractJob>();
	}

	void scheduleJob(AbstractJob job) {
		
		activeJobs.put(job.getId(), job);
	}
	
	void registerAI(long requestId, AI ai) {
		
	}
	
	List<AIAnswer> getAnswersForQuestion(long requestId, long questionId) {
	
		return new ArrayList<AIAnswer>();
	}
}
