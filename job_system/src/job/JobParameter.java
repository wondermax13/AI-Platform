package job;

public class JobParameter {

	//Use this when we are not keeping the jobs in memory and persisting the job parameters
    private long id;

    private ParameterType type;

    private Object value;

    private long jobId;

    private long version;

    public JobParameter(
    		long id,
    		long jobId,
    		ParameterType parameterType,
    		Object value) {
    	
    	this.setJobId(jobId);
    	this.setType(parameterType);
    	this.setValue(value);
    }
    
    public JobParameter() {
        super();
    }

    @Override
    public String toString() {
        return super.toString()
                + ", jobId: " + this.getJobId()
                + ", type: " + this.getType()
                + ", value: " + this.getValue();
    }

    public long getId() {
        return id;
    }

    public ParameterType getType() {
        return type;
    }

    public void setType(ParameterType type) {
        this.type = type;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public long getJobId() {
        return jobId;
    }

    public void setJobId(long jobId) {
        this.jobId = jobId;
    }

    protected long getVersion() {
        return version;
    }

    protected void setVersion(long version) {
        this.version = version;
    }
}
