"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import FriendCard from "@/components/FriendCard";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-[#E9E9E9] p-4 flex flex-col items-center gap-2.5 h-48">
      <div className="skeleton w-16 h-16 rounded-full" />
      <div className="skeleton w-24 h-3 rounded" />
      <div className="skeleton w-16 h-2 rounded" />
      <div className="skeleton w-20 h-4 rounded-full" />
      <div className="skeleton w-24 h-5 rounded-full" />
    </div>
  );
}

export default function HomePage() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const data = await import("@/data/friends.json");
      setFriends(data.default);
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const totalFriends = friends.length;
  const onTrack = friends.filter((f) => f.status === "on-track").length;
  const needAttention = friends.filter(
    (f) => f.status === "overdue" || f.status === "almost due"
  ).length;

  const [interactionsThisMonth, setInteractionsThisMonth] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const { getTimeline } = require("@/lib/timelineStore");
      const timeline = getTimeline();
      const now = new Date();
      const count = timeline.filter((e) => {
        const d = new Date(e.date);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      }).length;
      setInteractionsThisMonth(count);
    }
  }, []);

  const summaryCards = [
    { label: "Total Friends", value: loading ? "—" : totalFriends },
    { label: "On Track", value: loading ? "—" : onTrack },
    { label: "Need Attention", value: loading ? "—" : needAttention },
    { label: "Interactions This Month", value: interactionsThisMonth },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <section className="flex flex-col items-center text-center mb-8 gap-3">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a1a] leading-snug">
          Friends to keep close in your life
        </h1>
        <p className="text-[#64748B] text-sm text-center leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the<br />
          relationships that matter most.
        </p>
        <button
          id="add-friend-btn"
          className="flex items-center gap-1.5 bg-[#244D3F] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#1a3a2f] active:scale-95 transition-all mt-1"
        >
          <Plus size={15} />
          Add a Friend
        </button>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {summaryCards.map(({ label, value }) => (
          <div
            key={label}
            className="bg-white rounded-xl border border-[#E9E9E9] py-5 px-4 flex flex-col items-center gap-1"
          >
            <span className="font-bold text-3xl text-[#244D3F]">{value}</span>
            <span className="text-[#94A3B8] text-xs text-center">{label}</span>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">
          Your Friends
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : friends.map((friend) => (
                <FriendCard key={friend.id} friend={friend} />
              ))}
        </div>
      </section>
    </div>
  );
}
