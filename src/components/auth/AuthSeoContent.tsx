// Server component — konten SEO statis untuk halaman auth.
// Menambah word count (>300), kedalaman heading h2→h6, dan gambar lazy-load.

export default function AuthSeoContent() {
  return (
    <section
      aria-labelledby="auth-seo-title"
      className="page-dark border-t border-white/5"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="Logo SewaApartement"
            width={40}
            height={40}
            loading="lazy"
            className="w-10 h-10 flex-shrink-0"
          />
          <h2
            id="auth-seo-title"
            className="font-heading font-black text-white text-2xl"
          >
            Akun Pemilik SewaApartement
          </h2>
        </div>
        <p className="text-white/70 leading-relaxed">
          Akun pemilik memberi Anda kendali penuh untuk memasarkan apartemen di
          seluruh JABODETABEK. Setelah masuk, Anda dapat menambahkan listing
          baru, memperbarui harga, mengunggah foto unit, serta memantau minat
          calon penyewa dari satu dashboard yang rapi. Platform ini
          menghubungkan Anda langsung dengan penyewa tanpa perantara, sehingga
          komunikasi lebih cepat dan biaya lebih hemat.
        </p>

        <h3 className="font-heading font-bold text-white text-xl">
          Kenapa Mendaftar sebagai Pemilik
        </h3>
        <p className="text-white/70 leading-relaxed">
          Ribuan pencari apartemen mengunjungi SewaApartement setiap bulan untuk
          mencari hunian di Jakarta, Bogor, Depok, Tangerang, dan Bekasi. Dengan
          memasang iklan, unit Anda tampil di hasil pencarian yang relevan dan
          dilengkapi tombol kontak WhatsApp langsung. Pendaftaran gratis dan
          hanya butuh beberapa menit.
        </p>

        <h4 className="font-heading font-semibold text-white text-lg">
          Kelola Listing dengan Mudah
        </h4>
        <p className="text-white/70 leading-relaxed">
          Dashboard pemilik menyajikan ringkasan performa setiap listing, mulai
          dari jumlah tampilan hingga jumlah penyewa yang menghubungi. Anda bisa
          mengaktifkan atau menonaktifkan unit kapan saja sesuai ketersediaan.
        </p>

        <h5 className="font-heading font-semibold text-white text-base">
          Keamanan dan Privasi Data
        </h5>
        <p className="text-white/70 leading-relaxed">
          Kami menjaga informasi akun Anda tetap aman. Gunakan kata sandi yang
          kuat dan jangan bagikan kredensial kepada siapa pun. Jika lupa kata
          sandi, fitur pemulihan tersedia untuk membantu Anda kembali masuk
          dengan cepat.
        </p>

        <h6 className="font-heading font-semibold text-white/80 text-sm uppercase tracking-wide">
          Butuh Bantuan?
        </h6>
        <p className="text-white/70 leading-relaxed">
          Tim dukungan SewaApartement siap membantu proses pendaftaran maupun
          pengelolaan iklan. Hubungi kami melalui halaman kontak kapan pun Anda
          mengalami kendala saat masuk atau memasang listing apartemen.
        </p>
      </div>
    </section>
  );
}
