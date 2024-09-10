import User from "./User";

export default interface SignUp extends User {
    confirmPassword: string;
    hospital: Hospital;
}
export enum Hospital {
    Busan = '부산대병원',
    Seoul = '서울대병원',
    Andong = '안동병원',
    Ulsan = '울산대병원',
}

export const hospitalEmailFormats: Record<Hospital, string> = {
    [Hospital.Seoul]: '@seoulhospital.com',
    [Hospital.Busan]: '@busanhospital.com',
    [Hospital.Andong]: '@andonghospital.com',
    [Hospital.Ulsan]: '@ulsanhospital.com',
  };

export type { SignUp }