"use client";

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/app/components/navbar';
import { Logo } from '@/app/components/logo';

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <main className="flex min-h-screen">
      <div className="w-1/4 p-4 border-r border-gray-200">
        <Navbar />
      </div>
      <div className="w-3/4 p-8">
        <h1 className="text-4xl font-mono mb-8">user.profile()</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-mono mb-2">user.info</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 font-mono">name</p>
                  <p className="font-mono">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-mono">email</p>
                  <p className="font-mono">{user?.email}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-mono mb-2">user.stats</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 font-mono">books read</p>
                  <p className="text-2xl font-mono">42</p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 font-mono">pages read</p>
                  <p className="text-2xl font-mono">12,483</p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p className="text-sm text-gray-600 font-mono">reading time</p>
                  <p className="text-2xl font-mono">208h</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleLogout}
                className="bg-foreground text-background px-4 py-2 rounded font-mono hover:opacity-90"
              >
                user.logout()
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}