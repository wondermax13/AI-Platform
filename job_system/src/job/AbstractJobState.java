package job;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import message.AIResponseMessage;
import message.ChildJobCompleteMessage;

public abstract class AbstractJobState implements Serializable {

    private JobStateType stateType;
    private JobType jobType;


    //Class variables
    private static List<Class<?>> exceptionClassesToBePassedOnToJobFramework;
    
    private static final Logger LOGGER = Logger.getLogger("AbstractJob");

    //Constants
    private static final long serialVersionUID = 1L;

    /**
     * Answer the exception classes to be passed on to the job framework
     * @return List<Class<?>>
     */
    public synchronized static List<Class<?>> getExceptionClassesToBePassedOnToJobFramework() {
        
        if (exceptionClassesToBePassedOnToJobFramework == null) {
        	
            exceptionClassesToBePassedOnToJobFramework = new ArrayList<Class<?>>();
        }
        
        return exceptionClassesToBePassedOnToJobFramework;
    }
    
    
    
    /**
     * Answer whether anException should be passed on to the job framework
     * @param anException Exception
     * @return boolean
     */
    protected boolean shouldBePassedOnToJobFramework(Exception anException) {
        
        boolean tempResult;
        
        tempResult = this.shouldHandle(anException, 
                                       getExceptionClassesToBePassedOnToJobFramework());
        
        return tempResult;
    }
    
    
    /**
     * Answer whether anException is of the classes contained in anExceptionClassesToHandle or whether it wraps one of
     * these
     * @param anException Throwable
     * @param anExceptionClassesToHandle List<Class<?>
     * @return boolean
     */
    private boolean shouldHandle(Throwable anException, 
                                   List<Class<?>> anExceptionClassesToHandle) {
        
        boolean tempShouldHandle = false;
        
        if (anException != null) {
            
            tempShouldHandle = anExceptionClassesToHandle.contains(anException.getClass());
            if (!tempShouldHandle) {
                tempShouldHandle = this.shouldHandle(anException.getCause(), anExceptionClassesToHandle);
            }
            
        }
        
        
        
        return tempShouldHandle;
    }
    
    
    
    /**
     * Answer a default instance
     */
    public AbstractJobState() {
        super();
    }




    /**
     * Start Job. Subclasses should override if they need since the default behavior is to throw an exception
     * @param aJob Job
     * @return JobExecutionResult
     */
    public JobExecutionResult startJob(AbstractJob aJob) throws Exception {
        throw new IllegalStateException("Job: jobId: " + aJob.getId() + " is in a improper state to be started");
    }

    /**
     * Execute aJob
     * @param aJob Job
     */
    public abstract JobExecutionResult execute(AbstractJob aJob) throws Exception;

    /**
     * Execute aJob for aJob
     * @param aJob Job
     * @param aDeviceResponse JobDeviceResponse
     */
    public abstract JobExecutionResult execute(AbstractJob aJob, AIResponseMessage aDeviceResponse)
        throws Exception;
    
    /**
     * Basic handle device response
     */
    protected JobExecutionResult basicHandleAIResponse(
    		AbstractJob aJob, 
    		AIResponseMessage aDeviceResponse) 
                    throws Exception {
        
        JobExecutionResult tempResult = new JobExecutionResult();
        List<AbstractJob> tempNewJobs;

        try {
            tempNewJobs = aJob.deviceResponseBasic(aDeviceResponse);
            aJob.setNextExecutionTimeForDeviceResponse();
            tempResult.setNewJobsToExecute(tempNewJobs);
        }
        catch (Exception e) {

            this.handleExceptionEncounteredByJobState(aJob, e);

        }

        return tempResult;
    }
    
    
    /**
     * Notify aJob that it has timed out. This may or may not be an error. aJob will handle its 
     * own timeout behavior
     * @param aJob Job
     * @param anExpectedExecutionDateTimeLimit Date
     */
    public abstract void timedOut(AbstractJob aJob, Date anExpectedExecutionDateTimeLimit)
        throws Exception;
    

    /**
     * Make job complete.
     * @return JobExecutionResult
     */
    public JobExecutionResult makeJobComplete(AbstractJob aJob) {

        this.basicMakeJobComplete(aJob);
        return new JobExecutionResult();

    }

    /**
     * Make job complete.
     * @return JobExecutionResult
     */
    public JobExecutionResult makeJobCompleteWithError(AbstractJob aJob) {

        this.basicMakeJobCompleteWithError(aJob);
        return new JobExecutionResult();

    }


    /**
     * Make child job complete
     * @param aJob Job
     * @param aChildJob boolean
     * @param aMessage ChildJobCompleteJmsMessage
     * @return List<Job>
     */
    public JobExecutionResult makeChildJobComplete(AbstractJob aJob,
                                                   AbstractJob aChildJob,
                                                   ChildJobCompleteMessage aMessage) throws Exception {

        return new JobExecutionResult();
    }

    /**
     * Mark my job for cancellation. Iterate recursively over aJob and its children to mark for cancellation
     * @param aJob Job
     */
    public void markForCancellation(AbstractJob aJob) {

        aJob.setMarkedForCancellation(true);
       /* for (AbstractJob tempJob : aJob.getChildJobs()) {

            this.markForCancellation(tempJob);
        }*/

    }


    /**
     * Cancel aJob. All substates respond to a cancel by just doing it.
     * Subclasses could override this if they need to. The job would have previously been markedForCancel
     * before this transition is taken
     * @param aJob Job
     * @return JobExecutionResult
     */
    public JobExecutionResult cancel(AbstractJob aJob) {

        if (aJob.isMarkedForCancellation()) {

            aJob.transitionToJobStateNamed(JobStateType.CANCELLED);
            aJob.setCompleteDateTime(new Date());
            aJob.freeMyResources();

        }
        return new JobExecutionResult();
    }


