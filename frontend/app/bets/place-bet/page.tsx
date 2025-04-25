"use client";

import { Suspense } from "react";
import { AppLayout } from "@/app/components/app-layout";
import PlaceBetContent from "./components/PlaceBetContent";

export default function PlaceBetPage() {
  return (
    <AppLayout showFooter={false}>
      <Suspense fallback={<div>Loading...</div>}>
        <PlaceBetContent />
      </Suspense>
    </AppLayout>
  );
}
