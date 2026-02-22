import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import FoodDetail from "./pages/FoodDetail";


export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
      <Route path="/foods/:fdc_id" element={<FoodDetail />} />
    </Routes>
  );
}