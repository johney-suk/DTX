import { Hospital } from "./Hospital";
import User from "./User"; 

export default interface SignUp extends User {
    confirmPassword: string;
    hospital: Hospital;
}
// export enum Hospital {
//     Busan = '01',
//     Seoul = '02',
//     Andong = '03',
//     Serverance = '04',
// }

// export const hospitalEmailFormats: Record<Hospital, string> = {
//     [Hospital.Seoul]: '@seoulhospital.com',
//     [Hospital.Busan]: '@busanhospital.com',
//     [Hospital.Andong]: '@andonghospital.com',
//     [Hospital.Serverance]: '@serverance.com',
//   };

export type { SignUp }