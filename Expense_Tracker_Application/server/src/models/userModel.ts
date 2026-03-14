export interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
}

export interface createUserDTO {
  userName: string;
  email: string;
  password: string;
}
