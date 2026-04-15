"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import {
  Clock,
  Archive,
  Trash2,
  Edit2,
  Mail,
} from "lucide-react";
import toast from "react-hot-toast";
import { addTimelineEntry } from "@/lib/timelineStore";
import friendsData from "@/data/friends.json";

const statusConfig = {
  overdue: {
    label: "Overdue",
    bg: "bg-[#FEE2E2]",
    text: "text-[#DC2626]",
    border: "border-[#FCA5A5]",
  },
  "almost due": {
    label: "Almost Due",
    bg: "bg-[#FEF3C7]",
    text: "text-[#D97706]",
    border: "border-[#FCD34D]",
  },
  "on-track": {
    label: "On-Track",
    bg: "bg-[#D1FAE5]",
    text: "text-[#059669]",
    border: "border-[#6EE7B7]",
  },
};

const tagColors = [
  "bg-[#244D3F] text-white",
];

export default function FriendDetailPage() {
  const { id } = useParams();
  const friend = friendsData.find((f) => f.id === parseInt(id));

  const [goalEditing, setGoalEditing] = useState(false);
  const [goalValue, setGoalValue] = useState(friend?.goal || 14);

  if (!friend) return notFound();

  const status = statusConfig[friend.status] || statusConfig["on-track"];

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleCheckIn = (type) => {
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
    addTimelineEntry({
      type: type,
      title: `${typeLabel} with ${friend.name}`,
      friendName: friend.name,
    });

    const icons = { call: "📞", text: "💬", video: "🎥" };
    toast.success(`${icons[type]} ${typeLabel} logged with ${friend.name}!`, {
      icon: false,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-[#94A3B8] mb-6">
        <a href="/" className="hover:text-[#244D3F] transition-colors">
          Home
        </a>
        <span className="mx-2">/</span>
        <span className="text-[#1a1a1a] font-medium">{friend.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-[#E9E9E9] p-6 flex flex-col items-center text-center gap-3 shadow-sm">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#244D3F]/10">
              <Image
                src={friend.picture}
                alt={friend.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#1a1a1a]">{friend.name}</h1>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${status.bg} ${status.text} ${status.border}`}
            >
              {status.label}
            </span>

            <div className="flex flex-wrap justify-center gap-1.5">
              {friend.tags.map((tag, i) => (
                <span
                  key={tag}
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase ${tagColors[i % tagColors.length]}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-sm text-[#64748B] italic leading-relaxed">
              &quot;{friend.bio}&quot;
            </p>

            <div className="flex items-center gap-2 text-sm text-[#64748B]">
              <Mail size={14} className="text-[#94A3B8]" />
              <span>{friend.email}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              id="snooze-btn"
              className="w-full flex items-center gap-2.5 px-4 py-3 bg-white rounded-xl border border-[#E9E9E9] text-sm font-medium text-[#475569] hover:border-[#244D3F]/30 hover:text-[#244D3F] transition-all shadow-sm"
            >
              <Clock size={16} className="text-[#94A3B8]" />
              Snooze 2 Weeks
            </button>
            <button
              id="archive-btn"
              className="w-full flex items-center gap-2.5 px-4 py-3 bg-white rounded-xl border border-[#E9E9E9] text-sm font-medium text-[#475569] hover:border-[#244D3F]/30 hover:text-[#244D3F] transition-all shadow-sm"
            >
              <Archive size={16} className="text-[#94A3B8]" />
              Archive
            </button>
            <button
              id="delete-btn"
              className="w-full flex items-center gap-2.5 px-4 py-3 bg-white rounded-xl border border-[#E9E9E9] text-sm font-medium text-[#EF4444] hover:border-[#FCA5A5] hover:bg-[#FEF2F2] transition-all shadow-sm"
            >
              <Trash2 size={16} className="text-[#EF4444]" />
              Delete
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-[#E9E9E9] p-4 flex flex-col items-center gap-1 shadow-sm">
              <span className="text-2xl font-black text-[#244D3F]">
                {friend.days_since_contact}
              </span>
              <span className="text-xs text-[#94A3B8] text-center">Days Since Contact</span>
            </div>
            <div className="bg-white rounded-2xl border border-[#E9E9E9] p-4 flex flex-col items-center gap-1 shadow-sm">
              <span className="text-2xl font-black text-[#244D3F]">{goalValue}</span>
              <span className="text-xs text-[#94A3B8] text-center">Goal (Days)</span>
            </div>
            <div className="bg-white rounded-2xl border border-[#E9E9E9] p-4 flex flex-col items-center gap-1 shadow-sm">
              <span className="text-lg font-black text-[#244D3F] text-center leading-tight">
                {formatDate(friend.next_due_date)}
              </span>
              <span className="text-xs text-[#94A3B8] text-center">Next Due</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E9E9E9] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-[#1a1a1a]">Relationship Goal</h2>
              <button
                id="edit-goal-btn"
                onClick={() => setGoalEditing(!goalEditing)}
                className="flex items-center gap-1 text-xs font-medium text-[#64748B] hover:text-[#244D3F] border border-[#E9E9E9] px-3 py-1.5 rounded-lg hover:border-[#244D3F]/30 transition-all"
              >
                <Edit2 size={12} />
                Edit
              </button>
            </div>
            {goalEditing ? (
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={goalValue}
                  onChange={(e) => setGoalValue(Number(e.target.value))}
                  className="border border-[#244D3F]/30 rounded-lg px-3 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-[#244D3F]/20"
                  min={1}
                />
                <span className="text-sm text-[#64748B]">days</span>
                <button
                  onClick={() => setGoalEditing(false)}
                  className="bg-[#244D3F] text-white text-xs px-3 py-2 rounded-lg hover:bg-[#1a3a2f] transition-colors"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="text-sm text-[#64748B]">
                Connect every{" "}
                <span className="font-bold text-[#244D3F]">{goalValue} days</span>
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-[#E9E9E9] p-5 shadow-sm">
            <h2 className="font-semibold text-[#1a1a1a] mb-4">Quick Check-In</h2>
            <div className="grid grid-cols-3 gap-3">
              <button
                id="call-btn"
                onClick={() => handleCheckIn("call")}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#E9E9E9] hover:border-[#244D3F]/30 hover:bg-[#F0FDF4] active:scale-95 transition-all group"
              >
                <Image
                  src="/assets/call.png"
                  alt="Call"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-xs font-medium text-[#64748B] group-hover:text-[#244D3F]">
                  Call
                </span>
              </button>
              <button
                id="text-btn"
                onClick={() => handleCheckIn("text")}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#E9E9E9] hover:border-[#244D3F]/30 hover:bg-[#F0FDF4] active:scale-95 transition-all group"
              >
                <Image
                  src="/assets/text.png"
                  alt="Text"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-xs font-medium text-[#64748B] group-hover:text-[#244D3F]">
                  Text
                </span>
              </button>
              <button
                id="video-btn"
                onClick={() => handleCheckIn("video")}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#E9E9E9] hover:border-[#244D3F]/30 hover:bg-[#F0FDF4] active:scale-95 transition-all group"
              >
                <Image
                  src="/assets/video.png"
                  alt="Video"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-xs font-medium text-[#64748B] group-hover:text-[#244D3F]">
                  Video
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
