import { User } from 'firebase';

export enum LoginProvider {
  Google = 'Google',
}

export interface LoginAction {
  loginAction: () => Promise<User>;
}

export type ProviderActionMap = { [key in keyof typeof LoginProvider]: LoginAction };
