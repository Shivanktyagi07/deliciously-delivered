import { createContext, useContext, useState, ReactNode } from "react";

export interface City {
  id: string;
  name: string;
  popular: boolean;
}

export const cities: City[] = [
  { id: "prayagraj", name: "Prayagraj", popular: true },
  { id: "lucknow", name: "Lucknow", popular: true },
  { id: "varanasi", name: "Varanasi", popular: true },
  { id: "kanpur", name: "Kanpur", popular: true },
  { id: "agra", name: "Agra", popular: false },
  { id: "noida", name: "Noida", popular: false },
  { id: "ghaziabad", name: "Ghaziabad", popular: false },
  { id: "meerut", name: "Meerut", popular: false },
];

interface CityContextType {
  selectedCity: City;
  setSelectedCity: (city: City) => void;
}

// City context for global state management
const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCity] = useState<City>(cities[0]);

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
};
