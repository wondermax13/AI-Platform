package job;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Logger;

import javax.xml.bind.ValidationException;

import message.AIResponseMessage;
import message.ChildJobCompleteMessage;
import request.Request;
import resource.Resource;



public abstract class AbstractJob {

    private long id;

    private Date createDateTime;

    private Date expectedAllocationDateTimeLimit;

    private Date expectedExecutionDateTimeLimit;

    private Date startDateTime;

    private Date completeDateTime;

    private JobStateType currentJobState;

    private AbstractJobState jobState;

    private JobType jobType;

    private Map<String, JobParameter> jobParameters;

    private AbstractJob parentJob;

    private List<AbstractJob> childJobs;

    private List<Resource> resources;

    private Request request;

    private double elapsedTime;

    private long version;

    private transient JobServiceProviderInterface jobServiceProvider;

    private int iterationCount;

    private int originalIterationCount;

    private boolean markedForCancellation;

    private long timeLimit;

    private int priority;

    private long percentComplete;

    private String description;
    
    private static final String ITERATION_COUNT_KEY = "ITERATION_COUNT";

    public static final int DEFAULT_PRIORITY = 5;
    public static final int RECOVERY_PRIORITY = 3;
    public static final int HIGHEST_PRIORITY = 1;
    public static final int LOWEST_PRIORITY = 10;

    Logger LOGGER = Logger.getLogger("AbstractJob");

    public static final int MAXIMUM_EXPECTED_DEVICE_RESPONSE_DURATION = 6 * 60 * 1000; //In milliseconds

    public static final int MAXIMUM_EXPECTED_ALLOCATION_DURATION = 4 * 60 * 1000; //In milliseconds - not dangerous if we want
                                                                                 //to make lower since it just cause re-eval
                                                                                 //of allocateResources
    public static final int MAXIMUM_ALLOWED_ALLOCATION_DURATION = 8 * 60 * 1000; //In milliseconds - all jobs must complete allocation during
                                                                                 //this time

    public static final int MAXIMUM_EXPECTED_EXECUTION_TIME_DURATION = 10 * 60 * 1000; //In milliseconds
                                                                                      // - really big because of init.
                                                                                      //More dangerous because jobs will
                                                                                      //be shut down when exceeded.
    public static final int MAXIMUM_EXPECTED_MOVE_JOB_EXECUTION_TIME_DURATION = 20 * 60 * 1000; //In milliseconds
                                                                                               // - really big because of init.
                                                                                               //More dangerous because jobs will
                                                                                               //be shut down when exceeded.

    public static final int MAXIMUM_EXPECTED_LONG_RUNNING_JOB_EXECUTION_TIME_DURATION = 30 * 60 * 1000; //In milliseconds
                                                                                                       // - really big because of init.
                                                                                                       //More dangerous because jobs will
                                                                                                       //be shut down when exceeded.

    public static final int STORAGE_MAXIMUM_EXPECTED_LONG_RUNNING_JOB_EXECUTION_TIME_DURATION = 24 * 60 * 60 * 1000; //In milliseconds
                                                                                                        // - really big because of Storage (LOH).
                                                                                                        //More dangerous because jobs will
                                                                                                        //be shut down when exceeded.

    public static final int ADD_NODE_MAXIMUM_EXPECTED_LONG_RUNNING_JOB_EXECUTION_TIME_DURATION = 90 * 60 * 1000; //In milliseconds
                                                                                                                //More dangerous because jobs will
                                                                                                                //be shut down when exceeded.

    public static final int REMOVE_NODE_MAXIMUM_EXPECTED_LONG_RUNNING_JOB_EXECUTION_TIME_DURATION = 30 * 60 * 1000; //In milliseconds
                                                                                                                //More dangerous because jobs will
                                                                                                                //be shut down when exceeded.

    public static final int MAX_DESCRIPTION_LENGTH = 255;

    //Delete and update queries
    public static final String UPDATE_STATE_FOR_JOBS_NOTINSTATES_QUERY = "update AbstractJob j"
        + " set j.currentJobState = :aNewJobStateType, j.completeDateTime = :aDate"
        + " where j.currentJobState not in :aStateTypes";
    public static final String DELETE_JOBS_PROCEDURE = "delete_jobs";

    /**
     * Answer a default instance
     */
    public AbstractJob() {

        this.setJobParameters(new HashMap<String, JobParameter>());
        this.setChildJobs(new ArrayList<AbstractJob>());
        this.setResources(new ArrayList<Resource>());

        this.createParameters();
        this.initializeParameters();
    }

    protected void createParameters() {

    }

    /**
     * Initialize my parameters
     */
    protected void initializeParameters() {

        this.setIterationCounters(0);
        this.setTimeLimit(0);
        this.setPriority(DEFAULT_PRIORITY);

    }

