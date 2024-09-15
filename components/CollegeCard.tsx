"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BasicCollege } from "../types/BasicCollege";
import React from "react";

interface CollegeCardProps {
  college: BasicCollege;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college }) => {
  const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";
  const image_url = college.image_url ? "/images/" + college.image_url : null;

  return (
    <Link href={`/college/${college.id}`}>
      <Card className="max-w-s hover:scale-105 transform transition duration-200">
        <div className="relative w-full h-48">
          <Image
            src={image_url || PLACEHOLDER_IMAGE}
            alt={`${college.name} campus`}
            fill
            sizes="35vw"
            style={{ objectFit: "cover" }}
            className="rounded-t-2xl"
          />
        </div>
        <CardHeader>
          <CardTitle>{college.name}</CardTitle>
          <CardDescription>
            {college.city}, {college.state}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Undergrad Enrollment:{" "}
            <b>{college.enrolled ? college.enrolled.toString() : "null"}</b>{" "}
            <br />
            Acceptance Rate:{" "}
            <b>{(college.acceptance_rate * 100).toFixed(2)}%</b>
          </p>
        </CardContent>
        <CardFooter>
          <p className="overflow-hidden text-sm text-muted-foreground">
            {college.similarity &&
              "Similarity: " + Math.round(college.similarity * 100) + "%"}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CollegeCard;
