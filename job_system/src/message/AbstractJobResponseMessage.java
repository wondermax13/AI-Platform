package message;

public class AbstractJobResponseMessage {

	//TODO - Handle sending of messages 
	
    public static final String QUEUE_NAME = "Job-Response-Queue";
    
    private long requestId;


    protected AbstractJobResponseMessage(long requestId) {
        
    	this.requestId = requestId;
    }
    
    protected String getDestinationName() {
        return QUEUE_NAME;
    }

    /**
     * Answer my string representation
     * @return String
     */
    public String toString() {
        
      return this.getClass().getSimpleName() + ", " +super.toString();

    }
}
