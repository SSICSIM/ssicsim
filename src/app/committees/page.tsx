import { Suspense } from "react";
import Committees from "@/views/committees";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Committees />
    </Suspense>
  );
}
