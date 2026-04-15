"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getTimeline, initializeTimeline } from "@/lib/timelineStore";

const COLORS = {
  call: "#244D3F",
  text: "#6366F1",
  video: "#10B981",
};

const RADIAN = Math.PI / 180;

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={13}
      fontWeight="700"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function StatsPage() {
  const [counts, setCounts] = useState({ call: 0, text: 0, video: 0 });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    initializeTimeline();
    const timeline = getTimeline();
    const c = { call: 0, text: 0, video: 0 };
    timeline.forEach((e) => {
      if (c[e.type] !== undefined) c[e.type]++;
    });
    setCounts(c);
    setTotal(c.call + c.text + c.video);
  }, []);

  const data = [
    { name: "Call", value: counts.call },
    { name: "Text", value: counts.text },
    { name: "Video", value: counts.video },
  ].filter((d) => d.value > 0);

  const statCards = [
    { label: "Total Calls", value: counts.call, icon: "/assets/call.png", color: "#244D3F" },
    { label: "Total Texts", value: counts.text, icon: "/assets/text.png", color: "#6366F1" },
    { label: "Total Videos", value: counts.video, icon: "/assets/video.png", color: "#10B981" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#1a1a1a] mb-1">
          Friendship Analytics
        </h1>
        <p className="text-[#64748B] text-sm">
          Insights into how you&apos;re staying connected.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {statCards.map(({ label, value, icon, color }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-[#E9E9E9] p-5 flex flex-col items-center gap-2 shadow-sm"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${color}15` }}
            >
              <Image
                src={icon}
                alt={label}
                width={18}
                height={18}
                className="w-4.5 h-4.5 object-contain"
              />
            </div>
            <span className="text-2xl font-black text-[#244D3F]">{value}</span>
            <span className="text-xs text-[#94A3B8] text-center">{label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E9E9E9] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-[#1a1a1a]">By Interaction Type</h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              {total} total interactions logged
            </p>
          </div>
        </div>

        {total === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-[#64748B] font-medium">No data yet</p>
            <p className="text-[#94A3B8] text-sm mt-1">
              Log check-ins from friend profiles to see analytics here.
            </p>
          </div>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {data.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[entry.name.toLowerCase()]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E9E9E9",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontSize: "13px",
                  }}
                  formatter={(value, name) => [value, name]}
                />
                <Legend
                  formatter={(value) => (
                    <span className="text-xs font-medium text-[#64748B]">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
