"use client";

import { useTheme } from "next-themes";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface ChartWidgetProps {
  title: string;
  type: "pie" | "bar";
  data: any[];
}

export const ChartWidget = ({ title, type, data }: ChartWidgetProps) => {
  const colors = ["#FF0000", "#82ca9d", "#ffc658", "#ff7373"];
  const { theme } = useTheme();

  const tooltipStyle =
    theme === "dark"
      ? {
          content: { backgroundColor: "#1f2937", borderColor: "#4b5563" },
          label: { color: "#f9fafb", fontWeight: "bold" },
          item: { color: "#10b981" },
        }
      : {
          content: { backgroundColor: "#ffffff", borderColor: "#d1d5db" },
          label: { color: "#111827", fontWeight: "bold" },
          item: { color: "#059669" },
        };

  return (
    <div className="w-full h-full select-none">
      <div className="font-bold text-lg mb-2">{title}</div>

      {type === "pie" && (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle.content}
              labelStyle={tooltipStyle.label}
              itemStyle={tooltipStyle.item}
            />
          </PieChart>
        </ResponsiveContainer>
      )}

      {type === "bar" && (
        <BarChart width={350} height={250} data={data}>
          <CartesianGrid strokeDasharray="6 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={tooltipStyle.content}
            labelStyle={tooltipStyle.label}
            itemStyle={tooltipStyle.item}
          />
          <Bar dataKey="value">
            {data.map((entry, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      )}
    </div>
  );
};
