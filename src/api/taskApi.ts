import axios from "axios";

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
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Get task by ID
export const GET_TASK_BY_ID = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with id ${id}:`, error);
    throw error;
  }
};

// Run task
export const RUN_TASK = async (id: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}/run`);
    return response.data;
  } catch (error) {
    console.error(`Error running task with id ${id}:`, error);
    throw error;
  }
};

// Delete task
export const DELETE_TASK = async (id: string) => {
  console.log("delete in taskApi called")
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting task with id ${id}:`, error);
    throw error;
  }
};

// Update task
export const UPDATE_TASK = async (id: string, updatedTask: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with id ${id}:`, error);
    throw error;
  }
};

// Search task by name
export const GET_TASK_BY_NAME = async (name: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tasks by name '${name}':`, error);
    return [];
  }
};
