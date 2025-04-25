"use client";

import { Suspense } from "react";
import { AppLayout } from "@/app/components/app-layout";
import AIChatbot from "./components/AIChatbot";

export default function ChatbotPage() {
  return (
    <AppLayout showFooter={false}>
      <Suspense fallback={<div>Loading...</div>}>
        <AIChatbot />
      </Suspense>
    </AppLayout>
  );
}
