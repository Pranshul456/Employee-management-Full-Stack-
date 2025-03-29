import React from "react";

// Validation functions
export const validateField = (fieldName, value) => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }
  return "";
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    return "Email is required";
  } else if (!emailRegex.test(email)) {
    return "Invalid email format";
  }
  return "";
};

// Message component
export const Message = ({ type, message }) => {
  if (!message) return null;

  const messageClass = type === "success" ? "alert alert-success": type === "error"? "alert alert-danger": "alert alert-warning";

  return <div className={messageClass}>{message}</div>;
};
