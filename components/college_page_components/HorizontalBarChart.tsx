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

type HorizontalBarChartProps = {
  data: DataItem[];
  title: string;
};

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  title,
}) => {
  const formatToUSD = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getBarColor = (index: number) => {
    return index === 0 ? "hsl(var(--accent))" : "gray";
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            barCategoryGap="20%"
          >
            <XAxis type="number" tickFormatter={formatToUSD} />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip
              formatter={formatToUSD}
              cursor={false}
              itemStyle={{ color: "black" }}
              labelStyle={{ color: "black" }}
            />
            <Bar dataKey="value" fill="hsl(var(--accent))">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HorizontalBarChart;
