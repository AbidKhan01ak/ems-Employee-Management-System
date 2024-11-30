import React, { useEffect, useState } from 'react'
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';
import { showErrorPopup } from '../utils/showErrorPopup';
import { pageTitle } from '../utils/pageTitle';
import { validateForm } from '../utils/validateForm';

const DepartmentComponent = () => {
    const [departmentName, setDepartmentName] = useState('');
    const [departmentDescription, setDepartmentDescription] = useState('');
    const [errors, setErrors] = useState({});
    const navigator = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        if (id) {
            getDepartmentById(id).then((response) => {
                setDepartmentName(response.data.departmentName);
                setDepartmentDescription(response.data.departmentDescription);
            }).catch(error => {
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
        if(validateForm(fields, rules, setErrors)){

            const department = {departmentName, departmentDescription};
            
            if(id){
                updateDepartment(id, department).then((response) => {
                    navigator('/departments');
                }).catch(error =>{
                    showErrorPopup("An error occurred while updating the department.");
                });
            } else {
                createDepartment(department).then((response) => {
                    navigator('/departments');
                }).catch(error => {
                    showErrorPopup("An error occurred while creating the department.");
                });
            }
        }
    }

    function validateForm(){
        let valid = true;
        const errorsCopy = {... errors};

        if(departmentName.trim()){
            errorsCopy.departmentName = '';
        }else {
            errorsCopy.departmentName = 'Department Name is required';
            valid = false;
        }
        if(departmentDescription.trim()){
            errorsCopy.departmentDescription = '';
        }else {
            errorsCopy.departmentDescription = 'Department Description is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
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
                                onChange={(e) => setDepartmentName(e.target.value)}
                            />
                            {errors.departmentName && <div className='invalid-feedback'>{errors.departmentName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Department Description:</label>
                            <input
                                type='text' name='department-description' id='department-description'
                                placeholder='Enter new Department description'
                                value={departmentDescription} className={`form-control ${errors.departmentDescription ? 'is-invalid' : ''}`}
                                onChange={(e) => setDepartmentDescription(e.target.value)}
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