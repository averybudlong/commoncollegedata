import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface AdmissionCardProps {
  applicants: number;
  admitted: number;
  enrolled_cycle: number;
}

const AdmissionCard: React.FC<AdmissionCardProps> = ({
  applicants,
  admitted,
  enrolled_cycle,
}) => {
  const acceptanceRate = (admitted / applicants) * 100;
  const yieldRate = (enrolled_cycle / admitted) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acceptance Rate</CardTitle>
        <CardDescription>2022 Cycle</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{`Acceptance Rate: ${acceptanceRate.toFixed(2)}%`}</p>
      </CardContent>
      <CardFooter>
        <p>{`Yield Rate: ${yieldRate.toFixed(2)}%`}</p>
      </CardFooter>
    </Card>
  );
};

export default AdmissionCard;
