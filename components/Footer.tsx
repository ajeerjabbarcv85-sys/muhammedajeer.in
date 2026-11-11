import Image from "next/image";

const WHATSAPP = "https://wa.me/918590780520";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest mt-space-xl">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-outline-variant/60 to-transparent" />
      <div className="max-w-[1600px] mx-auto px-margin pt-space-xl pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-lg mb-space-xl">
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-space-sm mb-space-sm">
              <Image
                alt="JS logo"
                className="h-7 w-auto object-contain"
                src="/logo.svg"
                width={28}
                height={28}
              />
              <span className="font-headline-sm text-headline-sm tracking-[0.25em] uppercase text-on-surface">
                JEESTORE
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-space-md font-light leading-relaxed">
              Curating world-class Haute Horlogerie, rare bespoke artifacts, and
              certified precious commodities for discerning international
              collectors.
            </p>
            <div className="flex flex-wrap items-center gap-space-sm">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/40">
                <span className="material-symbols-outlined text-[14px] text-primary">
                  verified
                </span>
                <span className="font-label-badge text-label-badge text-on-surface uppercase">
                  100% Certified Vault Provenance
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-headline-sm text-[16px] uppercase tracking-widest text-primary mb-space-md">
              Curations
            </h3>
            <ul className="space-y-2.5 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="/catalog"
                >
                  Haute Horlogerie
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="/catalog"
                >
                  Rare Timepieces
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="/catalog"
                >
                  Bespoke Fine Jewelry
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="/cart">
                  Private Commissions
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="/catalog"
                >
                  Limited Edition Vault
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-headline-sm text-[16px] uppercase tracking-widest text-primary mb-space-md">
              Direct VIP Concierge
            </h3>
            <div className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-tertiary mt-0.5">
                  call
                </span>
                <div>
                  <p className="font-label-badge text-label-badge text-secondary-fixed uppercase">
                    Phone &amp; WhatsApp
                  </p>
                  <a
                    className="text-on-surface hover:text-primary transition-colors font-medium"
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +91 8590780520
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                  mail
                </span>
                <div>
                  <p className="font-label-badge text-label-badge text-secondary-fixed uppercase">
                    Direct Salon Email
                  </p>
                  <a
                    className="text-on-surface hover:text-primary transition-colors font-medium break-all"
                    href="mailto:ajeerjabbarcv85@gmail.com"
                  >
                    ajeerjabbarcv85@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant mt-0.5">
                  public
                </span>
                <div>
                  <p className="font-label-badge text-label-badge text-secondary-fixed uppercase">
                    Instagram Atelier
                  </p>
                  <a
                    className="text-on-surface hover:text-primary transition-colors font-medium"
                    href="https://instagram.com/muhdajeerr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @muhdajeerr
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-headline-sm text-[16px] uppercase tracking-widest text-primary mb-space-md">
              Salon Access
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm font-light">
              Receive closed-circuit access to confidential vault releases and
              private auctions.
            </p>
            <form className="flex flex-col gap-2">
              <div className="flex items-center bg-surface-container rounded border border-outline-variant/70 focus-within:border-primary transition-colors px-3 py-2">
                <input
                  className="bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/50 w-full outline-none"
                  placeholder="Enter your private email"
                  type="email"
                />
                <button
                  className="text-primary hover:text-primary-fixed transition-colors font-label-badge text-label-badge uppercase font-semibold pl-2"
                  type="button"
                >
                  Join
                </button>
              </div>
              <span className="font-label-badge text-[10px] text-on-surface-variant/60 uppercase tracking-widest">
                Strict confidentiality guaranteed
              </span>
            </form>
          </div>
        </div>

        <div className="pt-space-md border-t border-outline-variant/30 flex flex-col lg:flex-row items-center justify-between gap-space-md font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
          <div className="flex flex-wrap items-center gap-space-md">
            <span>© 2025 JEESTORE ATELIER. ALL RIGHTS RESERVED.</span>
            <a className="hover:text-primary transition-colors" href="/catalog">
              Authenticity Certificate
            </a>
            <a className="hover:text-primary transition-colors" href="/cart">
              Terms &amp; Disclaimers
            </a>
            <a className="hover:text-primary transition-colors" href="/cart">
              Vault Security
            </a>
          </div>
          <div className="flex items-center gap-space-sm text-secondary-fixed-dim">
            <span className="px-2 py-0.5 rounded bg-surface-container border border-outline-variant/30 text-[10px]">
              256-BIT ENCRYPTED
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container border border-outline-variant/30 text-[10px]">
              SWIFT WIRE
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container border border-outline-variant/30 text-[10px]">
              AMEX BLACK
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container border border-outline-variant/30 text-[10px]">
              APPLE PAY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
