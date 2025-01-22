"use client";

import { useState, useEffect } from 'react';
import { Navbar } from '@/app/components/navbar';
import { Logo } from '@/app/components/logo';
import { BookCard } from '@/app/components/ui/book-card';
import { Skeleton } from '@/app/components/ui/skeleton';

interface Book {
  key: string;
  title: string;
  cover_i?: number;
  author_name?: string[];
}

export default function Home() {
  const [currentBooks, setCurrentBooks] = useState<Book[]>([]);
  const [watchFriendsBooks, setWatchFriendsBooks] = useState<Book[]>([]);
  const [exploreBooks, setExploreBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWithRetry = async (url: string, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const data = await fetchWithRetry('https://openlibrary.org/search.json?q=popular&limit=8');
        const books = data.docs.slice(0, 8);
        
        // Set all book data at once to ensure smooth transition
        await Promise.all([
          setCurrentBooks(books),
          setWatchFriendsBooks(books),
          setExploreBooks(books)
        ]);
      } catch (error) {
        console.error('Error fetching books:', error);
        // Set empty arrays to prevent undefined errors
        setCurrentBooks([]);
        setWatchFriendsBooks([]);
        setExploreBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const BookGrid = ({ books, title, isLoading }: { books: Book[], title: string, isLoading: boolean }) => (
    <div className="mb-8">
      <h2 className="text-xl font-mono mb-4">{title}</h2>
      <div className="grid grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-5">
              <Skeleton className="h-48 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))
        ) : (
          books.map((book) => (
            <BookCard
              key={book.key}
              title={book.title}
              coverUrl={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : undefined}
              author={book.author_name?.[0]}
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <main className="flex min-h-screen">
      <div className="w-1/4 p-4 border-r border-gray-200 fixed h-screen overflow-y-auto">
        <Logo />
        <Navbar />
      </div>
      <div className="w-3/4 p-8 ml-[25%]">
        <BookGrid books={currentBooks} title="book.current()" isLoading={isLoading} />
        <BookGrid books={watchFriendsBooks} title="book.watchFriends()" isLoading={isLoading} />
        <BookGrid books={exploreBooks} title="book.explore()" isLoading={isLoading} />
      </div>
    </main>
  );
}
