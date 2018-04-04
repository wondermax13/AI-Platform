package job;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.xml.bind.ValidationException;

public class GenericJob {

	long id_;
	private JobType type_;
	public JobState state_;
	public boolean success;
	public long requestId_;
	
    Logger LOGGER;
	public Date lastChecked_;
	public long min_, max_;
	public String data_;
	
	
	public long parentJobId;
	List<Long> childJobIds;
	
    public Map<String, JobParameter> parameters_;
	
    public long S_IN_MS = 1000;
    
    public long NEEDS_RESOURCES_MIN = 2 * S_IN_MS,
    		    NEEDS_RESOURCES_MAX = 5 * S_IN_MS,
    		    START_JOB_MIN = 2 * S_IN_MS,
    		    START_JOB_MAX = 5 * S_IN_MS,
    		    WAITING_FOR_AI_RESPONSE_MIN	= 2 * S_IN_MS,
    		    WAITING_FOR_AI_RESPONSE_MAX	= 5 * S_IN_MS,
    		    WAITING_FOR_SUBJOB_RESPONSE_MIN	= 2 * S_IN_MS,
    	    	WAITING_FOR_SUBJOB_RESPONSE_MAX	= 5 * S_IN_MS;
    
    
    
	GenericJob(JobType type, long requestId) {
		
		type_= type;
		requestId_ = requestId;
		
		parentJobId = -1;
		childJobIds = new ArrayList<Long>();
		
		parameters_ = new HashMap<String, JobParameter>();
		
	    LOGGER = Logger.getLogger("AbstractJob");
	}
	
	public boolean needsToBeChecked() {
		
		long timeElapsed = new Date().getTime() - lastChecked_.getTime();
		
		return timeElapsed >= min_ && timeElapsed <= max_;
	}
	
	public void invokeMethodForState() {
		
		//TODO - Use switch here
		if(state_ == JobState.NEEDS_RESOURCES) {
			
			this.validateParametersAndInitializeResources();
		}
		if(state_ == JobState.RUNNABLE) {
			
			this.startJobBasic();
		}
		if(state_ == JobState.WAITING_FOR_AI_RESPONSE) {
			
			this.waitingForAIResponse();
		}
		if(state_ == JobState.WAITING_FOR_SUBJOB) {
			
			this.waitingForChildComplete();
		}
		if(state_ == JobState.COMPLETED_ERROR) {
			
			this.handleJobCompletion();
		}
		if(state_ == JobState.COMPLETED_SUCCESS) {
			
			this.handleJobCompletion();
		}
		if(state_ == JobState.CANCELLED) {
			
			this.handleJobCompletion();
		}
	}
	
	public void appendToJobData(String newData) {
		
		data_.concat(newData);
	}
	
    public void validateParametersAndInitializeResources() {

        try {
        	this.createParameters();
            this.validateParameters();
            this.createInitialResources();
        } catch (ValidationException e) {

            this.state_ = JobState.COMPLETED_ERROR;
        }
    }
	
    protected void createParameters() throws ValidationException { }
    
    protected void validateParameters() throws ValidationException { }
    
    protected void createInitialResources() { }

    public ExecutionResult startJobBasic() {
    
    	this.state_ = JobState.WAITING;
    	this.min_ = START_JOB_MIN;
    	this.max_ = START_JOB_MAX;
    	
    	return new ExecutionResult();
    }
    
    public ExecutionResult waitingForChildComplete() {
        
    	boolean foundIncompleteChild = false;
    	
    	int index = 0;
    	while(index < childJobIds.size() && !foundIncompleteChild) {
    		
    		//Check child state
    		
    		++index;
    	}
    	
    	if(foundIncompleteChild) {
    		//Check if time passed ???
    	}
    	else {
    		this.state_ = JobState.COMPLETED_SUCCESS;
    	}

    	return new ExecutionResult();
    }
    
    public ExecutionResult waitingForAIResponse() {
        
    	if(data_ != null) {
    		
    		this.state_ = JobState.COMPLETED_SUCCESS;
    	}
    	else {
    		
    	}

    	return new ExecutionResult();
    }
    
    public ExecutionResult handleJobCompletion() {
    	
    	//Clear job resources if any
    	
    	success = (state_ == JobState.COMPLETED_SUCCESS || state_ == JobState.CANCELLED);

    	return new ExecutionResult();
    }
    
    public void addJobAsMyChild(GenericJob childJob) {
    	
    	childJob.parentJobId = id_;
    	childJobIds.add(childJob.id_);
    }
    
    /**
     * Job needs to be cleared if its a top level job and has completed
     * In this case, all the children need to be completed
     * @return
     */
    public boolean needsToBeCleared() {
    	
    	return (parentJobId == -1
    			&& (state_ == JobState.COMPLETED_ERROR
    			|| state_ == JobState.COMPLETED_SUCCESS
    			|| state_ == JobState.CANCELLED));
    }
    
    public Logger getLogger() {
    	
    	return LOGGER;
    }
}
