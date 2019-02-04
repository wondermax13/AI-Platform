package job;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import request.Request;

import javax.xml.bind.ValidationException;

import dbclient.DocumentClient;
import entities.AI;
import entities.Question;
import message.AIResponseMessage;

public class AskSingleAIJob extends GenericJob {

	AskSingleAIJob(
			JobProcessor jobProcessor,
			long requestId,
			AI ai,
			Question question) {
		
		super(jobProcessor, JobType.QUESTION_SINGLE_AI, requestId);
		this.ai_ = ai;
		this.question_ = question;
	}
	
	AskSingleAIJob(long requestId, AI ai, Question question) {
		
		super(JobType.QUESTION_SINGLE_AI, requestId);
		this.ai_ = ai;
		this.question_ = question;
	}
	
	AskSingleAIJob(long requestId) {
		super(JobType.QUESTION_SINGLE_AI, requestId);
	}

	private String AI_KEY       = "AI_KEY";
	private String QUESTION_KEY = "QUESTION_KEY";
	private AI ai_;
	private Question question_;
	
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
        
        //this.validateAI();
        //this.validateQuestion();
    }
	
	/**
     * Start job
     * @return List<Job>
     */
    @Override
    public ExecutionResult startJobBasic() {

    	boolean result = true;
    	
        super.startJobBasic();

        this.getLogger().fine(".startJobBasic starting " + this.toString());
        
        //Ping the AI
        //AI ai = this.getAI();

        if(ai_.pingAI()) {

        	CompletableFuture<String> futureForAICall 
        		= CompletableFuture.supplyAsync(() -> {

        			String answer;
        			
    				if(question_.text.equalsIgnoreCase("NewsChannel")) {

    					answer = ai_.askNews();
    				}
    				else {

    					answer = ai_.askQuestion(question_);
    				}
        			
        			//make the web call
        			//return the answer
        			
        			this.setStateToWaitingForAIResponse();

        		return answer;
    		});

    		futureForAICall.thenApplyAsync(answer -> {

    			this.state_ = JobState.COMPLETED_SUCCESS;
    			
    			
    			//TODO - Remove this
    			this.getLogger().fine(" AskAI job - Persisting answer for "+ this.toString() + " ANSWER: " + answer);
    			
    	        //TODO - Maybe move this to a singleton
    			//synchronized(this) {
    			
    			this.getLogger().fine(" AskAI job - Acquiring lock: "+ this.toString());
    			jobProcessor_.lock.lock();
    			try {
    				if(question_.text.equalsIgnoreCase("NewsChannel")) {
    					
    					jobProcessor_.documentClient.insertFinancialNewsAIResponse(
    							answer);
    					
    					jobProcessor_.documentClient.deleteQuestionForQuestionText(question_.text);
    				}
    				else {

    					jobProcessor_.documentClient.updateQuestionWithAIAnswer(
    							question_.text,
    							ai_.id,
    							new Date(),
    							answer);
    				}
    			}
    			catch(Exception e) {
    	        	
    				this.getLogger().fine(e.getMessage());
    	        }
    			finally {
    				
    				this.getLogger().fine(" AskAI job - Giving up lock: "+ this.toString());
    				jobProcessor_.lock.unlock();
    				
    			}
    			
    			return answer;
    		} );
        }
        
        return new ExecutionResult(result);
    }
    
    /**
     * TODO - Move this to Generic job or some interface
     */
    protected void setStateToWaitingForAIResponse() {
    	
    	this.state_ = JobState.WAITING_FOR_AI_RESPONSE;
    	this.min_ = WAITING_FOR_AI_RESPONSE_MIN;
    	this.max_ = WAITING_FOR_AI_RESPONSE_MAX;
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

    protected AI getMyAI() {
    	
    	return ai_;
    }
    
    protected Question getMyQuestion() {
    	
    	return question_;
    }
}
