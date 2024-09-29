"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Demographics } from "@/types/Demographics";

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const DemographicsPieChart: React.FC<Demographics> = (demographics) => {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FF8042",
    "#8884D8",
    "#82ca9d",
    "#a4de6c",
    "#d0ed57",
    "#FFBB28",
  ];
  const data = [
    { name: "White", value: demographics.white },
    { name: "Black", value: demographics.black },
    { name: "Asian", value: demographics.asian },
    { name: "Hispanic", value: demographics.hispanic },
    { name: "American Indian", value: demographics.american_indian },
    { name: "Pacific Islander", value: demographics.pacific_islander },
    { name: "Multiple Races", value: demographics.multiple_races },
    { name: "Unknown Race", value: demographics.unknown_race },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: CustomizedLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {percent > 0.01 && `${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius="100%"
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DemographicsPieChart;
