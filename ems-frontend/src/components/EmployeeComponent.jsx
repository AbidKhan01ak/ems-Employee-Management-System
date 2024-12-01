import React, { useEffect,useReducer } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllDepartments } from '../services/DepartmentService';
import { showErrorPopup } from '../utils/showErrorPopup';
import { pageTitle } from '../utils/pageTitle';
import { validateForm } from '../utils/validateForm';

const initialState ={
    firstName : '',
    lastName : '',
    email : '',
    departmentId : '',
    departments : [],
    errors : {},
}

function reducer(state, action){
    switch(action.type){
        case 'SET_FIELD':
            return {...state, [action.field]:action.value};
        case 'SET_ERRORS':
            return {...state, errors: action.errors};
        case 'SET_FORM':
            return {...state, ...action.formData};
        case 'SET_DEPARTMENTS':
            return {...state, departments: action.departments};
        default:
            return false;    
    }
}
const EmployeeComponent = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {firstName, lastName, email, departmentId, departments, errors} = state;
        
    const {id} = useParams();
    const navigator = useNavigate();

    useEffect(() =>{
        getAllDepartments().then(res => {
            dispatch({type: 'SET_DEPARTMENTS', departments: res.data});
        }).catch(() => {
            showErrorPopup("An error occurred while fetching departments.");
        })
    
    },[])

    useEffect(()=>{
        if(id){
            getEmployee(id).then((response) => {
                dispatch({
                    type: 'SET_FORM',
                    formData : {
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email:response.data.email,
                        departmentId:response.data.departmentId,
                    },
                });
            }).catch(() => {
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
        if(validateForm(fields, rules, (validateErrors) => 
            dispatch({type: 'SET_ERRORS', errors: validateErrors})
            )
        ){
            const employee = {firstName, lastName, email,departmentId}
            if(id){
                updateEmployee(id, employee).then(() => {
                    navigator('/employees');
                }).catch(() => {
                    showErrorPopup("An error occurred while updating employee data.");
                })
            } else {
                createEmployee(employee).then(() => {
                    navigator('/employees')
                }).catch(() => {
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
                                onChange={(e) => dispatch({type: 'SET_FIELD', field: 'firstName', value:e.target.value})}
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
                                onChange={(e) => dispatch({type: 'SET_FIELD', field: 'lastName', value:e.target.value})}
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
                                onChange={(e) => dispatch({type: 'SET_FIELD', field: 'email', value:e.target.value})}
                            />
                            {errors.email && <div className='invalid-feeback'>{errors.email}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Select Department:</label>
                            <select className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                            value={departmentId} 
                            onChange={(e) => dispatch({type: 'SET_FIELD', field: 'departmentId', value:e.target.value})}>
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