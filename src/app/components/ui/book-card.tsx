"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "./card";
import { Skeleton } from "@/app/components/ui/skeleton";

interface BookCardProps {
  title: string;
  coverUrl?: string;
  author?: string;
  className?: string;
  isLoading?: boolean;
}

export function BookCard({ title, coverUrl, author, className, isLoading }: BookCardProps) {
  if (isLoading) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardContent className="p-0">
          <Skeleton className="h-48 w-full" />
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 p-4">
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-3 w-[60%]" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-lg", className)}>
      <CardContent className="p-0">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="h-48 w-full object-cover transition-transform hover:scale-105"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-gray-100">
            <span className="font-mono text-sm text-gray-500">No Cover</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-1 p-4">
        <h3 className="text-sm font-medium leading-none truncate w-full">
          {title}
        </h3>
        {author && (
          <p className="text-xs text-gray-500 truncate w-full">{author}</p>
        )}
      </CardFooter>
    </Card>
  );
}