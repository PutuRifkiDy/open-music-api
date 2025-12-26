User: Buatkan saya file README.md untuk proyek backend Open Music API menggunakan Hapi.js dan PostgreSQL. Tolong sertakan cara instalasi, cara setting .env, cara menjalankan migrasi database, dan daftar fitur utama.

Workspace: Collecting workspace information# Open Music API

Open Music API adalah backend aplikasi musik yang dibangun menggunakan Hapi.js, PostgreSQL sebagai database utama, Redis untuk caching, dan RabbitMQ untuk message queue. Aplikasi ini terdiri dari dua bagian utama: API server dan queue consumer untuk mengekspor playlist ke email.

## Fitur Utama

- **Manajemen Album**: CRUD (Create, Read, Update, Delete) album musik, termasuk upload cover gambar.
- **Manajemen Lagu**: CRUD lagu, dengan filter berdasarkan judul dan penyanyi.
- **Manajemen Pengguna**: Registrasi dan autentikasi pengguna dengan JWT (JSON Web Token).
- **Manajemen Playlist**: Buat, baca, dan hapus playlist, termasuk menambah/hapus lagu dari playlist.
- **Kolaborasi Playlist**: Tambahkan kolaborator ke playlist.
- **Like Album**: Pengguna dapat menyukai album, dengan hitungan like yang di-cache.
- **Eksport Playlist**: Ekspor playlist ke email dalam format JSON melalui message queue.
- **Caching**: Menggunakan Redis untuk mempercepat akses data album dan hitungan like.
- **Validasi**: Validasi input menggunakan Joi.
- **Error Handling**: Penanganan error yang konsisten dengan custom exceptions.

## Instalasi

### Prasyarat

Pastikan Anda telah menginstal:
- Node.js (versi 14 atau lebih tinggi)
- PostgreSQL
- Redis
- RabbitMQ

### Langkah Instalasi

1. **Clone Repository**:
   ```
   git clone <repository-url>
   cd open-music-api
   ```

2. **Instal Dependensi untuk API**:
   ```
   npm install
   ```

3. **Instal Dependensi untuk Queue Consumer**:
   ```
   cd ../openmusic-queue-consumer
   npm install
   cd ../open-music-api
   ```

## Konfigurasi Environment

Buat file `.env` di root folder open-music-api dan openmusic-queue-consumer berdasarkan contoh di bawah. Pastikan untuk mengganti nilai-nilai placeholder dengan konfigurasi Anda.

### Untuk .env

```
HOST=localhost
PORT=5000
PGHOST=localhost
PGPORT=5432
PGDATABASE=openmusic
PGUSER=your_db_user
PGPASSWORD=your_db_password
ACCESS_TOKEN_KEY=your_access_token_key
ACCESS_TOKEN_AGE=1800000
REFRESH_TOKEN_KEY=your_refresh_token_key
RABBITMQ_SERVER=amqp://localhost
REDIS_SERVER=localhost:6379
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

### Untuk .env

```
RABBITMQ_SERVER=amqp://localhost
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

**Catatan**:
- `ACCESS_TOKEN_KEY` dan `REFRESH_TOKEN_KEY` harus berupa string rahasia yang kuat.
- Untuk SMTP, gunakan app password jika menggunakan Gmail.
- Pastikan PostgreSQL, Redis, dan RabbitMQ berjalan di mesin lokal atau server yang sesuai.

## Migrasi Database

Proyek ini menggunakan `node-pg-migrate` untuk migrasi database. Pastikan database PostgreSQL telah dibuat sebelum menjalankan migrasi.

1. **Jalankan Migrasi**:
   ```
   npm run migrate up
   ```

   Ini akan membuat tabel-tabel berikut:
   - `albums`
   - `songs`
   - `users`
   - `authentications`
   - `playlists`
   - `playlist_songs`
   - `playlist_song_activities`
   - `collaborations`
   - `album_likes`

2. **Rollback Migrasi (jika diperlukan)**:
   ```
   npm run migrate down
   ```

## Menjalankan Aplikasi

### Jalankan API Server

```
npm start
```

Atau untuk development dengan auto-reload:
```
npm run start:dev
```

Server akan berjalan di `http://localhost:5000` (sesuai konfigurasi PORT).

### Jalankan Queue Consumer

```
cd ../openmusic-queue-consumer
npm run start-consume
```

Consumer akan mendengarkan queue `export:playlists` dan mengirim email ekspor playlist.

## Endpoint API Utama

Berikut adalah beberapa endpoint utama (dengan autentikasi JWT diperlukan untuk endpoint tertentu):

- **Albums**:
  - `POST /albums` - Tambah album
  - `GET /albums/{id}` - Dapatkan album berdasarkan ID
  - `PUT /albums/{id}` - Edit album
  - `DELETE /albums/{id}` - Hapus album
  - `POST /albums/{id}/covers` - Upload cover album
  - `POST /albums/{id}/likes` - Like album
  - `DELETE /albums/{id}/likes` - Unlike album
  - `GET /albums/{id}/likes` - Dapatkan jumlah like album

- **Songs**:
  - `POST /songs` - Tambah lagu
  - `GET /songs` - Dapatkan semua lagu (dengan query filter)
  - `GET /songs/{id}` - Dapatkan lagu berdasarkan ID
  - `PUT /songs/{id}` - Edit lagu
  - `DELETE /songs/{id}` - Hapus lagu

- **Users**:
  - `POST /users` - Registrasi pengguna

- **Authentications**:
  - `POST /authentications` - Login
  - `PUT /authentications` - Refresh token
  - `DELETE /authentications` - Logout

- **Playlists**:
  - `POST /playlists` - Buat playlist
  - `GET /playlists` - Dapatkan playlist pengguna
  - `DELETE /playlists/{id}` - Hapus playlist
  - `POST /playlists/{id}/songs` - Tambah lagu ke playlist
  - `GET /playlists/{id}/songs` - Dapatkan lagu di playlist
  - `DELETE /playlists/{id}/songs` - Hapus lagu dari playlist
  - `GET /playlists/{id}/activities` - Dapatkan aktivitas playlist

- **Collaborations**:
  - `POST /collaborations` - Tambah kolaborator
  - `DELETE /collaborations` - Hapus kolaborator

- **Exports**:
  - `POST /export/playlists/{playlistId}` - Ekspor playlist ke email

Untuk dokumentasi lengkap, gunakan tools seperti Postman atau Swagger.

## Testing

Jalankan linting untuk memeriksa kode:
```
npm run lint
```

## Lisensi

ISC License. Lihat file LICENSE untuk detail lebih lanjut.