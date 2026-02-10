# Aksamedia Technical Test - Full Stack Web Developer (Intern)

Aplikasi **Employee Management System** yang dibuat sebagai bagian dari **technical test Full Stack Web Developer (intern)** di PT Aksamedia Mulia Digital.

## 🌐 Live Demo

**Frontend (Demo Mode):** [https://aksamedia-technical-test-three.vercel.app/](https://aksamedia-technical-test-three.vercel.app/)

**Kredensial Login:**
```
Username: admin
Password: pastibisa
```

> **📌 Catatan Penting:** Aplikasi berjalan dalam **Demo Mode** dengan data disimpan di localStorage browser. Semua fitur CRUD fully functional. Backend tidak di-deploy karena keterbatasan biaya hosting berbayar (Railway, Render sudah tidak gratis), namun source code lengkap tersedia untuk di-review dan dijalankan di localhost.

## 📋 Deskripsi Proyek

Project ini mendemonstrasikan kemampuan dalam:
- ✅ Membangun REST API dengan Laravel 12 + Sanctum Authentication
- ✅ Integrasi Frontend React 19 dengan Backend API
- ✅ State management & persistence dengan Context API & query params
- ✅ Responsive design & Dark mode implementation
- ✅ CRUD operations dengan image upload
- ✅ Custom components tanpa UI library
- ✅ Deployment strategy dengan Demo Mode

## 🛠 Teknologi yang Digunakan

### Backend
- **Framework:** Laravel 12
- **Database:** MySQL/MariaDB
- **Authentication:** Laravel Sanctum (Token-based)
- **Image Storage:** Laravel Storage
- **PHP Version:** 8.2+

### Frontend
- **Library:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4 (Pure, no UI library)
- **HTTP Client:** Axios
- **Routing:** React Router DOM v7
- **State Management:** Context API

## ✨ Fitur yang Diimplementasikan

### Authentication
- [x] Login dengan username dan password
- [x] Token-based authentication (Laravel Sanctum)
- [x] Protected routes dengan middleware
- [x] Session persistence (tetap login setelah refresh)
- [x] Logout functionality

### Employee Management (CRUD)
- [x] Tambah karyawan baru dengan upload foto
- [x] Edit data karyawan (foto optional saat edit)
- [x] Hapus data karyawan dengan konfirmasi
- [x] List karyawan dengan pagination (10 items per page)
- [x] Search karyawan berdasarkan nama (real-time)
- [x] Filter karyawan berdasarkan divisi

### Division Management
- [x] List semua divisi dengan pagination
- [x] Search divisi berdasarkan nama
- [x] Display jumlah karyawan per divisi (optional)

### UI/UX Features
- [x] **Dark Mode / Light Mode / System Mode** dengan toggle
- [x] **Responsive design** (Mobile, Tablet, Desktop)
- [x] Custom dropdown component (no library)
- [x] State persistence dengan URL query string
- [x] Edit profile user (localStorage)
- [x] **Pure Tailwind CSS** - tanpa Bootstrap/MaterialUI/AntD
- [x] Loading states & error handling
- [x] Success/error notifications
- [x] Image preview sebelum upload

## 📦 Instalasi

### Prasyarat
- PHP >= 8.2
- Composer
- Node.js >= 18
- MySQL/MariaDB
- Git

### 🔧 Backend Setup

```bash
# Clone repository
git clone https://github.com/USERNAME/aksamedia-technical-test.git
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
mysql -u root -p
CREATE DATABASE aksamedia_db;
EXIT;

# Jalankan migration & seeder
php artisan migrate --seed

# Buat symbolic link untuk storage (penting untuk upload image)
php artisan storage:link

# Jalankan server
php artisan serve
```

Backend akan berjalan di: `http://127.0.0.1:8000`

### ⚛️ Frontend Setup

```bash
# Pindah ke folder frontend
cd ../frontend

# Install dependencies
npm install

# Buat file .env untuk development
echo "VITE_API_URL=http://127.0.0.1:8000/api" > .env
echo "VITE_DEMO_MODE=false" >> .env

# Jalankan development server
npm run dev
```

Frontend akan berjalan di: `http://localhost:5173`

## 🔑 Kredensial Default

Setelah menjalankan seeder:
```
Username: admin
Password: pastibisa
```

## 📁 Struktur Proyek

```
aksamedia-technical-test/
├── backend/                    # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── DivisionController.php
│   │   │   │   └── EmployeeController.php
│   │   │   ├── Middleware/
│   │   │   │   └── EnsureTokenIsNotValid.php
│   │   │   └── Requests/
│   │   │       ├── LoginRequest.php
│   │   │       └── EmployeeRequest.php
│   │   └── Models/
│   │       ├── Admin.php
│   │       ├── Division.php
│   │       └── Employee.php
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── *_create_admins_table.php
│   │   │   ├── *_create_divisions_table.php
│   │   │   └── *_create_employees_table.php
│   │   └── seeders/
│   │       ├── AdminSeeder.php
│   │       └── DivisionSeeder.php
│   ├── routes/
│   │   └── api.php
│   └── config/
│       └── cors.php
│
└── frontend/                   # React Frontend
    ├── src/
    │   ├── components/
    │   │   ├── Layout.jsx
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── contexts/
    │   │   ├── AuthContext.jsx
    │   │   └── ThemeContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Home.jsx
    │   │   ├── Employees.jsx
    │   │   ├── CreateEmployee.jsx
    │   │   ├── Divisions.jsx
    │   │   └── Profile.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   └── mockData.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env                    # Development (gitignored)
    ├── .env.production         # Production (committed)
    └── package.json
```

## 🚀 API Endpoints

### Authentication
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| POST | `/api/login` | ❌ | Login admin |
| POST | `/api/logout` | ✅ | Logout admin |

### Divisions
| Method | Endpoint | Auth | Query Params | Deskripsi |
|--------|----------|------|--------------|-----------|
| GET | `/api/divisions` | ✅ | `name`, `page` | Get all divisions |

### Employees
| Method | Endpoint | Auth | Query Params | Deskripsi |
|--------|----------|------|--------------|-----------|
| GET | `/api/employees` | ✅ | `name`, `division_id`, `page` | Get all employees |
| POST | `/api/employees` | ✅ | - | Create employee |
| PUT | `/api/employees/{id}` | ✅ | - | Update employee |
| DELETE | `/api/employees/{id}` | ✅ | - | Delete employee |

**Catatan:**
- Semua endpoint kecuali `/api/login` memerlukan token di header: `Authorization: Bearer {token}`
- `PUT /api/employees/{id}` bisa menggunakan `POST` dengan `_method=PUT` untuk support file upload

## 🧪 Testing

### Backend (Postman/cURL)

1. **Login:**
```bash
curl -X POST http://127.0.0.1:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"pastibisa"}'
```

2. **Get Employees (dengan token):**
```bash
curl -X GET http://127.0.0.1:8000/api/employees?page=1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

3. **Create Employee:**
```bash
curl -X POST http://127.0.0.1:8000/api/employees \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "name=John Doe" \
  -F "phone=081234567890" \
  -F "division=DIVISION_UUID" \
  -F "position=Developer" \
  -F "image=@/path/to/image.jpg"
```

### Frontend (Browser)

1. Buka `http://localhost:5173`
2. Login dengan kredensial default
3. Test CRUD operations:
   - ✅ Create employee dengan upload image
   - ✅ Search employee by name
   - ✅ Filter by division
   - ✅ Edit employee (image optional)
   - ✅ Delete employee dengan konfirmasi
4. Test UI features:
   - ✅ Toggle dark/light mode
   - ✅ Edit profile
   - ✅ Pagination
   - ✅ Responsive di mobile/tablet
   - ✅ Logout

## 🌍 Deployment

### Status Deployment

| Component | Status | URL | Catatan |
|-----------|--------|-----|---------|
| Frontend | ✅ Deployed | [aksamedia-technical-test-tan.vercel.app](https://aksamedia-technical-test-tan.vercel.app/) | Demo Mode aktif |
| Backend | ❌ Not Deployed | - | Source code available |

### Mengapa Backend Tidak Di-Deploy?

Backend **tidak di-deploy** karena:
1. **Biaya Hosting:** Railway, Render, dan Heroku sudah tidak menyediakan free tier untuk database
2. **Keterbatasan Budget:** Sebagai technical test, biaya hosting bulanan tidak memungkinkan
3. **Source Code Lengkap:** Seluruh kode backend tersedia dan dapat di-review dengan mudah
4. **Demo Mode Alternative:** Frontend di-deploy dengan mock API yang fully functional

### Cara Deploy (Jika Diperlukan)

#### Backend ke Railway/Render:
1. Push ke GitHub
2. Connect repository ke Railway/Render
3. Setup environment variables
4. Setup MySQL database
5. Run migration & seeder

#### Frontend ke Vercel:
```bash
cd frontend

# Build untuk production (otomatis pakai .env.production)
npm run build

# Deploy manual
vercel --prod

# Atau push ke Git (auto-deploy jika sudah connect)
git push origin main
```

## 🔐 Security Features

- ✅ Token-based authentication dengan Laravel Sanctum
- ✅ Password hashing dengan bcrypt
- ✅ CORS configuration untuk cross-origin requests
- ✅ Form validation di frontend dan backend
- ✅ Protected routes dengan middleware
- ✅ File upload validation (type & size)
- ✅ SQL injection prevention (Eloquent ORM)

## 📝 Catatan Tambahan

### Mengapa Pure Tailwind CSS?

Saya menggunakan **Pure Tailwind CSS** tanpa UI library (Bootstrap/MaterialUI/AntD) karena:
1. Memenuhi requirement technical test
2. Mendemonstrasikan kemampuan custom styling
3. Kontrol penuh terhadap design
4. Performa lebih baik (tidak load library besar)

### Mengapa Demo Mode?

Demo Mode diimplementasikan untuk:
1. Memberikan **live preview** yang bisa diakses reviewer tanpa setup
2. Menunjukkan **full functionality** meskipun backend tidak di-host
3. **Cost-effective** solution untuk presentasi technical test
4. Mendemonstrasikan kemampuan **problem solving** dengan keterbatasan resource

### State Persistence

Aplikasi menggunakan **URL query string** untuk state persistence:
- Search: `?search=john`
- Filter: `?division_id=uuid`
- Pagination: `?page=2`
- Kombinasi: `?search=john&division_id=uuid&page=2`

Benefit: URL bisa di-bookmark dan shared, state tetap ada setelah refresh.

## 🤝 Contact

Jika ada pertanyaan atau ingin diskusi lebih lanjut:

- **Email:** septiansamdani05@gmail.com
- **GitHub:** [github.com/SeptianSamdani](https://github.com/SeptianSamdani)
- **LinkedIn:** [linkedin.com/in/septian-samdani](https://linkedin.com/in/septian-samdani)

## 📄 License

Proyek ini dibuat untuk keperluan technical test dan tidak memiliki lisensi khusus.

---

**Dibuat dengan ❤️ untuk PT Aksamedia Mulia Digital**

*Last Updated: February 10, 2026*
