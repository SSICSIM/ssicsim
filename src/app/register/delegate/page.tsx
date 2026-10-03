import DelegateRegister from "@/views/delegate-register";
import { getRegistrationCapacity } from "@/lib/registration-capacity";

// Capacity changes with every registration, so never serve a cached page.
export const dynamic = "force-dynamic";

export default async function Page() {
  const capacity = await getRegistrationCapacity();
  return <DelegateRegister initialWaitlist={capacity?.is_full ?? false} />;
}
