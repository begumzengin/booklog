"use client";

import { useEffect, useState } from 'react';
import { Navbar } from '@/app/components/navbar';
import { Logo } from '@/app/components/logo';
import { Card } from '@/app/components/ui/card';
import { BarList, AreaChart, Title } from '@tremor/react';

interface ReadingData {
  month: string;
  books: number;
  pages: number;
  hours: number;
}

const dummyData: ReadingData[] = [
  { month: 'Jan', books: 3, pages: 750, hours: 15 },
  { month: 'Feb', books: 4, pages: 1200, hours: 24 },
  { month: 'Mar', books: 2, pages: 600, hours: 12 },
  { month: 'Apr', books: 5, pages: 1500, hours: 30 },
  { month: 'May', books: 3, pages: 900, hours: 18 },
  { month: 'Jun', books: 4, pages: 1100, hours: 22 },
];

const genreData = [
  { name: 'Fiction', value: 8 },
  { name: 'Non-Fiction', value: 6 },
  { name: 'Science', value: 4 },
  { name: 'History', value: 3 },
  { name: 'Poetry', value: 2 },
];

export default function Analytics() {
  return (
    <main className="flex min-h-screen">
      <div className="w-1/4 p-4 border-r border-gray-200 fixed h-screen overflow-y-auto">
        <Logo />
        <Navbar />
      </div>
      <div className="w-3/4 p-8 ml-[25%]">
        <h1 className="text-4xl font-mono mb-8">book.analytics()</h1>
        
        <div className="grid grid-cols-1 gap-8">
          {/* Reading Progress Chart */}
          <Card className="p-6">
            <h2 className="text-xl font-mono mb-4">reading.progress()</h2>
            <AreaChart
              className="h-72"
              data={dummyData}
              index="month"
              categories={["books"]}
              colors={["black"]}
              showLegend={false}
            />
          </Card>

          {/* Pages Read Chart */}
          <Card className="p-6">
            <h2 className="text-xl font-mono mb-4">pages.read()</h2>
            <AreaChart
              className="h-72"
              data={dummyData}
              index="month"
              categories={["pages"]}
              colors={["black"]}
              showLegend={false}
            />
          </Card>

          {/* Genre Distribution */}
          <Card className="p-6">
            <h2 className="text-xl font-mono mb-4">genre.distribution()</h2>
            <BarList
              data={genreData}
              className="h-72"
              color="black"
            />
          </Card>
        </div>
      </div>
    </main>
  );
}