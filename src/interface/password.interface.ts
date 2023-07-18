export interface IForgotPassword {
    email: string;
}

export interface IResetPassword {
    code: string;
    password: string;
    'new-password': string;
}

export interface IChangePassword {
    'old-password': string;
    'new-password': string;
    'confirm-password': string;
}