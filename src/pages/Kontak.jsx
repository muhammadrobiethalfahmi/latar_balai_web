import { useState } from 'react';

export default function Kontak() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build WhatsApp message from form data
    const subjectMap = {
      wisata: 'Informasi Wisata',
      edukasi: 'Program Edukasi',
      produk: 'Produk Desa',
      lainnya: 'Lainnya',
    };

    let waMessage = `*PESAN BARU - LATAR BALE MULYOARJO*\n\n`;
    waMessage += `*Dari:* ${formData.name}\n`;
    waMessage += `*Email:* ${formData.email}\n`;
    waMessage += `*Subjek:* ${subjectMap[formData.subject] || formData.subject}\n\n`;
    waMessage += `*Pesan:*\n${formData.message}`;

    const encodedMessage = encodeURIComponent(waMessage);
    window.open(`https://wa.me/6285808805840?text=${encodedMessage}`, '_blank');

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main>
      {/* Header Section */}
      <section className="pt-16 md:pt-24 pb-8 md:pb-12 px-4 md:px-8 max-w-[1280px] mx-auto text-center">
        <span className="text-tertiary font-sans font-bold text-xs uppercase tracking-widest block mb-4">
          Mari Berbincang
        </span>
        <h1 className="font-heading font-bold text-3xl md:text-5xl text-primary mb-6">
          Hubungi Kami
        </h1>
        <p className="font-sans text-lg text-on-surface-variant max-w-2xl mx-auto">
          Kami siap membantu Anda merencanakan kunjungan, menjawab pertanyaan seputar program
          edukasi, atau membantu pemesanan produk desa.
        </p>
      </section>

      {/* Main Content Layout */}
      <section className="px-4 md:px-8 max-w-[1280px] mx-auto pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Contact Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/20 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-primary mb-2">Alamat</h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    Jl. Raya Desa Mulyoarjo No. 12
                    <br />
                    Kecamatan Lawang, Kabupaten Malang
                    <br />
                    Jawa Timur, 65216
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/20 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-primary mb-2">
                    Telepon / WhatsApp
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant mb-1">
                    +62 858-0880-5840
                  </p>
                  <a
                    className="text-tertiary font-bold text-sm hover:underline"
                    href="https://wa.me/6285808805840"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hubungi via WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/20 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-primary mb-2">Email</h3>
                  <p className="font-sans text-sm text-on-surface-variant">
                    info@mulyoarjo.desa.id
                  </p>
                </div>
              </div>
            </div>

            {/* Operational Hours */}
            <div className="bg-primary p-8 rounded-xl text-on-primary shadow-lg mt-2">
              <h3 className="font-heading font-bold text-lg mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">schedule</span>
                Jam Operasional
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-on-primary/20 pb-2">
                  <span className="font-sans text-sm">Kantor Desa</span>
                  <span className="font-sans font-semibold text-sm">Senin - Jumat: 08:00 - 15:00</span>
                </div>
                <div className="flex justify-between border-b border-on-primary/20 pb-2">
                  <span className="font-sans text-sm">Area Wisata</span>
                  <span className="font-sans font-semibold text-sm">Setiap Hari: 07:00 - 17:00</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="font-sans text-sm">Pusat Edukasi</span>
                  <span className="font-sans font-semibold text-sm">Sesuai Jadwal Reservasi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form & Map */}
          <div className="lg:col-span-7 space-y-8">
            {/* Contact Form */}
            <div className="bg-surface p-8 rounded-xl border border-outline-variant/30 shadow-sm relative overflow-hidden">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

              <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-6 relative z-10">
                Kirim Pesan
              </h2>

              {/* Success Message */}
              {submitted && (
                <div className="mb-6 bg-primary/10 border border-primary/20 text-primary rounded-lg px-4 py-3 flex items-center gap-2 relative z-10">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  <span className="font-sans text-sm font-semibold">
                    Pesan berhasil dikirim! Kami akan segera menghubungi Anda.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block font-sans font-semibold text-sm text-on-surface-variant mb-2"
                      htmlFor="contact-name"
                    >
                      Nama Lengkap
                    </label>
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama Anda"
                      type="text"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block font-sans font-semibold text-sm text-on-surface-variant mb-2"
                      htmlFor="contact-email"
                    >
                      Alamat Email
                    </label>
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contoh@email.com"
                      type="email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block font-sans font-semibold text-sm text-on-surface-variant mb-2"
                    htmlFor="contact-subject"
                  >
                    Subjek
                  </label>
                  <select
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Pilih topik pertanyaan...
                    </option>
                    <option value="wisata">Informasi Wisata</option>
                    <option value="edukasi">Program Edukasi</option>
                    <option value="produk">Produk Desa</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block font-sans font-semibold text-sm text-on-surface-variant mb-2"
                    htmlFor="contact-message"
                  >
                    Pesan
                  </label>
                  <textarea
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button
                  className="w-full bg-primary text-on-primary font-sans font-bold text-sm py-4 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex justify-center items-center gap-2 cursor-pointer shadow-sm"
                  type="submit"
                >
                  Kirim Pesan
                  <span className="material-symbols-outlined text-lg">send</span>
                </button>
              </form>
            </div>

            {/* Map Section */}
            <div className="rounded-xl overflow-hidden border border-outline-variant/30 h-[400px] relative group">
              <iframe
                title="Lokasi Desa Mulyoarjo"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15806.54!2d112.6937!3d-7.8525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629c21c2cde03%3A0x8a6f5b6b9e8c0c0!2sLawang%2C%20Malang%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Overlay for visual appeal */}
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>

              <a
                className="absolute bottom-6 right-6 bg-surface text-primary px-6 py-3 rounded-lg shadow-lg font-sans font-bold text-sm hover:-translate-y-1 transition-transform flex items-center gap-2"
                href="https://maps.app.goo.gl/lawang-malang"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buka di Google Maps
                <span className="material-symbols-outlined text-lg">open_in_new</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