    public AbstractJob(JobType jobType, AbstractJob parentJob, Request request) {

        this();
        this.setCreateDateTime(new Date());
        this.setJobType(jobType);

        if (parentJob != null) {

            parentJob.addChildJob(this);
        }

        if (request != null) {
            
        	/*request.addJob(this);
            setParameterValuesFromRequest(request);*/
        }
    }

    public AbstractJob(JobType jobType, AbstractJob parentJob, Request request,
        JobServiceProviderInterface jobServiceProvider) {

        this();
        this.setCreateDateTime(new Date());
        this.setJobType(jobType);
        this.setJobServiceProvider(jobServiceProvider);

        if (parentJob != null) {

            parentJob.addChildJob(this);
        }
    }

    protected Logger getLogger() {

        return LOGGER;
    }

    /**
     * Populate my relationships
     */
    public void populateRelationships() {

        this.getId();
        this.getJobState();
        this.getParentJob();
        this.getJobType();

        for (AbstractJob aJob : this.getChildJobs()) {
            aJob.populateRelationships();
        }

        for (Map.Entry<String, JobParameter> entry : this.getJobParameters().entrySet()) {
            //entry.getValue().populateRelationships();
        }

        for (Resource aResource : this.getResources()) {
            aResource.getId();
        }
    }

    public String getIdName() {

        return "jobId";
    }

    public String toString() {

    	//TODO
    	return new String();
    }

    public Date getCreateDateTime() {

        return createDateTime;
    }

    public void setCreateDateTime(Date createDateTime) {

        this.createDateTime = createDateTime;
    }

    public long getId() {

        return id;
    }

    /**
     * Answer my job state
     *
     * @return AbstractJobState
     */
    public AbstractJobState getJobState() {

        if (jobState == null) {
            //TODO
        }

        return jobState;
    }

    /**
     * Set my job state
     *
     * @param jobState
     */
    private void setJobState(AbstractJobState jobState) {

        this.jobState = jobState;
        this.setCurrentJobState(jobState.getStateType());

    }

    /**
     * Answer my job type
     *
     * @return JobType
     */
    public JobType getJobType() {

        return jobType;
    }

    private void setJobType(JobType jobType) {

        this.jobType = jobType;
    }

    public Map<String, JobParameter> getJobParameters() {

        return jobParameters;
    }

    private void setJobParameters(Map<String, JobParameter> jobParameters) {

        this.jobParameters = jobParameters;
    }

    public JobParameter addParameter(JobParameter jobParameter) {

        jobParameter.setJob(this);
        getJobParameters().put(jobParameter.getName(), jobParameter);
        return jobParameter;
    }

    protected JobParameter removeParameter(JobParameter jobParameter) {

        getJobParameters().remove(jobParameter.getName());
        return jobParameter;
    }

    protected JobParameter removeParameter(String parameterName) {

        JobParameter jobParameter = getJobParameters().remove(parameterName);
        return jobParameter;
    }

    protected boolean hasParameter(JobParameter jobParameter) {

        return this.getJobParameters().containsValue(jobParameter);
    }

    protected boolean hasParameter(String parameterName) {

        return this.getJobParameters().containsKey(parameterName);
    }

    public AbstractJob getParentJob() {

        return parentJob;
    }

    public void setParentJob(AbstractJob job) {

        this.parentJob = job;
    }

    /**
     * Answer whether or not I have any child jobs
     *
     * @return boolean
     */
    public boolean hasChildJobs() {

        return !this.getChildJobs().isEmpty();
    }

    /**
     * Answer whether or not I have child jobs that are not complete
     *
     * @return boolean
     */
    public boolean hasActiveChildJobs() {

        return !this.getActiveChildJobs().isEmpty();
    }

    /**
     * Answer my active child jobs
     *
     * @return List<AbstractJob>
     */
    public List<AbstractJob> getActiveChildJobs() {

        List<AbstractJob> tempResults = new ArrayList<AbstractJob>();

        for (AbstractJob aJob : this.getChildJobs()) {

            if (!aJob.isComplete()) {
                tempResults.add(aJob);
            }
        }

        return tempResults;
    }

    /**
     * Answer all active child jobs (children of my children, etc). This could be expensive so be careful with its use
     *
     * @return List<AbstractJob)
     */
    public List<AbstractJob> getAllActiveChildJobs() {

        List<AbstractJob> tempResults = new ArrayList<AbstractJob>();

        tempResults.addAll(this.getActiveChildJobs());
        for (AbstractJob aChildJob : this.getChildJobs()) {

            tempResults.addAll(aChildJob.getAllActiveChildJobs());
        }

        return tempResults;
    }

