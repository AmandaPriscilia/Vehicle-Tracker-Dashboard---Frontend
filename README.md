# Vehicle Tracker Dashboard

## Gambaran Umum
Dashboard untuk memantau armada kendaraan yang dibangun dengan teknologi:

- React + TypeScript (Vite)
- TailwindCSS untuk styling
- Zustand untuk manajemen state
- Komponen ShadCN UI
- React Router untuk navigasi

## Fitur Utama
- Menampilkan daftar kendaraan dengan status terkini
- Detail informasi telemetri setiap kendaraan
- Tampilan responsif untuk perangkat mobile dan desktop
- Penanganan loading dan error state
- Filter dan sorting data kendaraan

## Cara Menggunakan

1. Clone repository:
```
git clone https://github.com/AmandaPriscilia/Vehicle-Tracker-Dashboard---Frontend.git
cd Vehicle-Tracker-Dashboard---Frontend
```

2. Install dependencies:
```
npm install
```

3. Jalankan aplikasi:
```
npm run dev
```

Buka http://localhost:3000 di browser Anda.

## Konfigurasi API

Secara default menggunakan mock data. Untuk menggunakan API sungguhan:

1. Buat file .env di root project:
```
VITE_API_URL=https://api.example.com
```

2. Update file src/api/vehicleApi.ts:
```typescript
const API_URL = import.meta.env.VITE_API_URL;

export const getVehicles = async () => {
  const response = await fetch(`${API_URL}/vehicles`);
  // ...
};
```

## Struktur Project

```
src/
  api/          # Layer API 
  components/   # Komponen UI
  pages/        # Halaman aplikasi
  stores/       # Global state
  types/        # Type definitions
  App.tsx       # Komponen utama
  main.tsx      # Entry point
```

## Testing

Jalankan test:
```
npm run dev
```


## Catatan

- Saat ini menggunakan data dummy untuk simulasi
- Untuk penggunaan real, sesuaikan endpoint API
