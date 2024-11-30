import axios from "axios";
import { handleError } from '../utils/errorHandler'; // Import handleError from the errorHandler.js utility

const DEPARTMENT_REST_API_BASE_URL = 'http://localhost:8080/api/departments';

// Get all departments
export const getAllDepartments = async () => {
    try {
        return await axios.get(DEPARTMENT_REST_API_BASE_URL);
    } catch (error) {
        return handleError(error, "Failed to fetch departments");
    }  // Catch and handle error
};

// Create a new department
export const createDepartment = async (department) => {
    try {
        return await axios.post(DEPARTMENT_REST_API_BASE_URL, department);
    } catch (error) {
        return handleError(error, "Failed to create department");
    }  // Catch and handle error
};

// Get a department by ID
export const getDepartmentById = async (departmentId) => {
    try {
        return await axios.get(`${DEPARTMENT_REST_API_BASE_URL}/${departmentId}`);
    } catch (error) {
        return handleError(error, "Failed to fetch department by ID");
    }  // Catch and handle error
};

// Update a department
export const updateDepartment = async (departmentId, department) => {
    try {
        return await axios.put(`${DEPARTMENT_REST_API_BASE_URL}/${departmentId}`, department);
    } catch (error) {
        return handleError(error, "Failed to update department");
    }  // Catch and handle error
};

// Delete a department
export const deleteDepartment = async (departmentId) => {
    try {
        return await axios.delete(`${DEPARTMENT_REST_API_BASE_URL}/${departmentId}`);
    } catch (error) {
        return handleError(error, "Cannot delete department with assigned employees. Reassign or remove employees first");
    }
};
