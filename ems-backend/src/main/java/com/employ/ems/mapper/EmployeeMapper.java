package com.employ.ems.mapper;

import com.employ.ems.dto.EmployeeDto;
import com.employ.ems.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto (
                employee.getId ( ),
                employee.getFirstName ( ),
                employee.getLastName ( ),
                employee.getEmail ( ),
                employee.getJobTitle ( )

        );
    }
    public static Employee mapToEmployee(EmployeeDto employeeDto) {
        return new Employee (
                employeeDto.getId ( ),
                employeeDto.getFirstName ( ),
                employeeDto.getLastName ( ),
                employeeDto.getEmail ( ),
                employeeDto.getJobTitle ( )

        );
    }
}