    /**
     * Answer all child jobs (children of my children, etc). This could be expensive so be careful with its use
     *
     * @return List<AbstractJob)
     */
    public List<AbstractJob> getAllChildJobs() {

        List<AbstractJob> tempResults = new ArrayList<AbstractJob>();

        tempResults.addAll(this.getChildJobs());
        for (AbstractJob aChildJob : this.getChildJobs()) {

            tempResults.addAll(aChildJob.getAllChildJobs());
        }

        return tempResults;
    }

    /**
     * Answer my child jobs
     *
     * @return List<AbstractJob>
     */
    public List<AbstractJob> getChildJobs() {

        return childJobs;
    }

    private void setChildJobs(List<AbstractJob> childJobs) {

        this.childJobs = childJobs;
    }

    /**
     * Add a child job to me
     *
     * @param job
     * @return
     */
    public AbstractJob addChildJob(AbstractJob job) {

        getChildJobs().add(job);
        job.setParentJob(this);
        return job;
    }

    public List<Resource> getResources() {

        return resources;
    }

    /**
     * Clear resources
     *
     * @param resources
     */
    public void clearResources() {

        this.setResources(new ArrayList<Resource>());
    }

    private void setResources(List<Resource> resources) {

        this.resources = resources;
    }

    public Resource addResource(Resource resource) {

        getResources().add(resource);
        resource.setJob(this);
        return resource;
    }

    public void removeResource(Resource resource) {

        this.getResources().remove(resource);
        resource.setJob(null);

    }

    public String getResourcesString() {
        List<Resource> tempResources;
        String         returnString = "job resources: ";
        //TODO

        return returnString;
    }

    public Request getRequest() {

        return request;
    }

    public void setRequest(Request request) {

        this.request = request;
    }

    private Resource getResource(String name) {

        for (Resource resource : this.getResources()) {

            if (resource.isForName(name)) {
                return resource;
            }

        }
        return null;
    }

    /**
     * Answer my top parent job (the parent that has no parents). If I am the top, answer myself
     *
     * @return Job
     */
    public AbstractJob getTopParent() {

        AbstractJob tempTop = this;

        while (tempTop.hasParentJob()) {
            tempTop = tempTop.getParentJob();
        }

        return tempTop;
    }

    /**
     * Answer whether or not I have a parent
     *
     * @return boolean
     */
    public boolean hasParentJob() {

        return this.getParentJob() != null;
    }

    /**
     * Answer whether I am aJobType
     *
     * @param aJobType JobType
     * @return boolean
     */
    public boolean isJobType(JobType aJobType) {

        return this.getJobType() != null && this.getJobType().equals(aJobType);
    }

    /**
     * Answer whether or not I am a single action job. Job of this type will go to the runnable state,
     * take a single action, and then
     * terminate. Default is false. Subclasses can override if they are a job of this type
     */
    public boolean isSingleActionJob() {

        return false;
    }

    /**
     * Execute
     *
     * @return JobExecutionResult
     */
    public JobExecutionResult execute() throws Exception {

        return this.getJobState().execute(this);
    }

    /**
     * Execute with device response
     *
     * @param aDeviceResponse JobDeviceResponse
     * @return JobExecutionResult
     */
/*   
 * TODO 
    public JobExecutionResult execute(DeviceResponseJmsMessage aDeviceResponse) throws Exception {

        return this.getJobState().execute(this, aDeviceResponse);
    }*/

    /**
     * Handle a timed out condition sent by the job scheduler
     *
     * @param anExpectedExecutionDateTimeLimit Date
     */
    public void timedOut(Date anExpectedExecutionDateTimeLimit) throws Exception {

        this.getJobState().timedOut(this, anExpectedExecutionDateTimeLimit);

    }

    /**
     * Handle timed out condition by the job. Subclasses should override if they need to do something
     * different. The default behavior is to error off
     *
     * @param anExpectedExecutionDateTimeLimit Date
     */
    public void timedOutBasic(Date anExpectedExecutionDateTimeLimit) throws Exception {

        this.getLogger().info("job timed out: " + anExpectedExecutionDateTimeLimit);

        this.makeJobCompleteWithError();

        throw new Exception("Job timed out");
    }


    /**
     * Set next allocation timeout time
     */
    public void setNextJobAllocationTimeoutTime() {

        this.setNextExpectedAllocationDuration(AbstractJob.MAXIMUM_EXPECTED_ALLOCATION_DURATION);
    }


    /**
     * Set next execution time limit for device response. Subclasses should override this
     * if they want a time lower than the maximum
     *
     */
    public void setNextExecutionTimeForDeviceResponse() {

        this.setNextExpectedExecutionDuration(AbstractJob.MAXIMUM_EXPECTED_EXECUTION_TIME_DURATION);
    }

