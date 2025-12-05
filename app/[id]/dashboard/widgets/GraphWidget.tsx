"use client";

import React, { useState, useMemo } from "react";
import { useTheme } from "next-themes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Slider = ({
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) => {
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <input
      type="range"
      className="w-full cursor-pointer mt-2 no-drag"
      min={min}
      max={max}
      step={step}
      value={value}
      onMouseDown={stop}
      onTouchStart={stop}
      onPointerDown={stop}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
};

export const GraphWidget = ({
  title,
  hourlyData,
  dailyData,
}: {
  title: string;
  hourlyData: { timestamp: string; value: number }[];
  dailyData: { date: string; value: number }[];
}) => {
  const { theme } = useTheme();
  const [range, setRange] = useState(1);

  const RANGE_MAP = [1, 7, 30, 90, 365];

  const finalData = useMemo(() => {
    if (range === 0) {
      return hourlyData.map((h) => ({
        x: new Date(h.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        value: h.value,
      }));
    }

    const days = RANGE_MAP[range];
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    return dailyData
      .filter((d) => new Date(d.date) >= cutoff)
      .map((d) => ({
        x: d.date,
        value: d.value,
      }));
  }, [range, hourlyData, dailyData]);

  const colors = {
    line: theme === "dark" ? "#3b82f6" : "#3b82f6",
    grid: theme === "dark" ? "#374151" : "#e5e7eb",
    tooltipBg: theme === "dark" ? "#1f2937" : "#ffffff",
    tooltipBorder: theme === "dark" ? "#4b5563" : "#d1d5db",
    tooltipLabel: theme === "dark" ? "#f9fafb" : "#111827",
    tooltipItem: theme === "dark" ? "#34d399" : "#059669",
    axis: theme === "dark" ? "#d1d5db" : "#111827",
  };

  return (
    <div className="w-full h-full p-3 overflow-hidden select-none">
      <div className="font-bold text-lg mb-3">{title}</div>
      <div className="text-sm text-muted-foreground">
        {range === 0 && "Last 24 Hours (Hourly)"}
        {range === 1 && "Last 7 Days"}
        {range === 2 && "Last 30 Days"}
        {range === 3 && "Last 90 Days"}
        {range === 4 && "Last Year"}
      </div>

      <Slider min={0} max={4} step={1} value={range} onChange={setRange} />

      <div className="mt-4">
        <LineChart width={350} height={220} data={finalData}>
          <CartesianGrid stroke={colors.grid} strokeDasharray="3 3" />
          <XAxis dataKey="x" tick={{ fill: colors.axis, fontSize: 10 }} />
          <YAxis tick={{ fill: colors.axis }} />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.tooltipBg,
              borderColor: colors.tooltipBorder,
            }}
            labelStyle={{ color: colors.tooltipLabel, fontWeight: "bold" }}
            itemStyle={{ color: colors.tooltipItem }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={colors.line}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </div>
    </div>
  );
};
