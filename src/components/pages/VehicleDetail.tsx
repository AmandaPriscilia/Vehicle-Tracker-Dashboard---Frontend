import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVehicleById } from '@/api/vehicleApi';
import { ArrowLeft, Car, Speedometer, MapPin, GasPump, CalendarCheck } from '@phosphor-icons/react';

export default function VehicleDetail() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getVehicleById(Number(id))
      .then((data) => {
        setVehicle(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Vehicle not found');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center p-10 text-slate-600 animate-pulse text-xl">Loading vehicle details...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600 font-semibold">{error}</div>;
  }

  return (
    <div className="ml-0 md:ml-64 px-4 sm:px-6 py-6 max-w-screen-lg mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/vehicles" className="flex items-center text-blue-600 hover:underline">
          <ArrowLeft className="mr-2" /> Back to Vehicles
        </Link>
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight flex items-center">
        <Car className="mr-2 text-blue-600" size={32} weight="fill" />
        Vehicle Detail - ID #{vehicle.vehicleId}
      </h1>

      <div className="bg-white border border-gray-200 shadow rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <p className="text-base text-slate-700 flex items-center">
            <Speedometer className="mr-2 text-gray-500" />
            <span className="font-semibold">Speed:</span>&nbsp; {vehicle.speed} km/h
          </p>
          <p className="text-base text-slate-700 flex items-center">
            <GasPump className="mr-2 text-gray-500" />
            <span className="font-semibold">Fuel Level:</span>&nbsp; {vehicle.fuel_level}%
          </p>
          <p className="text-base text-slate-700 flex items-center">
            <CalendarCheck className="mr-2 text-gray-500" />
            <span className="font-semibold">Last Update:</span>&nbsp;
            {new Date(vehicle.timestamp).toLocaleString()}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-base text-slate-700 flex items-center">
            <MapPin className="mr-2 text-gray-500" />
            <span className="font-semibold">Latitude:</span>&nbsp; {vehicle.latitude}
          </p>
          <p className="text-base text-slate-700 flex items-center">
            <MapPin className="mr-2 text-gray-500 rotate-180" />
            <span className="font-semibold">Longitude:</span>&nbsp; {vehicle.longitude}
          </p>
          <p className="text-base text-slate-700 flex items-center">
            <Car className="mr-2 text-gray-500" />
            <span className="font-semibold">Odometer:</span>&nbsp; {vehicle.odometer} km
          </p>
        </div>
      </div>
    </div>
  );
}
