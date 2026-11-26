import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlacementProvider } from "./context/PlacementContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import AddApplication from "./pages/AddApplication";

export default function App() {
  return (
    <PlacementProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/add" element={<AddApplication />} />
        </Routes>
      </BrowserRouter>
    </PlacementProvider>
  );
}