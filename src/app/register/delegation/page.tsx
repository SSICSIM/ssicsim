import Link from "next/link";
import DelegationRegister from "@/views/delegation-register";
import { getRegistrationCapacity } from "@/lib/registration-capacity";

export const dynamic = "force-dynamic";

export default async function Page() {
  const capacity = await getRegistrationCapacity();
  if (!capacity?.is_full) return <DelegationRegister />;

  // Registration is full: new delegations can't RSVP.
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A3841D] to-[#c2a030] flex items-center justify-center px-6 pt-[120px]">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold font-nunito text-gray-900 mb-4">
          Delegation RSVPs Are Closed
        </h2>
        <p className="text-gray-600 font-dm-sans mb-6 leading-relaxed">
          Registration for SSICSIM 2026 is full, so we are no longer accepting
          new delegation RSVPs. Delegates may still join the waitlist
          individually.
        </p>
        <Link
          href="/register/delegate"
          className="inline-block bg-[#A3841D] text-white px-6 py-3 rounded-lg font-dm-sans font-semibold hover:bg-[#8a6f1b] transition-colors"
        >
          Join the Waitlist
        </Link>
      </div>
    </div>
  );
}
