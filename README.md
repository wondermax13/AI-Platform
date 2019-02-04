To run locally through command line

In Eclipse -> File -> Export -> Provide jar location

java -jar 


# AICommunicator

Data Model

AI
{
	Address
	Version
	Public Key
	Priority
	Channels
}

QuestionAnswer{

	String question
	List<String, String> AIAnswers
}




Parts of the system

JobInterface: Entry point for the UI. Implementation figures out the jobs to be scheduled
------------------------------------------------------------------------------------------
bool askQuestion(long requestId, string question)
void registerAI(long requestId, AI ai)
List<AIAnswers> getAnswersForQuestion(long requestId, long questionId)


JobSubsystem: Invoked by JobInterface to schedule/cancel/query job(s)
-----------------------------------------------------------------------
void scheduleJob(Job job)
void cancelJob(long jobId)
List<Job> getJobsForRequest(long requestId)

EventMessage Queue: Handle the new messages in the system
-----------------------------------------------------------

Jobs Dictionary: Handle the jobs currently active in the system
-----------------------------------------------------------------

EventMessage Consumer: Processes the new messages from the EventMessage Q
----------------------------------------------------------------------------

