import React, { useEffect, useReducer } from 'react'
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';
import { showErrorPopup } from '../utils/showErrorPopup';
import { pageTitle } from '../utils/pageTitle';
import { validateForm } from '../utils/validateForm';

const initialState = {
    departmentName: '',
    departmentDescription: '',
    errors: {},
};

function reducer(state, action) {
    switch (action.type) {
      case 'SET_FIELD':
        return { ...state, [action.field]: action.value };
      case 'SET_ERRORS':
        return { ...state, errors: action.errors };
      case 'SET_FORM':
        return { ...state, ...action.formData };
      default:
        return state;
    }
}
const DepartmentComponent = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { departmentName, departmentDescription, errors } = state;
    const navigator = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        if (id) {
            getDepartmentById(id).then((response) => {
                dispatch({
                    type: 'SET_FORM',
                    formData: {
                        departmentName : response.data.departmentName,
                        departmentDescription: response.data.departmentDescription
                    },
                });
                
            }).catch(() => {
                showErrorPopup("An error occurred while fetching the department.");
            });
        }
    },[id])

    function saveOrUpdateDepartment(e){
        e.preventDefault();
        const fields = {departmentName, departmentDescription};
        const rules = {
            departmentName: { required: true, errorMessage: 'Department Name is required' },
            departmentDescription: { required: true, errorMessage: 'Department Description is required' },
        };
        if(
            validateForm(fields, rules, (validationErrors) =>
            dispatch({type: 'SET_ERRORS', errors: validationErrors})
            )
        ) {

            const department = {departmentName, departmentDescription};
            
            if(id){
                updateDepartment(id, department).then(() => {
                    navigator('/departments');
                }).catch(() =>{
                    showErrorPopup("An error occurred while updating the department.");
                });
            } else {
                createDepartment(department).then(() => {
                    navigator('/departments');
                }).catch(() => {
                    showErrorPopup("An error occurred while creating the department.");
                });
            }
        }
    }

  return (
    <div className='container'><br/> <br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {pageTitle('Department', id)}
                <div className='card-body mx-4 my-4 '>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Department Name:</label>
                            <input
                                type='text' name='department' id='department-name'
                                placeholder='Enter new Department Name'
                                value={departmentName} className={`form-control ${errors.departmentName ? 'is-invalid' : ''}`}
                                onChange={(e) => dispatch({type: 'SET_FIELD', field: 'departmentName', value: e.target.value})}
                            />
                            {errors.departmentName && <div className='invalid-feedback'>{errors.departmentName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Department Description:</label>
                            <input
                                type='text' name='department-description' id='department-description'
                                placeholder='Enter new Department description'
                                value={departmentDescription} className={`form-control ${errors.departmentDescription ? 'is-invalid' : ''}`}
                                onChange={(e) => dispatch({type: 'SET_FIELD', field: 'departmentDescription', value: e.target.value})}
                            />
                            {errors.departmentDescription && <div className='invalid-feedback'>{errors.departmentDescription}</div>}
                        </div>
                        <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateDepartment(e)}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DepartmentComponent