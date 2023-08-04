export interface IForgotPassword {
  account: string;
}

export interface IResetPassword {
  token: string;
  password: string;
  password_confirmation: string;
}

export interface IChangePassword {
  "old-password": string;
  "new-password": string;
  "confirm-password": string;
}
