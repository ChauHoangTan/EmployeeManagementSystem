package com.example.server.service;

import com.example.server.model.Address;
import com.example.server.model.Employee;
import com.example.server.model.Position;
import com.example.server.repository.AddressRepository;
import com.example.server.repository.EmployeeRepository;
import com.example.server.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    PositionRepository positionRepository;

    @Autowired
    AddressRepository addressRepository;

    private Pageable pageSetup(String sortBy, String sortDirection, int page, int limit){
        Sort sort;
        if(sortDirection.equalsIgnoreCase("ascending")){
            sort = Sort.by(sortBy).ascending();
        }else{
            sort = Sort.by(sortBy).descending();
        }

        return PageRequest.of(page, limit, sort);
    }

    public ResponseEntity<Page<Employee>> getAllEmployee(String sortBy, String sortDirection, int page, int limit) {
        try {
            Pageable pageable = pageSetup(sortBy, sortDirection, page, limit);
            return new ResponseEntity<>(employeeRepository.findAll(pageable), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Page<Employee>> search(String keyword, String sortBy, String sortDirection, int page, int limit) {
        try {
            System.out.println("keyword: " + keyword + " page: " + page + " " + "limit: " +
                    limit + " " + "sortBy: " + sortBy + " " + "sortDirection: " + sortDirection);
            Pageable pageable = pageSetup(sortBy, sortDirection, page, limit);
            return new ResponseEntity<>(employeeRepository.search(keyword, pageable), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Employee> getById(Long id) {
        try {
            Optional<Employee> employee = employeeRepository.findById(id);
            if (employee.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            } else {
                return new ResponseEntity<>(employee.get(), HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> addEmployee(Employee employee) {
        try {
            Employee currentEmployee = new Employee(employee);
            System.out.println(currentEmployee);

            if (currentEmployee.getPosition().getId() == null) {
                Position position = positionRepository.save(employee.getPosition());
                currentEmployee.setPosition(position);
            }

            if (currentEmployee.getHomeAddress().getId() == null) {
                Address homeAddress = addressRepository.save(currentEmployee.getHomeAddress());
                currentEmployee.setHomeAddress(homeAddress);
            }

            if (currentEmployee.getCompanyAddress().getId() == null) {
                Address companyAddress = addressRepository.save(currentEmployee.getCompanyAddress());
                currentEmployee.setHomeAddress(companyAddress);
            }
            employeeRepository.save(currentEmployee);
            return new ResponseEntity<>("Added an employee!", HttpStatus.CREATED);
        } catch (Exception e) {

            return new ResponseEntity<>("Can not add this employee!", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> updateAnEmployee(Employee employee) {
        try {
            Optional<Employee> currentEmployee = employeeRepository.findById(employee.getId());
            if (currentEmployee.isEmpty()) {
                return new ResponseEntity<>("Can not get this employee!", HttpStatus.BAD_REQUEST);
            }

            currentEmployee.get().setName(employee.getName());
            currentEmployee.get().setPosition(employee.getPosition());
            currentEmployee.get().setHomeAddress(employee.getHomeAddress());
            currentEmployee.get().setCompanyAddress(employee.getCompanyAddress());
            currentEmployee.get().setPhoneNumber(employee.getPhoneNumber());
            currentEmployee.get().setEmail(employee.getEmail());

            if (employee.getPosition().getId() == null) {
                Position position = positionRepository.save(employee.getPosition());
                currentEmployee.get().setPosition(position);
            }

            if (employee.getHomeAddress().getId() == null) {
                Address homeAddress = addressRepository.save(employee.getHomeAddress());
                currentEmployee.get().setHomeAddress(homeAddress);
            }

            if (employee.getCompanyAddress().getId() == null) {
                Address companyAddress = addressRepository.save(employee.getCompanyAddress());
                currentEmployee.get().setCompanyAddress(companyAddress);
            }

            employeeRepository.save(currentEmployee.get());

            return new ResponseEntity<>("Updated successfully!", HttpStatus.OK);
        } catch (Exception e) {

            return new ResponseEntity<>("Can not update this employee's information!", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> deleteAnEmployee(Long id) {
        try {
            employeeRepository.deleteById(id);
            return new ResponseEntity<>("Deleted this employee successful!", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Error! Can not delete this employee!", HttpStatus.BAD_REQUEST);
        }
    }
}
