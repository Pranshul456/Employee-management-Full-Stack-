import { React, useEffect, useState } from "react";
import {
  addEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { validateField, validateEmail, Message } from "../utils/validate";

const EmployeComponent = () => {
  const navigator = useNavigate();

  const [employees, setEmployees] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
  });
  const [submitError, setSubmitError] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setEmployees(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployees({
      ...employees,
      [name]: value,
    });

    // Real-time validation
    setError((prevError) => ({
      ...prevError,
      [name]:
        name === "email" ? validateEmail(value) : validateField(name, value),
    }));
  };

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...error };
    if (employees.firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is required";
      valid = false;
    }
    if (employees.lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is required";
      valid = false;
    }
    if (employees.email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }
    if (employees.jobTitle.trim()) {
      errorsCopy.jobTitle = "";
    } else {
      errorsCopy.jobTitle = "Job Title is required";
      valid = false;
    }

    setError(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  const saveOrUpdateEmployee = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { firstName, lastName, email, jobTitle } = employees;
      console.log(employees);

      if (id) {
        updateEmployee(id, employees)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
            setSubmitError(
              "Failed to update employee. Database server not connected."
            ); // Set submit error
          });
      } else {
        addEmployee(employees)
          .then((response) => {
            console.log(response.data);
            setSuccessMessage("Employee added successfully!"); // Set success message
            setTimeout(() => {
              navigator("/employees"); // Redirect after showing success message
            }, 2000); // Delay for 2 seconds
          })
          .catch((error) => {
            console.error(error);
            setSubmitError(
              "Failed to add employee. Database server not connected."
            ); // Set submit error
          });
      }
    }
  };

  return (
    <div className="container mt-3 ">
      <div className="row ">
        <div className="card col-md-6 offset-md-3 offset-md-3 shadow p-3 mb-2 rounded">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee first Name:"
                  name="firstName"
                  value={employees.firstName}
                  className={`form-control ${
                    error.firstName ? "is-invalid" : ""
                  }`}
                  onChange={handleChange}
                ></input>
                {error.firstName && (
                  <div className="invalid-feedback">{error.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name:"
                  name="lastName"
                  value={employees.lastName}
                  className={`form-control ${
                    error.lastName ? "is-invalid" : ""
                  }`}
                  onChange={handleChange}
                ></input>
                {error.lastName && (
                  <div className="invalid-feedback">{error.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  placeholder="Enter Employee Email:"
                  name="email"
                  value={employees.email}
                  className={`form-control ${error.email ? "is-invalid" : ""}`}
                  onChange={handleChange}
                ></input>
                {error.email && (
                  <div className="invalid-feedback">{error.email}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">JobTitle:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Job Title:"
                  name="jobTitle"
                  value={employees.jobTitle}
                  className={`form-control ${
                    error.jobTitle ? "is-invalid" : ""
                  }`}
                  onChange={handleChange}
                ></input>
                {error.jobTitle && (
                  <div className="invalid-feedback">{error.jobTitle}</div>
                )}
              </div>
              {submitError && <Message type="error" message={submitError} />}{" "}
              {/* Display submit error */}
              {successMessage && (
                <Message type="success" message={successMessage} />
              )}{" "}
              {/* Display success message */}
              <button
                className="btn btn-outline-success"
                onClick={saveOrUpdateEmployee}
              >
                Submit
              </button>
              <a href="/employees" className="btn btn-outline-warning m-2">
                Back
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeComponent;
