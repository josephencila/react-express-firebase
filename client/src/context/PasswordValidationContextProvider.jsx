import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router";

const PasswordValidationContext = createContext({});

export function PasswordValidationProvider({ children }) {
  const [errorType, setErrorType] = useState({
    lower: false,
    upper: false,
    digit: false,
    special: false,
    minlen: false,
  });

  const multiRegex = () => {
    const lower = /(?=.*?[a-z])/;
    const upper = /(?=.*?[A-Z])/;
    const digit = /(?=.*?[0-9])/;
    const special = /(?=.*?[#?!@$%^&*-])/;
    const minlen = /.{12,}/;
    const regexList = [lower, upper, digit, special, minlen];

    return regexList;
  };

  const errorMessage = [
    "Password must contain at least 1 lowercase letter",
    "Password must contain at least 1 uppercase letter",
    "Password must contain at least 1 number",
    "Password must contain at least 1 symbol",
    "Password must be at least 12 characters",
  ];

  const handleErrorType = (idx, bool) => {
    const [name] = Object.entries(errorType)[idx];

    setErrorType((prev) => ({
      ...prev,
      [name]: bool,
    }));
  };

  return (
    <PasswordValidationContext.Provider
      value={{ errorType, handleErrorType,errorMessage,multiRegex }}
    >
      {children}
      <Outlet />
    </PasswordValidationContext.Provider>
  );
}

export default PasswordValidationContext;

PasswordValidationProvider.propTypes = {
  children: PropTypes.node,
};
