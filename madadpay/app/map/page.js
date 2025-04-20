'use client'
import dynamic from "next/dynamic";

const FreeMap = dynamic(() => import("../../components/FreeMap"), {
  ssr: false,
});

export default function MapPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Your Nearby Area</h1>
      <FreeMap />
    </main>
  );
}
