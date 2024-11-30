import axios from "axios";
import { handleError } from '../utils/errorHandler';

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

export const listEmployees = async () => {
    try {
        return await axios.get(REST_API_BASE_URL);
    } catch (error) {
        return handleError(error, "Failed to fetch employees");
    }
};

export const createEmployee = async (employee) => {
    try {
        return await axios.post(REST_API_BASE_URL, employee);
    } catch (error) {
        return handleError(error, "Failed to create employee! Employee with the details entered already exists");
    }
};

export const getEmployee = async (employeeId) => {
    try {
        return await axios.get(REST_API_BASE_URL + '/' + employeeId);
    } catch (error) {
        return handleError(error, "Failed to fetch employee details");
    }
};

export const updateEmployee = async (employeeId, employee) => {
    try {
        return await axios.put(REST_API_BASE_URL + '/' + employeeId, employee);
    } catch (error) {
        return handleError(error, "Failed to update employee! Please fill all the details.");
    }
};

export const deleteEmployee = async (employeeId) => {
    try {
        return await axios.delete(REST_API_BASE_URL + '/' + employeeId);
    } catch (error) {
        return handleError(error, "Failed to delete employee");
    }
};