    /**
     * Set next execution time limit for child job complete. Subclasses should override this
     * if they want a time lower than the maximum
     *
     */
    public void setNextExecutionTimeForChildJobCompleted() {

        this.setNextExpectedExecutionDuration(AbstractJob.MAXIMUM_EXPECTED_EXECUTION_TIME_DURATION);
    }

    /**
     * Answer whether or not this job is completed
     *
     * @return boolean
     */
    public boolean isComplete() {

        return this.getJobState().isComplete();
    }

    /**
     * Answer whether or not this job is errored off
     *
     * @return boolean
     */
    public boolean isCompleteWithError() {

        return this.getJobState().isCompleteWithError();
    }

    /**
     * Answer whether or not I am still in a running state
     *
     * @return boolean
     */
    public boolean isRunning() {

        return this.getJobState().isRunning();
    }

    /**
     * Answer whether or not I am canceled (i.e I am in a cancelled state).
     *
     * @return boolean
     */
    public boolean isCancelled() {

        return this.getJobState().isCancelled();
    }

    /**
     * Answer whether or not I need resources. Subclasses should override if they represent a state that
     * is "needs resources":
     *
     * @return boolean
     */
    public boolean needsResources() {

        return this.getJobState().isNeedsResources();
    }

    /**
     * Make job complete.
     */
    public void makeJobComplete() {
        //        RequestOutputMessage requestOutputMessage;

        this.getJobState().makeJobComplete(this);

        //        requestOutputMessage = this.createJobCompletedMessage(this.getRequest(),
        //                                                              this.getId(),
        //                                                              this.getJobType());
        //
        //        RequestMessageUtilities.getInstance().
        //                    saveOutputMessageLogItAndUpdateRequest(this.getJobServiceProvider(),
        //                                                            this.getRequest(),
        //                                                            requestOutputMessage,
        //                                                            Level.INFO);

        this.safelyCompleteRequest(true);
    }

    /**
     * Make job complete with error
     */
    public void makeJobCompleteWithError() {
        //        RequestOutputMessage requestOutputMessage;

        this.getJobState().makeJobCompleteWithError(this);

        //        requestOutputMessage = this.createJobErrorMessage(this.getRequest(),
        //                                                          this.getId(),
        //                                                          this.getJobType());
        //
        //        RequestMessageUtilities.getInstance().
        //                    saveOutputMessageLogItAndUpdateRequest(this.getJobServiceProvider(),
        //                                                           this.getRequest(),
        //                                                           requestOutputMessage,
        //                                                           Level.INFO);

        this.safelyCompleteRequest(false);
    }

    /**
     * Make job complete with error
     */
    public void makeJobCompleteWithError(ValidationException e) {

        this.getJobState().makeJobCompleteWithError(this);
        
        //TODO - Log
        
        this.safelyCompleteRequest(false);
    }

    /**
     * Safely complete the request, sending an event if we have one.
     *
     * @param success boolean
     */
    public void safelyCompleteRequest(boolean success) {

        if (!this.hasParentJob() && this.getRequest() != null) {

            getLogger().fine("Completing request");
            this.completeRequest(success);
        }
    }

    /**
     * Make child job complete
     *
     * @param aChildJob Job
     * @param aMessage ChildJobCompleteJmsMessage
     * @return JobExecutionResult
     */
    public JobExecutionResult makeChildJobComplete(AbstractJob aChildJob, ChildJobCompleteMessage aMessage)
        throws Exception {

    	//TODO
    	return new JobExecutionResult();
    }

    /**
     * Mark my job for cancellation
     */
    public void markForCancellation() {

        this.getJobState().markForCancellation(this);
    }

    /**
     * Start my job. This method could throw an exception if the Job is not in a proper state to
     * be started
     *
     * @return JobExecutionResult
     */
    public JobExecutionResult startJob() throws Exception {

        return this.getJobState().startJob(this);
    }

    /**
     * Complete this job and pass control to parent (if applicable)
     */
    protected void completeJob() {

        this.makeJobComplete();

        if (this.hasParentJob()) {

            this.getJobServiceProvider().passControlToParentJobOnChildComplete(this);
        }
    }

    /**
     * Complete this job with error and pass control to parent (if applicable)
     */
    protected void completeJobWithError() {

        this.makeJobCompleteWithError();

        if (this.hasParentJob()) {

            this.getJobServiceProvider().passControlToParentJobOnChildComplete(this);
        }
    }
    /**
     * Complete the underlying request
     *
     * @param status boolean
     */
    public void completeRequest(boolean status) {

        if (this.getRequest() != null) {
            if (!this.isMarkedForCancellation()) {
            	//TODO
            } else {
                //TODO
            }
        }

    }

    /**
     * Cancel myself. All substates respond to a cancel by just doing it.
     * Subclasses could override this if they need to. The job would have previously been markedForCancel
     * before this transition is taken
     *
     * @return JobExecutionResult
     */
    public JobExecutionResult cancel() {

        return this.getJobState().cancel(this);
    }

