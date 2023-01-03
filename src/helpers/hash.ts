import bcrypt from 'bcrypt';

export const hashPassword = async (data: string): Promise<string> => {
  const hashedData = await bcrypt.hash(data, 10);
  return hashedData;
};

export const comparePassword = async (data: string, hashedData: string): Promise<boolean> => {
  return await bcrypt.compare(data, hashedData);
};
