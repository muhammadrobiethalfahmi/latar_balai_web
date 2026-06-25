import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container-high dark:bg-surface-container-lowest w-full mt-section-padding border-t border-outline-variant/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-section-padding max-w-container-max mx-auto text-left">
        
        {/* About */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-heading font-bold text-headline-lg text-primary dark:text-primary-fixed-dim mb-4">
            Latar Balai Mulyoarjo
          </h3>
          <p className="font-sans text-body-md text-secondary dark:text-secondary-fixed-dim mb-6 max-w-sm">
            Pusat integrasi edukasi, wisata, dan pemberdayaan ekonomi untuk memajukan kesejahteraan masyarakat desa Mulyoarjo.
          </p>
          <p className="font-sans text-label-md text-on-surface-variant/70 dark:text-on-surface-variant/70">
            &copy; 2026 Latar Balai Mulyoarjo. Premium Village Platform.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-sans font-bold text-label-md text-on-surface uppercase tracking-wider mb-6">
            Navigasi
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <Link to="/" className="font-sans text-body-md text-primary font-bold hover:text-tertiary transition-colors">
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/edukasi" className="font-sans text-body-md text-on-surface-variant hover:text-tertiary transition-colors">
                Edukasi Budidaya
              </Link>
            </li>
            <li>
              <Link to="/wisata" className="font-sans text-body-md text-on-surface-variant hover:text-tertiary transition-colors">
                Wisata Desa
              </Link>
            </li>
            <li>
              <Link to="/toko" className="font-sans text-body-md text-on-surface-variant hover:text-tertiary transition-colors">
                Toko Kelontong
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="font-sans font-bold text-label-md text-on-surface uppercase tracking-wider mb-6">
            Kontak &amp; Lokasi
          </h4>
          <ul className="flex flex-col gap-4 font-sans text-body-md text-on-surface-variant">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary text-lg mt-0.5" aria-hidden="true">
                location_on
              </span>
              <span>
                Balai Desa Mulyoarjo
                <br />
                Kec. Lawang, Kab. Malang
                <br />
                Jawa Timur, Indonesia
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-lg" aria-hidden="true">
                mail
              </span>
              <a href="mailto:kontak@mulyoarjo.desa.id" className="hover:text-primary transition-colors">
                kontak@mulyoarjo.desa.id
              </a>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
