import React, { useEffect, useReducer } from 'react';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { getAllDepartments } from '../services/DepartmentService';
import { showErrorPopup } from '../utils/showErrorPopup';

const initialState = {
  employees: [],
  departments: [],
  isVisible: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_EMPLOYEES':
      return { ...state, employees: action.employees };
    case 'SET_DEPARTMENTS':
      return { ...state, departments: action.departments };
    case 'SET_VISIBILITY':
      return { ...state, isVisible: action.isVisible };
    default:
      return state;
  }
}

const ListEmployeeComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { employees, departments, isVisible } = state;
  const navigator = useNavigate();

  useEffect(() => {
    dispatch({ type: 'SET_VISIBILITY', isVisible: true });
    getAllEmployees();
    fetchDepartments();

    return () => dispatch({ type: 'SET_VISIBILITY', isVisible: false });
  }, []);

  const getAllEmployees = () => {
    listEmployees()
      .then((response) => {
          dispatch({ type: 'SET_EMPLOYEES', employees: response.data });

      })
      .catch(() => {
        showErrorPopup('An unexpected error occurred while fetching employees');
      });
  };

  const fetchDepartments = () => {
    getAllDepartments()
      .then((response) => {
        dispatch({ type: 'SET_DEPARTMENTS', departments: response.data });
      })
      .catch(() => {
        showErrorPopup('An unexpected error occurred while fetching departments');
      });
  };

  const addNewEmployee = () => {
    navigator('/add-employee');
  };

  const updateEmployee = (id) => {
    navigator(`/edit-employee/${id}`);
  };

  const removeEmployee = (id) => {
    deleteEmployee(id)
      .then(() => {
        getAllEmployees();
      })
      .catch(() => {
        showErrorPopup('An unexpected error occurred while deleting the employee');
      });
  };

  return (
    <div className={`container page-container ${isVisible ? 'visible' : ''}`}>
      <h2 className="text-center">List of Employees</h2>
      <button className="btn btn-bg mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email Id</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Department Id</th>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                <td>{employee.salary}</td>
                <td>{employee.departmentId}</td>
                <td>
                  {departments.find(
                    (department) => department.id === employee.departmentId
                  )?.departmentName || 'N/A'}
                </td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updateEmployee(employee.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeEmployee(employee.id)}
                    style={{ margin: '10px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
