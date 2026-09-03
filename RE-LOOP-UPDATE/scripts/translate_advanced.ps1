$replacements = @{
    "Analisis AI Review Intelligence, riwayat harga, dan perbandingan harga termurah" = "AI Review Intelligence analysis, price history, and lowest price comparison"
    "Kelebihan Utama" = "Key Pros"
    "Kekurangan Utama" = "Key Cons"
    "Kualitas kamera meningkat drastis dalam kondisi minim cahaya." = "Camera quality dramatically improved in low-light conditions."
    "Daya tahan baterai kami uji capai seharian penuh." = "Our tests show battery life lasts a full day."
    "Desain port USB-C baru mempermudah mobilitas & pengisian daya." = "New USB-C port design eases mobility & charging."
    "Suhu bodi terasa agak hangat saat pengisian daya cepat (fast charging)." = "Body temperature feels slightly warm during fast charging."
    "Kabel bawaan paket penjualan terasa agak kaku." = "The included cable feels a bit stiff."
    "Harga masih relatif tinggi jika tanpa voucher promo perbandingan." = "Price is still relatively high without comparison promo vouchers."
    "Perbandingan Harga 6 Bulan Terakhir" = "Price Comparison Over the Last 6 Months"
    "Tren Harga: Turun 14%" = "Price Trend: Down 14%"
    "Januari 2024 - Sekarang" = "January 2024 - Now"
    "Mei" = "May"
    "Harga produk ini saat ini berada di <strong>titik terendah kuartal ini</strong>." = "The price of this product is currently at its <strong>lowest point this quarter</strong>."
    "Berdasarkan estimasi pola tren diskon dan algoritma Re-Loop, kami menyarankan membeli sekarang sebelum potensi kenaikan menjelang pergantian musim." = "Based on estimated discount trend patterns and Re-Loop algorithms, we recommend buying now before potential increases heading into the new season."
    "Analisis sentimen dan reviews komprehensif dari ribuan pembeli" = "Comprehensive sentiment analysis and reviews from thousands of buyers"
    "dari 147 reviews di marketplace menyatakan puas atau sangat puas." = "of 147 marketplace reviews express satisfaction or high satisfaction."
    "reviews Pelanggan Terverifikasi" = "Verified Customer Reviews"
    "100% Marketplace Asli" = "100% Authentic Marketplace"
    "Kamera bagus banget, jauh peningkatannya dari seri sebelumnya. Performa super ngebut buat multitasking editing video dan gaming. Sangat worth it beli di toko official lewat link perbandingan Re-Loop!" = "The camera is really good, a huge improvement from the previous series. Super fast performance for multitasking, video editing, and gaming. Highly worth buying from official stores via Re-Loop comparison links!"
    "Desain amat rapi & ketahanan baterainya luar biasa keren! iPhone 15 beneran nyaman banget di genggaman tangan. Platform Re-Loop beneran memudahkan buat dapet penawaran toko dengan promo diskon terbaik." = "Very neat design & incredibly cool battery life! iPhone 15 is truly comfortable to hold. Re-Loop really makes it easy to get store offers with the best promo discounts."
    "Smart comparing platform marketplace di Indonesia. Beli produk impian dengan analisa review AI dan rekomendasi harga termurah." = "Smart marketplace comparison platform in Indonesia. Buy your dream products with AI review analysis and lowest price recommendations."
    "Perbandingan Harga Real-Time" = "Real-Time Price Comparison"
    
    "Belum Punya Akun\?" = "Don't Have an Account?"
    "Sudah punya akun\?" = "Already have an account?"
    "Masuk ke Akun Anda" = "Log in to Your Account"
    "Daftar Akun Baru" = "Register New Account"
    "Alamat Email" = "Email Address"
    "Kata Sandi" = "Password"
    "Masuk Sekarang" = "Log In Now"
    "Daftar Sekarang" = "Register Now"
    "Atau masuk dengan" = "Or log in with"
    "Lupa kata sandi\?" = "Forgot password?"
    
    "Mari Kenalan!" = "Let's Get to Know Each Other!"
    "Platform pintar ini butuh sedikit info untuk memberikan rekomendasi belanja terbaik buat Anda." = "This smart platform needs a little info to give you the best shopping recommendations."
    "Lanjutkan" = "Continue"
    "Apa kategori belanja favorit Anda\?" = "What is your favorite shopping category?"
    "Pilih maksimal 3 kategori" = "Select up to 3 categories"
    "Selesai & Mulai Belanja" = "Finish & Start Shopping"
    "Pilih setidaknya 1 kategori untuk melanjutkan" = "Select at least 1 category to continue"
    "Rekomendasi Pintar Siap!" = "Smart Recommendations Ready!"
    
    "Pengaturan Akun" = "Account Settings"
    "Profil Saya" = "My Profile"
    "Riwayat Pesanan" = "Order History"
    "Wishlist" = "Wishlist"
    "Simpan Perubahan" = "Save Changes"
    "Nama Lengkap" = "Full Name"
    "Ubah Foto" = "Change Photo"
    "Keluar" = "Log Out"
    "Informasi Akun" = "Account Information"
    "Alamat Pengiriman Utama" = "Primary Shipping Address"
    "Tambah Alamat" = "Add Address"
    
    "Selengkapnya" = "See More"
    "Tampilkan Lebih Sedikit" = "Show Less"
    "Urutkan:" = "Sort by:"
    "Harga Terendah" = "Lowest Price"
    "Harga Tertinggi" = "Highest Price"
    "Paling Relevan" = "Most Relevant"
    "Terbaru" = "Newest"
    
    "lang=""id""" = "lang=""en"""
}

Get-ChildItem -Filter *.html -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    foreach ($key in $replacements.Keys) {
        $content = $content -replace [regex]::Escape($key), $replacements[$key]
    }
    Set-Content -Path $_.FullName -Value $content -Encoding UTF8
}
