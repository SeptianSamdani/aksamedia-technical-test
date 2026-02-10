# Aksamedia Technical Test - Full Stack Web Developer (Intern)

Aplikasi **Employee Management System** yang dibuat sebagai bagian dari **technical test Full Stack Web Developer (intern)** di PT Aksamedia Mulia Digital.

## Deskripsi Proyek

Project ini bertujuan untuk menunjukkan kemampuan dalam:
- Membangun REST API dengan Laravel
- Mengintegrasikan frontend React dengan backend API
- Menerapkan authentication, authorization, dan state management
- Menyusun struktur kode yang rapi, scalable, dan mudah dipahami

## Teknologi yang Digunakan

### Backend
- Laravel 12
- MySQL/MariaDB
- Laravel Sanctum (Authentication)
- PHP 8.2+

### Frontend
- React.js 19
- Vite
- Tailwind CSS 4
- Axios
- React Router DOM

## Fitur Utama

### Authentication
- Login dengan username dan password
- Token-based authentication (Laravel Sanctum)
- Protected routes
- Session persistence (tetap login setelah refresh)
- Logout functionality

### Employee Management (CRUD)
- Tambah karyawan baru dengan upload foto
- Edit data karyawan
- Hapus data karyawan
- List karyawan dengan pagination
- Search karyawan berdasarkan nama
- Filter karyawan berdasarkan divisi

### Division Management
- List semua divisi
- Search divisi berdasarkan nama
- Pagination

### UI/UX Features
- Dark Mode / Light Mode / System Mode
- Responsive design (desktop, tablet, mobile)
- Custom dropdown tanpa library
- State persistence dengan query string
- Edit profile user
- Pure Tailwind CSS (tanpa UI library)

## Instalasi

### Prasyarat
- PHP >= 8.2
- Composer
- Node.js >= 18
- MySQL/MariaDB
- Git

### Backend Setup
```bash
# Clone repository
git clone <repository-url>
cd aksamedia-technical-test/backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Konfigurasi database di file .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=aksamedia_db
DB_USERNAME=root
DB_PASSWORD=

# Buat database
# Buka phpMyAdmin atau MySQL CLI, lalu jalankan:
# CREATE DATABASE aksamedia_db;

# Jalankan migration
php artisan migrate

# Jalankan seeder
php artisan db:seed

# Buat symbolic link untuk storage
php artisan storage:link

# Jalankan server
php artisan serve
```

Backend akan berjalan di `http://127.0.0.1:8000`

### Frontend Setup
```bash
# Pindah ke folder frontend
cd ../frontend

# Install dependencies
npm install

# Copy environment file (jika ada .env.example)
# Atau buat file .env baru dengan isi:
# VITE_API_URL=http://127.0.0.1:8000/api

# Jalankan development server
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

## Kredensial Default
```
Username: admin
Password: pastibisa
```

## Struktur Folder
```
aksamedia-technical-test/
├── backend/                 # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/
│   │   │   ├── Middleware/
│   │   │   └── Requests/
│   │   └── Models/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/
│       └── api.php
│
└── frontend/               # React Frontend
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   ├── services/
    │   └── App.jsx
    └── package.json
```

## API Endpoints

### Authentication
- `POST /api/login` - Login
- `POST /api/logout` - Logout (requires auth)

### Divisions
- `GET /api/divisions` - Get all divisions (requires auth)
  - Query params: `name` (filter), `page` (pagination)

### Employees
- `GET /api/employees` - Get all employees (requires auth)
- Query params: `name` (search), `division_id` (filter), `page` (pagination)
- `POST /api/employees` - Create employee (requires auth)
- `PUT /api/employees/{id}` - Update employee (requires auth)
- `DELETE /api/employees/{id}` - Delete employee (requires auth)

## Testing

### Backend (Postman)
1. Import collection atau test manual
2. Login di `POST /api/login` untuk mendapatkan token
3. Gunakan token di header `Authorization: Bearer {token}`
4. Test semua endpoint CRUD

### Frontend (Browser)
1. Buka `http://localhost:5173`
2. Login dengan kredensial default
3. Test semua fitur:
   - CRUD employees
   - Search & filter
   - Pagination
   - Dark mode toggle
   - Edit profile
   - Logout

## Catatan Deployment

Aplikasi ini dijalankan pada **environment lokal (localhost)** untuk keperluan technical test.

Seluruh source code dan panduan instalasi telah disediakan secara lengkap sehingga aplikasi dapat dijalankan dan diuji dengan mudah. Dari sisi teknis, struktur aplikasi telah disiapkan dengan pendekatan **production-ready**.

### Kesiapan Deployment
Apabila diperlukan, aplikasi dapat di-deploy dengan langkah umum berikut:
- **Backend**: Deploy ke shared hosting / VPS / Railway / Render, konfigurasi CORS, setup database production, lalu jalankan migration & seeder.
- **Frontend**: Build dengan `npm run build`, deploy ke Vercel / Netlify, dan sesuaikan `VITE_API_URL`.
- **Database**: Gunakan database production dan sesuaikan environment variables.

## Fitur yang Sudah Diimplementasikan

- Login & Logout dengan API
- CRUD Employees dengan API integration
- Upload & delete image
- Search & filter employees
- Pagination dengan query string persistence
- Protected routes
- Dark mode / Light mode / System mode
- Edit profile user (localStorage)
- Responsive design (mobile, tablet, desktop)
- Pure Tailwind CSS (no UI library)
- Custom dropdown component
- State persistence setelah refresh
- Form validation
- Error handling

## Screenshot

### Login Page
![Login](screenshots/login.jpg)

### Employee List
![Employees](screenshots/employees.png)

### Dark Mode
![Dark Mode](screenshots/dark-mode.png)

## Lisensi

Proyek ini dibuat untuk keperluan technical test dan tidak memiliki lisensi khusus.

---

**Catatan:** Proyek ini dikembangkan sebagai bagian dari technical test dan telah mengimplementasikan seluruh requirement fungsional yang diminta. Aplikasi saat ini dijalankan pada environment lokal karena keterbatasan resource untuk penyediaan hosting berbayar, namun secara teknis telah disiapkan dan siap untuk di-deploy apabila diperlukan.