import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllDepartments } from '../services/DepartmentService';
import { showErrorPopup } from '../utils/showErrorPopup';
import { pageTitle } from '../utils/pageTitle';
import { validateForm } from '../utils/validateForm';
const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [departmentId, setDepartmentId] = useState('');
    const [departments, setDepartments] = useState([]);
    
    const {id} = useParams();
    const navigator = useNavigate();

    useEffect(() =>{
        getAllDepartments().then(res => {
            setDepartments(res.data);
        }).catch(error => {
            showErrorPopup("An error occurred while fetching departments.");
        })
    
    },[])

    useEffect(()=>{
        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setDepartmentId(response.data.departmentId);
            }).catch(error => {
                showErrorPopup("An error occurred while fetching employee data.");
            })
        }
    },[id]);    
    function saveOrUpdateEmployee(e) {
        e.preventDefault();
        const fields = { firstName, lastName, email, departmentId };
        const rules = {
            firstName: { required: true, errorMessage: 'First Name is required' },
            lastName: { required: true, errorMessage: 'Last Name is required' },
            email: { required: true, errorMessage: 'Email is required' },
            departmentId: { required: true, errorMessage: 'Select a Department' },
        };
        if(validateForm(fields, rules, setErrors)){
            const employee = {firstName, lastName, email,departmentId}
            if(id){
                updateEmployee(id, employee).then((res) => {
                    navigator('/employees');
                }).catch(error => {
                    showErrorPopup("An error occurred while updating employee data.");
                })
            } else {
                createEmployee(employee).then((res) => {
                    navigator('/employees')
                }).catch(error => {
                    showErrorPopup("An error occurred while creating employee data.");
                })
            }            
        }
        
    }
    
  return (
    <div className='container'>
        <br/> <br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {pageTitle('Employee', id)}
                <div className='card-body mx-4 my-4'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input
                                type='text'
                                placeholder='Employee first name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            {errors.firstName && <div className='invalid-feeback'>{errors.firstName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input
                                type='text'
                                placeholder='Employee last name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            {errors.lastName && <div className='invalid-feeback'>{errors.lastName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input
                                type='email'
                                placeholder='Employee email'
                                name='email'
                                value={email}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <div className='invalid-feeback'>{errors.email}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Select Department:</label>
                            <select className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                            value={departmentId} 
                            onChange={(e) => setDepartmentId(e.target.value)}>
                                <option value="Select Department">Select Department</option>
                                {
                                    departments.map((department) =>
                                        <option key={department.id} value={department.id}>
                                            {department.departmentName}
                                        </option>
                                    )
                                }
                            </select>
                            {errors.department && <div className='invalid-feeback'>{errors.department}</div>}
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent