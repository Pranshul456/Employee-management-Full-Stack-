package com.employ.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EmployeeDto  {

    private Long id;
    @NotEmpty(message = "{employee.firstName.notempty}")
    private String firstName;
    @NotEmpty(message = "{employee.lastName.notempty}")
    private String lastName;
    @Email(message = "{employee.email.invalid}")
    @NotEmpty(message = "{employee.email.notempty}")
    private String email;
    @NotEmpty(message = "{employee.jobTitle.notempty}")
    private String jobTitle;


}
