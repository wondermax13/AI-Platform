package message;

public class ChildJobCompleteMessage extends AbstractJobResponseMessage {

    private long childJobId;
    private long parentJobId;
    private boolean childJobSuccess;
    private Exception exception;

    /**
     * Answer an instance of me for the args below
     * @param aChildJobId long
     * @param aParentJobId long
     * @param aChildSuccess boolean
     */
    public ChildJobCompleteMessage(long aChildJobId,
                                   long aParentJobId,
                                   boolean aChildSuccess,
                                   long requestId) {
        super(requestId);
        this.setChildJobId(aChildJobId);
        this.setParentJobId(aParentJobId);
        this.setChildJobSuccess(aChildSuccess);
    }

    @Override
    public String toString() {
        return "{" + super.toString()
                + ", childJobId: " + this.getChildJobId()
                + ", childJobSuccess: " + this.isChildJobSuccess()
                + ", parentJobId: " + this.getParentJobId() +"}";

    }

    /**
     * Answer my childJobId
     * @return long
     */
    public long getChildJobId() {
        return childJobId;
    }

    /**
     * Set my childJobId
     * @param childJobId long
     */
    protected void setChildJobId(long childJobId) {
        this.childJobId = childJobId;
    }

    /**
     * Answer my parentJobId
     * @return long
     */
    public long getParentJobId() {
        return parentJobId;
    }

    /**
     * Set my parentJobId
     * @param parentJobId long
     */
    protected void setParentJobId(long parentJobId) {
        this.parentJobId = parentJobId;
    }

    /**
     * Answer my childJobSuccess
     * @return boolean
     */
    public boolean isChildJobSuccess() {
        return childJobSuccess;
    }

    /**
     * Set my childJobSuccess
     * @param childJobSuccess boolean
     */
    protected void setChildJobSuccess(boolean childJobSuccess) {
        this.childJobSuccess = childJobSuccess;
    }

    /**
     * Answer my exception
     * @return Exception
     */
    public Exception getException() {
        return exception;
    }

    /**
     * Set my exception
     * @param exception Exception
     */
    public void setException(Exception exception) {
        this.exception = exception;
    }
    
    
}
