package job;

import java.util.ArrayList;
import java.util.List;
import request.Request;

import javax.xml.bind.ValidationException;

import entities.AI;
import entities.Question;
import message.AIResponseMessage;

public class AskSingleAIJob extends GenericJob {
	
	AskSingleAIJob(JobType type, long requestId, AI ai, Question question) {
		super(type, requestId);
	}
	
	AskSingleAIJob(JobType type, long requestId) {
		super(JobType.QUESTION_SINGLE_AI, requestId);
	}

	private String AI_KEY       = "AI_KEY";
	private String QUESTION_KEY = "QUESTION_KEY";
	
	@Override
	protected void createInitialResources() {
		
		// TODO Auto-generated method stub
	}
	
	@Override
    protected void createParameters() {
		
		JobParameter aiParam =
				new JobParameter(
						0L,
						this.id_,
						ParameterType.AI,
						"AI_Value");
		
		JobParameter questionParam =
				new JobParameter(
						0L,
						this.id_,
						ParameterType.Question,
						"Question_Value");
		
		this.parameters_.put(AI_KEY, aiParam);
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
        
        this.validateAI();
        this.validateQuestion();
    }
	
	/**
     * Start job
     * @return List<Job>
     */
    @Override
    public ExecutionResult startJobBasic() {

    	boolean result = false;
    	
        super.startJobBasic();

        this.getLogger().fine(".startJobBasic starting " + this.toString());
        
        //Ping the AI
        AI ai = this.getAI();

        if(ai.pingAI()) {

        	result = ai.askQuestion(this.getQuestion());
        }
        
        if(result) {
        	
        	this.state_ = JobState.WAITING;
        	this.min_ = WAITING_FOR_AI_RESPONSE_MIN;
        	this.max_ = WAITING_FOR_AI_RESPONSE_MAX;
        }
        
        return new ExecutionResult(result);
    }
        
    protected void validateAI() throws ValidationException {
    	
    	this.getAI(); 
    }

    protected void validateQuestion() throws ValidationException {
    	
    	String Question = (String)this.parameters_.get(QUESTION_KEY).getValue();
    }
    
    protected AI getAI() {
    	
    	return (AI)this.parameters_.get(AI_KEY).getValue();
    }
    
    protected String getQuestion() {
    	
    	return (String)this.parameters_.get(QUESTION_KEY).getValue();
    }
}
