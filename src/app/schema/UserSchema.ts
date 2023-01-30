import * as yup from 'yup';

export const userSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(3).max(32).required(),
    username: yup.string().optional(),
  }),
});

export interface SignupInput extends yup.InferType<typeof userSchema> {
  email?: null | string;
  password?: null | string;
  username?: null | string;
  fullname?: null | string;
  phoneNumber?: null | string;
  profilePicture?: null | string;
}

export interface SigninInput extends yup.InferType<typeof userSchema> {
  email?: null | string;
  password?: null | string;
}

export interface Me {
  id?: null | number;
  email?: null | string;
  password?: null | string;
  username?: null | string;
  fullname?: null | string;
  phoneNumber?: null | string;
  profilePicture?: null | string;
  token: string;
  read?: boolean | null;
  write?: boolean | null;
  modify?: boolean | null;
  remove?: boolean | null;
}

export interface User {
  id?: null | number;
  email?: null | string;
  password?: null | string;
  username?: null | string;
  fullname?: null | string;
  phoneNumber?: null | string;
  profilePicture?: null | string;
}
