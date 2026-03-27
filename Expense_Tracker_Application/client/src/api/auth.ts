import axiosClient from "./axiosClient";

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  userName: string;
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  userName: string;
  email: string;
  role: "admin" | "user";
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

export async function loginApi(payload: LoginRequest) {
  const { data } = await axiosClient.post<LoginResponse>("/login", payload);
  return data;
}

export async function signupApi(payload: SignupRequest) {
  const { data } = await axiosClient.post<{ message: string; user: unknown }>(
    "/signup",
    payload,
  );
  return data;
}

