"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="block mb-8">
      <h1 className="text-2xl font-mono flex items-center">
        book.log()
      </h1>
    </Link>
  );
}