    /**
     * Free my resources. THIS METHOD SHOULD ONLY BE INVOKED DIRECTLY BY JOB STATES.
     */
    public void freeMyResources() {

        for (Resource aResource : getResources()) {
            aResource.freeResource();
        }
    }

    /**
     * SEt my start date time. THIS METHOD SHOULD ONLY BE INVOKED DIRECTLY BY JOB STATES.
     *
     * @param startDateTime
     */
    public void setStartDateTime(Date startDateTime) {

        this.startDateTime = startDateTime;
    }

    /**
     * Answer my start date time
     *
     * @return Date
     */
    public Date getStartDateTime() {

        return startDateTime;
    }

    /**
     * Set my complete date time. THIS METHOD SHOULD ONLY BE INVOKED DIRECTLY BY JOB STATES.
     *
     * @param completeDateTime
     */
    public void setCompleteDateTime(Date completeDateTime) {

        this.completeDateTime = completeDateTime;
        if (this.getStartDateTime() != null && this.completeDateTime != null) {
            this.setElapsedTime(Long.valueOf(this.completeDateTime.getTime() - this.getStartDateTime().getTime())
                .doubleValue() / 1000.0);
        } else {
            this.setElapsedTime(0.0);
        }
    }

    /**
     * Answer my completed date time
     *
     * @return
     */
    public Date getCompleteDateTime() {

        return completeDateTime;
    }

    /**
     * Answer my elapsed time
     *
     * @return
     */
    public double getElapsedTime() {

        return elapsedTime;
    }

    /**
     * Set my elapsed time.
     *
     * @param elapsedTime
     */
    public void setElapsedTime(double elapsedTime) {

        this.elapsedTime = elapsedTime;
    }

    /**
     * Transition to start state. Subclasses should override this if they need to
     */
    public void transitionToStartState() {

        this.transitionToJobStateNamed(JobStateType.NEEDS_RESOURCES);
    }

    /**
     * Transition to complete with error state. Since we don't know the parent of the strategy of the parent job
     * we should just trigger the parent job to go look at the issue
     *
     * @parameter anException Exception
     */
    public void transitionToErrorState(Exception anException) {

        this.makeJobCompleteWithError();

        if (this.hasParentJob()) {
            this.getJobServiceProvider().passControlToParentJobOnChildComplete(this, anException);
        } else {
            this.safelyCompleteRequest(false);
        }

    }

    /**
     * Transition to next state named aStateType. Set the job's current state to this state if it exists.
     * THIS METHOD SHOULD ONLY BE INVOKED DIRECTLY BY JOB STATES.
     *
     * @param aStateType JobStateType
     * @return AbstractJobState
     */
    public AbstractJobState transitionToJobStateNamed(JobStateType aStateType) {

        AbstractJobState tempState = this.getPossibleStateFor(aStateType);
        this.setJobState(tempState); //Not checking if null -- want it to blow up if it is null. should result
                                    //in an integrity constraint error
        return tempState;
    }

    /**
     * Answer my state for aStateType
     *
     * @param aStateType
     * @return AbstractJobState
     */
    protected AbstractJobState getPossibleStateFor(JobStateType aStateType) {

        return JobStateFactory.getInstance().getJobState(this.getJobType(), aStateType);
    }

    /**
     * Answer my job action. This is manufactured based on my stored job type enum
     *
     * @return RequestServiceProvider
     */
    public JobServiceProviderInterface getJobServiceProvider() {

        return jobServiceProvider;
    }

    public void setJobServiceProvider(JobServiceProviderInterface jobServiceProvider) {

        this.jobServiceProvider = jobServiceProvider;
    }

    /**
     * Decrement my iteration counter
     */
    protected void decrementIterationCount() {

        this.setIterationCount(this.getIterationCount() - 1);
    }

    /**
     * Answer whether I have remaining iterations
     *
     * @return boolean
     */
    protected boolean hasRemainingIterations() {

        return this.getIterationCount() > 0;
    }

    /**
     * Answer the percentage complete for this job. If iterations are defined its just the current
     * iteration count/ original iteration count.
     * If time is defined, we can look at the long(current time - start time)/time_limit.
     * If both are defined, we return the greater number since that will govern when the Job actually completes.
     */
    public double getPercentageComplete() {

        double tempIterationCompleted = 0.0;
        double tempTimeCompleted = 0.0;

        if (this.getTimeLimit() > 0) {
            tempTimeCompleted = this.getTimePercentageComplete();
        }

        if (this.getOriginalIterationCount() > 0) {
            tempIterationCompleted = this.getIterationCounterPercentageComplete();
        }

        double tempValue = this.getPercentageCompleteToUse(tempTimeCompleted, tempIterationCompleted);

        return tempValue;
    }

