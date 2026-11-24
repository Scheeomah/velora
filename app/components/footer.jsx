import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#faf8f5] px-6 py-14 md:px-12">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 border-b border-[#e5ddd5] pb-10 md:flex-row">
        <Link href="/" className="font-serif text-4xl tracking-[6px]">
          VÉLORA
        </Link>

        <p className="text-center text-[10px] tracking-[2px] text-[#877e78]">
          DRESS WITH INTENTION. LIVE WITH ELEGANCE.
        </p>

        <div className="flex flex-wrap justify-center gap-7 text-[10px] tracking-widest">
          <a href="#shop" className="transition hover:text-[#926b70]">
            SHOP
          </a>

          <Link href="/" className="transition hover:text-[#926b70]">
            HOME
          </Link>

          <Link href="/contact" className="transition hover:text-[#926b70]">
            CONTACT
          </Link>

          <a
            href="https://wa.me/2349074218826"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#926b70]"
          >
            WHATSAPP
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 pt-7 text-center md:flex-row">
        <p className="text-[9px] tracking-[1px] text-[#9b9189]">
          © 2026 VÉLORA. ALL RIGHTS RESERVED.
        </p>

        <a
          href="mailto:velora@gmail.com"
          className="text-[10px] text-[#877e78] transition hover:text-[#48252f]"
        >
          velora@gmail.com
        </a>
      </div>
    </footer>
  );
}