    /**
     * Perform make job complete
     * @param aJob AbstractJob
     */
    protected void performMakeJobComplete(AbstractJob aJob, boolean aStatus) {

        this.basicMakeJobComplete(aJob);
        aJob.safelyCompleteRequest(aStatus);

    }

    /**
     * Perform job completion steps without request completion
     * @param aJob
     */
    protected void basicMakeJobComplete(AbstractJob aJob) {

        aJob.transitionToJobStateNamed(JobStateType.COMPLETED_SUCCESS);
        aJob.setCompleteDateTime(new Date());
        aJob.freeMyResources();

    }


    /**
     * Perform job completion steps without request completion
     * @param aJob
     */
    protected void basicMakeJobCompleteWithError(AbstractJob aJob) {

        aJob.transitionToJobStateNamed(JobStateType.COMPLETED_ERROR);
        Date now = new Date();
        if (aJob.getStartDateTime() == null) {
            aJob.setStartDateTime(now);
        }
        aJob.setCompleteDateTime(now);
        aJob.freeMyResources();
        // consider removeDeviceResource()

    }

    /**
     * Answer whether or not I represent a completed state.
     * @return boolean
     */
    public boolean isComplete() {

        return this.getStateType() != null &&
                (this.getStateType().equals(JobStateType.COMPLETED_SUCCESS)
                        ||
                 this.getStateType().equals(JobStateType.COMPLETED_ERROR)
                        ||
                 this.getStateType().equals(JobStateType.CANCELLED));
    }
    
    /**
     * Answer whether or not I represent a completed state with an error.
     * @return boolean
     */
    public boolean isCompleteWithError() {

        return this.getStateType() != null &&
                this.getStateType().equals(JobStateType.COMPLETED_ERROR);
    }
    
    /**
     * Answer whether or not I represent error state.
     * @return boolean
     */
    public boolean isError() {

        return this.getStateType() != null
                 &&
                 this.getStateType().equals(JobStateType.COMPLETED_ERROR);
    }
    
    
    /**
     * Answer whether or not I am running
     * @return boolean
     */
    public boolean isRunning() {
        return false;
    }
    


    /**
     * Answer whether or not I represent a state that needs resources.
     * @return boolean
     */
    public boolean isNeedsResources() {
       return this.getStateType() != null && this.getStateType().equals(JobStateType.NEEDS_RESOURCES);
    }

    /**
     * Answer whether or not I am canceled (i.e I am a cancelled state)
     * @return boolean
     */
    public boolean isCancelled() {
        return this.getStateType() != null && this.getStateType().equals(JobStateType.CANCELLED);
    }

    /**
     * Set my job type. This is used to establish what states are actually used by a given Job Type. In this
     * way we can have separate state models for Jobs.
     * @param jobType JobType
     */
    protected void setJobType(JobType jobType) {
        this.jobType = jobType;
    }

    /**
     * Answer my job type. This is used to establish what states are actually used by a given Job Type. In this
     * way we can have separate state models for Jobs.
     * @return JobType
     */
    public JobType getJobType() {
        return jobType;
    }

    @Override
    public String toString() {
        return super.toString()
                + ", jobType: " + this.getJobType()
                + ", complete: " + this.isComplete()
                + ", cancelled: " + this.isCancelled()
                + ", needsResources: " + this.isNeedsResources();
    }

    /**
     * Answer my logger
     * @return
     */
    protected Logger getLogger() {
        return LOGGER;
    }

    /**
     * Answer whether I am for aStateType
     * @param aType JobStateType
     * @return boolean
     */
    public boolean isForType(JobStateType aType) {
        return this.getStateType() != null && this.getStateType().equals(aType);
    }


    /**
     * Answer my stateType
     * @return JobStateType
     */
    public JobStateType getStateType() {
        return stateType;
    }

    /**
     * Set my stateType
     * @param stateType JobStateType
     */
    protected void setStateType(JobStateType stateType) {
        this.stateType = stateType;
    }

    /**
     * Handle unrecoverable job exception
     * @param aJob AbstractJob
     * @param anException DevieErrorException
     */
    protected void handleUnRecoverableJobException(AbstractJob aJob, Exception anException) {

    	//TODO
    	
    	//Job has given up and is throwing exception transition to error state and record error
        aJob.makeJobCompleteWithError();

        if (aJob.hasParentJob()) {
            aJob.getJobServiceProvider().passControlToParentJobOnChildComplete(aJob, anException);
        }


    }

    /**
     * Handle exception encountered in job state. This method is currently used in
     * the catch clause of states that must deal with exceptions coming back from aJob
     * 
     * @param aJob AbstractJob
     * @param e
     * @throws Exception
     */
    protected void handleExceptionEncounteredByJobState(AbstractJob aJob,
                                                        Exception e)
                                                        throws Exception {
        //TODO
    	throw e;
    }

    /**
     * Handle unrecoverable job exception
     * @param aJob AbstractJob
     * @param anException DevieErrorException
     */
    protected void handleUnexpectedUnRecoverableJobException(AbstractJob aJob, Exception anException) {

        //Log exception
        this.getLogger().info(anException.toString());
        
        //Job has given up and is throwing exception transition to error state and record error
        aJob.makeJobCompleteWithError();

        if (aJob.hasParentJob()) {
            aJob.getJobServiceProvider().passControlToParentJobOnChildComplete(aJob, anException);
        }


    }
}

