import axios from "axios";
import { handleError } from '../utils/errorHandler';

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

// Get all employees
export const listEmployees = async () => {
    try {
        return await axios.get(REST_API_BASE_URL);
    } catch (error) {
        return handleError(error, "Failed to fetch employees");
    }
};

// Create a new employee
export const createEmployee = async (employee) => {
    try {
        return await axios.post(REST_API_BASE_URL, employee);
    } catch (error) {
        return handleError(error, "Failed to create employee");
    }
};

// Get an employee by ID
export const getEmployee = async (employeeId) => {
    try {
        return await axios.get(REST_API_BASE_URL + '/' + employeeId);
    } catch (error) {
        return handleError(error, "Failed to fetch employee details");
    }
};

// Update an employee
export const updateEmployee = async (employeeId, employee) => {
    try {
        return await axios.put(REST_API_BASE_URL + '/' + employeeId, employee);
    } catch (error) {
        return handleError(error, "Failed to update employee");
    }
};

// Delete an employee
export const deleteEmployee = async (employeeId) => {
    try {
        return await axios.delete(REST_API_BASE_URL + '/' + employeeId);
    } catch (error) {
        return handleError(error, "Failed to delete employee");
    }
};
