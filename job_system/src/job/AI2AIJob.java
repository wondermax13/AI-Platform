package job;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.ConsoleHandler;
import java.util.logging.Level;
import java.util.logging.Logger;

import request.Request;

import javax.xml.bind.ValidationException;

import dbclient.DocumentClient;
import entities.AI;
import entities.Question;
import message.AIResponseMessage;

public class AI2AIJob extends GenericJob {
	
	AI2AIJob(
		JobProcessor jobProcessor,
		long requestId,
		AI aiOne,
		AI aiTwo,
		Question question) {
		
		super(jobProcessor, JobType.START_CONVERSATION, requestId);
		
		myQuestion_ = question;
	}
	
	AI2AIJob(
		long requestId,
		AI aiOne,
		AI aiTwo,
		Question question) {
		
		super(JobType.START_CONVERSATION, requestId);
		myQuestion_ = question;
	}
	
	AI2AIJob(long requestId) {
		super(JobType.START_CONVERSATION, requestId);
	}
	
	//TODO - Ask keys
	private String QUESTION_KEY = "QUESTION_KEY";
	
	private AI aiOne_, aiTwo_;
	private Question myQuestion_;
	
	private long conversationLimit = 5;
	
	@Override
	protected void createInitialResources() {
		
		// TODO Auto-generated method stub
	}
	
	@Override
    protected void createParameters() {
		
		JobParameter questionParam =
				new JobParameter(
						0L,
						this.id_,
						ParameterType.Question,
						"Question_Value");
		
		this.parameters_.put(QUESTION_KEY, questionParam);
	}
	
	/**
     * validateParameters
     */
    @Override
    public void validateParameters()
            throws ValidationException {

        this.getLogger().fine(".validateParameters, validate parameters for "
                + this.toString());

        super.validateParameters();
        
        this.validateQuestion();
    }
	
	/**
     * Start job
     * @return List<Job>
     */
    @Override
    public ExecutionResult startJobBasic() {

    	ExecutionResult execResult = new ExecutionResult();	//Default - false
    	
    	List<GenericJob> childJobs = new ArrayList<GenericJob>();
    	
        super.startJobBasic();

	    this.getLogger().fine(".startJobBasic starting " + this.toString());        
        
        Question question = this.getMyQuestion();
        
        try {
        	
        	this.getLogger().fine(" Creating AskAI job for: " + aiOne_.toString() + this.toString());
	        	
			GenericJob job = new AskSingleAIJob(this.jobProcessor_, 0, aiOne_, question);
				
			this.addJobAsMyChild(job);
			childJobs.add(job);
				
			this.getLogger().fine(
					"Created AskAI job: " + job.id_ + " for ai Id: " + aiOne_.id);
			
	        //Passed all the previous steps
	        execResult = new ExecutionResult(childJobs);
	        this.state_ = JobState.WAITING_FOR_SUBJOB;
        }
        catch(Exception e) {
        	
        	this.getLogger().finest(" Could not create child ask AI jobs " + this.toString());
        }
        
        if(execResult.success_) {
        	
        	this.state_ = JobState.WAITING_FOR_SUBJOB;
        	this.min_ = WAITING_FOR_SUBJOB_RESPONSE_MIN;
        	this.max_ = WAITING_FOR_SUBJOB_RESPONSE_MAX;
        }
        
        return execResult;
    }

    protected void validateQuestion() throws ValidationException {
    	
    	String Question = (String)this.parameters_.get(QUESTION_KEY).getValue();
    	
    	//TODO - Add validation code here
    }
    
    protected Question getMyQuestion() {
    	
    	return myQuestion_;
    }
}

