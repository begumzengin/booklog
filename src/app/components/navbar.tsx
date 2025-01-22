"use client"
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
    const pathname = usePathname();
    const { user } = useAuth();

    return (
        <div className="flex flex-col gap-4">
            <nav>
                <div className="flex flex-col gap-2">
                    <Link href="/" className={`font-mono ${pathname === "/" ? "font-bold" : ""}`}>book.shelf()</Link>
                    <Link href="/analytics" className={`font-mono ${pathname === "/analytics" ? "font-bold" : ""}`}>book.analytics()</Link>
                    <Link href="/" className={`font-mono ${pathname === "/groups" ? "font-bold" : ""}`}>book.groups()</Link>
                </div>
            </nav>

            <div className="pt-4 border-t border-gray-200">
                {user ? (
                    <div className="flex flex-col gap-2">
                        <Link href="/user/profile" className={`font-mono ${pathname === "/user/profile" ? "font-bold" : ""}`}>user.profile()</Link>
                    </div>
                ) : (
                    <Link href="/login" className="font-mono">user.login()</Link>
                )}
            </div>
        </div>
    )
}