package job;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class JobStateFactory {  }
/*    private Map<JobType, List<AbstractJobState>> possibleStates;

    //Class variables
    private static JobStateFactory instance;


    *//**
     * Answer my default instance
     * @return JobStateFactory
     *//*
    public static synchronized JobStateFactory getInstance() {

        if (instance == null) {
            instance = new JobStateFactory();
        }

        return instance;
    }

    *//**
     * Answer a default instance
     *//*
    protected JobStateFactory() {
        super();
        this.initializePossibleStates();

    }

    *//**
     * Answer the job state types from aJobStates
     * @param aJobStates List<AbstractJobState>
     * @return List<JobStateType>
     *//*
    public List<JobStateType> getStateTypesFrom(List<AbstractJobState> aJobStates) {

        List<JobStateType> tempTypes = new ArrayList<JobStateType>();

        for (AbstractJobState aState: aJobStates) {
            tempTypes.add(aState.getStateType());
        }

        return tempTypes;
    }


    *//**
     * Answer the completed states for aJobType
     * @param aJobType JobType
     * @return List<AbstractJobState>
     *//*
    public List<AbstractJobState> getCompletedStatesFor(JobType aJobType) {

        List<AbstractJobState>     tempPossibleStates;
        List<AbstractJobState>    tempResult = new ArrayList<AbstractJobState>();

        tempPossibleStates = this.getPossibleStates(aJobType);
        if (tempPossibleStates != null) {

            for (AbstractJobState aState: tempPossibleStates) {
                if (aState.isComplete()) {
                    tempResult.add(aState);
                }
            }
        }

        return tempResult;


    }

    *//**
     * Answer the error states for aJobType
     * @param aJobType JobType
     * @return List<AbstractJobState>
     *//*
    public List<AbstractJobState> getErrorStatesFor(JobType aJobType) {

        List<AbstractJobState>     tempPossibleStates;
        List<AbstractJobState>    tempResult = new ArrayList<AbstractJobState>();

        tempPossibleStates = this.getPossibleStates(aJobType);
        if (tempPossibleStates != null) {

            for (AbstractJobState aState: tempPossibleStates) {
                if (aState.isError()) {
                    tempResult.add(aState);
                }
            }
        }

        return tempResult;


    }




    *//**
     * Answer the completed states for aJobType
     * @param aJobType JobType
     * @return List<AbstractJobState>
     *//*
    public List<AbstractJobState> getCompletedStatesAfterStartupFor(JobType aJobType) {

        List<AbstractJobState>     tempPossibleStates;
        List<AbstractJobState>    tempResult = new ArrayList<AbstractJobState>();

        tempPossibleStates = this.getPossibleStates(aJobType);
        if (tempPossibleStates != null) {

            for (AbstractJobState aState: tempPossibleStates) {
                if (aState.isComplete() && !aState.isError()) {
                    tempResult.add(aState);
                }
            }
        }

        return tempResult;


    }




    *//**
     * Answer the needs resources states for aJobType
     * @param aJobType JobType
     * @return List<AbstractJobState>
     *//*
    public List<AbstractJobState> getNeedsResourcesStatesFor(JobType aJobType) {

        List<AbstractJobState>     tempPossibleStates;
        List<AbstractJobState>    tempResult = new ArrayList<AbstractJobState>();

        tempPossibleStates = this.getPossibleStates(aJobType);
        if (tempPossibleStates != null) {

            for (AbstractJobState aState: tempPossibleStates) {
                if (aState.isNeedsResources()) {
                    tempResult.add(aState);
                }
            }
        }

        return tempResult;


    }


    *//**
     * Answer the cancelled states for aJobType
     * @param aJobType JobType
     * @return List<AbstractJobState>
     *//*
    public List<AbstractJobState> getCancelledStatesFor(JobType aJobType) {

        List<AbstractJobState>     tempPossibleStates;
        List<AbstractJobState>    tempResult = new ArrayList<AbstractJobState>();

        tempPossibleStates = this.getPossibleStates(aJobType);
        if (tempPossibleStates != null) {

            for (AbstractJobState aState: tempPossibleStates) {
                if (aState.isCancelled()) {
                    tempResult.add(aState);
                }
            }
        }

        return tempResult;


    }


    *//**
     * Answer my possible states for aJobType or null
     * @param aJobType JobType
     *//*
    public List<AbstractJobState> getPossibleStates(JobType aJobType) {
        return this.getPossibleStates().get(aJobType);
    }


    *//**
     * Answer a job state for aJobType and aJobStateType or null
     * @param aJobType JobType
     * @param aStateType JobStateType
     * @return AbstractJobState
     *//*
    public AbstractJobState getJobState(JobType aJobType, JobStateType aStateType) {

        List<AbstractJobState>     tempPossibleStates;
        AbstractJobState        tempResult = null;

        tempPossibleStates = this.getPossibleStates(aJobType);
        if (tempPossibleStates != null) {
            tempResult = this.getJobStateFrom(tempPossibleStates, aStateType);
        }

        return tempResult;

    }


    *//**
     * Answer the state for aStateType or null
     * @param aPossibleStates List<AbstractJobState>
     * @param aStateType JobStateType
     * @return AbstractJobState
     *//*
    protected AbstractJobState getJobStateFrom(List<AbstractJobState> aPossibleStates,
                                               JobStateType aStateType) {

        Iterator<AbstractJobState> tempItr;
        AbstractJobState           tempResult = null;
        AbstractJobState           tempCurrent;


        tempItr = aPossibleStates.iterator();
        while (tempItr.hasNext() && tempResult == null) {

            tempCurrent = tempItr.next();
            if (tempCurrent.isForType(aStateType)) {
                tempResult = tempCurrent;
            }
        }

        return tempResult;
    }

    *//**
     * Initialize possible states
     *//*
    protected void initializePossibleStates() {

        this.setPossibleStates(new HashMap<JobType,List<AbstractJobState>>());

        //TODO: ADD NEW JOB TYPE HERE
    }


    *//**
     * Answer my possibleStates
     * @return Map<JobType,AbstractJobState>
     *//*
    protected Map<JobType, List<AbstractJobState>> getPossibleStates() {
        return possibleStates;
    }

    *//**
     * Set my possibleStates
     * @param possibleStates Map<JobType,AbstractJob>
     *//*
    protected void setPossibleStates(Map<JobType, List<AbstractJobState>> possibleStates) {
        this.possibleStates = possibleStates;
    }



}*/

