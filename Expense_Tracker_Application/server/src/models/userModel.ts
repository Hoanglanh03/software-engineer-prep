export interface User {
  userId: string | number;
  userName: string;
  email: string;
  role: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface createUserDTO {
  userName: string;
  email: string;
  password: string;
}

export interface loginUserDTO {
  email: string;
  password: string;
}
