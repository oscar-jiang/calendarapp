package com.example.calendarapp.controller;

import com.example.calendarapp.model.TaskEvent;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private List<TaskEvent> tasks = new ArrayList<>();

    // Get all tasks
    @GetMapping
    public List<TaskEvent> getAllTasks() {
        return tasks;
    }

    // Add a new task
    @PostMapping("/add")
    public TaskEvent addTask(@RequestBody TaskEvent task) {
        task.setId((long) (tasks.size() + 1)); // Simple ID assignment
        tasks.add(task);
        return task;
    }

    // Update a task by ID
    @PutMapping("/update/{id}")
    public TaskEvent updateTask(@PathVariable Long id, @RequestBody TaskEvent updatedTask) {
        for (TaskEvent task : tasks) {
            if (task.getId().equals(id)) {
                task.setName(updatedTask.getName());
                task.setType(updatedTask.getType());
                task.setDuration(updatedTask.getDuration());
                task.setDescription(updatedTask.getDescription());
                task.setParticipants(updatedTask.getParticipants());
                return task;
            }
        }
        return null;
    }
}
