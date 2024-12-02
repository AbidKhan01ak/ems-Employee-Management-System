package com.akstudios.ems_backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.akstudios.ems_backend.dto.EmployeeDto;
import com.akstudios.ems_backend.entity.Department;
import com.akstudios.ems_backend.entity.Employee;
import com.akstudios.ems_backend.exception.ResourceNotFoundException;
import com.akstudios.ems_backend.mapper.EmployeeMapper;
import com.akstudios.ems_backend.repository.DepartmentRepository;
import com.akstudios.ems_backend.repository.EmployeeRepository;
import com.akstudios.ems_backend.service.EmployeeService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    private DepartmentRepository departmentRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Department department = departmentRepository.findById(employeeDto.getDepartmentId())
                .orElseThrow(
                        () -> new ResourceNotFoundException("Department does not exists with id: " + employeeDto.getDepartmentId())
                );

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        employee.setDepartment(department);

        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()
                        -> new ResourceNotFoundException("Employee does not exists with given Id: " + employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {

        List<Employee> employees = employeeRepository.findAll();

        return employees.stream().map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee not exists with this Id: " + employeeId)
        );
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        employee.setRole(updatedEmployee.getRole());
        employee.setSalary(updatedEmployee.getSalary());
        Department department = departmentRepository.findById(updatedEmployee.getDepartmentId())
                .orElseThrow(
                        () -> new ResourceNotFoundException("Department does not exists with id: " + updatedEmployee.getDepartmentId())
                );
        employee.setDepartment(department);
        Employee updatedEmployeeObj = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee not exists with this Id: " + employeeId)
        );

        employeeRepository.deleteById(employeeId);
    }
}
