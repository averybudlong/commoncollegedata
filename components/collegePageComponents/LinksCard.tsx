import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface LinksCardProps {
  website: string;
  app_website: string;
}

const LinksCard: React.FC<LinksCardProps> = ({
  website,
  app_website,
}) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Links</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-blue-600">
          <a href={website} target="_blank">
            {website.length == 1 ? "No Website Provided" : "Main Website"}
          </a>
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-blue-600">
          <a href={app_website} target="_blank">
            {app_website.length == 1
              ? "No Website Provided"
              : "Application Website"}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LinksCard;
