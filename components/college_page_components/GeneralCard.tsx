import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import CollegeCard from "../CollegeCard";

interface GeneralCardProps {
  state: string;
  city: string;
  name: string;
  revenue_pub: number;
  longitude: number;
  latitude: number;
}

const GeneralCard: React.FC<GeneralCardProps> = ({
  state,
  city,
  name,
  revenue_pub,
  longitude,
  latitude,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{`${city}, ${state}`}</p>
        <p>
          ({latitude}, {longitude})
        </p>
      </CardContent>
      <CardFooter>
        <p>{revenue_pub ? "Public University" : "Private University"}</p>
      </CardFooter>
    </Card>
  );
};

export default GeneralCard;
