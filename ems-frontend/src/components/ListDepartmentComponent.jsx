import React, { useEffect, useReducer } from 'react'
import { deleteDepartment, getAllDepartments } from '../services/DepartmentService';
import { Link, useNavigate } from 'react-router-dom';
import { showErrorPopup } from '../utils/showErrorPopup';

const initialState ={
    departments:[],
    isVisible:false,
};

function reducer(state, action){
    switch(action.type){
        case 'SET_DEPARTMENTS':
            return { ...state, departments: action.departments };
        case 'SET_VISIBILITY':
            return { ...state, isVisible: action.isVisible };
        default:
            return state;
    }
}
const ListDepartmentComponent = () => {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const { departments, isVisible } = state;
    const navigator = useNavigate();
    
    useEffect(() => {
        dispatch({ type: 'SET_VISIBILITY', isVisible: true });
        listOfDepartments();
        return () => dispatch({ type: 'SET_VISIBILITY', isVisible: false });
    },[]);
    function listOfDepartments(){
        getAllDepartments().then((response) => {
            dispatch({ type: 'SET_DEPARTMENTS', departments: response.data });
        }).catch(() => {
            showErrorPopup("An unexpected error occurred! unable to fetch the departments");
        })
    }
    function updateDepartment(id){
        navigator(`/edit-department/${id}`);
    }

    function removeDepartment(id){
        deleteDepartment(id).then(() => {
            listOfDepartments();
        }).catch(error => {
            if (error.response && error.response.status === 400) {
                showErrorPopup(`Department have employees! Please remove the Employees before deleting the ${response.data.id} Department`); 
            } else if (error.response && error.response.status === 404) {
                showErrorPopup(`Department does not exists!`);
            } else {
                showErrorPopup("An unexpected error occurred");
            }
        });
    }

  return (
    <div className={`container page-container ${isVisible ? 'visible' : ''}`}>
        <h2 className='text-center'>List Of Departments</h2>
        <Link to= '/add-department' className='btn btn-bg mb-2'>Add Department</Link>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Department Id</th>
                    <th>Department Name</th>
                    <th>Department Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    departments.map( department => 
                        <tr key={department.id}>
                            <td>{department.id}</td>
                            <td>{department.departmentName}</td>
                            <td>{department.departmentDescription}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateDepartment(department.id)} style={{marginLeft: '10px'}}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeDepartment(department.id)} style={{marginLeft: '10px'}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListDepartmentComponent