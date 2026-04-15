import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#244D3F] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <Image
            src="/assets/logo-xl.png"
            alt="KeenKeeper"
            width={260}
            height={64}
            className="h-14 w-auto object-contain"
            priority
          />
          <p className="text-[#a8c5b8] text-sm whitespace-nowrap">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 mb-8">
          <p className="text-xs font-semibold text-[#a8c5b8] uppercase tracking-widest">
            Social Links
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <Image
                src="/assets/instagram.png"
                alt="Instagram"
                width={22}
                height={22}
                className="w-[22px] h-[22px] object-contain"
              />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <Image
                src="/assets/facebook.png"
                alt="Facebook"
                width={22}
                height={22}
                className="w-[22px] h-[22px] object-contain"
              />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <Image
                src="/assets/twitter.png"
                alt="Twitter"
                width={22}
                height={22}
                className="w-[22px] h-[22px] object-contain"
              />
            </a>
          </div>
        </div>

        <div className="border-t border-[#1a3a2f] pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7a9e91]">
            <p>© 2026 KeenKeeper. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
