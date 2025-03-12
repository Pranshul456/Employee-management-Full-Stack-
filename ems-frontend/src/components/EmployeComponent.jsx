import { React, useEffect, useState } from "react";
import { addEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeComponent = () => {
  const navigator = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [submitError, setSubmitError] = useState(""); // New state for submit error

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setJobTitle(response.data.jobTitle);
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
    jobTitle: ""
  });

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleJobTitle = (event) => {
    setJobTitle(event.target.value);
  };


  function validateForm() {
    let valid = true;
    const errorsCopy = { ...error };
    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is required";
      valid = false;
    }
    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is required";
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }
    if (jobTitle.trim()) {
      errorsCopy.jobTitle = "";
    }
    else {
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
      const employee = { firstName, lastName, email, jobTitle };
      console.log(employee);

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
            setSubmitError("Failed to update employee. database server not connected."); // Set submit error
          });
      } else {
        addEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
            setSubmitError("Failed to add employee database server not connected."); // Set submit error
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
                  value={firstName}
                  className={`form-control ${error.firstName ? "is-invalid" : ""}`}
                  onChange={handleFirstName}
                ></input>
                {error.firstName && <div className="invalid-feedback">{error.firstName}</div>}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name:"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${error.lastName ? "is-invalid" : ""}`}
                  onChange={handleLastName}
                ></input>
                {error.lastName && <div className="invalid-feedback">{error.lastName}</div>}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  placeholder="Enter Employee Email:"
                  name="email"
                  value={email}
                  className={`form-control ${error.email ? "is-invalid" : ""}`}
                  onChange={handleEmail}
                ></input>
                {error.email && <div className="invalid-feedback">{error.email}</div>}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">JobTitle:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Job Title:"
                  name="jobTitle"
                  value={jobTitle}
                  className={`form-control ${error.jobTitle ? "is-invalid" : ""}`}
                  onChange={handleJobTitle}
                ></input>
                {error.jobTitle && <div className="invalid-feedback">{error.jobTitle}</div>}
              </div>
              
              {submitError && <div className="alert alert-danger">{submitError}</div>} {/* Display submit error */}
              <button className="btn btn-outline-success" onClick={saveOrUpdateEmployee}>
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
