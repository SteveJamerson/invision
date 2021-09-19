export enum AuthProvider {
  Email,
  Google
}

export interface User {
  name?: string,
  email: string,
  password: string
}


export interface AuthOptions {
  is: string;
  provider: AuthProvider;
  user: User
}
