import { usePasswordValidation } from "../../hooks/usePasswordValidation";

const PasswordValidationCard = () => {
  const { errorType } = usePasswordValidation();

  const customMessage = [
    "1 Lowercase Letter",
    "1 Uppercase Letter",
    "1 Number",
    "1 Special Character (e.g. !?<>@#$%)",
    "Atleast 12 Characters",
  ];

  return (
    <div className="pwd-valid">
      <ul className="pwd-wrapper">
        {Object.values(errorType).map((status, idx) => {
          return (
            <li className={status ? "valid" : "invalid"} key={idx}>
              {customMessage[idx]}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordValidationCard;
