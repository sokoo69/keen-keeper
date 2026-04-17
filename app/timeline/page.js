"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getTimeline, initializeTimeline } from "@/lib/timelineStore";

const typeConfig = {
  call: {
    label: "Call",
    icon: "/assets/call.png",
  },
  text: {
    label: "Text",
    icon: "/assets/text.png",
  },
  video: {
    label: "Video",
    icon: "/assets/video.png",
  },
};

const filterOptions = [
  { value: "all", label: "All interactions" },
  { value: "call", label: "Call" },
  { value: "text", label: "Text" },
  { value: "video", label: "Video" },
];

export default function TimelinePage() {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    initializeTimeline();
    const data = getTimeline();
    setEntries(data);

    const handleStorage = () => {
      setEntries(getTimeline());
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("keenkeeper:timeline", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("keenkeeper:timeline", handleStorage);
    };
  }, []);

  const filtered = entries
    .filter((e) => (filter === "all" ? true : e.type === filter))
    .filter((e) => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;

      const parsedFriendName = e.title?.toLowerCase().includes(" with ")
        ? e.title.toLowerCase().split(" with ").slice(1).join(" with ")
        : "";
      const friendName = (e.friendName || parsedFriendName || "").toLowerCase();
      const typeLabel = (typeConfig[e.type]?.label || e.type || "").toLowerCase();
      const title = (e.title || "").toLowerCase();

      return (
        friendName.includes(q) ||
        typeLabel.includes(q) ||
        title.includes(q)
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

  const splitTitle = (title = "") => {
    const idx = title.toLowerCase().indexOf(" with ");
    if (idx === -1) return { lead: title, tail: "" };
    return {
      lead: title.slice(0, idx),
      tail: title.slice(idx),
    };
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-10">
        <h1 className="text-[42px] sm:text-5xl font-black text-[#1F2937] tracking-tight mb-5">
          Timeline
        </h1>

        <div className="mb-6 grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-3 items-center">
          <input
            id="timeline-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by friend name or type"
            className="w-full bg-white border border-[#DDE1E7] rounded-md py-2 px-3 text-[13px] text-[#6B7280] leading-tight focus:outline-none focus:border-[#244D3F]"
          />

          <div className="relative w-44">
            <select
              id="timeline-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#DDE1E7] rounded-md py-2 pl-3 pr-8 text-[13px] text-[#6B7280] leading-tight focus:outline-none focus:border-[#244D3F] cursor-pointer"
            >
              {filterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            />
          </div>

          <div className="relative w-36">
            <select
              id="timeline-sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full appearance-none bg-white border border-[#DDE1E7] rounded-md py-2 pl-3 pr-8 text-[13px] text-[#6B7280] leading-tight focus:outline-none focus:border-[#244D3F] cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 bg-[#F1F5F9] rounded-full flex items-center justify-center mb-4">
              <Image
                src="/assets/call.png"
                alt="No interactions"
                width={24}
                height={24}
                className="w-6 h-6 object-contain opacity-30"
              />
            </div>
            <p className="text-[#374151] font-semibold text-sm">
              No interactions found
            </p>
            <p className="text-[#9CA3AF] text-xs mt-1">
              Log a check-in from a friend&apos;s profile to see it here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#E5E7EB]">
            {filtered.map((entry) => {
              const config = typeConfig[entry.type] || typeConfig.call;
              const { lead, tail } = splitTitle(entry.title);
              return (
                <div
                  key={entry.id}
                  className="flex items-center gap-4 py-3.5 hover:bg-[#F9FAFB] transition-colors duration-150 px-2 -mx-2 rounded-sm"
                >
                  <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                    <Image
                      src={config.icon}
                      alt={config.label}
                      width={18}
                      height={18}
                      className="w-4.5 h-4.5 object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] leading-snug text-[#1F2937]">
                      <span className="font-bold">{lead}</span>
                      {tail ? (
                        <span className="font-normal text-[#6B7280]">
                          {tail}
                        </span>
                      ) : null}
                    </p>
                    <p className="text-[11.5px] text-[#9CA3AF] mt-0.5 leading-none">
                      {formatDate(entry.date)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
