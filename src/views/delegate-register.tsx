"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FileText, X } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { committeesData } from "@/utils/data";
import { apiErrorMessage } from "@/lib/utils";

interface Delegation {
  id: string;
  name: string;
}

// Committees are hardcoded for now rather than pulled from the backend.
const COMMITTEE_NAMES = committeesData.map((c) => c.title);

type FinancialAidStatus = "" | "Yes" | "No" | "Delegation Paying";

interface FormData {
  // Step 1 – Affiliation
  delegateEmail: string;
  delegationId: string; // empty string = Independent Delegate
  // Step 2 – Personal Info
  firstName: string;
  lastName: string;
  preferredName: string;
  grade: string;
  phone: string;
  experience: string;
  // Step 3 – Policies
  paymentPolicyAck: boolean;
  cancellationPolicyAck: boolean;
  // Step 4 – Committee Preferences
  firstCommittee: string;
  secondCommittee: string;
  thirdCommittee: string;
  committeeSelectionAck: boolean;
  // Step 5 – Financial Aid & Payment
  financialAidStatus: FinancialAidStatus;
  financialAidReason: string;
  // Step 6 – Final Notes
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
  phone: "",
  experience: "",
  paymentPolicyAck: false,
  cancellationPolicyAck: false,
  firstCommittee: "",
  secondCommittee: "",
  thirdCommittee: "",
  committeeSelectionAck: false,
  financialAidStatus: "",
  financialAidReason: "",
  heardAbout: "",
  notes: "",
};

const STEPS = [
  "Affiliation",
  "Personal Info",
  "Policies",
  "Committees",
  "Financial Aid",
  "Final Notes",
];

const REGISTRATION_FEE_CAD = 90;

