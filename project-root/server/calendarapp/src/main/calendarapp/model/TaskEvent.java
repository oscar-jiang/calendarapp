package calendarapp.model;

public class TaskEvent {
    private int id; 
    private static int nextID = 1;
    private String name;
    private String type; // "task" or "event"
    private int duration;
    private String description;
    private int participants;

    public TaskEvent(String name, String type, int duration, String description, int participants) {
        this.id = nextID++;
        this.name = name;
        this.type = type;
        this.duration = duration;
        this.description = description;
        this.participants = participants;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getParticipants() {
        return participants;
    }

    public void setParticipants(int participants) {
        this.participants = participants;
    }
}
