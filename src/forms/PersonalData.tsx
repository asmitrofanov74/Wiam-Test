import { FC, ChangeEvent, FormEvent, useState, forwardRef } from "react"
import { useNavigate } from "react-router-dom"
import { useFormContext } from "../context/useFormContext"
import {
  Form,
  FormButton,
  FormInput,
  FormSelect,
  StyledPage,
} from "../styles/FormStyles"

import { InputMask } from "@react-input/mask"

type PersonalDataFormErrors = {
  phone: string
  firstName: string
  lastName: string
  gender: string
}

interface CustomInputProps {
  label: string
}

const PersonalData: FC = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState<PersonalDataFormErrors | undefined>()
  const { formValues, setFormValues } = useFormContext()

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors: PersonalDataFormErrors = {
      phone: "",
      firstName: "",
      lastName: "",
      gender: "",
    }
    if (!formValues.phone) newErrors.phone = "Телефон обязателен."
    if (!formValues.firstName) newErrors.firstName = "Имя обязательно."
    if (!formValues.lastName) newErrors.lastName = "Фамилия обязательна."
    if (!formValues.gender) newErrors.gender = "Пол обязателен."
    return newErrors
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    let hasErrors = false
    e.preventDefault()
    const newErrors = validate()
    let key: keyof typeof newErrors
    for (key in newErrors) {
      if (newErrors[key].length > 0) hasErrors = true
    }
    if (hasErrors) {
      setErrors(newErrors)
    } else {
      navigate("/workhomeaddress")
    }
  }

  const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
    ({ label }, forwardedRef) => {
      return (
        <>
          <label htmlFor="phone">{label}</label>
          <FormInput
            defaultValue={formValues.phone}
            type="text"
            ref={forwardedRef}
            id="phone"
            name="phone"
            placeholder="0XXX XXX XXX"
            onChange={handleChange}
          />
        </>
      )
    }
  )

  return (
    <StyledPage>
      <h2>Личные данные</h2>
      <Form onSubmit={handleSubmit}>
        <div className="input">
          <InputMask
            label="Телефон"
            mask="0XXX XXX XXX"
            replacement={{ X: /\d/ }}
            component={CustomInput}
          />

          {errors?.phone && <span>{errors.phone}</span>}
        </div>
        <div className="input">
          <label htmlFor="firstName">Имя</label>
          <FormInput
            type="text"
            name="firstName"
            onChange={handleChange}
            required
            value={formValues.firstName}
          />
          {errors?.firstName && <span>{errors.firstName}</span>}
        </div>
        <div className="input">
          <label htmlFor="lastName">Фамилия</label>
          <FormInput
            type="text"
            name="lastName"
            onChange={handleChange}
            required
            value={formValues.lastName}
          />
          {errors?.lastName && <span>{errors.lastName}</span>}
        </div>
        <div className="input">
          <label htmlFor="gender">Пол</label>
          <FormSelect
            name="gender"
            onChange={handleChange}
            required
            value={formValues.gender}
          >
            <option>Выберите пол</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </FormSelect>
          {errors?.gender && <span>{errors.gender}</span>}
        </div>
        <FormButton type="submit">Далее</FormButton>
      </Form>
    </StyledPage>
  )
}

export default PersonalData
