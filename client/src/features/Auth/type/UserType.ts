export type UserType = {
  id: number;
  email: string;
  name: string;
  password: string;
  role: string;
};

export type RegType = Omit<UserType, "id">;
export type AuthType = {
  email: string;
  password: string;
};



