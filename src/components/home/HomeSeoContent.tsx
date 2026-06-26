// Server component — konten SEO statis untuk homepage.
// Menyediakan kedalaman heading h2→h6 (no-skip) + word count untuk crawler.
// Tidak ada 'use client' karena murni teks, aman dari hydration/error boundary.

export default function HomeSeoContent() {
  return (
    <section
      aria-labelledby="home-seo-title"
      className="bg-dark-900 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-5">
        <h2
          id="home-seo-title"
          className="font-heading font-black text-white text-2xl md:text-3xl"
        >
          Platform Sewa Apartemen Terlengkap di JABODETABEK
        </h2>
        <p className="text-white/70 leading-relaxed">
          SewaApartement menghubungkan penyewa langsung dengan pemilik apartemen
          tepercaya di Jakarta, Bogor, Depok, Tangerang, dan Bekasi. Lebih dari
          2.940 unit terverifikasi tersedia, mulai dari studio terjangkau untuk
          mahasiswa hingga unit dua atau tiga kamar untuk keluarga. Setiap
          listing dilengkapi foto asli, harga transparan, dan kontak pemilik
          tanpa perantara sehingga proses sewa jadi cepat dan jelas.
        </p>

        <h3 className="font-heading font-bold text-white text-xl">
          Pilihan untuk Setiap Kebutuhan Tempat Tinggal
        </h3>
        <p className="text-white/70 leading-relaxed">
          Baik Anda mencari hunian dekat kampus, akses cepat ke pusat bisnis,
          atau lingkungan ramah keluarga, filter pencarian kami membantu
          menyaring berdasarkan kota, tipe unit, rentang harga, durasi sewa, dan
          fasilitas. Bandingkan beberapa apartemen sekaligus sebelum memutuskan,
          lalu hubungi pemilik melalui WhatsApp hanya dalam satu ketukan.
        </p>

        <h4 className="font-heading font-semibold text-white text-lg">
          Sewa Harian, Bulanan, hingga Tahunan
        </h4>
        <p className="text-white/70 leading-relaxed">
          Fleksibilitas durasi membuat platform ini cocok untuk perjalanan
          dinas singkat maupun kontrak jangka panjang. Harga ditampilkan apa
          adanya tanpa biaya tersembunyi, lengkap dengan rating dan ulasan dari
          sumber tepercaya seperti Booking.com, Agoda, dan Google Maps.
        </p>

        <h5 className="font-heading font-semibold text-white text-base">
          Lima Kota JABODETABEK dalam Satu Pencarian
        </h5>
        <p className="text-white/70 leading-relaxed">
          Jakarta menawarkan apartemen strategis dekat pusat kota, Tangerang dan
          Bekasi menghadirkan pilihan modern dengan harga bersaing, sementara
          Depok dan Bogor cocok untuk hunian yang lebih tenang. Semua area dapat
          ditelusuri dari satu halaman.
        </p>

        <h6 className="font-heading font-semibold text-white/80 text-sm uppercase tracking-wide">
          Mulai Cari Apartemen Sekarang
        </h6>
        <p className="text-white/70 leading-relaxed">
          Jelajahi daftar lengkap di halaman listing, simpan favorit Anda, dan
          mulai percakapan dengan pemilik. SewaApartement memudahkan pencarian
          tempat tinggal yang aman, nyaman, dan sesuai anggaran di seluruh
          JABODETABEK.
        </p>
      </div>
    </section>
  );
}
