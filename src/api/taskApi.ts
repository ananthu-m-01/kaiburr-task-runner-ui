import axios from "axios";

// Base URL for all task-related API calls
const BASE_URL = "http://localhost:8080/api/tasks";

// Fetch all tasks
export const VIEW_ALL_TASKS = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// Create a new task
export const CREATE_TASK = async (taskData: any) => {
  try {
    const response = await axios.post(BASE_URL, taskData);
    return response.data; // returns TaskResponseDTO
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Get a task by ID
export const GET_TASK_BY_ID = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data; // returns TaskResponseDTO
  } catch (error) {
    console.error(`Error fetching task with id ${id}:`, error);
    throw error;
  }
};

// Run a task by ID (returns TaskExecutionDTO)
export const RUN_TASK = async (id: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}/run`); // Corrected URL
    return response.data; // returns TaskExecutionDTO
  } catch (error) {
    console.error(`Error running task with id ${id}:`, error);
    throw error;
  }
};