    /**
     * Answer the percentage complete value to use
     *
     * @param aTimeCompleted double
     * @param aIterationCompleted double
     * @return double
     */
    private double getPercentageCompleteToUse(double aTimeCompleted, double aIterationCompleted) {

        double tempResult;

        if (aTimeCompleted > aIterationCompleted) {
            tempResult = aTimeCompleted;
        } else {
            tempResult = aIterationCompleted;
        }

        return tempResult;
    }

    /**
     * Answer my iteration counter percentage completed
     *
     * @return double
     */
    private double getIterationCounterPercentageComplete() {

        double tempValue = ((double) this.getOriginalIterationCount() - (double) this.getIterationCount() - 1.0)
            / this.getOriginalIterationCount();

        return tempValue;
    }

    /**
     * Answer my time percentage complete
     *
     * @return double
     */
    private double getTimePercentageComplete() {

        double tempValue = 0.0;

        //Either time limit is not defined or job has not yet started(resources not allocated)
        //then the job time limit is not expired
        if (this.getTimeLimit() > 0 && this.getStartDateTime() != null) {
            Date tempEndTimeToUse;

            if (this.getCompleteDateTime() != null) {
                tempEndTimeToUse = this.getCompleteDateTime();
            } else {
                tempEndTimeToUse = new Date();
            }

            tempValue = ((double) (tempEndTimeToUse.getTime() - this.getStartDateTime().getTime()))
                / this.getTimeLimit();
        }

        return tempValue;
    }

    /**
     * Set my iteration counters, both the original and the counter that gets decremented
     *
     * @param anIterationCount int
     */
    public void setIterationCounters(int anIterationCount) {

        this.setIterationCount(anIterationCount);
        this.setOriginalIterationCount(anIterationCount);
    }

    /**
     * Set my iteration count
     *
     * @param iterationCount
     */
    public void setIterationCount(int iterationCount) {

        this.iterationCount = iterationCount;
    }

    public int getIterationCount() {

        return iterationCount;
    }

    public void setPercentComplete(long percentComplete) {

        this.percentComplete = percentComplete;
    }

    /**
     * Mark me for cancellation.
     * THIS METHOD SHOULD ONLY BE INVOKED DIRECTLY BY JOB STATES.
     *
     * @param markedForCancellation
     */
    public void setMarkedForCancellation(boolean markedForCancellation) {

        this.markedForCancellation = markedForCancellation;
    }

    /**
     * Answer whether I am marked for cancellation
     *
     * @return
     */
    public boolean isMarkedForCancellation() {

        return markedForCancellation;
    }

    /**
     * Has passed time limit. The time limit is measured from my starting time. If the time limit is not
     * set, I answer false for expiration
     *
     * @return boolean
     */
    public boolean hasTimeLimitExpired() {

        boolean tempExpiration = false;

        //Either time limit is not defined or job has not yet started(resources not allocated)
        //then the job time limit is not expired
        if (this.getTimeLimit() > 0 && this.getStartDateTime() != null) {

            Date tempTimeCompare = new Date(this.getStartDateTime().getTime() + this.getTimeLimit());
            tempExpiration = tempTimeCompare.before(new Date());
        }

        return tempExpiration;
    }

    /**
     * Set time limit in milliseconds
     *
     * @param timeLimit
     */
    public void setTimeLimit(long timeLimit) {

        this.timeLimit = timeLimit;
    }

    /**
     * Answer my time limit in milliseconds
     *
     * @return
     */
    public long getTimeLimit() {

        return timeLimit;
    }

    public void setOriginalIterationCount(int originalIterationCount) {

        this.originalIterationCount = originalIterationCount;
    }

    protected int getOriginalIterationCount() {

        return originalIterationCount;
    }

    public int getPriority() {

        return priority;
    }

    public void setPriority(int priority) {

        this.priority = priority;
    }

    protected void addNewParameter(String parameterName, ParameterType parameterType, Object parameterValue) {

        JobParameter jobParameter = new JobParameter();
        jobParameter.setJob(this);
        jobParameter.setName(parameterName);
        jobParameter.setType(parameterType);
        jobParameter.setValue(String.valueOf(parameterValue));
        this.addParameter(jobParameter);
    }

    protected void addNewNullParameter(String parameterName, ParameterType parameterType) {

        this.addNewParameter(parameterName, parameterType, null);
    }

    public void validateParametersAndInitializeResources() throws ValidationException {

        try {
            this.validateParameters();
            this.createInitialResources();
        } catch (ValidationException e) {

            this.makeJobCompleteWithError(e);
            throw e;

        }
    }

    protected void validateParameters() throws ValidationException {

    }

