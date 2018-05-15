package job;

import java.util.*;

import dbclient.DocumentClient;
import entities.AI;
import entities.Question;

public class JobProcessor {

	private long MIN_EXECUTION_TIME = 5 * 1000;
	
	long nextExecutionTime = 5 * 1000;
	
	JobProcessor instance;
	
	List<Long> activeJobIds;
	List<Long> jobsToBeCleared;
	
	List<Long> newJobs;
	Map<Long, GenericJob> jobMap;
	
	Date lastQueryTime;
	
	DocumentClient documentClient;
	
	int questionCount;
	
	JobProcessor getInstance() {
	
		if(instance == null) {
			instance = new JobProcessor();
		}
		
		return instance;
	}
	
	JobProcessor() {
		
		activeJobIds = new ArrayList<Long>();
		jobsToBeCleared = new ArrayList<Long>();
		newJobs = new ArrayList<Long>();
		jobMap = new HashMap<Long, GenericJob>();
		
		lastQueryTime = new Date(Long.MIN_VALUE);
		
		documentClient = new DocumentClient();
		
		questionCount = 0;
	}
	
	/**
	 * TODO - CHANGE THIS CODE LATER
	 */
	public void processLoop() {
		
		while(true) {
			
			this.findAndAddNewJobs();
			this.processActiveJobs();
			
			lastQueryTime = new Date();
			try {
			
				Thread.sleep(nextExecutionTime);
			}
			catch(InterruptedException e) {
				
				e.printStackTrace();
			}
		}
	}
	
	public void findAndAddNewJobs() {
			
		List<Question> newQuestions = documentClient.findNewQuestions(new Date(), lastQueryTime);
		
		for(Question question : newQuestions) {
		
			AskQuestionJob questionJob = new AskQuestionJob(this, 0, question);
			
			System.out.println(
                    "Created AskQuestion job: " + questionJob.id_ + " for question: " + question.text
                );
		
			this.addNewJobToProcessor(questionJob);
		}
	}
	
	public void addNewJobToProcessor(GenericJob job) {
		
		//TODO - Validation
		
		jobMap.put(job.id_, job);
		newJobs.add(job.id_);
	}

	public void processActiveJobs() {
		
		long timeToWait = MIN_EXECUTION_TIME;
		
		for(int index = 0; index < activeJobIds.size(); index++) {
		
			GenericJob job = jobMap.get(activeJobIds.get(index));
			
			if(job.needsToBeChecked()) {
				
				ExecutionResult execResult = job.invokeMethodForState();
				
				this.processExecutionResult(execResult);
			}
			
			if(job.needsToBeCleared()) {
				
				System.out.println(" Clearing job: " + job.toString());
				this.handleJobFamilyClearing(job);
			}
			
			timeToWait = Math.min(timeToWait, job.min_);
		}

		this.handleJobClearing();
		this.handleNewJobsAddition();
	}
	
	public void processExecutionResult(ExecutionResult execResult) {
		
		if(execResult != null
			&& execResult.childJobs_ != null) {
			
			//This might be a lot of copying but get it working first
			for(GenericJob childJob : execResult.childJobs_) {
				
				this.addNewJobToProcessor(childJob);
			}
		}
	}
	
	public void handleJobClearing() {
		
		for(int index = 0; index < jobsToBeCleared.size(); index++) {
			
			activeJobIds.remove(jobsToBeCleared.get(index));
		}
		
		jobsToBeCleared.clear();
	}
	
	public void handleNewJobsAddition() {
		
		for(int index = 0; index < newJobs.size(); index++) {
			
			activeJobIds.add(newJobs.get(index));
		}
		
		newJobs.clear();
	}
	
	/**
	 * Add parent job and its family to clearing list
	 * @param topLevelJobId
	 */
	public void handleJobFamilyClearing(GenericJob topLevelJob) {
		
		
		System.out.println(" handling job family clearing for job: " + topLevelJob.toString());
		
		jobsToBeCleared.add(topLevelJob.id_);
		
		for(int index = 0; index < topLevelJob.childJobIds.size(); index++) {
			
			GenericJob childJob = jobMap.get(topLevelJob.childJobIds.get(index));
			
			handleJobFamilyClearing(childJob);
		}
	}
	
	public boolean isJobComplete(long jobId) {
		
		boolean result = false;
		
		result = jobMap.containsKey(jobId) 
				&& (jobMap.get(jobId).state_ == JobState.COMPLETED_ERROR
				|| jobMap.get(jobId).state_ == JobState.COMPLETED_SUCCESS);
		
		
		return result;
	}
}
