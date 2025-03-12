package com.employ.ems.repository;

import com.employ.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository< Employee,Long > {
}
