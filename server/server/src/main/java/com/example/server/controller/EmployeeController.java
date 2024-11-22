package com.example.server.controller;

import com.example.server.model.Employee;
import com.example.server.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/employees")
@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("")
    public ResponseEntity<Page<Employee>> getAllEmployee(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ascending") String sortDirection
    ){
        System.out.println("page: " + page + " " + "limit: " + limit + " " + "sortBy: " + sortBy + " " + "sortDirection: " + sortDirection);
        return employeeService.getAllEmployee(sortBy, sortDirection, page, limit);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Employee>> search(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ascending") String sortDirection
    ){

        return employeeService.search(keyword, sortBy, sortDirection, page, limit);
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
