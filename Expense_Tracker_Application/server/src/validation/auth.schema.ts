import { z } from "zod";

export const signUpSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username must be at most 30 characters long." }),
  email: z.email({ message: "Email is not in the correct format." }),
  password: z
    .string()
    .min(6, { message: "The password must have at least 6 characters." })
    .regex(/[A-Z]/, {
      message: "The password must contain at least one uppercase letter.",
    }),
});

export const signInSchema = z.object({
  email: z.email({ message: "Email is not in the correct format." }),
  password: z.string().min(1, { message: "Please enter the password." }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
