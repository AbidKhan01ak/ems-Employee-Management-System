import React, { useEffect, useState } from 'react'
import { deleteDepartment, getAllDepartments } from '../services/DepartmentService';
import { Link, useNavigate } from 'react-router-dom';

const ListDepartmentComponent = () => {
    
    const [departments, setDepartments] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const navigator = useNavigate();
    
    useEffect(() => {
        setIsVisible(true);
        listOfDepartments();
        return () => setIsVisible(false);
    },[]);
    function listOfDepartments(){
        getAllDepartments().then((response) => {
            console.log(response.data);
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    function updateDepartment(id){
        navigator(`/edit-department/${id}`);
    }

    function removeDepartment(id){
        deleteDepartment(id).then((response) => {
            console.log(response.data);
            listOfDepartments();
        }).catch(error => {
            if (error.response && error.response.status === 400) {
                alert(error.response.data); // Show error message for linked employees
            } else if (error.response && error.response.status === 404) {
                alert("Department not found!"); // Handle not found errors
            } else {
                console.error("An unexpected error occurred", error);
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