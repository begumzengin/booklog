"use client";

import Link from "next/link";

interface LogoProps {
  collapsed: boolean;
}

export function Logo({ collapsed }: LogoProps) {
  return (
    <Link href="/" className="block mb-8">
      <h1 className="text-2xl flex items-center">
        book.log()
      </h1>
    </Link>
  );
}