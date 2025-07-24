import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, X, ChevronDown } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Untuk mobile drawer

  return (
    <>
      {/* Tombol Toggle Sidebar untuk Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsOpen(true)} className="bg-white p-2 rounded shadow border hover:bg-gray-100">
          <Menu className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Overlay untuk Mobile */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg z-50 
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:w-64
        `}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="text-xl font-extrabold text-blue-600">
            VehicleTrack
          </Link>
          {/* Close button (only visible on mobile) */}
          <button onClick={() => setIsOpen(false)} className="md:hidden p-2 hover:bg-gray-100 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4">
          <ul className="flex flex-col gap-2 px-4">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-2 rounded hover:bg-blue-100 text-gray-800 font-medium">
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link to="/vehicles" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-2 rounded hover:bg-blue-100 text-gray-800 font-medium">
                🚗 Vehicles
              </Link>
            </li>
          </ul>
        </nav>

        {/* Bottom (Notification + Profile) */}
        <div className="absolute bottom-0 w-full border-t p-4">
          <div className="flex items-center justify-between">
            <button className="relative hover:bg-gray-100 p-2 rounded-full">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border border-white animate-ping" />
            </button>
            <div className="flex items-center gap-2">
              <img src="https://storage.googleapis.com/a1aa/image/2cf9c9e0-2d8f-41ba-7815-d715815ad52c.jpg" className="w-8 h-8 rounded-full object-cover" alt="User" />
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main content shift (only on desktop) */}
      <div className="md:ml-64 transition-all duration-300">{/* Content masuk di sini */}</div>
    </>
  );
}
