package job;

import java.util.ArrayList;
import java.util.List;

public class ExecutionResult {

	public boolean success_;
	public Object value_;
	public List<GenericJob> childJobs_;

	ExecutionResult(List<GenericJob> childJobs) {
		
		success_ = false;
		childJobs_ = childJobs;
	}
	
	ExecutionResult() {
		
		success_ = false;
		childJobs_ = new ArrayList<GenericJob>();
	}

	ExecutionResult(boolean result) {
		
		success_ = result;
		childJobs_ = new ArrayList<GenericJob>();
	}
}
