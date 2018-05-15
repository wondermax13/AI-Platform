package job;

import java.util.ArrayList;
import java.util.List;
import request.Request;

import javax.xml.bind.ValidationException;

import dbclient.DocumentClient;
import entities.AI;
import entities.Question;
import message.AIResponseMessage;

public class AskQuestionJob extends GenericJob {
	
	AskQuestionJob(
			JobProcessor jobProcessor,
			long requestId,
			Question question) {
		
		super(jobProcessor, JobType.ASK_QUESTION, requestId);
		myQuestion_ = question;
	}
	
	AskQuestionJob(
			long requestId, Question question) {
		
		super(JobType.ASK_QUESTION, requestId);
		myQuestion_ = question;
	}
	
	AskQuestionJob(long requestId) {
		super(JobType.ASK_QUESTION, requestId);
	}
	
	private String QUESTION_KEY = "QUESTION_KEY";
	private Question myQuestion_;
	
	
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
        
        System.out.println(".validateParameters, validate parameters for "
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
        System.out.println(".startJobBasic starting " + this.toString());
        
        
        //TODO - Move this to a singleton
        DocumentClient documentClient = new DocumentClient();
        
        Question question = this.getMyQuestion();
        
        try {
	        List<AI> relevantAIs = documentClient.getAIForChannels(question.channels);
	        
	        for(AI ai : relevantAIs) {
	        	
				GenericJob job = new AskSingleAIJob(this.jobProcessor_, 0, ai, question);
				
				this.addJobAsMyChild(job);
				childJobs.add(job);
				
				System.out.println(
	                    "Created AskAI job: " + job.id_ + " for ai: " + ai.address
	                );
			}
	        
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

