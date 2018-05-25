package job;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.logging.ConsoleHandler;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.xml.bind.ValidationException;

public class GenericJob {

	public JobProcessor jobProcessor_;
	
	long id_;
	private JobType type_;
	public JobState state_;
	public boolean success;
	public long requestId_;
	
    static Logger LOGGER;
    static Handler handler;
    
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
    

    GenericJob(
    		JobProcessor jobProcessor,
    		JobType type,
    		long requestId) {
		
    	this.jobProcessor_ = jobProcessor;
    	
    	//TODO - Refactor this constructor code
		id_ = new Random().nextInt(1000);
		
		type_= type;
		requestId_ = requestId;
		
		state_ = JobState.NEEDS_RESOURCES;
		
		parentJobId = -1;
		childJobIds = new ArrayList<Long>();
		
		parameters_ = new HashMap<String, JobParameter>();
		
		if(LOGGER == null) {
			LOGGER = Logger.getLogger("AbstractJob");
			handler = new ConsoleHandler();
			handler.setLevel(Level.ALL);
			LOGGER.setLevel(Level.ALL);
			LOGGER.addHandler(handler);
		}
	}
    
    /***
     * 
     * @param type
     * @param requestId
     */
	GenericJob(JobType type, long requestId) {
		
		id_ = new Random().nextInt(100000);
		
		type_= type;
		requestId_ = requestId;
		
		state_ = JobState.NEEDS_RESOURCES;
		
		parentJobId = -1;
		childJobIds = new ArrayList<Long>();
		
		parameters_ = new HashMap<String, JobParameter>();
		
	    LOGGER = Logger.getLogger("AbstractJob");
	    LOGGER.addHandler(new ConsoleHandler());
	}
	
	/**
	 * 
	 * @return
	 */
	public boolean needsToBeChecked() {
		
		if(lastChecked_ == null) {
			return true;
		}
		
		long timeElapsed = new Date().getTime() - lastChecked_.getTime();
		
		return timeElapsed >= min_ && timeElapsed <= max_;
	}
	
	/**
	 * 
	 * @return
	 */
	public ExecutionResult invokeMethodForState() {
		
		ExecutionResult result = new ExecutionResult();
		
		this.getLogger().fine(this.toString() + " current state: " + state_);
		
		//TODO - Use switch here
		if(state_ == JobState.NEEDS_RESOURCES) {
			
			result = this.validateParametersAndInitializeResources();
		}
		else if(state_ == JobState.RUNNABLE) {
			
			result = this.startJobBasic();
		}
		else if(state_ == JobState.WAITING_FOR_AI_RESPONSE) {
			
			result = this.waitingForAIResponse();
		}
		else if(state_ == JobState.WAITING_FOR_SUBJOB) {
			
			result = this.waitingForChildComplete();
		}
		else if(state_ == JobState.COMPLETED_ERROR) {
			
			result = this.handleJobCompletion();
		}
		else if(state_ == JobState.COMPLETED_SUCCESS
			||state_ == JobState.CANCELLED) {
			
			result = this.handleJobCompletion();
		}
		
		return result;
	}
	
	/**
	 * 
	 * @param newData
	 */
	public void appendToJobData(String newData) {
		
		data_.concat(newData);
	}
	
	/**
	 * 
	 * @return
	 */
    public ExecutionResult validateParametersAndInitializeResources() {

    	ExecutionResult result = new ExecutionResult();
    	
        try {
        	this.createParameters();
            this.validateParameters();
            this.createInitialResources();
            
            result.success_ = true;
            this.state_ = JobState.RUNNABLE;
        } catch (ValidationException e) {

            this.state_ = JobState.COMPLETED_ERROR;
        }
        
        return result;
    }
	
    protected void createParameters() throws ValidationException { }
    
    protected void validateParameters() throws ValidationException { }
    
    protected void createInitialResources() { }

    /**
     * 
     * @return
     */
    public ExecutionResult startJobBasic() {
    
    	this.state_ = JobState.WAITING;
    	this.min_ = START_JOB_MIN;
    	this.max_ = START_JOB_MAX;
    	
    	return new ExecutionResult();
    }
    
    /**
     * 
     * @return
     */
    public ExecutionResult waitingForChildComplete() {
        
    	boolean foundIncompleteChild = false;
    	
    	int index = 0;
    	while(index < childJobIds.size() && !foundIncompleteChild) {
    		
    		//Check child state
    		foundIncompleteChild = !jobProcessor_.isJobComplete(childJobIds.get(index));
    		++index;
    	}
    	
    	if(foundIncompleteChild) {
    		//Check if time passed ???
    	}
    	else {
    		//Don't change this state right now 
    		this.state_ = JobState.COMPLETED_SUCCESS;
    		
    		this.getLogger().fine(" State change for job: " + this.toString());
    	}

    	this.getLogger().fine(" waitingForChildComplete result: " + foundIncompleteChild + "on job: " + this.toString());
    	
    	return new ExecutionResult();
    }
    
    /**
     * 
     * @return
     */
    public ExecutionResult waitingForAIResponse() {
        
    	if(data_ != null) {
    		
    		this.state_ = JobState.COMPLETED_SUCCESS;
    	}
    	else {
    		
    	}

    	return new ExecutionResult();
    }
    
    /**
     * 
     * @return
     */
    public ExecutionResult handleJobCompletion() {
    	
    	this.getLogger().fine(" handling job completion for job: " + this.toString());
    			
    	//Clear job resources if any
    	
    	success = (state_ == JobState.COMPLETED_SUCCESS || state_ == JobState.CANCELLED);

    	return new ExecutionResult();
    }
    
    /**
     * 
     * @param childJob
     */
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
    
    
    @Override
    public String toString() {
    
    	return "Job { id: " + this.id_ + " type: " + this.type_ + " state: " + this.state_ + " parentJobId: " + this.parentJobId + " }";
    }
    
    /**
     * 
     * @return
     */
    public Logger getLogger() {
    	
    	return LOGGER;
    }
}
