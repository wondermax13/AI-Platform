package job;

public enum JobStateType {

    CANCELLED,
    COMPLETED_SUCCESS,
    COMPLETED_ERROR,
    NEEDS_RESOURCES,
    RUNNABLE,
    DEV_FAILED,
    WAITING_FOR_DEVICE_RESPONSE,
    WAITING_FOR_SUBJOB,
    UNKNOWN;

    public String value() {
        return name();
    }

    public static JobStateType fromValue(String v) {
        return valueOf(v);
    }
}

