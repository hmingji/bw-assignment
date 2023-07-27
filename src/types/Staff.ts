export const genders: Gender[] = ['Male', 'Female', 'Prefer not to say'];

export type Gender = 'Male' | 'Female' | 'Prefer not to say';

export type Staff = {
  id: number;
  name: string;
  age: number;
  email: string;
  gender: Gender;
};
