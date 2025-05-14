"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  // Track mounted state to prevent hydration issues
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      // 1. No token case
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // 2. Verify token with backend
        const res = await axios.get("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 3. Valid token case
        if (res.data.success) {
          dispatch(setUser(res.data.data));
        } else {
          throw new Error("Invalid token response");
        }
      } catch (error) {
        console.error("Auth error:", error);

        // 4. Only remove token on 401 errors
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          // 5. For other errors, keep the token but show warning
          console.warn("Authentication check failed, using cached token");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, router, hasMounted]);

  if (!hasMounted || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return children;
}
