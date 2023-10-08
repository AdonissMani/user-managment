package com.example.sqlcrud.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.multipart.MultipartFile;

import com.example.sqlcrud.collection.Employee;
import com.example.sqlcrud.repository.EmployeeRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {

    private static final String avatarUploadDirectory = "classpath:/avatars";


    @Autowired
    private EmployeeRepository employeeRepository;

    //get all employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll(); 
        
    }

    //create employee
    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee
    ){
        return employeeRepository.save(employee);
    }

    @GetMapping("/employees/firstName")
    public List<Employee> searchByFirstName(@RequestParam("firstName") String firstName) {
        return employeeRepository.findByFirstName(firstName);
    }

    @GetMapping("/employees/lastName")
    public List<Employee> searchByLastName(@RequestParam("lastName") String lastName) {
        return employeeRepository.findByLastName(lastName);
    }
    @GetMapping("/employees/address")
    public List<Employee> searchByAddress(@RequestParam("address") String address) {
        return employeeRepository.findByAddress(address);
    }

    //update employee API
    @PutMapping("/employees/{id}") // Add "employees" to the path
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id,
     @RequestBody Employee employeeDetails){

        Employee employee = employeeRepository.findById(id)
        .orElseThrow(()-> new ResourceAccessException("Employee doesn't exist :" + id));
        
        
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());
        employee.setAge(employeeDetails.getAge());
        employee.setAddress(employeeDetails.getAddress());

        Employee updateEmployee = employeeRepository.save(employee);

        return ResponseEntity.ok(updateEmployee);

    }

    //Delete Employee API
    @DeleteMapping("/employees/{id}") // Add "employees" to the path
    public Map<String, Boolean> deleteEmployee(@PathVariable Long id){
        Employee employee = employeeRepository.findById(id)
        .orElseThrow(()-> new ResourceAccessException("Employee doesn't exist :" + id));

        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE); 
        return response;
    }
       
     // Get an employee by ID (GET request)
     @GetMapping("/employees/{id}")
     public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
         Employee employee = employeeRepository.findById(id)
                 .orElseThrow(() -> new ResourceAccessException("Employee doesn't exist: " + id));
         return ResponseEntity.ok(employee);
     }
 

}
