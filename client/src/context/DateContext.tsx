import {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
  FC,
} from "react";

type DateContextType = {
  date: string | null;
  setDate: (date: string | null) => void;
};

const DateContext = createContext<DateContextType | undefined>(undefined);

export function useDateContext() {
  const date = useContext(DateContext);
  if (date === undefined) {
    throw new Error("Date must be in a Date provider");
  }
  return date;
}

export const DateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [date, setDate] = useState<string | null>(() => {
    const storedDate = sessionStorage.getItem("Date");
    return storedDate ? storedDate : null;
  });

  useEffect(() => {
    if (date !== null) {
      sessionStorage.setItem("Date", date);
    } else {
      sessionStorage.removeItem("Date");
    }
  }, [date]);

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};