    protected void validateNonNull(Object object, String objectName) throws Exception {

        if (object == null) {
            throw new Exception(objectName + " must be non null.");
        }
    }

    protected abstract void createInitialResources();

    public boolean allocateResources() throws Exception {

        return true;
    }
    /**
     * Request start job start. Used only by states
     */
    public void requestJobStartBasic() {

        this.getJobServiceProvider().requestJobStart(this);
    }

    /**
     * Used only by the state - double dispatch
     *
     * @return List<AbstractJob>
     */
    public List<AbstractJob> startJobBasic() throws Exception {

        // Make sure singleAction jobs get a valid startTime.
        this.setStartDateTime(new Date());

        return new ArrayList<AbstractJob>();
    }

    /**
     * Used only by the state - double dispatch
     *
     * @return List<AbstractJob>
     */
    public List<AbstractJob> childCompleteBasic(AbstractJob childJob, ChildJobCompleteMessage aMessage)
        throws Exception {

        this.handleErrorsOnChildJobComplete(aMessage);

        return new ArrayList<AbstractJob>();

    }

    /**
     * Handle errors on child complete. Subclasses should override if they want to handle their own errors. For example,
     * they may want to
     * take recovery actions and suppress the exception raised by the child job. The default behavior is to fail me (the
     * parent job).
     *
     * @param aMessage ChildJobConmpleteJmsMessage
     */
    protected void handleErrorsOnChildJobComplete(ChildJobCompleteMessage aMessage) throws Exception {

        Exception tempExp;

        if (!aMessage.isChildJobSuccess()) {
        	
        	tempExp = aMessage.getException();
            this.getLogger().info("Child job failed for " + this.getClass().getSimpleName() + ": {" + this + "}"
                + " parent job transitioning to error state");
            this.getLogger().info(" Child job failed due to: "  + aMessage.getException());

            throw tempExp;
        }
    }

    /**
     * Used only by the state - double dispatch
     *
     * @return List<AbstractJob>
     * @param jobDeviceResponse
     */
    public List<AbstractJob> deviceResponseBasic(AIResponseMessage jobDeviceResponse)
        throws Exception {

    	//TODO
    	throw new Exception();
    }

    /**
     * Answer my currentJobState
     *
     * @return JobStateType
     */
    protected JobStateType getCurrentJobState() {

        return currentJobState;
    }

    /**
     * Set my currentJobState
     *
     * @param currentJobState JobStateType
     */
    protected void setCurrentJobState(JobStateType currentJobState) {

        this.currentJobState = currentJobState;
    }

    /**
     * Answer the time component of aDate
     *
     * @param aDate Date
     * @return String
     */
    protected String getTimeComponentOf(Date aDate) {

        Calendar tempCal = Calendar.getInstance();
        StringBuilder tempBuilder = new StringBuilder();

        tempCal.setTime(aDate);
        tempBuilder.append(tempCal.get(Calendar.HOUR_OF_DAY));
        tempBuilder.append(":");
        tempBuilder.append(tempCal.get(Calendar.MINUTE));
        tempBuilder.append(":");
        tempBuilder.append(tempCal.get(Calendar.SECOND));
        tempBuilder.append(":");
        tempBuilder.append(tempCal.get(Calendar.MILLISECOND));

        return tempBuilder.toString();

    }

    /**
     * Log who called me. Debug method to be used on jobs. Method dumps the stack trace up to this point
     */
    protected void logWhoCalledMe(String aMsg) {

        Exception tempExp;

        tempExp = new Exception();
        System.out.println(aMsg);
        tempExp.printStackTrace();
    }

    /**
     * Answer all of my parent jobs. This method returns parents in their "closest ancestor first" order
     *
     * @return List<AbstractJob>
     */

    public List<AbstractJob> getAllParentJobs() {

        AbstractJob tempTop = this;
        List<AbstractJob> tempParents = new ArrayList<AbstractJob>();

        while (tempTop.hasParentJob()) {
            tempTop = tempTop.getParentJob();
            tempParents.add(tempTop);
        }

        return tempParents;
    }

    /**
     * Answer my ExpectedAllocationDateTimeLimit
     *
     * @return Date
     */
    public Date getExpectedAllocationDateTimeLimit() {

        return expectedAllocationDateTimeLimit;
    }

    /**
     * Set my ExpectedAllocationDateTimeLimit
     *
     * @param expectedAllocationDateTimeLimit Date
     */
    protected void setExpectedAllocationDateTimeLimit(Date expectedAllocationDateTimeLimit) {

        this.expectedAllocationDateTimeLimit = expectedAllocationDateTimeLimit;
    }

