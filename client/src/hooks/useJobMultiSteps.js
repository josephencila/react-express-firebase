import { useContext } from "react"
import JobMultiStepsFormContext from "../context/JobMultiStepsFormContextProvider"

const useJobMultiSteps = () => {
    return useContext(JobMultiStepsFormContext)
}

export default useJobMultiSteps
