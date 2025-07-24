import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicleStore } from '@/stores/vehicleStore';
import { Button } from '@/components/ui/button';
import { Car, Speedometer, CircleNotch, WarningCircle } from '@phosphor-icons/react';

export default function Vehicles() {
  const navigate = useNavigate();
  const { vehicles, fetchVehicles, loading, error } = useVehicleStore();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'moving':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'parked':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="ml-0 md:ml-64 px-4 sm:px-6 py-6 max-w-screen-2xl mx-auto transition-all duration-300 animate-fade-in">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">All Vehicles</h1>

      {loading && (
        <div className="flex flex-col items-center justify-center h-64 text-slate-500">
          <CircleNotch className="h-12 w-12 animate-spin text-blue-500 mb-4" />
          <p className="text-xl">Loading vehicle list...</p>
          <p className="text-sm">Fetching vehicle data from server.</p>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center h-64 text-red-600 bg-red-50 border border-red-200 rounded-lg p-6">
          <WarningCircle className="h-12 w-12 text-red-500 mb-4" />
          <p className="text-xl font-semibold">Error loading vehicles.</p>
          <p className="text-base text-red-500">{error}</p>
          <Button onClick={() => fetchVehicles()} className="mt-4 bg-red-500 hover:bg-red-600 text-white">
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && vehicles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="p-6 rounded-2xl border border-gray-100 shadow-lg bg-white
                         hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out
                         flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2 truncate">
                  <Car className="inline-block mr-2 text-blue-500" size={24} weight="fill" />
                  {vehicle.name}
                </h2>
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-3
                    ${getStatusColor(vehicle.status)}`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full mr-2"
                    style={{
                      backgroundColor: getStatusColor(vehicle.status).split(' ')[0].replace('text-', ''),
                    }}
                  ></span>
                  Status: {vehicle.status}
                </div>
                <p className="text-base text-slate-700 mb-2 flex items-center">
                  <Speedometer className="mr-2 text-gray-500" size={20} />
                  Speed: <span className="font-semibold ml-1">{vehicle.speed} km/h</span>
                </p>
                <p className="text-sm text-gray-500 mt-4 pt-3 border-t border-gray-100">Last Updated: {new Date(vehicle.updated_at).toLocaleString()}</p>
              </div>
              <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 ease-in-out" onClick={() => navigate(`/vehicles/${vehicle.id}`)}>
                View Details
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
