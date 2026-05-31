"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Delegation {
  id: string;
  name: string;
}

interface Committee {
  id: string;
  name: string;
}

interface FormData {
  // Step 1 – Affiliation
  delegateEmail: string;
  delegationId: string; // empty string = Independent Delegate
  // Step 2 – Personal Info
  firstName: string;
  lastName: string;
  preferredName: string;
  grade: string;
  experience: string;
  codeOfConductAck: boolean;
  // Step 3 – Policies
  paymentPolicyAck: boolean;
  cancellationPolicyAck: boolean;
  // Step 4 – Committee Preferences
  firstCommittee: string;
  secondCommittee: string;
  thirdCommittee: string;
  // Step 5 – Final Notes
  heardAbout: string;
  notes: string;
}

const INITIAL: FormData = {
  delegateEmail: "",
  delegationId: "",
  firstName: "",
  lastName: "",
  preferredName: "",
  grade: "",
  experience: "",
  codeOfConductAck: false,
  paymentPolicyAck: false,
  cancellationPolicyAck: false,
  firstCommittee: "",
  secondCommittee: "",
  thirdCommittee: "",
  heardAbout: "",
  notes: "",
};

const STEPS = [
  "Affiliation",
  "Personal Info",
  "Policies",
  "Committees",
  "Final Notes",
];

const EXPERIENCE_OPTIONS: { label: string; value: string; desc: string }[] = [
  { label: "Novice", value: "Beginner", desc: "Attended 0–1 Model UN conferences" },
  {
    label: "Intermediate",
    value: "Intermediate",
    desc: "Attended 2–4 Model UN conferences",
  },
  {
    label: "Advanced",
    value: "Expertise",
    desc: "Attended 5+ Model UN conferences",
  },
];

const GRADE_OPTIONS = ["Grade 9", "Grade 10", "Grade 11", "Grade 12", "Other"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  done
                    ? "bg-[#A3841D] text-white"
                    : active
                      ? "border-2 border-[#A3841D] text-[#A3841D] bg-white"
                      : "bg-gray-200 text-gray-400"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className={`text-[10px] mt-1 font-dm-sans hidden sm:block ${active ? "text-[#A3841D] font-semibold" : "text-gray-400"}`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-6 sm:w-12 mb-4 transition-colors ${done ? "bg-[#A3841D]" : "bg-gray-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold font-dm-sans text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1 font-dm-sans">{hint}</p>}
    </div>
  );
}

const inputCls =
  "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-[#A3841D] focus:border-transparent transition";

