"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { apiErrorMessage } from "@/lib/utils";

interface FormData {
  // Step 1 – School Info
  schoolName: string;
  schoolAddress: string;
  paymentProcess: string;
  // Step 2 – Primary Contact
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  contactRole: string;
  // Step 3 – Delegation Info
  delegationSizeMin: string;
  delegationSizeMax: string;
  attendedBefore: string;
  // Step 4 – Policies
  paymentPolicyAck: boolean;
  overduePolicyAck: boolean;
  financialAidPolicyAck: boolean;
  cancellationPolicyAck: boolean;
  committeePolicyAck: boolean;
  // Step 5 – Final Notes
  heardAbout: string;
  notes: string;
}

const INITIAL: FormData = {
  schoolName: "",
  schoolAddress: "",
  paymentProcess: "",
  contactFirstName: "",
  contactLastName: "",
  contactEmail: "",
  contactPhone: "",
  contactRole: "",
  delegationSizeMin: "",
  delegationSizeMax: "",
  attendedBefore: "",
  paymentPolicyAck: false,
  overduePolicyAck: false,
  financialAidPolicyAck: false,
  cancellationPolicyAck: false,
  committeePolicyAck: false,
  heardAbout: "",
  notes: "",
};

const STEPS = [
  "School Info",
  "Primary Contact",
  "Delegation Info",
  "Policies",
  "Final Notes",
];

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
      {hint && (
        <p className="text-xs text-gray-400 mt-1 font-dm-sans">{hint}</p>
      )}
    </div>
  );
}

const inputCls =
  "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-[#A3841D] focus:border-transparent transition";

