
export interface SignInModel {
  email: string;
  password: string;
}

export interface SignUpModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPassword {
  email: string;
}
