package job;

public interface JobServiceProviderInterface {

	void passControlToParentJobOnChildComplete(AbstractJob aJob, Exception anException);
	
	void passControlToParentJobOnChildComplete(AbstractJob aJob);
	
	void requestJobStart(AbstractJob aJob);
}
