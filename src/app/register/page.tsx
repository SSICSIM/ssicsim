import Register from "@/views/register";
import { getRegistrationCapacity } from "@/lib/registration-capacity";

export const dynamic = "force-dynamic";

export default async function Page() {
  const capacity = await getRegistrationCapacity();
  return <Register waitlist={capacity?.is_full ?? false} />;
}
