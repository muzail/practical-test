# Dokumentasi Instalasi dan Penggunaan Laravel dan React

## Instalasi dan Jalankan Laravel

1. **Clone Repository Laravel**
   - Clone branch `laravel` dari repository Anda:
     ```
     git clone -b laravel <URL-REPOSITORY-LARAVEL>
     cd <NAMA-FOLDER-LARAVEL>
     ```

2. **Instalasi Dependensi**
   - Install dependensi PHP dengan Composer:
     ```
     composer install
     ```

3. **Konfigurasi Environment**
   - Salin file `.env.example` menjadi `.env`:
     ```
     cp .env.example .env
     ```

4. **Generate Key Aplikasi**
   - Jalankan perintah untuk meng-generate key aplikasi:
     ```
     php artisan key:generate
     ```

5. **Konfigurasi JWT Secret**
   - Generate JWT secret dengan perintah berikut:
     ```
     php artisan jwt:secret
     ```

6. **Migrasi Database**
   - Jalankan migrasi untuk membuat tabel di database:
     ```
     php artisan migrate
     ```

7. **Jalankan Server**
   - Jalankan server Laravel:
     ```
     php artisan serve
     ```

8. **Testing**
   - Jalankan testing untuk aplikasi Laravel:
     ```
     php artisan test
     ```

## Instalasi dan Jalankan React

1. **Clone Repository React**
   - Clone branch `react` dari repository Anda:
     ```
     git clone -b react <URL-REPOSITORY-REACT>
     cd <NAMA-FOLDER-REACT>
     ```

2. **Instalasi Dependensi**
   - Install dependensi dengan npm:
     ```
     npm install
     ```

3. **Jalankan Aplikasi**
   - Jalankan aplikasi React:
     ```
     npm run dev
     ```
## Link Jawaban Teori
https://careful-island-bcb.notion.site/Assasment-8dd283eca95e495f9e4d98b33015f0f6



Sekian dokumentasi singkat untuk instalasi dan menjalankan Laravel dan React. Pastikan Anda mengikuti langkah-langkah di atas dengan urut untuk memastikan aplikasi berjalan dengan baik.
