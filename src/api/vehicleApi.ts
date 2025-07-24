// src/api/vehicleApi.ts

import { vehicles } from '../mocks/vehicles';
import { vehicleDetail } from '../mocks/vehicleDetail';

export const getVehicles = async () => {
  // simulasi delay 500ms
  return new Promise((resolve) => {
    setTimeout(() => resolve(vehicles), 500);
  });
};

export const getVehicleById = async (id: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (vehicleDetail.vehicleId === id) {
        resolve(vehicleDetail);
      } else {
        reject('Vehicle not found');
      }
    }, 500);
  });
};
