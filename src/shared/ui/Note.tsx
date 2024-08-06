import styled from "styled-components"

interface INoteProps {
  lastName: string
  firstName: string
  loanAmount: number
  loanTerm: number
}

const NoteContainer = styled.h2`
  width: auto;
  padding: 28px;
  background-color: #00cc99;
  color: black;
  border-radius: 20px;
  text-align: center;
  font-family: "Regular";
  font-size: 20px;
  box-shadow: -2px -2px 16px 1px rgba(255, 255, 255, 0.3);
  .warning {
    font-weight: bold;
    color: red;
  }
`

const Note: React.FC<INoteProps> = ({
  lastName,
  firstName,
  loanAmount,
  loanTerm,
}) => {
  return (
    <NoteContainer>
      {`Поздравляем, ${lastName} ${firstName}! Вам одобрена `}
      <span className="warning">${loanAmount} </span>
      {`на ${loanTerm} дней`}
    </NoteContainer>
  )
}

export default Note
