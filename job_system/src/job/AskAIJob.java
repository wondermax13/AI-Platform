package job;

import java.util.ArrayList;
import java.util.List;

import oracle.tape.acs.summit.librarycontroller.common.entities.ValidationException;
import oracle.tape.acs.summit.librarycontroller.common.entities.exception.InternalLibraryException;
import oracle.tape.acs.summit.librarycontroller.common.entities.job.AbstractJob;
import oracle.tape.acs.summit.librarycontroller.common.entities.request.RequestOutputParameter;
import request.Request;

import javax.xml.bind.ValidationException;

import entities.AI;
import message.AIResponseMessage;

public class AskAIJob extends AbstractJob {
	
	private String AI_KEY       = "AI_KEY";
	private String QUESTION_KEY = "QUESTION_KEY";
	
	public AskAIJob(
			String Question,
			AI ai,
			AbstractJob parentJob,
			long requestId) {

        super(JobType.QUESTION_SINGLE_AI, parentJob, requestId);
    }

	@Override
	protected void createInitialResources() {
		
		// TODO Auto-generated method stub
	}
	
	@Override
    protected void createParameters() {
		
		JobParameter aiParam =
				new JobParameter(
						0L,
						this.getId(),
						ParameterType.AI,
						"AI_Value");
		
		JobParameter questionParam =
				new JobParameter(
						0L,
						this.getId(),
						ParameterType.Question,
						"Question_Value");
		
		this.getJobParameters().put(AI_KEY, aiParam);
		this.getJobParameters().put(QUESTION_KEY, questionParam);
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
    public List<AbstractJob> startJobBasic() throws Exception {

    	boolean result = false;
    	
        super.startJobBasic();

        this.getLogger().fine(".startJobBasic starting " + this.toString());
        
        //Ping the AI
        AI ai = this.getAI();

        if(ai.pingAI()) {

        	result = ai.askQuestion(this.getQuestion());
        }
        
        return result ? new ArrayList<AbstractJob>() : null;
    }
    
    /**
     * Handle the AI Response
     */
    @Override
    public List<AbstractJob> deviceResponseBasic(AIResponseMessage jobDeviceResponse)
            throws Exception {

    	//Persist the answer 
    	
    	return new ArrayList<AbstractJob>();
    }
    
    protected void validateAI() throws ValidationException {
    	
    	this.getAI(); 
    }

    protected void validateQuestion() throws ValidationException {
    	
    	String Question = (String)this.getJobParameters().get(QUESTION_KEY).getValue();
    }
    
    protected AI getAI() {
    	
    	return (AI)this.getJobParameters().get(AI_KEY).getValue();
    }
    
    protected String getQuestion() {
    	
    	return (String)this.getJobParameters().get(QUESTION_KEY).getValue();
    }
}
