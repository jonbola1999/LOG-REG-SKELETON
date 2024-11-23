import { createContext, Dispatch, SetStateAction } from "react";
import { UserType } from "../../features/Auth/type/UserType";

type TypeUserContext = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};

const initialContext: TypeUserContext = {
  user: null,
  setUser: () => {},
};

export const UserContext = createContext<TypeUserContext>(initialContext);
