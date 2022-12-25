export declare namespace Type {
  export interface User {
    id?: null | number
    email?: null | string
    fullname?: null | string
    username?: null | string
    phone_number?: null | string
    profile_picture?: null | string
  }

  export interface UserInput {
    email?: null | string
    password?: null | string
    username?: null | string
    fullname?: null | string
    phone_number?: null | string
    profile_picture?: null | string
  }
  export interface UserList {
    data?: User[] | null
  }
}
