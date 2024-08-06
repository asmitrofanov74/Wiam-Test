import { useContext } from "react"
import { FromContext } from "./FormContext"
// interface IFormContext {
//   phone: string
//   firstName: string
//   lastName: string
//   gender: string
//   workPlace: string
//   address: string
//   loanAmount: number
//   loanTerm: number
// }
// type FormProviderProps = {
//   children: ReactElement
// }
// const FormContext = createContext<IFormContext | null>(null)

// export const FormProvider: FC<FormProviderProps> = ({ children }) => {
//   const [formData, setFormData] = useState<IFormContext>({
//     phone: "",
//     firstName: "",
//     lastName: "",
//     gender: "",
//     workPlace: "",
//     address: "",
//     loanAmount: 200,
//     loanTerm: 10,
//   })

//   return (
//     <FormContext.Provider value={{ formData, setFormData }}>
//       {children}
//     </FormContext.Provider>
//   )
// }

// type FormValues = {
//   phone: string
//   firstName: string
//   lastName: string
//   gender: string
//   workPlace: string
//   address: string
//   loanAmount: number
//   loanTerm: number
// }

// export interface IFormContext {
//   formValues: FormValues
//   setFormValues: React.Dispatch<React.SetStateAction<FormValues>>
// }

// export const FromContext = createContext<IFormContext | undefined>(undefined)

export const useFormContext = () => {
  const context = useContext(FromContext)
  if (context === undefined) {
    throw new Error("context not found")
  }
  return context
}

// export const useForm = () => useContext(FormContext)
