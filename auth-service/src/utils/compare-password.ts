import { compare } from 'bcrypt';

interface comparePasswordPayload {
  password1: string
  password2: string
}

export const comparePassword = async ({
  password1,
  password2
}: comparePasswordPayload) => {

  const checkPassword = await compare(password1, password2);
  
  if(!checkPassword) return false;
  return true;
};