    /**
     * Set my next expected allocation duration. If this duration is exceeded on the next operation,
     * timedOut will be invoked on me.
     *
     * @param anExpectedDuration long in milliseconds
     */
    public Date setNextExpectedAllocationDuration(long anExpectedDuration) {

        Date tempNow = new Date();
        Date tempNextAllocationDateTimeLimit;

        tempNextAllocationDateTimeLimit = new Date(tempNow.getTime() + anExpectedDuration);
        this.setExpectedAllocationDateTimeLimit(tempNextAllocationDateTimeLimit);

        return tempNextAllocationDateTimeLimit;

    }

    /**
     * Answer my expectedExecutionDateTimeLimit
     *
     * @return Date
     */
    public Date getExpectedExecutionDateTimeLimit() {

        return expectedExecutionDateTimeLimit;
    }

    /**
     * Set my expectedExecutionDateTimeLimit
     *
     * @param nextExecutionDateTimeLimit Date
     */
    protected void setExpectedExecutionDateTimeLimit(Date nextExecutionDateTimeLimit) {

        this.expectedExecutionDateTimeLimit = nextExecutionDateTimeLimit;
    }

    /**
     * Set my next expected execution duration. If this duration is exceeded on the next operation,
     * timedOut will be invoked on me.
     *
     * @param anExpectedDuration long in milliseconds
     */
    public Date setNextExpectedExecutionDuration(long anExpectedDuration) {

        Date tempNow = new Date();
        Date tempNextExecutionDateTimeLimit;

        tempNextExecutionDateTimeLimit = new Date(tempNow.getTime() + anExpectedDuration);
        this.setExpectedExecutionDateTimeLimit(tempNextExecutionDateTimeLimit);

        return tempNextExecutionDateTimeLimit;

    }

    /**
     * Answer whether or not I accept aDeviceResponse in aStateType. Default
     * behavior is to answer false. Subclasses can override
     *
     * @param aDeviceResponse DeviceResponseJmsMessage
     * @param aStateType JobStateType
     */
    public boolean acceptsUnexpectedAIResponseInState(AIResponseMessage aDeviceResponse,
        JobStateType aStateType) {

        return false;

    }

    /**
     * Answer my percentComplete
     * @return long
     */
    protected long getPercentComplete() {
        return percentComplete;
    }

    /**
     * Answer whether my number of allocation attempts has been exceeded
     * @return boolean
     */
    public boolean isMaximumAllowedAllocationTimeExceeded() {

        return false; //Currently default behavior for all jobs
                      //is not to timeout on allocation. Subclasses
                      //need to override this

    }

    /**
     * Evaluate maximum allocation timeout
     * @return boolean
     */
    protected boolean basicEvaluateMaximumAllocationTimeout() {

        return this.basicEvaluateAllocationTimeout(MAXIMUM_ALLOWED_ALLOCATION_DURATION);

    }
    
    /**
     * Evaluate whether or not anAllocationTimeout has passed
     * @param anAllocationTimeout long
     */
    protected boolean basicEvaluateAllocationTimeout(long anAllocationTimeout) {
        
        long    tempCurrentAllocationDuration;

        tempCurrentAllocationDuration = (new Date()).getTime() - this.getCreateDateTime().getTime();

        return tempCurrentAllocationDuration > anAllocationTimeout;
        
    }


    /**
     * Terminate aJob with error
     * @param aJob AbstractJob
     * @param aProvider JobServiceProviderInterface
     */
    public void terminateJobWithErrorToParentJob(Exception anException,
                                                 JobServiceProviderInterface aProvider) {

        this.setJobServiceProvider(aProvider);
        this.makeJobCompleteWithError();

        if (this.hasParentJob()) {
            this.getJobServiceProvider().passControlToParentJobOnChildComplete(this, anException);
        }

    }

    /**
     * Change job state to completed success and notify parent of completion
     */
    protected void makeJobSuccessfulAndNotifyParentOfCompletion() {


        this.makeJobComplete();
        if (this.hasParentJob()) {
            this.getJobServiceProvider().passControlToParentJobOnChildComplete(this);
        }

    }

    /**
     * Answer whether or not I have a common ancestor with anotherJob
     * @param anotherJob AbstractJob
     * @return boolean
     */
    public boolean hasCommonAncestor(AbstractJob anotherJob) {
        
        List<AbstractJob>   tempAllJobs;
        boolean             tempResult = false;
        
        if (anotherJob != null) {
            
            //Include another job's parents and anotherJob as well
            tempAllJobs = anotherJob.getAllParentJobs();
            tempAllJobs.add(anotherJob);
            
            //Walk my parental tree to see if I have any common ancestor with anotherJob (including anotherJob)
            if (this.hasParentJob()) {
                
                tempResult = tempAllJobs.contains(this.getParentJob());
                if (!tempResult) {
                    
                    this.getParentJob().hasCommonAncestor(anotherJob);
                }
            }
            
        }
       
        return tempResult;
        
    }
    
}

