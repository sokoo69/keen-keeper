"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Search, ArrowUp, ArrowDown } from "lucide-react";
import { getTimeline, initializeTimeline } from "@/lib/timelineStore";

const typeConfig = {
  call: {
    label: "Call",
    icon: "/assets/call.png",
    bg: "bg-[#F0FDF4]",
    badgeBg: "bg-[#D1FAE5]",
    badgeText: "text-[#059669]",
  },
  text: {
    label: "Text",
    icon: "/assets/text.png",
    bg: "bg-[#EFF6FF]",
    badgeBg: "bg-[#DBEAFE]",
    badgeText: "text-[#1D4ED8]",
  },
  video: {
    label: "Video",
    icon: "/assets/video.png",
    bg: "bg-[#FDF4FF]",
    badgeBg: "bg-[#F3E8FF]",
    badgeText: "text-[#7E22CE]",
  },
};

const filterOptions = [
  { value: "all", label: "All" },
  { value: "call", label: "Call" },
  { value: "text", label: "Text" },
  { value: "video", label: "Video" },
];

export default function TimelinePage() {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [search, setSearch] = useState("");

  useEffect(() => {
    initializeTimeline();
    const data = getTimeline();
    setEntries(data);

    const handleStorage = () => {
      setEntries(getTimeline());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const filtered = entries
    .filter((e) => (filter === "all" ? true : e.type === filter))
    .filter((e) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        e.title.toLowerCase().includes(q) ||
        e.friendName?.toLowerCase().includes(q) ||
        e.type.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const diff = new Date(b.date) - new Date(a.date);
      return sortOrder === "newest" ? diff : -diff;
    });

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#1a1a1a] mb-1">Timeline</h1>
        <p className="text-[#64748B] text-sm">
          A history of all your interactions and check-ins.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          />
          <input
            id="timeline-search"
            type="text"
            placeholder="Search by name or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-[#E9E9E9] rounded-xl text-sm text-[#1a1a1a] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#244D3F]/20 focus:border-[#244D3F]/30 bg-white"
          />
        </div>

        <div className="flex items-center gap-1 bg-white border border-[#E9E9E9] rounded-xl p-1">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              id={`filter-${opt.value}`}
              onClick={() => setFilter(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === opt.value
                  ? "bg-[#244D3F] text-white shadow-sm"
                  : "text-[#64748B] hover:text-[#244D3F]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <button
          id="sort-btn"
          onClick={() =>
            setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
          }
          className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E9E9E9] rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#244D3F] hover:border-[#244D3F]/30 transition-all"
        >
          {sortOrder === "newest" ? (
            <>
              <ArrowDown size={14} /> Newest
            </>
          ) : (
            <>
              <ArrowUp size={14} /> Oldest
            </>
          )}
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-[#F1F5F9] rounded-full flex items-center justify-center mb-4">
            <Image
              src="/assets/call.png"
              alt="No interactions"
              width={28}
              height={28}
              className="w-7 h-7 object-contain opacity-30"
            />
          </div>
          <p className="text-[#64748B] font-medium">No interactions found</p>
          <p className="text-[#94A3B8] text-sm mt-1">
            Log a check-in from a friend&apos;s profile to see it here.
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[#E9E9E9]" />
          <div className="flex flex-col gap-2">
            {filtered.map((entry) => {
              const config = typeConfig[entry.type] || typeConfig.call;
              return (
                <div
                  key={entry.id}
                  className="relative flex items-center gap-4 pl-14 py-3 pr-4 bg-white rounded-xl border border-[#E9E9E9] hover:shadow-md hover:border-[#244D3F]/10 transition-all group"
                >
                  <div
                    className={`absolute left-[14px] top-1/2 -translate-y-1/2 w-[26px] h-[26px] rounded-full flex items-center justify-center ${config.bg} ring-2 ring-white`}
                  >
                    <Image
                      src={config.icon}
                      alt={config.label}
                      width={14}
                      height={14}
                      className="w-3.5 h-3.5 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[#1a1a1a] group-hover:text-[#244D3F] transition-colors truncate">
                      {entry.title}
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      {formatDate(entry.date)} at {formatTime(entry.date)}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${config.badgeBg} ${config.badgeText} uppercase`}
                  >
                    {entry.type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
