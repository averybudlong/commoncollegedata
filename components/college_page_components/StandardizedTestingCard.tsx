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
  sat25: number;
  sat50: number;
  sat75: number;
  satPct: number;
  act25: number;
  act50: number;
  act75: number;
  actPct: number;
}

const LinksCard: React.FC<StandardizedTestingCardProps> = ({
  name,
  sat25,
  sat50,
  sat75,
  satPct,
  act25,
  act50,
  act75,
  actPct,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        {sat75}
        {act75}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default LinksCard;
