import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

interface JobCardProps {
  featureName: string;
  featureImage: string;
  imageColor: string;
}

export function FeaturedCard({
  featureName,
  featureImage,
  imageColor,
}: JobCardProps) {
  return (
    <Card className="card-shadow rounded-2xl bg-secondary border backdrop-blur border-secondary-border">
      <CardHeader className="flex flex-col gap-2">
        <Image
          width={56}
          height={56}
          src={featureImage}
          alt={`${featureName} icon`}
          className={`p-2 ${imageColor} rounded-xl`}
        />
        <div>
          <h1 className="text-4xl font-medium">{featureName}</h1>
        </div>
      </CardHeader>
    </Card>
  );
}
