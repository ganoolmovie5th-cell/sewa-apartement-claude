import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cari Apartemen Sewa di JABODETABEK",
  description:
    "Telusuri 2.940+ apartemen sewa terverifikasi di Jakarta, Bogor, Depok, Tangerang, dan Bekasi. Filter berdasarkan kota, tipe unit, harga, dan fasilitas.",
  alternates: { canonical: "/listings" },
};

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* Konten SEO statis — kedalaman heading h2→h6 (no-skip) untuk crawler */}
      <section
        aria-labelledby="listings-seo-title"
        className="page-dark border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-4">
          <h2
            id="listings-seo-title"
            className="font-heading font-black text-white text-2xl"
          >
            Tips Memilih Apartemen Sewa di JABODETABEK
          </h2>
          <p className="text-white/70 leading-relaxed">
            Memilih apartemen yang tepat berarti menyeimbangkan lokasi,
            anggaran, dan fasilitas. Gunakan filter di atas untuk mempersempit
            pilihan, lalu bandingkan beberapa unit sebelum menghubungi pemilik.
          </p>

          <h3 className="font-heading font-bold text-white text-xl">
            Tentukan Lokasi dan Akses Transportasi
          </h3>
          <p className="text-white/70 leading-relaxed">
            Pertimbangkan jarak ke kantor, kampus, atau stasiun KRL dan MRT.
            Apartemen di Jakarta umumnya lebih dekat pusat kota, sementara
            Tangerang, Bekasi, Depok, dan Bogor menawarkan harga lebih bersaing
            dengan akses tol dan commuter line.
          </p>

          <h4 className="font-heading font-semibold text-white text-lg">
            Sesuaikan Tipe Unit dengan Kebutuhan
          </h4>
          <p className="text-white/70 leading-relaxed">
            Studio ideal untuk individu atau mahasiswa, unit satu kamar cocok
            untuk pasangan muda, sedangkan dua atau tiga kamar pas untuk
            keluarga. Periksa luas, lantai, dan arah hadap unit pada detail
            listing.
          </p>

          <h5 className="font-heading font-semibold text-white text-base">
            Periksa Fasilitas dan Biaya Tambahan
          </h5>
          <p className="text-white/70 leading-relaxed">
            Pastikan fasilitas seperti WiFi, parkir, kolam renang, dan keamanan
            24 jam sesuai kebutuhan. Tanyakan biaya layanan, deposit, dan
            ketentuan durasi sewa langsung kepada pemilik agar tidak ada kejutan
            di kemudian hari.
          </p>

          <h6 className="font-heading font-semibold text-white/80 text-sm uppercase tracking-wide">
            Hubungi Pemilik Tanpa Perantara
          </h6>
          <p className="text-white/70 leading-relaxed">
            Setiap listing menampilkan kontak pemilik sehingga Anda bisa
            bertanya langsung soal ketersediaan dan harga melalui WhatsApp.
            Proses lebih cepat, transparan, dan tanpa biaya komisi tambahan.
          </p>
        </div>
      </section>
    </>
  );
}
