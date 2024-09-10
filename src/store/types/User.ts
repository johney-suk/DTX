export default interface User {
  email: string;
  password: string;
  userName?: string;
  code?: string;
}

export type { User }