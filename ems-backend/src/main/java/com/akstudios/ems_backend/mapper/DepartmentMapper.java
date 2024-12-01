package com.akstudios.ems_backend.mapper;

import com.akstudios.ems_backend.dto.DepartmentDto;
import com.akstudios.ems_backend.entity.Department;

public class DepartmentMapper {

    //convert department jpa entity to dto
    public  static DepartmentDto mapToDepartmentDto(Department department){
        return new DepartmentDto(
                department.getId(),
                department.getDepartmentName(),
                department.getDepartmentDescription()
        );
    }

    //convert department dto to jpa entity
    public static  Department mapToDepartment(DepartmentDto departmentDto){
        Department department = new Department();
        if (departmentDto.getId() != null) {
            department.setId(departmentDto.getId());
        }
        department.setDepartmentName(departmentDto.getDepartmentName());
        department.setDepartmentDescription(departmentDto.getDepartmentDescription());
        return department;
    }
}
