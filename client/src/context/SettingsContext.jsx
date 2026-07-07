import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await api.get("/settings");

      setSettings(res.data);

    } catch (err) {
      console.log("Settings error:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchSettings();
  }, []);


  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        fetchSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};


export const useSettings = () => {
  return useContext(SettingsContext);
};