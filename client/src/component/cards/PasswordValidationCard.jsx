import { Icon } from "@iconify/react";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";
import { useMemo } from "react";

const PasswordValidationCard = () => {
  const { errorType } = usePasswordValidation();

  const customMessage = [
    "1 Lowercase Letter",
    "1 Uppercase Letter",
    "1 Number",
    "1 Special Character (e.g. !?<>@#$%)",
    "12 Characters or more",
  ];

  const iconStatus = useMemo(() => {
    return (stats) => (stats ? "bx:check-circle" : "bx:circle");
  }, []);
  const colorStatus = useMemo(() => {
    return (stats) => (stats ? "text-green-500" : "text-slate-500");
  }, []);

  return (
    <div className="">
      <ul className="pwd-wrapper">
        {Object.values(errorType).map((status, idx) => {
          return (
            <li
              className={`flex flex-row items-center gap-2 ${colorStatus(
                status
              )}`}
              key={idx}
            >
              <Icon icon={iconStatus(status)} />
              <span className="text-sm">{customMessage[idx]}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordValidationCard;
