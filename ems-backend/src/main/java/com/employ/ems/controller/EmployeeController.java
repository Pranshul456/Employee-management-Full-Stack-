package com.employ.ems.controller;


import com.employ.ems.dto.EmployeeDto;
import com.employ.ems.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
@Validated
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;



    @Autowired
    Environment environment;

     @PostMapping
     public ResponseEntity < EmployeeDto > createEmployee(@Valid @RequestBody EmployeeDto employeeDto) {
           EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);

           return new ResponseEntity <> ( savedEmployee, HttpStatus.CREATED);
     }

        @GetMapping("/{id}")
        public ResponseEntity < EmployeeDto > getEmployeeById(@PathVariable Long id) {
            EmployeeDto employeeDto = employeeService.getEmployeeById(id);
            return new ResponseEntity <> (employeeDto, HttpStatus.OK);
        }

        @GetMapping
        public ResponseEntity < List < EmployeeDto > > getAllEmployees() {
            List < EmployeeDto > employees = employeeService.getAllEmployees();
            return new ResponseEntity <> (employees, HttpStatus.OK);
        }

        @PutMapping("/{id}")
        public ResponseEntity < EmployeeDto > updateEmployee(@PathVariable Long id,@Valid @RequestBody EmployeeDto employeeDto) {

            EmployeeDto updatedEmployee = employeeService.updateEmployee(id, employeeDto);
            return new ResponseEntity <> (updatedEmployee, HttpStatus.OK);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity < String > deleteEmployee(@PathVariable Long id) {
            employeeService.deleteEmployee(id);
            return new ResponseEntity <> ("Employee deleted successfully", HttpStatus.OK);
        }

}
