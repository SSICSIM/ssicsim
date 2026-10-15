"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ALLERGY_OPTIONS,
  DIETARY_OPTIONS,
  EVENT_FORMS,
  MOTIVATION_MAX_WORDS,
  TRAINING_SESSIONS,
  countWords,
  type EventSlug,
} from "@/lib/event-forms";
import { apiErrorMessage } from "@/lib/utils";

type RegistrationStatus = "Pending" | "Registered" | "Waitlist";

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

const checkboxCls = "mt-0.5 accent-[#A3841D] w-4 h-4 flex-shrink-0";

// Multi-select with an "Other" free-text option, like the Google Form's
// checkbox questions.
function CheckboxGroup({
  name,
  options,
  selected,
  onChange,
  other,
  onOtherChange,
}: {
  name: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  other: string | null;
  onOtherChange: (value: string | null) => void;
}) {
  const toggle = (option: string) =>
    onChange(
      selected.includes(option)
        ? selected.filter((o) => o !== option)
        : [...selected, option],
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-start gap-3 cursor-pointer text-sm font-dm-sans text-gray-700"
        >
          <input
            type="checkbox"
            name={name}
            checked={selected.includes(option)}
            onChange={() => toggle(option)}
            className={checkboxCls}
          />
          {option}
        </label>
      ))}
      <div className="sm:col-span-2 flex items-center gap-3">
        <label className="flex items-center gap-3 cursor-pointer text-sm font-dm-sans text-gray-700">
          <input
            type="checkbox"
            checked={other !== null}
            onChange={(e) => onOtherChange(e.target.checked ? "" : null)}
            className={checkboxCls}
          />
          Other:
        </label>
        <input
          className={`${inputCls} py-1.5`}
          value={other ?? ""}
          disabled={other === null}
          onChange={(e) => onOtherChange(e.target.value)}
          aria-label={`Other ${name}`}
        />
      </div>
    </div>
  );
}

function withOther(selected: string[], other: string | null): string[] {
  return other?.trim() ? [...selected, `Other: ${other.trim()}`] : selected;
}

interface Props {
  slug: EventSlug;
  // Closed by SEC or past the deadline
  closed?: boolean;
  // Event is full: new sign-ups join the waitlist
  full?: boolean;
  // Training sessions whose in-person spots are taken
  fullSessions?: string[];
}

