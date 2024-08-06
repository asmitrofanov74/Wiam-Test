import { useState } from "react"

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import { IFormContext, FromContext } from "./context/FormContext"
import PersonalData from "./forms/PersonalData"
import WorkHomeAddress from "./forms/WorkHomeAddress"
import LoanParams from "./forms/LoanParams"

function App() {
  const defaultValue: IFormContext = {
    formValues: {
      phone: "",
      firstName: "",
      lastName: "",
      gender: "",
      workplace: "",
      address: "",
      loanAmount: 200,
      loanTerm: 10,
    },
    setFormValues: () => {},
  }

  const [formValues, setFormValues] = useState(defaultValue.formValues)
  console.log(formValues)
  return (
    <FromContext.Provider value={{ formValues, setFormValues }}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/personaldata" />} />
          <Route path="/personaldata" element={<PersonalData />} />
          <Route path="/workhomeaddress" element={<WorkHomeAddress />} />
          <Route path="/loanparams" element={<LoanParams />} />
        </Routes>
      </Router>
    </FromContext.Provider>
  )
}

export default App
