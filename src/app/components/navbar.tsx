"use client"
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { BookOpen, BarChart2, Users, User, LogIn } from "react-feather";
import { Logo } from "./logo";

export const Navbar = () => {
    const pathname = usePathname();
    const { user } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`flex flex-col gap-4 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-48'} p-4 relative bg-white shadow-sm rounded-lg`}>
            <Logo collapsed={isCollapsed} />
            <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-4 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-all duration-200"
            >
                {isCollapsed ? '→' : '←'}
            </button>
            
            <nav>
                <div className="flex flex-col gap-2">
                    <Link href="/" className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 ${pathname === "/" ? "font-bold" : ""} ${isCollapsed ? 'justify-center' : ''}`}>
                        <BookOpen size={20} />
                        {!isCollapsed && <span>book.shelf()</span>}
                    </Link>
                    <Link href="/analytics" className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 ${pathname === "/analytics" ? "font-bold" : ""} ${isCollapsed ? 'justify-center' : ''}`}>
                        <BarChart2 size={20} />
                        {!isCollapsed && <span>book.analytics()</span>}
                    </Link>
                    <Link href="/" className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 ${pathname === "/groups" ? "font-bold" : ""} ${isCollapsed ? 'justify-center' : ''}`}>
                        <Users size={20} />
                        {!isCollapsed && <span>book.groups()</span>}
                    </Link>
                </div>
            </nav>

            <div className="pt-4 border-t border-gray-200">
                {user ? (
                    <div className="flex flex-col gap-2">
                        <Link href="/user/profile" className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 ${pathname === "/user/profile" ? "font-bold" : ""} ${isCollapsed ? 'justify-center' : ''}`}>
                            <User size={20} />
                            {!isCollapsed && <span>user.profile()</span>}
                        </Link>
                    </div>
                ) : (
                    <Link href="/login" className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`}>
                        <LogIn size={20} />
                        {!isCollapsed && <span>user.login()</span>}
                    </Link>
                )}
            </div>
        </div>
    )
}