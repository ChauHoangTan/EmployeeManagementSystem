package com.example.server.Service;

import com.example.server.Model.Address;
import com.example.server.Model.Employee;
import com.example.server.Model.Position;
import com.example.server.Repository.AddressRepository;
import com.example.server.Repository.EmployeeRepository;
import com.example.server.Repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    PositionRepository positionRepository;

    @Autowired
    AddressRepository addressRepository;

    public ResponseEntity<List<Employee>> getAllEmployee(){
        try{
            return new ResponseEntity<>(employeeRepository.findAll(),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Optional<Employee>> getAnEmployee(Long employeeID){
        try{
            return new ResponseEntity<>(employeeRepository.findById(employeeID),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> addEmployee(Employee employee){
        try {
            Employee currentEmployee = new Employee(employee);
            System.out.println(currentEmployee);

            if(currentEmployee.getPosition().getId() == null){
                Position position = positionRepository.save(employee.getPosition());
                currentEmployee.setPosition(position);
            }

            if(currentEmployee.getHomeAddress().getId() == null){
                Address homeAddress = addressRepository.save(currentEmployee.getHomeAddress());
                currentEmployee.setHomeAddress(homeAddress);
            }

            if(currentEmployee.getCompanyAddress().getId() == null){
                Address companyAddress = addressRepository.save(currentEmployee.getCompanyAddress());
                currentEmployee.setHomeAddress(companyAddress);
            }
            employeeRepository.save(currentEmployee);
            return new ResponseEntity<>("Added an employee!", HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>("Can not add this employee!", HttpStatus.BAD_REQUEST);
        }
    }
}
