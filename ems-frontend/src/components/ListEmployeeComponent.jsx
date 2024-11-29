import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { getAllDepartments } from '../services/DepartmentService';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const navigator = useNavigate();
    useEffect( () => {
        setIsVisible(true);
        getAllEmployees();
        fetchDepartments();
        return () => setIsVisible(false);
    },[]);

    function getAllEmployees(){
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function fetchDepartments() {
        getAllDepartments()
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => console.error(error));
    }

    function addNewEmployee(){
        navigator('/add-employee');
    }
    function updateEmployee(id){
        navigator(`/edit-employee/${id}`);
    }
    function removeEmployee(id){
        console.log(id);
        deleteEmployee(id).then((response) => {
            getAllEmployees();
        }).catch(error => console.log(error));
    }
  return (
    <div className={`container page-container ${isVisible ? 'visible' : ''}`}>
        <h2 className='text-center'>List of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Department Id</th>
                    <th>Department Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee => 
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.departmentId}</td>
                            <td>
                            {departments.find(department => department.id === employee.departmentId)?.departmentName || 'N/A'}
                            </td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)} style={{marginLeft: '10px'}}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)} style={{marginLeft: '10px'}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}
export default ListEmployeeComponent;