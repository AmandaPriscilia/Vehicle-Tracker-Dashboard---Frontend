import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, CircleNotch, Speedometer, WarningCircle } from '@phosphor-icons/react';
import { useVehicleStore } from '@/stores/vehicleStore';
import { ViewDetailsButton, TryAgainButton } from '@/components/ui/button';

export default function Dashboard() {
  const navigate = useNavigate();
  const { vehicles, fetchVehicles, loading, error } = useVehicleStore();

  const [filteredStatus, setFilteredStatus] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    fetchVehicles(); // Ambil data saat komponen dimuat
  }, []);

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

  const getCountByStatus = (status: string) => vehicles.filter((v) => v.status.toLowerCase() === status.toLowerCase()).length;

  const getFilteredAndSortedVehicles = () => {
    let filtered = [...vehicles];
    if (filteredStatus !== 'all') {
      filtered = filtered.filter((v) => v.status.toLowerCase() === filteredStatus);
    }

    switch (sortBy) {
      case 'speed':
        filtered.sort((a, b) => b.speed - a.speed);
        break;
      case 'latest':
        filtered.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        break;
    }

    return filtered;
  };

  const formatRelativeTime = (dateStr: string) => {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    return `${minutes} minutes ago`;
  };

  return (
    <div className="ml-0 md:ml-64 px-4 sm:px-6 py-6 max-w-screen-2xl mx-auto transition-all duration-300 animate-fade-in">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">Vehicle Fleet Overview</h1>

      {/* Summary Cards */}
      {!loading && !error && vehicles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white shadow rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500">Total Vehicles</p>
            <p className="text-2xl font-bold text-slate-900">{vehicles.length}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-600">Active</p>
            <p className="text-xl font-semibold text-green-800">{getCountByStatus('active')}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-600">Moving</p>
            <p className="text-xl font-semibold text-blue-800">{getCountByStatus('moving')}</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p className="text-sm text-orange-600">Parked</p>
            <p className="text-xl font-semibold text-orange-800">{getCountByStatus('parked')}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      {!loading && !error && vehicles.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mr-2">Filter by Status:</label>
            <select value={filteredStatus} onChange={(e) => setFilteredStatus(e.target.value)} className="p-2 border border-gray-300 rounded-md">
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="moving">Moving</option>
              <option value="parked">Parked</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 border border-gray-300 rounded-md">
              <option value="latest">Last Updated</option>
              <option value="speed">Speed</option>
            </select>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-64 text-slate-500">
          <CircleNotch className="h-12 w-12 animate-spin text-blue-500 mb-4" />
          <p className="text-xl">Loading vehicles data...</p>
          <p className="text-sm">Please wait a moment.</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex flex-col items-center justify-center h-64 text-red-600 bg-red-50 border border-red-200 rounded-lg p-6">
          <WarningCircle className="h-12 w-12 text-red-500 mb-4" />
          <p className="text-xl font-semibold">Error: Could not load vehicles.</p>
          <p className="text-base text-red-500">{error}</p>
          <TryAgainButton onClick={fetchVehicles} />
        </div>
      )}

      {/* Vehicle Cards */}
      {!loading && !error && vehicles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredAndSortedVehicles().map((vehicle) => (
            <div key={vehicle.id} className="p-6 rounded-2xl border border-gray-100 shadow-lg bg-white hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2 truncate">
                  <Car className="inline-block mr-2 text-blue-500" size={24} weight="fill" />
                  {vehicle.name}
                </h2>

                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-3 ${getStatusColor(vehicle.status)}`}>
                  <span
                    className="w-2.5 h-2.5 rounded-full mr-2"
                    style={{
                      backgroundColor: getStatusColor(vehicle.status).split(' ')[0].replace('text-', ''),
                    }}
                  ></span>
                  Status: {vehicle.status}
                </div>

                <p className="text-base text-slate-700 mb-1 flex items-center">
                  <Speedometer className="mr-2 text-gray-500" size={20} />
                  Speed: <span className="font-semibold ml-1">{vehicle.speed} km/h</span>
                </p>

                <p className="text-sm text-gray-500 mt-1">Updated: {formatRelativeTime(vehicle.updated_at)}</p>
              </div>

              <ViewDetailsButton vehicleId={vehicle.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
