import {
  useState,
  createContext,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";
import { Role } from "../shared/enums";

type RoleContextType = {
  role: Role | null;
  setRole: (role: Role | null) => void;
};

export const RoleContext = createContext<RoleContextType | undefined>(
  undefined
);
export function useRoleContext() {
  const role = useContext(RoleContext);
  if (role === undefined) {
    throw new Error("Role must be in a role provider");
  }
  return role;
}

export const RoleProvider = ({ children }: PropsWithChildren) => {
  const [role, setRole] = useState<Role | null>(() => {
    const storedRole = sessionStorage.getItem("userRole");
    return storedRole ? (storedRole as Role) : null;
  });

  useEffect(() => {
    if (role) {
      sessionStorage.setItem("userRole", role);
    } else {
      sessionStorage.removeItem("userRole");
    }
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};
