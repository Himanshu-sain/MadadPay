"use client";

import ProtectedRoute from "./ProtectRoute";

export default function ProtectedWrapper({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