export default function EventRegister({
  slug,
  closed = false,
  full = false,
  fullSessions = [],
}: Props) {
  const event = EVENT_FORMS[slug];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [acks, setAcks] = useState<Record<string, boolean>>({});
  // Midnight Crisis
  const [motivation, setMotivation] = useState("");
  // Delegate Social
  const [allergies, setAllergies] = useState<string[]>([]);
  const [allergyOther, setAllergyOther] = useState<string | null>(null);
  const [dietary, setDietary] = useState<string[]>([]);
  const [dietaryOther, setDietaryOther] = useState<string | null>(null);
  const [dietaryDetails, setDietaryDetails] = useState("");
  // Delegate Training
  const [session, setSession] = useState("");
  const [questions, setQuestions] = useState("");
  const [topics, setTopics] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<RegistrationStatus | null>(null);

  const motivationWords = countWords(motivation);
  const sessionFull = (key: string) => fullSessions.includes(key);

  function validate(): string | null {
    if (!firstName.trim() || !lastName.trim())
      return "Please enter your first and last name.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      return "Please enter a valid email address.";
    if (slug === "midnight-crisis") {
      if (!motivation.trim())
        return "Please tell us why you want to participate in Midnight Crisis.";
      if (motivationWords > MOTIVATION_MAX_WORDS)
        return `Please keep your answer to ${MOTIVATION_MAX_WORDS} words or fewer.`;
    }
    if (slug === "delegate-social") {
      if (withOther(allergies, allergyOther).length === 0)
        return "Please select your food allergies (or None).";
      if (withOther(dietary, dietaryOther).length === 0)
        return "Please select your dietary preference (or No restrictions).";
    }
    if (slug === "delegate-training" && !session)
      return "Please choose a training session.";
    for (const policy of event.policies) {
      if (!policy.acks.every((a) => acks[a.key]))
        return `Please acknowledge the ${policy.title}.`;
    }
    return null;
  }

  function answers(): Record<string, unknown> {
    const policyAcks = Object.fromEntries(
      event.policies.flatMap((p) => p.acks.map((a) => [a.key, !!acks[a.key]])),
    );
    switch (slug) {
      case "midnight-crisis":
        return { ...policyAcks, motivation: motivation.trim() };
      case "delegate-social":
        return {
          ...policyAcks,
          allergies: withOther(allergies, allergyOther),
          dietary: withOther(dietary, dietaryOther),
          dietary_details: dietaryDetails.trim() || null,
        };
      case "delegate-training":
        return {
          session,
          questions: questions.trim() || null,
          topics: topics.trim() || null,
        };
    }
  }

  async function submit() {
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/events/${slug}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          answers: answers(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : apiErrorMessage(data, `Error ${res.status}`),
        );
      }
      setStatus(data.status as RegistrationStatus);
      window.scrollTo({ top: 0 });
    } catch (e: unknown) {
      setError(
        e instanceof Error ? e.message : "Submission failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (closed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#A3841D] to-[#c2a030] flex items-center justify-center px-6 pt-[120px]">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
          <h2 className="text-3xl font-bold font-nunito text-gray-900 mb-4">
            {event.title} Registration Is Closed
          </h2>
          <p className="text-gray-600 font-dm-sans mb-6 leading-relaxed">
            We&apos;re no longer accepting registrations for {event.title}. If
            you have questions, please contact us at{" "}
            <a
              href="mailto:registration@ssicsim.ca"
              className="text-[#A3841D] underline"
            >
              registration@ssicsim.ca
            </a>
            .
          </p>
          <Link
            href="/events"
            className="inline-block bg-[#A3841D] text-white px-6 py-3 rounded-lg font-dm-sans font-semibold hover:bg-[#8a6f1b] transition-colors"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  if (status) {
    const heading =
      status === "Pending"
        ? "Application Received!"
        : status === "Waitlist"
          ? "You're on the Waitlist!"
          : "You're Registered!";
    const message =
      status === "Pending"
        ? `Your ${event.title} application has been received. Spots are limited, so we'll email you if you're selected.`
        : status === "Waitlist"
          ? `${slug === "delegate-training" ? "That session" : event.title} is currently full, so you've been added to the waitlist. We'll email you if a spot opens up.`
          : `Your spot at ${event.title} is confirmed. See you there!`;
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#A3841D] to-[#c2a030] flex items-center justify-center px-6 pt-[120px]">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-[#A3841D]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-[#A3841D] text-3xl">✓</span>
          </div>
          <h2 className="text-3xl font-bold font-nunito text-gray-900 mb-4">
            {heading}
          </h2>
          <p className="text-gray-600 font-dm-sans mb-2 leading-relaxed">
            Thank you, <span className="font-semibold">{firstName}</span>!{" "}
            {message}
          </p>
          <p className="text-gray-600 font-dm-sans mb-6 leading-relaxed text-sm">
            A confirmation email has been sent to{" "}
            <span className="font-semibold">{email.trim()}</span>. Please check
            your inbox and spam folder for emails from us.
          </p>
          <Link
            href="/events"
            className="inline-block bg-[#A3841D] text-white px-6 py-3 rounded-lg font-dm-sans font-semibold hover:bg-[#8a6f1b] transition-colors"
          >
            Back to Events
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
                  href="/events"
                  className="text-white/70 hover:text-white"
                >
                  Events
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-semibold">
                  {event.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-4xl md:text-5xl font-bold font-nunito text-white mb-2">
            {event.title} Registration
          </h1>
          <p className="text-white/80 font-dm-sans text-sm">
            {event.date} · {event.time} · {event.location}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-10 px-6">
        {(full ||
          (slug === "delegate-training" && fullSessions.length > 0)) && (
          <div className="mb-6 border border-[#A3841D]/40 bg-[#A3841D]/10 rounded-xl p-5 font-dm-sans text-sm text-gray-800 leading-relaxed">
            <p className="font-bold font-nunito text-gray-900 mb-1">
              {full
                ? `${event.title} is full: you're joining the waitlist`
                : "Some sessions are full"}
            </p>
            {full
              ? "All spots have been taken, so new registrations join the waitlist. If a spot opens up, we'll email you to confirm your place."
              : "Sessions marked “waitlist only” are full. Choosing one puts you on its waitlist, and we'll email you if a spot opens up. Other sessions still have spots."}
          </div>
        )}
        <div className="mb-6 border border-[#A3841D]/40 bg-[#A3841D]/10 rounded-xl p-5 font-dm-sans text-sm text-gray-800 leading-relaxed space-y-3">
          {event.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p>
            <span className="font-bold">Note:</span> {event.title} is only open
            to registered SSICSIM 2026 delegates. Registration closes{" "}
            <span className="font-semibold">
              Sunday, October 18, 2026 @ 11:59 PM
            </span>
            . Questions? Contact our Chargée d&apos;Affaires, Joanna Wang, at{" "}
            <a
              href="mailto:registration@ssicsim.ca"
              className="text-[#A3841D] underline"
            >
              registration@ssicsim.ca
            </a>
            .
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-xl font-bold font-nunito text-gray-900 mb-2">
            Section 1: Delegate Information
          </h2>
          <p className="text-sm text-gray-500 font-dm-sans mb-6">
            Enter your name and email exactly as you did on your delegate
            registration. We use them to confirm you&apos;re a registered
            delegate.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name" required>
              <input
                className={inputCls}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
            </Field>
            <Field label="Last Name" required>
              <input
                className={inputCls}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </Field>
          </div>
          <Field
            label="Email Address"
            required
            hint="Use the same email you registered for SSICSIM 2026 with."
          >
            <input
              type="email"
              className={inputCls}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </Field>

          <h2 className="text-xl font-bold font-nunito text-gray-900 mt-8 mb-6">
            Section 2: {event.title}
          </h2>

          {slug === "midnight-crisis" && (
            <Field
              label={`Why do you want to participate in Midnight Crisis? (Maximum: ${MOTIVATION_MAX_WORDS} words)`}
              required
            >
              <textarea
                className={`${inputCls} min-h-[140px]`}
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
              />
              <p
                className={`text-xs mt-1 font-dm-sans ${motivationWords > MOTIVATION_MAX_WORDS ? "text-red-500" : "text-gray-400"}`}
              >
                {motivationWords} / {MOTIVATION_MAX_WORDS} words
              </p>
            </Field>
          )}

          {slug === "delegate-social" && (
            <>
              <Field label="Do you have any food allergies?" required>
                <CheckboxGroup
                  name="allergies"
                  options={ALLERGY_OPTIONS}
                  selected={allergies}
                  onChange={setAllergies}
                  other={allergyOther}
                  onOtherChange={setAllergyOther}
                />
              </Field>
              <Field
                label="What is your primary dietary preference or restriction?"
                required
              >
                <CheckboxGroup
                  name="dietary"
                  options={DIETARY_OPTIONS}
                  selected={dietary}
                  onChange={setDietary}
                  other={dietaryOther}
                  onOtherChange={setDietaryOther}
                />
              </Field>
              <Field label="Please provide any additional details regarding your dietary needs or severity of allergies.">
                <textarea
                  className={`${inputCls} min-h-[90px]`}
                  value={dietaryDetails}
                  onChange={(e) => setDietaryDetails(e.target.value)}
                />
              </Field>
            </>
          )}

          {slug === "delegate-training" && (
            <>
              <Field
                label="Which training session will you be attending?"
                required
                hint="Please only attend one session to make room for other delegates."
              >
                <div className="flex flex-col gap-3 mt-1">
                  {TRAINING_SESSIONS.map((s) => (
                    <label
                      key={s.key}
                      className="flex items-start gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="session"
                        value={s.key}
                        checked={session === s.key}
                        onChange={() => setSession(s.key)}
                        className="accent-[#A3841D] w-4 h-4 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm font-dm-sans text-gray-700">
                        {s.label}
                        {sessionFull(s.key) && (
                          <span className="ml-2 text-xs font-semibold text-[#A3841D]">
                            Full, waitlist only
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Are there any questions, comments or concerns that you have regarding delegate training?">
                <textarea
                  className={`${inputCls} min-h-[90px]`}
                  value={questions}
                  onChange={(e) => setQuestions(e.target.value)}
                />
              </Field>
              <Field label="Is there anything specific you'd like to see us cover in the training session?">
                <textarea
                  className={`${inputCls} min-h-[90px]`}
                  value={topics}
                  onChange={(e) => setTopics(e.target.value)}
                />
              </Field>
            </>
          )}

          {event.policies.length > 0 && (
            <>
              <h2 className="text-xl font-bold font-nunito text-gray-900 mt-8 mb-2">
                Section 3: {event.title} Policies
              </h2>
              <p className="text-sm text-gray-500 font-dm-sans mb-6">
                Please carefully read through the policies below.
              </p>
              {event.policies.map((policy) => (
                <div
                  key={policy.title}
                  className="mb-6 border border-gray-200 rounded-xl p-5 bg-gray-50"
                >
                  <h4 className="font-bold font-nunito text-gray-900 mb-2">
                    {policy.title}
                  </h4>
                  <p className="text-xs text-gray-600 font-dm-sans mb-4 leading-relaxed">
                    {policy.body}
                  </p>
                  <div className="space-y-2">
                    {policy.acks.map((ack) => (
                      <label
                        key={ack.key}
                        className="flex items-start gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={!!acks[ack.key]}
                          onChange={(e) =>
                            setAcks((prev) => ({
                              ...prev,
                              [ack.key]: e.target.checked,
                            }))
                          }
                          className={checkboxCls}
                        />
                        <span className="text-sm font-dm-sans text-gray-700">
                          {ack.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 text-sm font-dm-sans rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div className="flex justify-between items-center mt-8">
            <Link
              href="/events"
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-dm-sans font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              Back
            </Link>
            <button
              onClick={submit}
              disabled={submitting}
              className="px-6 py-2.5 bg-[#A3841D] text-white rounded-lg text-sm font-dm-sans font-semibold hover:bg-[#8a6f1b] transition disabled:opacity-60 flex items-center gap-2"
            >
              {submitting && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {submitting
                ? "Submitting..."
                : event.selective
                  ? "Submit Application"
                  : full || sessionFull(session)
                    ? "Join the Waitlist"
                    : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