const EXPERIENCE_OPTIONS: { label: string; value: string; desc: string }[] = [
  { label: "Novice", value: "Novice", desc: "Attended 0–1 Model UN conferences" },
  {
    label: "Intermediate",
    value: "Intermediate",
    desc: "Attended 2–4 Model UN conferences",
  },
  {
    label: "Advanced",
    value: "Advanced",
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

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

function FileField({
  file,
  onChange,
  accept = "application/pdf,image/png,image/jpeg",
}: {
  file: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
}) {
  const [sizeError, setSizeError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function handleChange(selected: File | null) {
    if (selected && selected.size > MAX_UPLOAD_BYTES) {
      setSizeError(`File is too large. Max size is ${MAX_UPLOAD_BYTES / (1024 * 1024)}MB.`);
      onChange(null);
      return;
    }
    setSizeError(null);
    onChange(selected);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => handleChange(e.target.files?.[0] ?? null)}
        className="hidden"
      />
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleChange(e.dataTransfer.files?.[0] ?? null);
        }}
        className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-center cursor-pointer transition-colors ${
          dragActive
            ? "border-[#A3841D] bg-[#A3841D]/5"
            : "border-gray-300 hover:border-[#A3841D]/60"
        }`}
      >
        <p className="text-sm font-dm-sans text-gray-600">
          Drag and drop a file here, or
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
        >
          Browse files
        </Button>
        <p className="text-xs text-gray-400 font-dm-sans">PDF, PNG, or JPEG · max 4MB</p>
      </div>
      {file && (
        <div className="flex items-start gap-3 mt-3">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-lg border border-gray-200 bg-gray-50 shadow-sm overflow-hidden flex items-center justify-center">
              {previewUrl ? (
                <img src={previewUrl} alt={file.name} className="w-full h-full object-cover" />
              ) : (
                <FileText className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
              )}
            </div>
            <button
              type="button"
              onClick={() => onChange(null)}
              aria-label="Remove uploaded file"
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white border border-gray-300 shadow flex items-center justify-center text-gray-500 hover:text-red-600 hover:border-red-300 transition"
            >
              <X className="w-3 h-3" strokeWidth={2.5} />
            </button>
          </div>
          <p className="text-xs text-gray-500 font-dm-sans pt-1 break-all">
            {file.name}
            <br />
            {(file.size / (1024 * 1024)).toFixed(2)}MB
          </p>
        </div>
      )}
      {sizeError && (
        <p className="text-xs text-red-500 font-dm-sans mt-1.5">{sizeError}</p>
      )}
    </div>
  );
}

async function uploadToDrive(
  file: File,
  kind: "code_of_conduct" | "payment_receipt",
  delegateName: string,
): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  body.append("kind", kind);
  body.append("name", delegateName);
  const res = await fetch("/api/upload", { method: "POST", body });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "File upload failed. Please try again.");
  }
  const data = await res.json();
  return data.url as string;
}

type SubmitStage =
  | "idle"
  | "uploading-code-of-conduct"
  | "uploading-payment-receipt"
  | "submitting-registration";

const SUBMIT_STAGE_LABEL: Record<SubmitStage, string> = {
  idle: "Submit Registration",
  "uploading-code-of-conduct": "Uploading Code of Conduct…",
  "uploading-payment-receipt": "Uploading Payment Receipt…",
  "submitting-registration": "Submitting Registration…",
};

export default function DelegateRegister() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [delegations, setDelegations] = useState<Delegation[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState<SubmitStage>("idle");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [codeOfConductFile, setCodeOfConductFile] = useState<File | null>(null);
  const [paymentReceiptFile, setPaymentReceiptFile] = useState<File | null>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  useEffect(() => {
    fetch("/api/delegations")
      .then((r) => r.json())
      .then((dels) => {
        setDelegations(Array.isArray(dels) ? dels : []);
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
      if (!form.phone.trim()) return "Phone number is required.";
      if (!form.experience) return "Please select your experience level.";
      if (!codeOfConductFile)
        return "Please upload a signed copy of the Delegate Code of Conduct.";
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
      if (!form.committeeSelectionAck)
        return "Please acknowledge the committee selection process.";
    }
    if (step === 4) {
      if (!form.financialAidStatus)
        return "Please indicate whether you intend to apply for financial aid.";
      if (form.financialAidStatus === "Yes" && !form.financialAidReason.trim())
        return "Please briefly explain why you are applying for financial aid.";
      if (form.financialAidStatus === "No" && !paymentReceiptFile)
        return "Please upload a PDF receipt of your payment.";
    }
    return null;
  }

  function next() {
    const err = validateStep();
    if (err) { setError(err); return; }
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
    if (err) { setError(err); return; }
    setError(null);
    setSubmitting(true);
    try {
      // Resolve delegation ID — empty means Independent Delegate
      const delegation = delegations.find((d) => d.id === form.delegationId);
      const delegationId = delegation ? form.delegationId : null;

      // Upload PDFs to Google Drive first — the resulting links are what we
      // persist, not the files themselves, so this must complete before the
      // delegate record is created.
      const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`;
      if (!codeOfConductFile) throw new Error("Please upload a signed copy of the Delegate Code of Conduct.");
      setSubmitStage("uploading-code-of-conduct");
      const codeOfConductUrl = await uploadToDrive(codeOfConductFile, "code_of_conduct", fullName);

      let paymentReceiptUrl: string | null = null;
      if (form.financialAidStatus === "No") {
        if (!paymentReceiptFile) throw new Error("Please upload a PDF receipt of your payment.");
        setSubmitStage("uploading-payment-receipt");
        paymentReceiptUrl = await uploadToDrive(paymentReceiptFile, "payment_receipt", fullName);
      }

      setSubmitStage("submitting-registration");

      // Both values already exist on the backend's DelegateStatus enum. A
      // delegate who uploaded a receipt goes to Verify Payment so SEC can
      // confirm it before assignment; everyone else (financial aid pending or
      // delegation paying) waits on Awaiting Payment.
      const delegateStatus = form.financialAidStatus === "No" ? "Verify Payment" : "Awaiting Payment";

      const res = await fetch("/api/delegates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim(),
          full_name: fullName,
          preferred_name: form.preferredName.trim() || null,
          grade: form.grade || null,
          email: form.delegateEmail.trim(),
          phone: form.phone.trim(),
          delegate_experience: form.experience,
          first_committee: form.firstCommittee,
          second_committee: form.secondCommittee,
          third_committee: form.thirdCommittee,
          committee_selection_ack: form.committeeSelectionAck,
          delegation_id: delegationId,
          code_of_conduct_url: codeOfConductUrl,
          code_of_conduct_signed: true,
          payment_policy_ack: form.paymentPolicyAck,
          cancellation_policy_ack: form.cancellationPolicyAck,
          financial_aid_status: form.financialAidStatus,
          financial_aid_reason: form.financialAidStatus === "Yes" ? form.financialAidReason.trim() : null,
          payment_receipt_url: paymentReceiptUrl,
          delegate_status: delegateStatus,
          heard_about: form.heardAbout.trim() || null,
          notes: form.notes.trim() || null,
          date_applied: new Date().toISOString(),
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
          recipients: [{ email: form.delegateEmail.trim(), name: `${form.firstName} ${form.lastName}` }],
          subject: "SSICSIM 2026 Delegate Registration Received",
          body: `Dear ${form.preferredName.trim() || form.firstName},\n\nThank you for registering as a delegate for SSICSIM 2026! Your registration has been received and is currently awaiting confirmation of payment.\n\nYou will receive a follow-up email with confirmation of your payment. Please check your inbox and spam folder for emails from us.\n\nIf you have any questions, please contact us at contact@ssicsim.ca.\n\nSincerely,\nThe SSICSIM Secretariat`,
        }),
      }).catch(() => {});
      setSubmitted(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
      setSubmitStage("idle");
    }
  }

  // Committees available for each preference slot (exclude already chosen)
  const available2 = COMMITTEE_NAMES.filter((name) => name !== form.firstCommittee);
  const available3 = COMMITTEE_NAMES.filter(
    (name) => name !== form.firstCommittee && name !== form.secondCommittee,
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#A3841D] to-[#c2a030] flex items-center justify-center px-6 pt-[120px]">
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
        <div className="max-w-3xl mx-auto">
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

      <div ref={formTopRef} className="max-w-3xl mx-auto py-10 px-6 scroll-mt-[120px]">
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
              <h2 className="text-xl font-bold font-nunito text-gray-900 mb-6">
                Part I: Delegate Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name" required>
                  <input
                    className={inputCls}
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                  />
                </Field>
                <Field label="Last Name" required>
                  <input
                    className={inputCls}
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Preferred Name">
                <input
                  className={inputCls}
                  value={form.preferredName}
                  onChange={(e) => set("preferredName", e.target.value)}
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
              <Field label="Phone Number" required>
                <input
                  type="tel"
                  className={inputCls}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
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
                  Please read, sign, and upload a copy of the{" "}
                  <a
                    href="https://drive.google.com/file/u/2/d/1CNTsbWLnXkixy8Vs7nHdvPWaBm5a7mX_/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A3841D] underline"
                  >
                    SSICSIM 2026 Delegate Code of Conduct
                  </a>{" "}
                  (PDF, PNG, or JPEG, max 4MB).
                </p>
                <FileField file={codeOfConductFile} onChange={setCodeOfConductFile} />
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
                  Given that Early Bird and Late Registration requires that we hold your
                  spots, we kindly request that group delegates paying individually and
                  independent delegates registering within these timeframes pay
                  immediately. For group delegations paying collectively (by e-transfer or
                  cheque) within these registration periods, invoices will be sent
                  post-registration (or upon confirmation from FAs/HDs that their entire
                  delegation has completed registration), and delegates will not be
                  prompted to pay SSICSIM directly at the time of registration.
                  <br /><br />
                  All delegations paying collectively (either by e-transfer or cheque)
                  will be invoiced approximately 3-5 days after registration and will be
                  expected to complete their payment within two weeks of being invoiced.
                  <br /><br />
                  The only instance in which SSICSIM may delay issuing a fee is if a
                  delegate has applied for financial aid.
                </p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.paymentPolicyAck}
                    onChange={(e) => set("paymentPolicyAck", e.target.checked)}
                    className="mt-0.5 accent-[#A3841D] w-4 h-4 flex-shrink-0"
                  />
                  <span className="text-sm font-dm-sans text-gray-700">
                    I have read and agreed to the Payment Policy
                  </span>
                </label>
              </div>

              <div className="mb-6 border border-gray-200 rounded-xl p-5 bg-gray-50">
                <h4 className="font-bold font-nunito text-gray-900 mb-2">
                  Cancellation Policy
                </h4>
                <p className="text-xs text-gray-600 font-dm-sans mb-4 leading-relaxed">
                  Delegates may cancel their registration at any time by notifying the
                  Chargée D&apos;Affaires at registration@ssicsim.ca. Partial refunds may
                  be issued depending on the time the delegate initially registered:
                  <br /><br />
                  50% refunds will be issued for Early Bird registrants.
                  <br />
                  25% refunds will be issued for Regular registrants.
                  <br />
                  No refund will be issued for delegates who registered during the Late
                  Registration period.
                  <br /><br />
                  Once registration has closed for SSICSIM 2026, refunds will no longer
                  be issued for delegates who withdraw from the conference.
                  <br /><br />
                  With any questions or concerns about payment, cancellation, or
                  invoicing, please contact us at registration@ssicsim.ca!
                </p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.cancellationPolicyAck}
                    onChange={(e) => set("cancellationPolicyAck", e.target.checked)}
                    className="mt-0.5 accent-[#A3841D] w-4 h-4 flex-shrink-0"
                  />
                  <span className="text-sm font-dm-sans text-gray-700">
                    I have read and agreed to the Cancellation Policy
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
                Please refer to the{" "}
                <Link
                  href="/committees"
                  className="text-[#A3841D] underline"
                  target="_blank"
                >
                  SSICSIM 2026 Committee Slate
                </Link>{" "}
                for a list of committees.
                <br /><br />
                At SSICSIM we pride ourselves on innovation and accessibility for all
                delegates: as such, we highly value your preferences regarding delegate
                assignments. However, availability is highly limited and committee and
                role assignments are made on a first-come first-serve basis. Therefore,
                while SSICSIM makes every effort to accommodate delegate preferences when
                determining committee assignments, we cannot guarantee that all delegates
                will be assigned one of their top three committee choices.
                <br /><br />
                Once again, please do not hesitate to contact us at registration@ssicsim.ca
                if you have any questions!
              </p>
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
                      {COMMITTEE_NAMES.map((name) => (
                        <option key={name} value={name}>
                          {name}
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
                      {available2.map((name) => (
                        <option key={name} value={name}>
                          {name}
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
                      {available3.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <label className="flex items-start gap-3 cursor-pointer mt-2">
                    <input
                      type="checkbox"
                      checked={form.committeeSelectionAck}
                      onChange={(e) => set("committeeSelectionAck", e.target.checked)}
                      className="mt-0.5 accent-[#A3841D] w-4 h-4 flex-shrink-0"
                    />
                    <span className="text-sm font-dm-sans text-gray-700">
                      I have read and understand the committee selection process,
                      including the possibility that I may receive a committee
                      assignment that does not align with my top three committee
                      preferences.
                    </span>
                  </label>
                </>
            </div>
          )}

          {/* Step 4 – Financial Aid & Payment */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold font-nunito text-gray-900 mb-2">
                Part V: Financial Aid & Payment
              </h2>
              <p className="text-sm text-gray-500 font-dm-sans mb-6">
                Please note that submitting a request for financial aid will delay your
                registration status.
                <br /><br />
                Financial aid is provided on an as-needed basis to delegates in need of
                assistance in order to attend the conference.
                <br /><br />
                SSICSIM is committed to providing an accessible conference experience to
                all, while maintaining fiscal sustainability and reducing the financial
                burden of attendance for all. As such, the conference offers part and
                full financial aid services, with aid amounts subject to delegate needs.
                <br /><br />
                Note: Applicants for financial aid may experience a slight delay in
                receiving their committee assignments, as additional time is required to
                process these requests. We are committed to ensuring that each request
                receives the utmost attention and careful consideration.
                <br /><br />
                If you have any questions surrounding financial aid, please feel free to
                reach out to Nicholas Ali, our Deputy Secretary-General, Equity at{" "}
                <a href="mailto:dsg@ssicsim.ca" className="text-[#A3841D] underline">
                  dsg@ssicsim.ca
                </a>
                .
              </p>
              <Field label="Do you intend to apply for financial aid?" required>
                <div className="flex flex-col gap-3 mt-1">
                  {(
                    [
                      "Yes",
                      "No",
                      "Delegation Paying",
                    ] as const
                  ).map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="financialAidStatus"
                        value={opt}
                        checked={form.financialAidStatus === opt}
                        onChange={() => set("financialAidStatus", opt)}
                        className="accent-[#A3841D] w-4 h-4"
                      />
                      <span className="text-sm font-dm-sans text-gray-700">
                        {opt === "Delegation Paying"
                          ? "My delegation will be paying on my behalf"
                          : opt}
                      </span>
                    </label>
                  ))}
                </div>
              </Field>

              {form.financialAidStatus === "Yes" && (
                <Field
                  label="Please detail, in a short paragraph below, why you are applying for financial aid."
                  required
                  hint="Please be advised that SSICSIM cannot guarantee the provision of full financial aid. Applicants who request full financial assistance may only receive partial aid, as each application is evaluated on a case-by-case basis. Nonetheless, SSICSIM is committed to making every effort to provide suitable financial support to attendees, ensuring that financial constraints do not prevent anyone from participating in SSICSIM."
                >
                  <textarea
                    className={`${inputCls} resize-none`}
                    rows={4}
                    value={form.financialAidReason}
                    onChange={(e) => set("financialAidReason", e.target.value)}
                  />
                </Field>
              )}

              {form.financialAidStatus === "No" && (
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                  <h4 className="font-bold font-nunito text-gray-900 mb-2">
                    Delegate Registration Fee Payment
                  </h4>
                  <p className="text-xs text-gray-600 font-dm-sans mb-4 leading-relaxed">
                    To reserve your spot as a regular registrant, please pay the
                    registration price of ${REGISTRATION_FEE_CAD} CAD via e-transfer to{" "}
                    <span className="font-semibold">internal@ssicsim.ca</span>. Be
                    sure to include your full name with the payment, then upload a
                    PDF receipt below (max 4MB).
                  </p>
                  <FileField
                    file={paymentReceiptFile}
                    onChange={setPaymentReceiptFile}
                    accept="application/pdf"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 5 – Final Notes */}
          {step === 5 && (
            <div>
              <h2 className="text-xl font-bold font-nunito text-gray-900 mb-6">
                Part VI: Final Notes & Comments
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
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-36 flex-shrink-0">Financial Aid</dt>
                    <dd className="text-gray-800">
                      {form.financialAidStatus === "Delegation Paying"
                        ? "Delegation paying"
                        : form.financialAidStatus || "—"}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-36 flex-shrink-0">Payment Status</dt>
                    <dd className="text-gray-800">
                      {form.financialAidStatus === "No" ? "Receipt Submitted — Pending Verification" : "Awaiting Payment"}
                    </dd>
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
                {SUBMIT_STAGE_LABEL[submitStage]}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
