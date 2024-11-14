package com.example.server.Controller;

import com.example.server.Model.Employee;
import com.example.server.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/employee")
@RestController
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Employee>> getAllEmployee(){
        return employeeService.getAllEmployee();
    }

    @PostMapping("/addAnEmployee")
    public ResponseEntity<String> addAnEmployee(@RequestBody Employee employee){
        return employeeService.addEmployee(employee);
    }
}
