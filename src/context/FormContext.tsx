import { createContext } from "react"

type FormValues = {
  phone: string
  firstName: string
  lastName: string
  gender: string
  workplace: string
  address: string
  loanAmount: number
  loanTerm: number
}

export interface IFormContext {
  formValues: FormValues
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>
}

export const FromContext = createContext<IFormContext | undefined>(undefined)
