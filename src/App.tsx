import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import VehicleDetail from './components/pages/VehicleDetail';
import Navbar from './components/ui/sidebar';
import Vehicles from './components/pages/Vehicles';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/:id" element={<VehicleDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
