package resource;

import job.AbstractJob;
import java.util.Date;
import java.util.logging.Logger;

public class Resource {/*

	private long id;

    private AbstractJob job;

    private ResourceType resourceType;

    private ResourceState state;

    private String name;
    
    private Date allocatedDateTime;

    private Date freedDateTime;

    private long version;

    public Resource() {
       super();
    }

    public Resource(long id, AbstractJob job, ResourceState state, String name) {
        this.id = id;
        job.addResource(this);
        this.state = state;
        this.name = name;
        this.allocatedDateTime = null;
        this.freedDateTime = null;
    }

    public Resource(AbstractJob job, ResourceState state, String name) {
        job.addResource(this);
        this.state = state;
        this.name = name;
        this.allocatedDateTime = null;
        this.freedDateTime = null;
    }

    public Resource(AbstractJob job, String name) {
        job.addResource(this);
        this.state = ResourceState.NEEDED;
        this.name = name;
        this.allocatedDateTime = null;
        this.freedDateTime = null;
    }

    @Override
    public String toString() {
        return super.toString()
                + ", jobId: " + (this.getJob() == null ? "null" : this.getJob().getId())
                + ", state: "  + this.getState()
                + ", name: " + this.getName()
                + ", allocated: " + this.getAllocatedDateTime()
                + ", freed: " + this.getFreedDateTime();
    }

    public long getId() {
        return id;
    }

    public AbstractJob getJob() {
        return job;
    }

    public void setJob(AbstractJob acsJob) {
        this.job = acsJob;
    }

    private void setState(ResourceState state) {
        this.state = state;
    }

    *//**
     * Answer whether or not I am allocated
     * @return boolean
     *//*
    public boolean isAllocated() {
        return this.getState() != null && this.getState().equals(ResourceState.ALLOCATED);
    }


    public void allocateResource() {

        if (this.getState() == ResourceState.NEEDED) {
        this.setState(ResourceState.ALLOCATED);
        this.setAllocatedDateTime(new Date(System.currentTimeMillis()));
        } else if (this.getState() == ResourceState.ALLOCATED) {
            Logger.info(this, "trying to allocate already allocated resource " + this);
        } else if (this.getState() == ResourceState.COMPLETE) {
            Logger.info(this, "trying to allocate already freed resource " + this);
        }
    }
    public void freeResource() {
    	this.setState(ResourceState.COMPLETE);
        this.setFreedDateTime(new Date(System.currentTimeMillis()));
    }

    public ResourceState getState() {
        return state;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setResourceType(ResourceType resourceType) {
        this.resourceType = resourceType;
    }

    public ResourceType getResourceType() {
        return resourceType;
    }

    *//**
     * Answer whether or not a Resource is for aType
     * @param aType ResourceType
     * @return boolean
     *//*
    public boolean isForType(ResourceType aType) {

        return this.getResourceType() != null
                && this.getResourceType().equals(aType);

    }
    
    *//**
     * Answer whether or not I am allocated to aJob of aJobType
     * @param aJobType JobType
     * @return boolean
     *//*
    public boolean isAllocatedToJobOfType(JobType aJobType) {
        
        return this.isAllocated() && this.isForJobType(aJobType);
    }
    
    
    *//**
     * Answer whether or not I am associated with aJob of 
     * aJobType
     * @param aJobType JobType
     * @return boolean
     *//*
    public boolean isForJobType(JobType aJobType) {
        
        return this.getJob() != null
                && this.getJob().getJobType().equals(aJobType);
    }

    *//**
     * Answer whether or not I am for aName
     * @param aName ResourceName
     * @return boolean
     *//*
    public boolean isForName(String aName) {

        return this.getName() != null
                && this.getName().equals(aName);
    }

    private void setAllocatedDateTime(Date allocatedDateTime) {
        this.allocatedDateTime = allocatedDateTime;
    }

    public Date getAllocatedDateTime() {
        return allocatedDateTime;
    }

    private void setFreedDateTime(Date freedDateTime) {
        this.freedDateTime = freedDateTime;
    }

    public Date getFreedDateTime() {
        return freedDateTime;
    }

    public void setVersion(long version) {
        this.version = version;
    }

    public long getVersion() {
        return this.version;
    }

    *//**
     * Clear resource. Free the resource and detach it from what it holds. Subclasses should extend
     *//*
    public void clearResource() {
        
        //do nothing at this level for now
    }*/
}