export default function DelegateRegister() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [delegations, setDelegations] = useState<Delegation[]>([]);
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  useEffect(() => {
    Promise.all([
      fetch("/api/delegations").then((r) => r.json()),
      fetch("/api/committees").then((r) => r.json()),
    ])
      .then(([dels, comms]) => {
        setDelegations(Array.isArray(dels) ? dels : []);
        setCommittees(Array.isArray(comms) ? comms : []);
        setLoadingData(false);
      })
      .catch(() => setLoadingData(false));
  }, []);

  function validateStep(): string | null {
    if (step === 0) {
      if (!form.delegateEmail.trim()) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.delegateEmail))
        return "Please enter a valid email address.";
    }
    if (step === 1) {
      if (!form.firstName.trim()) return "First name is required.";
      if (!form.lastName.trim()) return "Last name is required.";
      if (!form.grade) return "Please select your grade.";
      if (!form.experience) return "Please select your experience level.";
      if (!form.codeOfConductAck)
        return "Please acknowledge the Delegate Code of Conduct.";
    }
    if (step === 2) {
      if (!form.paymentPolicyAck) return "Please acknowledge the Payment Policy.";
      if (!form.cancellationPolicyAck)
        return "Please acknowledge the Cancellation Policy.";
    }
    if (step === 3) {
      if (!form.firstCommittee) return "Please select your first committee preference.";
      if (!form.secondCommittee)
        return "Please select your second committee preference.";
      if (!form.thirdCommittee)
        return "Please select your third committee preference.";
      if (
        form.firstCommittee === form.secondCommittee ||
        form.firstCommittee === form.thirdCommittee ||
        form.secondCommittee === form.thirdCommittee
      )
        return "Please select three different committees.";
    }
    return null;
  }

  function next() {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError(null);
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setError(null);
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError(null);
    setSubmitting(true);
    try {
      // Resolve delegation ID — empty means Independent Delegate
      const delegation = delegations.find((d) => d.id === form.delegationId);
      const delegationId = delegation ? form.delegationId : null;

      const res = await fetch("/api/delegates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim(),
          full_name: `${form.firstName.trim()} ${form.lastName.trim()}`,
          preferred_name: form.preferredName.trim() || null,
          grade: form.grade || null,
          email: form.delegateEmail.trim(),
          delegate_experience: form.experience,
          first_committee: form.firstCommittee,
          second_committee: form.secondCommittee,
          third_committee: form.thirdCommittee,
          delegation_id: delegationId,
          code_of_conduct_signed: form.codeOfConductAck,
          payment_policy_ack: form.paymentPolicyAck,
          cancellation_policy_ack: form.cancellationPolicyAck,
          heard_about: form.heardAbout.trim() || null,
          notes: form.notes.trim() || null,
          date_applied: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail ?? `Error ${res.status}`);
      }
      // fire-and-forget confirmation email
      fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients: [{ email: form.delegateEmail.trim(), name: `${form.firstName} ${form.lastName}` }],
          subject: "SSICSIM 2026 – Delegate Registration Received",
          body: `Dear ${form.preferredName.trim() || form.firstName},\n\nThank you for registering as a delegate for SSICSIM 2026! Your registration has been received and is currently awaiting review.\n\nHere is a summary of your committee preferences:\n  1st Choice: ${form.firstCommittee}\n  2nd Choice: ${form.secondCommittee}\n  3rd Choice: ${form.thirdCommittee}\n\nYou will receive a follow-up email with your committee assignment and payment details. Please check your inbox and spam folder for emails from us.\n\nIf you have any questions, please contact us at registration@ssicsim.ca.\n\nSincerely,\nThe SSICSIM Secretariat`,
        }),
      }).catch(() => {});
      setSubmitted(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Committees available for each preference slot (exclude already chosen)
  const available2 = committees.filter((c) => c.name !== form.firstCommittee);
  const available3 = committees.filter(
    (c) => c.name !== form.firstCommittee && c.name !== form.secondCommittee,
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 pt-[120px]">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-[#A3841D]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-[#A3841D] text-3xl">✓</span>
          </div>
          <h2 className="text-3xl font-bold font-nunito text-gray-900 mb-4">
            Registration Submitted!
          </h2>
          <p className="text-gray-600 font-dm-sans mb-2 leading-relaxed">
            Thank you, <span className="font-semibold">{form.firstName}</span>! Your
            registration has been received.
          </p>
          <p className="text-gray-600 font-dm-sans mb-6 leading-relaxed text-sm">
            A confirmation email has been sent to{" "}
            <span className="font-semibold">{form.delegateEmail}</span>. Please check
            your inbox and spam folder for emails from us.
          </p>
          <Link
            href="/register"
            className="inline-block bg-[#A3841D] text-white px-6 py-3 rounded-lg font-dm-sans font-semibold hover:bg-[#8a6f1b] transition-colors"
          >
            Back to Registration
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Gold header — clears fixed navbar (~120px) */}
      <div className="bg-gradient-to-br from-[#A3841D] to-[#c2a030] pt-[220px] pb-10 px-6">
        <div className="max-w-2xl mx-auto">
          <Breadcrumb className="mb-4">
            <BreadcrumbList className="text-white/70">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-white/70 hover:text-white">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/register" className="text-white/70 hover:text-white">Registration</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-semibold">Delegate Registration</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-4xl md:text-5xl font-bold font-nunito text-white mb-2">
            Delegate Registration
          </h1>
          <p className="text-white/80 font-dm-sans text-sm">
            Register individually as a delegate for SSICSIM 2026. Each delegate must
            complete this form independently.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto py-10 px-6">
        <StepIndicator current={step} />

        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* Step 0 – Affiliation */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold font-nunito text-gray-900 mb-2">
                Section 1: Delegate Affiliation
              </h2>
              <p className="text-sm text-gray-500 font-dm-sans mb-6">
                If you are registering with a confirmed Group Delegation, select it
                below. Otherwise, select &quot;Independent Delegate&quot;.
              </p>
              <Field label="Email Address" required>
                <input
                  type="email"
                  className={inputCls}
                  value={form.delegateEmail}
                  onChange={(e) => set("delegateEmail", e.target.value)}
                  placeholder="your@email.com"
                />
              </Field>
              <Field label="Delegate Affiliation" required>
                {loadingData ? (
                  <div className="flex items-center gap-2 text-sm text-gray-400 font-dm-sans py-2">
                    <div className="w-4 h-4 border-2 border-[#A3841D] border-t-transparent rounded-full animate-spin" />
                    Loading delegations...
                  </div>
                ) : (
                  <select
                    className={inputCls}
                    value={form.delegationId}
                    onChange={(e) => set("delegationId", e.target.value)}
                  >
                    <option value="">Independent Delegate</option>
                    {delegations
                      .filter((d) => d.name !== "Independent Delegate")
                      .map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                  </select>
                )}
              </Field>
            </div>
          )}

          {/* Step 1 – Personal Info */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold font-nunito text-gray-900 mb-2">
                Part I: Delegate Information
              </h2>
              <p className="text-sm text-gray-500 font-dm-sans mb-6">
                Please carefully fill out the information below. Your full name will
                be used on official documents and your conference lanyard.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name" required>
                  <input
                    className={inputCls}
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    placeholder="First name"
                  />
                </Field>
                <Field label="Last Name" required>
                  <input
                    className={inputCls}
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                    placeholder="Last name"
                  />
                </Field>
              </div>
              <Field
                label="Preferred Name"
                hint="If left blank, your full legal name will be used on official documents and your lanyard."
              >
                <input
                  className={inputCls}
                  value={form.preferredName}
                  onChange={(e) => set("preferredName", e.target.value)}
                  placeholder="Optional preferred name"
                />
              </Field>
              <Field label="Grade (Fall 2026)" required>
                <select
                  className={inputCls}
                  value={form.grade}
                  onChange={(e) => set("grade", e.target.value)}
                >
                  <option value="">Select your grade</option>
                  {GRADE_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Delegate Experience Level" required>
                <div className="flex flex-col gap-3 mt-1">
                  {EXPERIENCE_OPTIONS.map(({ label, value, desc }) => (
                    <label key={value} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="experience"
                        value={value}
                        checked={form.experience === value}
                        onChange={() => set("experience", value)}
                        className="accent-[#A3841D] w-4 h-4 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm font-dm-sans text-gray-700">
                        <span className="font-semibold">{label}</span> — {desc}
                      </span>
                    </label>
                  ))}
                </div>
              </Field>
              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                <h4 className="font-bold font-nunito text-gray-900 mb-2">
                  Delegate Code of Conduct
                </h4>
                <p className="text-xs text-gray-600 font-dm-sans mb-4 leading-relaxed">
                  Please read through the{" "}
                  <a
                    href="https://ssicsim.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A3841D] underline"
                  >
                    SSICSIM 2026 Delegate Code of Conduct
                  </a>{" "}
                  before proceeding with your registration.
                </p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.codeOfConductAck}
                    onChange={(e) => set("codeOfConductAck", e.target.checked)}
                    className="mt-0.5 accent-[#A3841D] w-4 h-4 flex-shrink-0"
                  />
                  <span className="text-sm font-dm-sans text-gray-700">
                    I have read and agree to the Delegate Code of Conduct.
                  </span>
                </label>
                <p className="text-xs text-gray-400 font-dm-sans mt-3 italic">
                  A formal digital sign-off form will be integrated here.
                </p>
              </div>
            </div>
          )}

          {/* Step 2 – Policies */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold font-nunito text-gray-900 mb-2">
                Part II: Official Registration Policies
              </h2>
              <p className="text-sm text-gray-500 font-dm-sans mb-6">
                Please read through the official registration policies for SSICSIM 2026.
              </p>

              <div className="mb-6 border border-gray-200 rounded-xl p-5 bg-gray-50">
                <h4 className="font-bold font-nunito text-gray-900 mb-2">
                  Payment Policy
                </h4>
                <p className="text-xs text-gray-600 font-dm-sans mb-4 leading-relaxed">
                  All Delegates are required to pay registration fees for the SSICSIM
                  conference. Registration fees are calculated individually for each
                  Delegate, dependent on the registration period in which they or their
                  Group Delegation registered and whether they have been granted financial
                  aid. Each Independent Delegate and individually paying Group Delegate
                  will be issued an invoice at the time they receive confirmation of their
                  registration. They will be given twenty-one (21) days to pay the invoice
                  total in full by Interac e-Transfer or cash. If payment is not received
                  by this date, their spot will be forfeited. All Delegates and Group
                  Delegations are required to pay their invoice total in full by the first
                  day of the conference.
                </p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.paymentPolicyAck}
                    onChange={(e) => set("paymentPolicyAck", e.target.checked)}
                    className="mt-0.5 accent-[#A3841D] w-4 h-4 flex-shrink-0"
                  />
                  <span className="text-sm font-dm-sans text-gray-700">
                    I have read and agree to the Payment Policy.
                  </span>
                </label>
              </div>

              <div className="mb-6 border border-gray-200 rounded-xl p-5 bg-gray-50">
                <h4 className="font-bold font-nunito text-gray-900 mb-2">
                  Cancellation Policy
                </h4>
                <p className="text-xs text-gray-600 font-dm-sans mb-4 leading-relaxed">
                  Delegates may cancel their registration at any time by notifying the
                  Chargé d&apos;Affaires at registration@ssicsim.ca. Refunds may be issued
                  depending on the date of cancellation. 25% refunds will be issued for
                  cancellations during the Regular and Late Bird Period. No refund will be
                  issued for cancellations after registration has closed. With any questions
                  or concerns about payment, cancellation, or invoicing, please contact us
                  at registration@ssicsim.ca.
                </p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.cancellationPolicyAck}
                    onChange={(e) => set("cancellationPolicyAck", e.target.checked)}
                    className="mt-0.5 accent-[#A3841D] w-4 h-4 flex-shrink-0"
                  />
                  <span className="text-sm font-dm-sans text-gray-700">
                    I have read and agree to the Cancellation Policy.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 3 – Committee Preferences */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold font-nunito text-gray-900 mb-2">
                Part III: Committee Preferences
              </h2>
              <p className="text-sm text-gray-500 font-dm-sans mb-6">
                Assignments are made on a rolling basis. SSICSIM will make every
                effort to accommodate your preferences but cannot guarantee placement
                in your top choice. Visit{" "}
                <Link
                  href="/committees"
                  className="text-[#A3841D] underline"
                  target="_blank"
                >
                  our committees page
                </Link>{" "}
                for more information.
              </p>
              {loadingData ? (
                <div className="flex items-center gap-2 text-sm text-gray-400 font-dm-sans py-4">
                  <div className="w-4 h-4 border-2 border-[#A3841D] border-t-transparent rounded-full animate-spin" />
                  Loading committees...
                </div>
              ) : committees.length === 0 ? (
                <p className="text-sm text-gray-400 font-dm-sans py-4">
                  No committees available at this time.
                </p>
              ) : (
                <>
                  <Field label="First Committee Preference" required>
                    <select
                      className={inputCls}
                      value={form.firstCommittee}
                      onChange={(e) => {
                        set("firstCommittee", e.target.value);
                        if (e.target.value === form.secondCommittee)
                          set("secondCommittee", "");
                        if (e.target.value === form.thirdCommittee)
                          set("thirdCommittee", "");
                      }}
                    >
                      <option value="">Select a committee</option>
                      {committees.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Second Committee Preference" required>
                    <select
                      className={inputCls}
                      value={form.secondCommittee}
                      onChange={(e) => {
                        set("secondCommittee", e.target.value);
                        if (e.target.value === form.thirdCommittee)
                          set("thirdCommittee", "");
                      }}
                      disabled={!form.firstCommittee}
                    >
                      <option value="">Select a committee</option>
                      {available2.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Third Committee Preference" required>
                    <select
                      className={inputCls}
                      value={form.thirdCommittee}
                      onChange={(e) => set("thirdCommittee", e.target.value)}
                      disabled={!form.secondCommittee}
                    >
                      <option value="">Select a committee</option>
                      {available3.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                </>
              )}
            </div>
          )}

          {/* Step 4 – Final Notes */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold font-nunito text-gray-900 mb-6">
                Part IV: Final Notes & Comments
              </h2>
              <Field label="How did you hear about this opportunity?">
                <input
                  className={inputCls}
                  value={form.heardAbout}
                  onChange={(e) => set("heardAbout", e.target.value)}
                  placeholder="e.g. Social media, friend, teacher..."
                />
              </Field>
              <Field label="Any final comments, notes, or questions?">
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={4}
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Optional..."
                />
              </Field>

              {/* Summary */}
              <div className="mt-6 border border-gray-200 rounded-xl p-5 bg-gray-50">
                <h4 className="font-bold font-nunito text-gray-900 mb-3">
                  Registration Summary
                </h4>
                <dl className="text-sm font-dm-sans space-y-1">
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-36 flex-shrink-0">Name</dt>
                    <dd className="text-gray-800">
                      {form.firstName} {form.lastName}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-36 flex-shrink-0">Email</dt>
                    <dd className="text-gray-800">{form.delegateEmail}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-36 flex-shrink-0">Delegation</dt>
                    <dd className="text-gray-800">
                      {form.delegationId
                        ? (delegations.find((d) => d.id === form.delegationId)?.name ??
                          "—")
                        : "Independent Delegate"}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-36 flex-shrink-0">1st Choice</dt>
                    <dd className="text-gray-800">{form.firstCommittee}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-36 flex-shrink-0">2nd Choice</dt>
                    <dd className="text-gray-800">{form.secondCommittee}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-36 flex-shrink-0">3rd Choice</dt>
                    <dd className="text-gray-800">{form.thirdCommittee}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 text-sm font-dm-sans rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={back}
              disabled={step === 0}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-dm-sans font-semibold text-gray-600 hover:bg-gray-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={next}
                className="px-6 py-2.5 bg-[#A3841D] text-white rounded-lg text-sm font-dm-sans font-semibold hover:bg-[#8a6f1b] transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={submitting}
                className="px-6 py-2.5 bg-[#A3841D] text-white rounded-lg text-sm font-dm-sans font-semibold hover:bg-[#8a6f1b] transition disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Registration"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
