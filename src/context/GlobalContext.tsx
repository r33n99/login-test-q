import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { IUser } from "../models/IUser";
export enum Actions {
  GET_USERS = "GET_USERS",
  SET_USER = "SET_USER",
  IS_AUTH = "IS_AUTH",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  LOGOUT = "LOGOUT",
}

export type Action = {
  type: Actions;
  payload: IUser | any;
};
export type State = {
  isAuth?: boolean;
  users: IUser[];
  ErrorMessage?: string;
  user: IUser;
  isLoading?: boolean;
};
export type Dispatch = (action: Action) => void;
const defaultState = {
  isAuth: false,
  isLoading: false,
  ErrorMessage: "",
  users: [],
  user: {
    login: "",
    password: "",
    checkid: false,
  },
};
const GlobalContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const ContextReducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case Actions.GET_USERS:
      return { ...state, users: payload };
    case Actions.SET_USER:
      const setUser = {
        ...state,
        user: {
          login: payload.Email,
          password: payload.Password,
          checkid: payload.checkid,
        },
      };
      return setUser;
    case Actions.IS_AUTH:
      return { ...state, isAuth: payload };
    case Actions.SET_LOADING:
      return { ...state, isLoading: payload };
    case Actions.SET_ERROR:
      return { ...state, ErrorMessage: payload };
    case Actions.LOGOUT:
      return {
        ...state,
        isAuth: false,
        user: { login: "", password: "", checkid: false },
      };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(ContextReducer, defaultState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context)
    throw new Error("useGlobalContext must be used inside a ContextProvider");

  return context;
};
