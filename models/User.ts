export interface User {
  username: string;
  password: string;
  email: string;
  registrationNumber: number;
}

export class UserModel implements User {
  constructor(
    public username: string,
    public password: string,
    public email: string,
    public registrationNumber: number
  ) {}
}
