import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import UserService from "../api/UserService";
import { Actions, useGlobalContext } from "../context/GlobalContext";
import { IsError } from "./IsError";

export interface FormDatas {
  Email?: string;
}

type DataObject = {
  Email?: string;
  Password?: any;
  checkid?: boolean;
};
export const LoginForm = () => {
  const {
    state: { isLoading },
    dispatch,
  } = useGlobalContext();

  const [isError, setIsError] = React.useState(false);

  const [loginForm, setLoginForm] = React.useState<
    FormDatas | string | undefined
  >("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data: DataObject): void => {
    setLoginForm(data.Email);
    if (data.checkid) {
      localStorage.setItem("password", data.Password);
    }
    try {
      dispatch({ type: Actions.SET_LOADING, payload: true });
      setTimeout(async () => {
        const response = await UserService.getUsers();
        const user = response.data.find(
          (findUser) =>
            findUser.login === data.Email && findUser.password === data.Password
        );
        if (user) {
          dispatch({ type: Actions.SET_USER, payload: data });
          dispatch({ type: Actions.IS_AUTH, payload: true });
        } else {
          setIsError(true);
        }
        dispatch({ type: Actions.SET_LOADING, payload: false });
        reset();
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <MainContainer>
      {isError && <IsError loginForm={loginForm} />}
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel>
            Логин
            <FormInput
              className={errors ? "error" : ""}
              type="email"
              placeholder="Email"
              {...register("Email", { required: "Обязательное поле" })}
            />
          </FormLabel>
          <FormError>
            {errors?.Email && <p>{errors?.Email?.message || "Error"}</p>}
          </FormError>
          <FormLabel>
            Пароль
            <FormInput
              className={errors ? "error" : ""}
              type="password"
              placeholder="Password"
              {...register("Password", {
                required: "Обязательное поле",
                max: 20,
                min: 8,
                maxLength: 80,
              })}
            />
          </FormLabel>
          <FormError>
            {errors?.Password && <p>{errors?.Password?.message || "Error"}</p>}
          </FormError>
          <CheckBoxLabel>
            <FormCheckBox
              type="checkbox"
              placeholder="checkid"
              {...register("checkid")}
            />
            Запомнить пароль
          </CheckBoxLabel>
          <FormButton disabled={isLoading} type="submit">
            Войти
          </FormButton>
        </Form>
      </FormContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const FormInput = styled.input`
  background: #f5f5f5;
  margin: 10px 0;
  width: 640px;
  height: 60px;
  border-radius: 5px;
  border: none;
  padding: 0 20px;
  &:focus {
    outline: none;
  }
  &.error {
    &:focus {
      border: 1px solid red;
    }
  }
`;
const FormLabel = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
`;
const FormError = styled.div`
  font-size: 14px;
  color: red;
`;

const FormCheckBox = styled.input`
  width: 20px;
  height: 20px;
  border: 1px solid #000000;
  border-radius: 4px;
  margin: 10px 5px 10px 0;
`;
const CheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
`;
const FormButton = styled.button`
  background: #4a67ff;
  color: #ffffff;
  font-size: 18px;
  margin: 10px 0;
  width: 640px;
  height: 60px;
  border-radius: 5px;
  border: none;
`;
