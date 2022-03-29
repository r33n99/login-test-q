import React from "react";
import styled from "styled-components";
import { FormDatas } from "./LoginForm";

interface Props {
  loginForm?: string | undefined | FormDatas;
}

export const IsError = ({ loginForm }: Props) => {
  return (
    <Container>
      <ErrorMessage>
        <p>Пользователя, {loginForm} не существует</p>
      </ErrorMessage>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e26f6f;
  width: 640px;
  height: 60px;
  background: #f5e9e9;
  border-radius: 8px;
  @media (max-width: 425px) {
    width: 350px;
    font-size:15px;
    text-align:center;
}
`;
