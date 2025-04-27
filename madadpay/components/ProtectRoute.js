"use client";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    if (!loading && !user && !isPublicRoute) {
      router.push("/login");
    }
  }, [user, loading, isPublicRoute, router]);

  if (loading || (!user && !isPublicRoute)) {
    return <div>Loading...</div>;
  }

  return children;
}
