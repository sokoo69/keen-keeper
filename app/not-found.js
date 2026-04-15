import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "404 — Page Not Found | KeenKeeper",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-[#244D3F]/10 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle size={36} className="text-[#244D3F]" />
      </div>
      <h1 className="text-7xl font-black text-[#244D3F] mb-2">404</h1>
      <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">
        Page Not Found
      </h2>
      <p className="text-[#64748B] text-base max-w-sm mb-8">
        Looks like this connection got lost. The page you&apos;re looking for
        doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 bg-[#244D3F] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1a3a2f] active:scale-95 transition-all shadow-md shadow-[#244D3F]/20"
      >
        <Home size={16} />
        Go Back Home
      </Link>
    </div>
  );
}