const PolicyBlock = ({
  title,
  body,
  checked,
  onChange,
  label,
}: {
  title: string;
  body: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) => (
  <div className="mb-6 border border-gray-200 rounded-xl p-5 bg-gray-50">
    <h4 className="font-bold font-nunito text-gray-900 mb-2">{title}</h4>
    <p className="text-xs text-gray-600 font-dm-sans mb-4 leading-relaxed">
      {body}
    </p>
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 accent-[#A3841D] w-4 h-4 flex-shrink-0"
      />
      <span className="text-sm font-dm-sans text-gray-700">{label}</span>
    </label>
  </div>
);

export default function DelegationRegister() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  function validateStep(): string | null {
    if (step === 0) {
      if (!form.schoolName.trim()) return "School name is required.";
      if (!form.schoolAddress.trim()) return "School address is required.";
      if (!form.paymentProcess) return "Please select a payment process.";
    }
    if (step === 1) {
      if (!form.contactFirstName.trim()) return "First name is required.";
      if (!form.contactLastName.trim()) return "Last name is required.";
      if (!form.contactEmail.trim()) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail))
        return "Please enter a valid email address.";
      if (!form.contactPhone.trim()) return "Phone number is required.";
      if (!form.contactRole) return "Please select a primary role.";
    }
    if (step === 3) {
      if (!form.paymentPolicyAck)
        return "Please acknowledge the Payment Policy.";
      if (!form.overduePolicyAck)
        return "Please acknowledge the Overdue Policy.";
      if (!form.financialAidPolicyAck)
        return "Please acknowledge the Financial Aid Policy.";
      if (!form.cancellationPolicyAck)
        return "Please acknowledge the Cancellation Policy.";
      if (!form.committeePolicyAck)
        return "Please acknowledge the Committee Selection Policy.";
    }
    return null;
  }

  function next() {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep((s) => s + 1);
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function back() {
    setError(null);
    setStep((s) => s - 1);
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function submit() {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/delegations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.schoolName.trim(),
          faculty_advisor_first_name: form.contactFirstName.trim(),
          faculty_advisor_last_name: form.contactLastName.trim(),
          faculty_advisor_email: form.contactEmail.trim(),
          contact_phone: form.contactPhone.trim(),
          contact_role: form.contactRole || null,
          school_address: form.schoolAddress.trim() || null,
          // Existing backend field only supports a single estimate — send the
          // max as the primary value until delegation_size_min/max land.
          delegation_size: form.delegationSizeMax
            ? parseInt(form.delegationSizeMax, 10)
            : form.delegationSizeMin
              ? parseInt(form.delegationSizeMin, 10)
              : null,
          delegation_size_min: form.delegationSizeMin
            ? parseInt(form.delegationSizeMin, 10)
            : null,
          delegation_size_max: form.delegationSizeMax
            ? parseInt(form.delegationSizeMax, 10)
            : null,
          attended_before:
            form.attendedBefore === "Yes"
              ? true
              : form.attendedBefore === "No"
                ? false
                : null,
          payment_process: form.paymentProcess || null,
          policy_ack_payment: form.paymentPolicyAck,
          policy_ack_registration: form.overduePolicyAck,
          policy_ack_cancellation: form.cancellationPolicyAck,
          policy_ack_conduct: form.financialAidPolicyAck,
          policy_ack_photography: form.committeePolicyAck,
          heard_about: form.heardAbout.trim() || null,
          notes: form.notes.trim() || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(apiErrorMessage(data, `Error ${res.status}`));
      }
      // fire-and-forget confirmation email
      fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients: [
            {
              email: form.contactEmail.trim(),
              name: `${form.contactFirstName} ${form.contactLastName}`,
            },
          ],
          subject: "SSICSIM 2026 Delegation RSVP Received",
          body: `Dear ${form.contactFirstName},\n\nThank you for submitting your delegation RSVP for SSICSIM 2026. Your institution, ${form.schoolName}, has been added as a Group Delegation.\n\nDelegates from your institution may now complete their individual registrations at ssicsim.ca/register/delegate.\n\nIf you have any questions, please contact us at contact@ssicsim.ca.\n\nSincerely,\nThe SSICSIM Secretariat`,
        }),
      }).catch(() => {});
      setSubmitted(true);
    } catch (e: unknown) {
      setError(
        e instanceof Error ? e.message : "Submission failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#A3841D] to-[#c2a030] flex items-center justify-center px-6 pt-[120px]">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-[#A3841D]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-[#A3841D] text-3xl">✓</span>
          </div>
          <h2 className="text-3xl font-bold font-nunito text-gray-900 mb-4">
            Delegation Registered!
          </h2>
          <p className="text-gray-600 font-dm-sans mb-2 leading-relaxed">
            <span className="font-semibold">{form.schoolName}</span> has been
            added as a Group Delegation.
          </p>
          <p className="text-gray-600 font-dm-sans mb-6 leading-relaxed text-sm">
            A confirmation email has been sent to{" "}
            <span className="font-semibold">{form.contactEmail}</span>.
            Delegates from your institution can now register individually.
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
      <div className="bg-gradient-to-br from-[#A3841D] to-[#c2a030] pt-[200px] pb-10 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb className="mb-4">
            <BreadcrumbList className="text-white/70">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-white/70 hover:text-white"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/register"
                  className="text-white/70 hover:text-white"
                >
                  Registration
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-semibold">
                  Delegation RSVP
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-4xl md:text-5xl font-bold font-nunito text-white mb-2">
            Delegation RSVP
          </h1>
          <p className="text-white/80 font-dm-sans text-sm">
            For Faculty Advisors or Head Delegates registering a school
            delegation for SSICSIM 2026.
          </p>
        </div>
      </div>

      <div
        ref={formTopRef}
        className="max-w-2xl mx-auto py-10 px-6 scroll-mt-[120px]"
      >
        <StepIndicator current={step} />

        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* Step 0 – School Info */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold font-nunito text-gray-900 mb-6">
                Part I: School Information
              </h2>
              <Field label="School Name" required>
                <input
                  className={inputCls}
                  value={form.schoolName}
                  onChange={(e) => set("schoolName", e.target.value)}
                />
              </Field>
              <Field
                label="School Address"
                required
                hint="Include street address, City & Province, Postal Code, and Country."
              >
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  value={form.schoolAddress}
                  onChange={(e) => set("schoolAddress", e.target.value)}
                />
              </Field>
              <Field label="School Payment Process" required>
                <select
                  className={inputCls}
                  value={form.paymentProcess}
                  onChange={(e) => set("paymentProcess", e.target.value)}
                >
                  <option value="">Select a payment method</option>
                  <option value="Delegates will be paying individually digitally (e-Transfer).">
                    Delegates will be paying individually digitally (e-Transfer)
                  </option>
                  <option value="School will be paying as a group by cheque.">
                    School will be paying as a group by cheque
                  </option>
                  <option value="School will be paying as a group digitally (e-Transfer).">
                    School will be paying as a group digitally (e-Transfer)
                  </option>
                </select>
              </Field>
            </div>
          )}

          {/* Step 1 – Primary Contact */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold font-nunito text-gray-900 mb-2">
                Part II: Primary Contact Information
              </h2>
              <p className="text-sm text-gray-500 font-dm-sans mb-6">
                A primary contact must be a Faculty Advisor or Head Delegate.
                <br />
                <br />
                If you are not the Head Delegate or Faculty Advisor for your
                Delegation, please do not fill out this form. To complete your
                individual registration as a Delegate, please fill out the{" "}
                <Link
                  href="/register/delegate"
                  className="text-[#A3841D] underline"
                  target="_blank"
                >
                  Delegate Registration Form
                </Link>
                .
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name" required>
                  <input
                    className={inputCls}
                    value={form.contactFirstName}
                    onChange={(e) => set("contactFirstName", e.target.value)}
                  />
                </Field>
                <Field label="Last Name" required>
                  <input
                    className={inputCls}
                    value={form.contactLastName}
                    onChange={(e) => set("contactLastName", e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Email Address" required>
                <input
                  type="email"
                  className={inputCls}
                  value={form.contactEmail}
                  onChange={(e) => set("contactEmail", e.target.value)}
                />
              </Field>
              <Field label="Phone Number" required>
                <input
                  type="tel"
                  className={inputCls}
                  value={form.contactPhone}
                  onChange={(e) => set("contactPhone", e.target.value)}
                />
              </Field>
              <Field label="Primary Role" required>
                <div className="flex flex-col gap-3 mt-1">
                  {["Faculty Advisor", "Head Delegate"].map((role) => (
                    <label
                      key={role}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="contactRole"
                        value={role}
                        checked={form.contactRole === role}
                        onChange={() => set("contactRole", role)}
                        className="accent-[#A3841D] w-4 h-4"
                      />
                      <span className="text-sm font-dm-sans text-gray-700">
                        {role}
                      </span>
                    </label>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {/* Step 2 – Delegation Info */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold font-nunito text-gray-900 mb-6">
                Part III: Group Delegation Information
              </h2>
              <Field label="Approximate Delegation Size">
                <p className="text-xs text-gray-400 mb-2 font-dm-sans">
                  Please enter the tentative minimum and maximum number of
                  Delegates you are expecting to attend from your Group
                  Delegation.
                  <br />
                  <br />
                  Note: The maximum Group Delegation capacity for SSICSIM 2026
                  is now 50 delegates!
                  <br />
                  <br />
                  The estimate you provide has no binding effect on how many
                  delegates you can register, nor how many you must. This
                  information will be used solely for planning purposes.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className={inputCls}
                    type="number"
                    min={1}
                    max={50}
                    value={form.delegationSizeMin}
                    onChange={(e) => set("delegationSizeMin", e.target.value)}
                  />
                  <input
                    className={inputCls}
                    type="number"
                    min={1}
                    max={50}
                    value={form.delegationSizeMax}
                    onChange={(e) => set("delegationSizeMax", e.target.value)}
                  />
                </div>
              </Field>
              <Field
                label="Has your Delegation attended SSICSIM before?"
                required
              >
                <div className="flex flex-col gap-3 mt-1">
                  {["Yes", "No"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="attendedBefore"
                        value={opt}
                        checked={form.attendedBefore === opt}
                        onChange={() => set("attendedBefore", opt)}
                        className="accent-[#A3841D] w-4 h-4"
                      />
                      <span className="text-sm font-dm-sans text-gray-700">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {/* Step 3 – Policies */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold font-nunito text-gray-900 mb-2">
                Part IV: Official Registration Policies
              </h2>
              <p className="text-sm text-gray-500 font-dm-sans mb-6">
                Please thoroughly read through the policies below.
              </p>
              <PolicyBlock
                title="Payment Policy"
                body="All Delegates are required to pay registration fees for the SSICSIM conference. Registration fees are calculated individually for each Delegate, dependent on the registration period in which they or their Group Delegation registered and whether they have been granted financial aid. Each Independent Delegate and individually paying Group Delegate will be issued an invoice at the time they receive confirmation of their registration. They will be given twenty-one (21) days to pay the invoice total in full by Interac e-Transfer or cash. If payment is not received by a current Executive Member of SSICSIM by this date, their spot will be forfeited and they will be required to re-register if they wish to attend SSICSIM. Group Delegations paying collectively will be issued an invoice to the Faculty Advisor or Head Delegate at least twenty-one (21) days before the conference, or upon confirmation that all Group Delegates in their Group Delegation have individually registered. Payment can be completed by cheque, Interac e-Transfer, or cash. The only exception in which SSICSIM may delay issuing an invoice is if a Delegate has applied for financial aid. All Delegates and Group Delegations are required to pay their invoice total in full by the first day of the conference."
                checked={form.paymentPolicyAck}
                onChange={(v) => set("paymentPolicyAck", v)}
                label="I have read and understand the Payment Policy."
              />
              <PolicyBlock
                title="Overdue Policy"
                body="Any Delegate or Group Delegation who fails to pay their invoice total in full by the first day of the conference will be considered to have overdue fees. They will not be permitted to participate in the conference until they have paid the overdue fees. Payment can be completed by cash, cheque, or e-transfer. If a Group Delegation has overdue payments from a previous conference, SSICSIM will not register the Group Delegation until overdue fees have been received by a current Executive Member of SSICSIM."
                checked={form.overduePolicyAck}
                onChange={(v) => set("overduePolicyAck", v)}
                label="I have read and understand the Overdue Policy."
              />
              <PolicyBlock
                title="Financial Aid Policy"
                body="SSICSIM is committed to providing an accessible conference experience while maintaining fiscal sustainability and reducing the financial burden of attendance. As such, the opportunity to request financial aid is presented to all Delegates during registration. SSICSIM offers two forms of financial aid: partial reduction (50% off) and total retraction (100% off). Financial aid registrants may experience a slight delay in receiving their confirmation and/or invoice, as additional time is allotted to process individual financial aid requests. All requests are confidential and carefully considered."
                checked={form.financialAidPolicyAck}
                onChange={(v) => set("financialAidPolicyAck", v)}
                label="I have read and understand the Financial Aid Policy."
              />
              <PolicyBlock
                title="Cancellation Policy"
                body="Delegates who wish to withdraw from the conference must contact registration@ssicsim.ca as soon as possible. Refunds may be issued depending on the date of cancellation. 25% refunds will be issued for cancellations during the Regular and Late Bird Period. No refund will be issued for cancellations after registration has closed."
                checked={form.cancellationPolicyAck}
                onChange={(v) => set("cancellationPolicyAck", v)}
                label="I have read and understand the Cancellation Policy."
              />
              <PolicyBlock
                title="Committee Selection Policy"
                body="All Delegates are provided with the opportunity to request three committees of their preference during registration. However, availability is highly limited and committee and role assignments are made on a rolling basis. SSICSIM will make every effort to accommodate Delegate committee preferences when deciding assignments, but unfortunately cannot guarantee that all Delegates will receive a position in one of their three preferred committees."
                checked={form.committeePolicyAck}
                onChange={(v) => set("committeePolicyAck", v)}
                label="I have read and understand the Committee Selection Policy."
              />
            </div>
          )}

          {/* Step 4 – Final Notes */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold font-nunito text-gray-900 mb-6">
                Part V: Final Notes & Comments
              </h2>
              <Field label="How did you hear about this opportunity?">
                <input
                  className={inputCls}
                  value={form.heardAbout}
                  onChange={(e) => set("heardAbout", e.target.value)}
                />
              </Field>
              <Field label="Any final comments, notes, or questions?">
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={4}
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                />
              </Field>
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
