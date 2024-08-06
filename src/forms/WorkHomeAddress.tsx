import { FC, useEffect, useState, ChangeEvent, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useFormContext } from "../context/useFormContext"

import {
  Form,
  FormButton,
  FormInput,
  FormSelect,
  StyledPage,
} from "../styles/FormStyles"

type WorkHomeAddressFormErrors = {
  workplace: string
  address: string
}

const WorkHomeAddress: FC = () => {
  const navigate = useNavigate()
  const [workplaces, setWorkplaces] = useState<string[]>([])
  const [errors, setErrors] = useState<WorkHomeAddressFormErrors>()
  const { formValues, setFormValues } = useFormContext()

  useEffect(() => {
    fetchWorkplaces()
  }, [])

  const fetchWorkplaces = () => {
    const response = fetch("https://dummyjson.com/products/category-list")
      .then(res => res.json())
      .then(data => setWorkplaces(data))
  }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors: WorkHomeAddressFormErrors = { workplace: "", address: "" }
    if (!formValues.workplace) newErrors.workplace = "Укажите Место работы."
    if (!formValues.address) newErrors.address = "Укажите Адрес проживания."
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
      navigate("/loanparams")
    }
  }

  return (
    <StyledPage>
      <Form onSubmit={handleSubmit}>
        <div className="input">
          <label>Место работы</label>
          <FormSelect
            name="workplace"
            onChange={handleChange}
            required
            value={formValues.workplace}
          >
            {!formValues.workplace && (
              <option value="">Выберите место работы</option>
            )}
            {workplaces.map((workplace, i) => (
              <option key={i} value={workplace}>
                {workplace}
              </option>
            ))}
          </FormSelect>
          {/* )} */}
          {errors?.workplace && <span>{errors.workplace}</span>}
        </div>
        <div className="input">
          <label>Адрес проживания</label>
          <FormInput
            type="text"
            name="address"
            onChange={handleChange}
            required
            value={formValues.address}
          />
          {errors?.address && <span>{errors.address}</span>}
        </div>
        <div className="buttons">
          <FormButton type="button" onClick={() => navigate(-1)}>
            Назад
          </FormButton>
          <FormButton type="submit">Далее</FormButton>
        </div>
      </Form>
    </StyledPage>
  )
}

export default WorkHomeAddress
