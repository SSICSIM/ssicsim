import Committees from "@/views/committees";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}> 
      <Committees />
    </Suspense>
  );
}
