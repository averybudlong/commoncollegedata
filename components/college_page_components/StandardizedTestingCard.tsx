import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface StandardizedTestingCardProps {
  name: string;
  percentile25: number;
  percentile50: number;
  percentile75: number;
  percentSubmitted: number;
}

const StandardizedTestingCard: React.FC<StandardizedTestingCardProps> = ({
  name,
  percentile25,
  percentile50,
  percentile75,
  percentSubmitted,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>
            Percent of Students Submitting:{" "}
            <b>{percentSubmitted == null ? "N/A" : percentSubmitted + "%"}</b>
          </li>
          <li>
            75th Percentile: <b>{percentile75 || "N/A"}</b>
          </li>
          <li>
            50th Percentile: <b>{percentile50 || "N/A"}</b>
          </li>
          <li>
            25th Percentile: <b>{percentile25 || "N/A"}</b>
          </li>
        </ul>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default StandardizedTestingCard;
