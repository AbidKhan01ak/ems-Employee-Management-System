package com.akstudios.ems_backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.akstudios.ems_backend.dto.DepartmentDto;
import com.akstudios.ems_backend.entity.Department;
import com.akstudios.ems_backend.entity.Employee;
import com.akstudios.ems_backend.exception.ResourceNotFoundException;
import com.akstudios.ems_backend.mapper.DepartmentMapper;
import com.akstudios.ems_backend.repository.DepartmentRepository;
import com.akstudios.ems_backend.repository.EmployeeRepository;
import com.akstudios.ems_backend.service.DepartmentService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;
    private EmployeeRepository employeeRepository;

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        Department savedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public DepartmentDto getDepartmentById(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(
                () -> new ResourceNotFoundException("Department with given Id does not exist: " + departmentId)
        );

        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll();
        return departments.stream().map(DepartmentMapper::mapToDepartmentDto).collect(Collectors.toList());
    }

    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto updatedDepartment) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(
                () -> new ResourceNotFoundException("Department does not exists with Id: " + departmentId)
        );
        department.setDepartmentName(updatedDepartment.getDepartmentName());
        department.setDepartmentDescription(updatedDepartment.getDepartmentDescription());

        Department savedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public void deleteDepartment(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(
                () -> new ResourceNotFoundException("Department does not exists with Id: " + departmentId)
        );
        List<Employee> employees = employeeRepository.findByDepartmentId(departmentId);
        if (!employees.isEmpty()) {
            throw new IllegalStateException("Cannot delete department with assigned employees. Reassign or remove employees first.");
        }
        departmentRepository.deleteById(departmentId);
    }
}
