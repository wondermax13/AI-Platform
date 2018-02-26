package job;

public class JobParameter {

    private long id;

    private String name;

    private ParameterType type;

    private String value;

    private AbstractJob job;

    private long version;

    public JobParameter() {
        super();
    }

    @Override
    public String toString() {
        return super.toString()
                + ", jobId: " + this.getJob().getId()
                + ", name: " + this.getName()
                + ", type: " + this.getType()
                + ", value: " + this.getValue();
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ParameterType getType() {
        return type;
    }

    public void setType(ParameterType type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public AbstractJob getJob() {
        return job;
    }

    public void setJob(AbstractJob acsJobs) {
        this.job = acsJobs;
    }

    protected long getVersion() {
        return version;
    }

    protected void setVersion(long version) {
        this.version = version;
    }
}
