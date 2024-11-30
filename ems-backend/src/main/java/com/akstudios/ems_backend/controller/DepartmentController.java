package com.akstudios.ems_backend.controller;

import com.akstudios.ems_backend.dto.DepartmentDto;
import com.akstudios.ems_backend.exception.ResourceNotFoundException;
import com.akstudios.ems_backend.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private DepartmentService departmentService;

    //build create or add department REST Api
    @PostMapping
    public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto){
        if (departmentDto.getId() != null) {
            throw new IllegalArgumentException("ID should not be provided when creating a new department.");
        }
        DepartmentDto department = departmentService.createDepartment(departmentDto);
        return new ResponseEntity<>(department, HttpStatus.CREATED);
    }

    //build get department REST Api
    @GetMapping("{id}")
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable("id") Long departmentId){
        DepartmentDto departmentDto = departmentService.getDepartmentById(departmentId);
        return ResponseEntity.ok(departmentDto);
    }

    //build get All Department REST APi
    @GetMapping
    public ResponseEntity<List<DepartmentDto>> getAllDepartments(){
        List<DepartmentDto> departments = departmentService.getAllDepartments();

        return ResponseEntity.ok(departments);
    }

    //Build Update department REST Api
    @PutMapping("{id}")
    public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable("id") Long departmentId,
                                                          @RequestBody DepartmentDto updateDepartment){
        DepartmentDto department = departmentService.updateDepartment(departmentId, updateDepartment);
        return ResponseEntity.ok(department);
    }

    //build Delete Department REST Api
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable("id") Long departmentId){
        try {
            departmentService.deleteDepartment(departmentId);
            return ResponseEntity.ok("Department deleted successfully!");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
