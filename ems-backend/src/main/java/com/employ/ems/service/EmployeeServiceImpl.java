package com.employ.ems.service;

import com.employ.ems.dto.EmployeeDto;
import com.employ.ems.entity.Employee;
import com.employ.ems.exception.ResourceNotFoundException;
import com.employ.ems.mapper.EmployeeMapper;
import com.employ.ems.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;


    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee ( employeeDto );
        Employee savedEmployee = employeeRepository.save ( employee );
        return EmployeeMapper.mapToEmployeeDto ( savedEmployee );
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById ( id ).orElseThrow ( () -> new ResourceNotFoundException ( "Employee not exist with id:" + id ) );
        return EmployeeMapper.mapToEmployeeDto ( employee );
    }

    @Override
    public List < EmployeeDto > getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll ();
        return employees.stream ().map ( (employee)-> EmployeeMapper.mapToEmployeeDto (employee ) ).collect ( Collectors.toList () );
    }

    @Override
    public EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto)throws ResourceNotFoundException {

        employeeRepository.findById ( id ).orElseThrow ( ()-> new ResourceNotFoundException ( "Employee not exist with id:" + id ) );
        Employee employee = EmployeeMapper.mapToEmployee ( employeeDto );
        employee.setId ( id );
        Employee savedEmployee = employeeRepository.save ( employee );
        return EmployeeMapper.mapToEmployeeDto ( savedEmployee );
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.findById ( id ).orElseThrow ( ()-> new ResourceNotFoundException ( "Employee not exist with id:" + id ) );
        employeeRepository.deleteById ( id );


    }
}
