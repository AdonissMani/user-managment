package com.example.sqlcrud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.sqlcrud.collection.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    List<Employee> findByFirstName(String firstName);
    List<Employee> findByLastName(String LastName);
    List<Employee> findByAddress(String address);
    
}
