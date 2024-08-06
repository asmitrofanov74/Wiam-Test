import styled from "styled-components"

export const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  width: 100vh;
  height: 40vh;
  background-color: rgb(213, 248, 213);
  padding: 25px;
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    padding: 20px;
    font-size: 50px;
  }
`
