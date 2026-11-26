import { createContext, useContext, useState, useEffect } from "react";

const PlacementContext = createContext();

const initialData = [
  { id: 1, company: "TCS", role: "SDE Intern", status: "Applied", deadline: "2026-12-10" },
  { id: 2, company: "Microsoft", role: "SWE", status: "OA", deadline: "2026-12-15" },
];

export function PlacementProvider({ children }) {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("placements");
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("placements", JSON.stringify(applications));
  }, [applications]);

  const addApplication = (app) => {
    setApplications((prev) => [...prev, { ...app, id: Date.now() }]);
  };

  const updateStatus = (id, status) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <PlacementContext.Provider
      value={{ applications, addApplication, updateStatus, deleteApplication }}
    >
      {children}
    </PlacementContext.Provider>
  );
}

export const usePlacements = () => useContext(PlacementContext);