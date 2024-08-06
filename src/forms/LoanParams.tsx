import { FC, ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFormContext } from "../context/useFormContext"
import Modal from "../shared/ui/Modal"
import Note from "../shared/ui/Note"
import { Form, FormButton, FormInput } from "../styles/FormStyles"

const LoanParams: FC = () => {
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState<boolean>(false)
  const { formValues, setFormValues } = useFormContext()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `${formValues.firstName} ${formValues.lastName}`,
      }),
    })
      .then(res => res.json())
      .then(() => setShowModal(true))
  }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  return (
    <div>
      {!showModal && (
        <Form onSubmit={handleSubmit}>
          <div>
            <label>Сумма займа</label>
            <FormInput
              type="range"
              min="200"
              max="1000"
              name="loanAmount"
              step="100"
              value={formValues.loanAmount}
              onChange={handleChange}
            />
            <span>{formValues.loanAmount}</span>
          </div>
          <div>
            <label>Срок займа (дни)</label>
            <FormInput
              type="range"
              min="10"
              max="30"
              name="loanTerm"
              step="1"
              value={formValues.loanTerm}
              onChange={handleChange}
            />
            <span>{formValues.loanTerm}</span>
          </div>
          <div className="buttons">
            <FormButton type="button" onClick={() => navigate(-1)}>
              Назад
            </FormButton>
            <FormButton type="submit">Подать заявку</FormButton>
          </div>
        </Form>
      )}

      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Note
            firstName={formValues.firstName}
            lastName={formValues.lastName}
            loanAmount={formValues.loanAmount}
            loanTerm={formValues.loanTerm}
          />
        </Modal>
      )}
    </div>
  )
}

export default LoanParams
