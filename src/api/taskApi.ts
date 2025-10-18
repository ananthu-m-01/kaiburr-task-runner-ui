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
export const CREATE_TASK = async (taskData) => {
  try {
    const response = await axios.post(BASE_URL, taskData);
    return response.data; // returns TaskResponseDTO
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};
