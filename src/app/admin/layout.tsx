"use client";

import { Navigation, Footer } from "@/components/layout";
import { ProtectedRoute } from "@/components/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <Navigation />
      {children}
      <Footer />
    </ProtectedRoute>
  );
}
