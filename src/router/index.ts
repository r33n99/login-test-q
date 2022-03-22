import { Login } from "../pages/Login";
import { Public } from "../pages/Public";

export interface IRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  LOGIN = "/login",
  EVENT = "/profile",
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, exact: true, component: Login },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.EVENT, exact: true, component: Public },
];
