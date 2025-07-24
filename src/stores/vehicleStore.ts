// src/stores/vehicleStore.ts
import { create } from 'zustand';
import { getVehicles } from '@/api/vehicleApi';

interface Vehicle {
  id: number;
  name: string;
  status: string;
  speed: number;
  updated_at: string;
}

interface VehicleStore {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  fetchVehicles: () => void;
}

export const useVehicleStore = create<VehicleStore>((set) => ({
  vehicles: [],
  loading: false,
  error: null,
  fetchVehicles: async () => {
    set({ loading: true, error: null });
    try {
      const result = await getVehicles();
      set({ vehicles: result as Vehicle[], loading: false });
    } catch (err) {
      set({ error: String(err), loading: false });
    }
  },
}));
