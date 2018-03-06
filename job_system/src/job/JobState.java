package job;

//TODO - Maybe rename this to JobState
public enum JobState {

    CANCELLED,
    COMPLETED_SUCCESS,
    COMPLETED_ERROR,
    NEEDS_RESOURCES,
    RUNNABLE,
    DEV_FAILED,
    WAITING_FOR_AI_RESPONSE,
    WAITING_FOR_SUBJOB,
    UNKNOWN;

    public String value() {
        return name();
    }

    public static JobStateType fromValue(String v) {
        return valueOf(v);
    }
}

