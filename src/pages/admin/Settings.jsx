import React, { useEffect, useState } from "react";
import {
  getSettings,
  saveSettings,
} from "../../services/settingsService";

import { uploadImage } from "../../services/cloudinaryService";

const DEFAULT_FORM = {
  siteName: "Latar Balai",
  logo: "",

  contact: {
    phone: "",
    email: "",
    address: "",
    maps: "",

    toko: {
      name: "",
      whatsapp: "",
    },

    kontak: {
      name: "",
      whatsapp: "",
    },
  },

  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },

  hero: {
    home: {
      title: "",
      subtitle: "",
      image: "",
    },

    tourism: {
      title: "",
      subtitle: "",
      image: "",
    },

    education: {
      title: "",
      subtitle: "",
      image: "",
    },

    marketplace: {
      title: "",
      subtitle: "",
      image: "",
    },

    contact: {
      title: "",
      subtitle: "",
      image: "",
    },
  },
};

const HERO_LABELS = {
  home: "Beranda",
  tourism: "Wisata",
  education: "Edukasi",
  marketplace: "Toko",
  contact: "Kontak",
};

export default function Settings() {
  const [formData, setFormData] = useState(DEFAULT_FORM);

  const [activeSection, setActiveSection] = useState("general");
  const [activeHero, setActiveHero] = useState("home");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // =========================================================
  // LOAD SETTINGS
  // =========================================================

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);

      const data = await getSettings();

      if (data) {
        setFormData({
          ...DEFAULT_FORM,
          ...data,

          contact: {
            ...DEFAULT_FORM.contact,
            ...data.contact,

            toko: {
              ...DEFAULT_FORM.contact.toko,
              ...data.contact?.toko,
            },

            kontak: {
              ...DEFAULT_FORM.contact.kontak,
              ...data.contact?.kontak,
            },
          },

          operational: {
            ...DEFAULT_FORM.operational,
            ...data.operational,
          },

          social: {
            ...DEFAULT_FORM.social,
            ...data.social,
          },

          hero: {
            ...DEFAULT_FORM.hero,
            ...data.hero,

            home: {
              ...DEFAULT_FORM.hero.home,
              ...data.hero?.home,
            },

            tourism: {
              ...DEFAULT_FORM.hero.tourism,
              ...data.hero?.tourism,
            },

            education: {
              ...DEFAULT_FORM.hero.education,
              ...data.hero?.education,
            },

            marketplace: {
              ...DEFAULT_FORM.hero.marketplace,
              ...data.hero?.marketplace,
            },

            contact: {
              ...DEFAULT_FORM.hero.contact,
              ...data.hero?.contact,
            },
          },
        });
      }
    } catch (error) {
      console.error("Gagal mengambil pengaturan:", error);

      setMessage({
        type: "error",
        text: "Gagal mengambil data pengaturan.",
      });
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // GENERAL CHANGE
  // =========================================================

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // =========================================================
  // CONTACT CHANGE
  // =========================================================

  function handleContactChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [name]: value,
      },
    }));
  }

  // =========================================================
  // TOKO CONTACT CHANGE
  // =========================================================

  function handleTokoChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        toko: {
          ...prev.contact.toko,
          [name]: value,
        },
      },
    }));
  }

  // =========================================================
  // KONTAK CONTACT CHANGE
  // =========================================================

  function handleKontakChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        kontak: {
          ...prev.contact.kontak,
          [name]: value,
        },
      },
    }));
  }

  // =========================================================
  

  // =========================================================
  // SOCIAL CHANGE
  // =========================================================

  function handleSocialChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        [name]: value,
      },
    }));
  }

  // =========================================================
  // HERO CHANGE
  // =========================================================

  function handleHeroChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [activeHero]: {
          ...prev.hero[activeHero],
          [name]: value,
        },
      },
    }));
  }

  // =========================================================
  // CLOUDINARY UPLOAD HERO
  // =========================================================

  async function handleHeroImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    // Hanya aktif untuk:
    // home, tourism, education
    const allowedHeroes = [
      "home",
      "tourism",
      "education",
    ];

    if (!allowedHeroes.includes(activeHero)) {
      setMessage({
        type: "error",
        text: "Upload gambar Cloudinary hanya tersedia untuk Beranda, Wisata, dan Edukasi.",
      });

      event.target.value = "";
      return;
    }

    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      setMessage({
        type: "error",
        text: "File yang dipilih harus berupa gambar.",
      });

      event.target.value = "";
      return;
    }

    // Batas ukuran 5 MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setMessage({
        type: "error",
        text: "Ukuran gambar maksimal 5 MB.",
      });

      event.target.value = "";
      return;
    }

    try {
      setUploading(true);

      setMessage({
        type: "",
        text: "",
      });

      console.log(
        `Mengupload gambar Hero ${HERO_LABELS[activeHero]}...`
      );

      const imageUrl = await uploadImage(file);

      console.log("Cloudinary URL:", imageUrl);

      // Masukkan URL Cloudinary ke formData
      setFormData((prev) => ({
        ...prev,
        hero: {
          ...prev.hero,
          [activeHero]: {
            ...prev.hero[activeHero],
            image: imageUrl,
          },
        },
      }));

      setMessage({
        type: "success",
        text: `Gambar Hero ${HERO_LABELS[activeHero]} berhasil diupload ke Cloudinary.`,
      });
    } catch (error) {
      console.error("Gagal upload gambar:", error);

      setMessage({
        type: "error",
        text: "Gagal mengupload gambar ke Cloudinary.",
      });
    } finally {
      setUploading(false);

      // Reset input supaya file yang sama bisa dipilih lagi
      event.target.value = "";
    }
  }

  // =========================================================
  // SAVE SETTINGS
  // =========================================================

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);

      setMessage({
        type: "",
        text: "",
      });

      await saveSettings(formData);

      setMessage({
        type: "success",
        text: "Pengaturan berhasil disimpan.",
      });
    } catch (error) {
      console.error("Gagal menyimpan pengaturan:", error);

      setMessage({
        type: "error",
        text: "Gagal menyimpan pengaturan.",
      });
    } finally {
      setSaving(false);
    }
  }

  // =========================================================
  // RESET FORM
  // =========================================================

  function handleReset() {
    if (
      window.confirm(
        "Yakin ingin mengembalikan formulir ke data awal?"
      )
    ) {
      setFormData({
        ...DEFAULT_FORM,

        contact: {
          ...DEFAULT_FORM.contact,

          toko: {
            ...DEFAULT_FORM.contact.toko,
          },

          kontak: {
            ...DEFAULT_FORM.contact.kontak,
          },
        },

        social: {
          ...DEFAULT_FORM.social,
        },

        hero: {
          ...DEFAULT_FORM.hero,

          home: {
            ...DEFAULT_FORM.hero.home,
          },

          tourism: {
            ...DEFAULT_FORM.hero.tourism,
          },

          education: {
            ...DEFAULT_FORM.hero.education,
          },

          marketplace: {
            ...DEFAULT_FORM.hero.marketplace,
          },

          contact: {
            ...DEFAULT_FORM.hero.contact,
          },
        },
      });

      setMessage({
        type: "",
        text: "",
      });
    }
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl border p-10 text-center">
            <div className="text-3xl mb-3">⚙️</div>

            <p className="text-gray-500">
              Memuat pengaturan website...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // CURRENT HERO
  // =========================================================

  const currentHero = formData.hero[activeHero];

  const cloudinaryEnabledHeroes = [
    "home",
    "tourism",
    "education",
  ];

  const isCloudinaryHero =
    cloudinaryEnabledHeroes.includes(activeHero);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#00450D]">
            Pengaturan Website
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola informasi, kontak, operasional, media sosial,
            dan banner setiap halaman website.
          </p>
        </div>

        {/* =====================================================
            MESSAGE
        ===================================================== */}

        {message.text && (
          <div
            className={`mb-5 rounded-xl px-4 py-3 border ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>
                {message.type === "success" ? "✓" : "!"}
              </span>

              <span className="text-sm font-medium">
                {message.text}
              </span>
            </div>
          </div>
        )}

        {/* =====================================================
            MAIN CARD
        ===================================================== */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          {/* ===================================================
              NAVIGATION
          =================================================== */}

          <div className="border-b bg-gray-50 overflow-x-auto">
            <div className="flex min-w-max">

              <button
                type="button"
                onClick={() => setActiveSection("general")}
                className={`px-5 py-4 text-sm font-semibold transition ${
                  activeSection === "general"
                    ? "text-[#00450D] border-b-2 border-[#00450D] bg-white"
                    : "text-gray-500 hover:text-[#00450D]"
                }`}
              >
                Informasi Umum
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("contact")}
                className={`px-5 py-4 text-sm font-semibold transition ${
                  activeSection === "contact"
                    ? "text-[#00450D] border-b-2 border-[#00450D] bg-white"
                    : "text-gray-500 hover:text-[#00450D]"
                }`}
              >
                Kontak
              </button>


              <button
                type="button"
                onClick={() => setActiveSection("social")}
                className={`px-5 py-4 text-sm font-semibold transition ${
                  activeSection === "social"
                    ? "text-[#00450D] border-b-2 border-[#00450D] bg-white"
                    : "text-gray-500 hover:text-[#00450D]"
                }`}
              >
                Media Sosial
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("hero")}
                className={`px-5 py-4 text-sm font-semibold transition ${
                  activeSection === "hero"
                    ? "text-[#00450D] border-b-2 border-[#00450D] bg-white"
                    : "text-gray-500 hover:text-[#00450D]"
                }`}
              >
                Hero Banner
              </button>

            </div>
          </div>

          {/* ===================================================
              FORM
          =================================================== */}

          <form onSubmit={handleSubmit}>

            <div className="p-5 md:p-8">

              {/* =================================================
                  GENERAL
              ================================================= */}

              {activeSection === "general" && (
                <div className="space-y-8">

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Informasi Website
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Informasi dasar yang digunakan oleh website
                      Latar Balai.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nama Website
                      </label>

                      <input
                        type="text"
                        name="siteName"
                        value={formData.siteName}
                        onChange={handleChange}
                        placeholder="Latar Balai"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00450D]/20 focus:border-[#00450D]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        URL Logo
                      </label>

                      <input
                        type="text"
                        name="logo"
                        value={formData.logo}
                        onChange={handleChange}
                        placeholder="https://..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00450D]/20 focus:border-[#00450D]"
                      />
                    </div>

                  </div>

                  {formData.logo && (
                    <div className="border rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-3">
                        Preview Logo
                      </p>

                      <img
                        src={formData.logo}
                        alt="Logo"
                        className="h-20 w-auto object-contain"
                      />
                    </div>
                  )}

                </div>
              )}

              {/* =================================================
                  CONTACT
              ================================================= */}

              {activeSection === "contact" && (
                <div className="space-y-8">

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Informasi Kontak
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Atur informasi kontak utama dan kontak
                      berdasarkan kebutuhan halaman.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#00450D] mb-4">
                      Kontak Umum
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nomor Telepon
                        </label>

                        <input
                          type="text"
                          name="phone"
                          value={formData.contact.phone}
                          onChange={handleContactChange}
                          placeholder="08123456789"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00450D]/20 focus:border-[#00450D]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email
                        </label>

                        <input
                          type="email"
                          name="email"
                          value={formData.contact.email}
                          onChange={handleContactChange}
                          placeholder="admin@latarbalai.id"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00450D]/20 focus:border-[#00450D]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Alamat
                        </label>

                        <textarea
                          name="address"
                          value={formData.contact.address}
                          onChange={handleContactChange}
                          rows="3"
                          placeholder="Desa Mulyoarjo..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00450D]/20 focus:border-[#00450D] resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Google Maps
                        </label>

                        <textarea
                          name="maps"
                          value={formData.contact.maps}
                          onChange={handleContactChange}
                          rows="3"
                          placeholder="Link Google Maps"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00450D]/20 focus:border-[#00450D] resize-none"
                        />
                      </div>

                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-2xl p-5">

                    <div className="mb-5">
                      <h3 className="font-bold text-[#00450D]">
                        Kontak Admin Toko
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        Nomor ini digunakan untuk tombol
                        "Pesan via WhatsApp" pada halaman Toko.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nama Admin Toko
                        </label>

                        <input
                          type="text"
                          name="name"
                          value={formData.contact.toko.name}
                          onChange={handleTokoChange}
                          placeholder="Admin Toko Latar Balai"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00450D]/20 focus:border-[#00450D]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          WhatsApp Toko
                        </label>

                        <input
                          type="text"
                          name="whatsapp"
                          value={formData.contact.toko.whatsapp}
                          onChange={handleTokoChange}
                          placeholder="628123456789"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00450D]/20 focus:border-[#00450D]"
                        />
                      </div>

                    </div>

                  </div>

                  <div className="border border-gray-200 rounded-2xl p-5">

                    <div className="mb-5">
                      <h3 className="font-bold text-[#00450D]">
                        Kontak Admin Informasi
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        Nomor ini digunakan khusus pada halaman
                        Kontak dan dapat berbeda dengan Admin Toko.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nama Admin Kontak
                        </label>

                        <input
                          type="text"
                          name="name"
                          value={formData.contact.kontak.name}
                          onChange={handleKontakChange}
                          placeholder="Admin Informasi Desa"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00450D]/20 focus:border-[#00450D]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          WhatsApp Kontak
                        </label>

                        <input
                          type="text"
                          name="whatsapp"
                          value={formData.contact.kontak.whatsapp}
                          onChange={handleKontakChange}
                          placeholder="628987654321"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00450D]/20 focus:border-[#00450D]"
                        />
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* =================================================
                  OPERATIONAL
              ================================================= */}

              

              {/* =================================================
                  SOCIAL
              ================================================= */}

              {activeSection === "social" && (
                <div className="space-y-8">

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Media Sosial
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Masukkan alamat akun media sosial resmi.
                    </p>
                  </div>

                  <div className="space-y-5">

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Instagram
                      </label>

                      <input
                        type="text"
                        name="instagram"
                        value={formData.social.instagram}
                        onChange={handleSocialChange}
                        placeholder="https://instagram.com/..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00450D]/20 focus:border-[#00450D]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Facebook
                      </label>

                      <input
                        type="text"
                        name="facebook"
                        value={formData.social.facebook}
                        onChange={handleSocialChange}
                        placeholder="https://facebook.com/..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00450D]/20 focus:border-[#00450D]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        YouTube
                      </label>

                      <input
                        type="text"
                        name="youtube"
                        value={formData.social.youtube}
                        onChange={handleSocialChange}
                        placeholder="https://youtube.com/..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00450D]/20 focus:border-[#00450D]"
                      />
                    </div>

                  </div>

                </div>
              )}

              {/* =================================================
                  HERO
              ================================================= */}

              {activeSection === "hero" && (
                <div className="space-y-8">

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Hero Banner
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Atur judul, subjudul, dan gambar Hero setiap
                      halaman website.
                    </p>
                  </div>

                  {/* HERO NAVIGATION */}

                  <div className="flex gap-2 overflow-x-auto pb-2">

                    {Object.entries(HERO_LABELS).map(
                      ([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setActiveHero(key);

                            setMessage({
                              type: "",
                              text: "",
                            });
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
                            activeHero === key
                              ? "bg-[#00450D] text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {label}
                        </button>
                      )
                    )}

                  </div>

                  {/* HERO FORM */}

                  <div className="border border-gray-200 rounded-2xl p-5 md:p-6">

                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900">
                        Hero {HERO_LABELS[activeHero]}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Konten hero untuk halaman{" "}
                        {HERO_LABELS[activeHero]}.
                      </p>
                    </div>

                    <div className="space-y-5">

                      {/* TITLE */}

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Judul Hero
                        </label>

                        <input
                          type="text"
                          name="title"
                          value={currentHero.title}
                          onChange={handleHeroChange}
                          placeholder="Judul utama halaman"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00450D]/20 focus:border-[#00450D]"
                        />
                      </div>

                      {/* SUBTITLE */}

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Subjudul Hero
                        </label>

                        <textarea
                          name="subtitle"
                          value={currentHero.subtitle}
                          onChange={handleHeroChange}
                          rows="3"
                          placeholder="Deskripsi singkat..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00450D]/20 focus:border-[#00450D] resize-none"
                        />
                      </div>

                      {/* =================================================
                          IMAGE
                      ================================================= */}

                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Gambar Hero
                        </label>

                        {isCloudinaryHero ? (
                          <>
                            {/* FILE INPUT */}

                            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-[#00450D] transition">

                              <div className="text-center">

                                <div className="text-3xl mb-3">
                                  🖼️
                                </div>

                                <p className="text-sm font-semibold text-gray-700">
                                  Upload gambar Hero
                                </p>

                                <p className="text-xs text-gray-500 mt-1 mb-4">
                                  JPG, JPEG, PNG, atau WEBP • Maksimal 5 MB
                                </p>

                                <label
                                  htmlFor="hero-image-upload"
                                  className={`inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                                    uploading
                                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                      : "bg-[#00450D] text-white hover:bg-[#00380A] cursor-pointer"
                                  }`}
                                >
                                  {uploading
                                    ? "Mengupload..."
                                    : "Pilih Gambar"}
                                </label>

                                <input
                                  id="hero-image-upload"
                                  type="file"
                                  accept="image/jpeg,image/jpg,image/png,image/webp"
                                  onChange={handleHeroImageUpload}
                                  disabled={uploading}
                                  className="hidden"
                                />

                              </div>

                            </div>

                            {/* CLOUDINARY URL */}

                            {currentHero.image && (
                              <div className="mt-3">

                                <p className="text-xs text-gray-500 mb-1">
                                  URL Cloudinary
                                </p>

                                <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                                  <p className="text-xs text-gray-600 break-all">
                                    {currentHero.image}
                                  </p>
                                </div>

                              </div>
                            )}

                          </>
                        ) : (
                          <>
                            {/* TETAP URL MANUAL UNTUK TOKO/KONTAK */}

                            <input
                              type="text"
                              name="image"
                              value={currentHero.image}
                              onChange={handleHeroChange}
                              placeholder="https://..."
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00450D]/20 focus:border-[#00450D]"
                            />

                            <p className="mt-2 text-xs text-gray-500">
                              Gunakan URL gambar untuk Hero halaman ini.
                            </p>
                          </>
                        )}

                      </div>

                      {/* =================================================
                          HERO PREVIEW
                      ================================================= */}

                      {currentHero.image && (
                        <div className="mt-6">

                          <p className="text-xs font-semibold text-gray-500 mb-2">
                            Preview Hero
                          </p>

                          <div className="relative rounded-2xl overflow-hidden aspect-[16/6] bg-gray-100">

                            <img
                              src={currentHero.image}
                              alt={`Hero ${HERO_LABELS[activeHero]}`}
                              className="w-full h-full object-cover"
                              onError={(event) => {
                                event.currentTarget.style.display =
                                  "none";
                              }}
                            />

                            <div className="absolute inset-0 bg-black/35 flex flex-col justify-center px-6 md:px-10 text-white">

                              <h4 className="text-xl md:text-3xl font-bold">
                                {currentHero.title ||
                                  "Judul Hero"}
                              </h4>

                              <p className="mt-2 max-w-2xl text-sm md:text-base">
                                {currentHero.subtitle ||
                                  "Subjudul hero"}
                              </p>

                            </div>

                          </div>

                        </div>
                      )}

                    </div>

                  </div>

                </div>
              )}

            </div>

            {/* ===================================================
                FOOTER ACTION
            =================================================== */}

            <div className="border-t bg-gray-50 px-5 md:px-8 py-4 flex flex-col sm:flex-row justify-between gap-3">

              <button
                type="button"
                onClick={handleReset}
                disabled={saving || uploading}
                className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-100 transition disabled:opacity-50"
              >
                Reset Form
              </button>

              <button
                type="submit"
                disabled={saving || uploading}
                className="px-6 py-2.5 rounded-xl bg-[#00450D] text-white text-sm font-semibold hover:bg-[#00380A] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving
                  ? "Menyimpan..."
                  : "Simpan Pengaturan"}
              </button>

            </div>

          </form>

        </div>

      </div>
    </div>
  );
}