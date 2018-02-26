package job;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class JobExecutionResult implements Serializable {

    private List<AbstractJob>            newJobsToExecute;
    private boolean                       allocationSuccessful;

    /**
     * Answer a default instance
     */
    public JobExecutionResult() {

        super();
        this.setNewJobsToExecute(new ArrayList<AbstractJob>());
    }

    public void setNewJobsToExecute(List<AbstractJob> newJobsToExecute) {
        this.newJobsToExecute = newJobsToExecute;
    }

    public List<AbstractJob> getNewJobsToExecute() {
        return newJobsToExecute;
    }


    public void setAllocationSuccessful(boolean allocationSuccessful) {
        this.allocationSuccessful = allocationSuccessful;
    }

    public boolean isAllocationSuccessful() {
        return allocationSuccessful;
    }
}
