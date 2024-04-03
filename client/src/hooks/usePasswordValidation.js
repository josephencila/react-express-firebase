import { useContext } from "react"
import PasswordValidationContext from "../context/PasswordValidationContextProvider"

export function usePasswordValidation() {
    return useContext(PasswordValidationContext)
}


