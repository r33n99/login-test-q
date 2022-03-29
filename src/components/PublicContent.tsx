import React from "react";
import styled from "styled-components";
import { Actions, useGlobalContext } from "../context/GlobalContext";

export const PublicContent = () => {
  const {
    state: { user },
    dispatch,
  } = useGlobalContext();
  const LogOut = () => {
    dispatch({ type: Actions.LOGOUT, payload: null });
  };

  return (
    <Container>
      <Title>
        Здравствуйте,{" "}
        <strong>{user?.login ? user.login : "Пользователь"}</strong>
      </Title>
      <ButtonLogout onClick={LogOut}>Выйти</ButtonLogout>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;
  margin-bottom: 50px;
  @media (max-width: 425px) {
    width: 350px;
    font-size:18px;
    text-align:center;
}
`;

const ButtonLogout = styled.button`
  width: 200px;
  height: 60px;
  background: #f5f5f5;
  border-radius: 8px;
  border: none;

  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
`;
