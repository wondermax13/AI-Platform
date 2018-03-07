package job;

import java.util.*;

public class JobProcessor {

	private long MIN_EXECUTION_TIME = 5 * 1000;
	
	long nextExecutionTime;
	
	JobProcessor instance;
	
	List<Long> activeJobIds;
	List<Long> jobsToBeCleared;
	
	List<Long> newJobs;
	Map<Long, GenericJob> jobMap;
	
	JobProcessor getInstance() {
	
		if(instance == null) {
			instance = new JobProcessor();
		}
		
		return instance;
	}
	
	public void addNewJobToProcessor(GenericJob job) {
		
		//TODO - Validation
		
		jobMap.put(job.id_, job);
		newJobs.add(job.id_);
	}
	
	JobProcessor() {
		
		activeJobIds = new ArrayList<Long>();
		jobsToBeCleared = new ArrayList<Long>();
		newJobs = new ArrayList<Long>();
		jobMap = new HashMap<Long, GenericJob>();
	}
	
	/**
	 * TODO - CHANGE THIS CODE LATER
	 */
	public void processLoop() {
		
		while(true) {
			
			this.processActiveJobs();
		
			try {
			
				Thread.sleep(nextExecutionTime);
			}
			catch(InterruptedException e) {
				
				e.printStackTrace();
			}
		}
	}
	public void processActiveJobs() {
		
		long timeToWait = MIN_EXECUTION_TIME;
		
		for(int index = 0; index < activeJobIds.size(); index++) {
		
			GenericJob job = jobMap.get(activeJobIds.get(index));
			
			if(job.needsToBeChecked()) {
				
				job.invokeMethodForState();
			}
			
			if(job.needsToBeCleared()) {
				this.handleJobFamilyClearing(job);
			}
			
			timeToWait = Math.min(timeToWait, job.min_);
		}

		this.handleJobClearing();
		this.handleNewJobsAddition();
	}
	
	public void handleJobClearing() {
		
		for(int index = 0; index < jobsToBeCleared.size(); index++) {
			
			activeJobIds.remove(jobsToBeCleared.get(index));
		}
		
		jobsToBeCleared.clear();
	}
	
	public void handleNewJobsAddition() {
		
		for(int index = 0; index < newJobs.size(); index++) {
			
			activeJobIds.remove(newJobs.get(index));
		}
		
		newJobs.clear();
	}
	
	/**
	 * Add parent job and its family to clearing list
	 * @param topLevelJobId
	 */
	public void handleJobFamilyClearing(GenericJob topLevelJob) {
		
		jobsToBeCleared.add(topLevelJob.id_);
		
		for(int index = 0; index < topLevelJob.childJobIds.size(); index++) {
			
			GenericJob childJob = jobMap.get(topLevelJob.childJobIds.get(index));
			
			handleJobFamilyClearing(childJob);
		}
	}
}
