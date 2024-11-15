package com.example.server.Controller;

import com.example.server.Model.Employee;
import com.example.server.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/employees")
@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("")
    public ResponseEntity<List<Employee>> getAllEmployee(){
        return employeeService.getAllEmployee();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
        return employeeService.getById(id);
    }

    @PostMapping("")
    public ResponseEntity<String> addAnEmployee(@RequestBody Employee employee){
        return employeeService.addEmployee(employee);
    }

    @PutMapping("")
    public ResponseEntity<String> updateAnEmployee(@RequestBody Employee employee){
        return employeeService.updateAnEmployee(employee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAnEmployee(@PathVariable Long id){
        return employeeService.deleteAnEmployee(id);
    }
}
