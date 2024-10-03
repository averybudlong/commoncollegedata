"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DataItem = {
  name: string;
  value: number;
};

type LeaderboardChartProps = {
  data: DataItem[];
  title: string;
};

const LeaderboardChart: React.FC<LeaderboardChartProps> = ({ data, title }) => {
  const formatToUSD = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getBarColor = (name: string) => {
    if (name.includes("(Selected)")) {
      return "hsl(var(--accent))";
    }
    return "gray";
  };

  // Calculate the height based on the number of items
  const itemHeight = 30; // Height per item
  const chartHeight = Math.max(750, data.length * itemHeight);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div style={{ height: "750px", overflowY: "auto" }}>
          <div style={{ height: `${chartHeight}px`, minWidth: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" tickFormatter={formatToUSD} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={250}
                  tick={{ fontSize: 14 }}
                  interval={0}
                />
                <Tooltip
                  formatter={formatToUSD}
                  cursor={false}
                  itemStyle={{ color: "black" }}
                  labelStyle={{ color: "black" }}
                />
                <Bar dataKey="value" fill="hsl(var(--accent))" barSize={30}>
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getBarColor(entry.name)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardChart;
