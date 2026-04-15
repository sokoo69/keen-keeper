import Link from "next/link";
import Image from "next/image";

const statusConfig = {
  overdue: {
    label: "Overdue",
    className: "bg-[#EF4444] text-white",
  },
  "almost due": {
    label: "Almost Due",
    className: "bg-[#F59E0B] text-white",
  },
  "on-track": {
    label: "On-Track",
    className: "bg-[#244D3F] text-white",
  },
};

export default function FriendCard({ friend }) {
  const status = statusConfig[friend.status] || statusConfig["on-track"];

  return (
    <Link href={`/friends/${friend.id}`} className="block group">
      <div className="bg-white rounded-xl border border-[#E9E9E9] p-4 flex flex-col items-center gap-2.5 hover:shadow-md hover:border-[#c8d9d4] transition-all duration-200 cursor-pointer h-full">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#E9E9E9]">
          <Image
            src={friend.picture}
            alt={friend.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>

        {/* Name */}
        <h3 className="font-bold text-sm text-[#1a1a1a] text-center leading-tight">
          {friend.name}
        </h3>

        {/* Days since contact */}
        <p className="text-xs text-[#94A3B8]">{friend.days_since_contact}d ago</p>

        {/* Tags — light mint green like Figma */}
        <div className="flex flex-wrap justify-center gap-1">
          {friend.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold px-3 py-0.5 rounded-full bg-[#D1FAE5] text-[#065F46] uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Status — solid filled color */}
        <div
          className={`px-4 py-1 rounded-full text-xs font-semibold ${status.className}`}
        >
          {status.label}
        </div>
      </div>
    </Link>
  );
}
