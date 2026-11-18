"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle2, RotateCcw, AlertCircle } from "lucide-react";
import InstitutionTypeSelector from "./InstitutionTypeSelector";

const demoSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(100, { message: "Name is too long" }),
  workEmail: z
    .string()
    .trim()
    .email({ message: "Please enter a valid work email address" }),
  institutionName: z
    .string()
    .trim()
    .min(2, { message: "Please enter your institution name" })
    .max(150, { message: "Institution name is too long" }),
  institutionType: z
    .string()
    .min(1, { message: "Please select an institution type" }),
  role: z.string().min(1, { message: "Please select your role" }),
  exploreNotes: z.string().max(1000, { message: "Notes must be under 1000 characters" }).optional(),
  website: z.string().optional(), // Honeypot spam trap
});

export type DemoFormData = z.infer<typeof demoSchema>;

const rolesList = [
  "Super Admin",
  "Administrator",
  "Mentor / Educator",
  "Student",
  "Other",
];

export default function DemoRequestForm() {
  const [submittedData, setSubmittedData] = useState<DemoFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>("");
  const errorAlertRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      institutionName: "",
      institutionType: "",
      role: "",
      exploreNotes: "",
      website: "",
    },
    mode: "onTouched",
  });

  const selectedInstitutionType = watch("institutionType");

  // Listen for role preselection from URL param, session storage, or custom event
  useEffect(() => {
    const applyRole = (incomingRole: string) => {
      const matched =
        incomingRole === "Mentor"
          ? "Mentor / Educator"
          : rolesList.find((r) => r.toLowerCase() === incomingRole.toLowerCase()) ||
            incomingRole;
      setValue("role", matched, { shouldValidate: true });
    };

    if (typeof window !== "undefined") {
      const urlRole = new URLSearchParams(window.location.search).get("role");
      if (urlRole) {
        applyRole(urlRole);
      } else {
        const stored = window.sessionStorage.getItem("edubot-preselect-role");
        if (stored) {
          applyRole(stored);
          window.sessionStorage.removeItem("edubot-preselect-role");
        }
      }
    }

    const handlePreselect = (event: Event) => {
      const customEvent = event as CustomEvent<{ role: string }>;
      const incomingRole = customEvent.detail?.role;
      if (incomingRole) {
        applyRole(incomingRole);
      }
    };

    window.addEventListener("edubot-preselect-role", handlePreselect);
    return () => {
      window.removeEventListener("edubot-preselect-role", handlePreselect);
    };
  }, [setValue]);

  // Focus first invalid field on client-side validation failure
  const onValidationError = (formErrors: any) => {
    const firstFieldKey = Object.keys(formErrors)[0];
    if (firstFieldKey) {
      const element = document.getElementById(firstFieldKey);
      if (element) {
        element.focus();
      }
    }
    setLiveAnnouncement("Please correct the highlighted errors before submitting.");
  };

  // Real production submit handler calling /api/demo
  const onSubmit = async (data: DemoFormData) => {
    setServerError(null);
    setIsSubmitting(true);
    setLiveAnnouncement("Sending your request…");

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        const errorMessage =
          result?.error ||
          "We couldn’t send your request. Please try again.";
        setServerError(errorMessage);
        setLiveAnnouncement(`Submission failed: ${errorMessage}`);
        setIsSubmitting(false);

        // Scroll error into view for keyboard/screen reader users
        setTimeout(() => {
          errorAlertRef.current?.focus();
        }, 50);
        return;
      }

      // Success confirmed by server
      setSubmittedData(data);
      setLiveAnnouncement(
        "Thank you. Our team will contact you to arrange your demo."
      );
      setIsSubmitting(false);
    } catch {
      const fallbackError =
        "We couldn’t send your request. Please check your internet connection and try again.";
      setServerError(fallbackError);
      setLiveAnnouncement(`Submission failed: ${fallbackError}`);
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setServerError(null);
    setLiveAnnouncement("");
    reset();
  };

  return (
    <div className="w-full">
      {/* Screen Reader Live Region for Accessible Status Announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveAnnouncement}
      </div>

      <AnimatePresence mode="wait">
        {submittedData ? (
          /* Confirmed Production Submission Feedback Card */
          <motion.div
            key="feedback"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="p-6 sm:p-8 bg-[#F0F6FE] rounded-2xl border border-[#CBD5E1]/60 text-center space-y-4"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-navy">
                Thank you. Our team will contact you to arrange your demo.
              </h3>
              <p className="text-xs sm:text-sm text-secondary mt-1 max-w-md mx-auto">
                We have received the walkthrough request for{" "}
                <strong className="text-navy">{submittedData.institutionName}</strong> (
                {submittedData.institutionType}) for the role of{" "}
                <strong className="text-navy">{submittedData.role}</strong>.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 text-xs text-secondary text-left space-y-1">
              <p>
                <span className="font-semibold text-navy">Contact Email:</span> {submittedData.workEmail}
              </p>
              <p>
                <span className="font-semibold text-navy">Contact Name:</span> {submittedData.fullName}
              </p>
              {submittedData.exploreNotes && (
                <p>
                  <span className="font-semibold text-navy">Priorities / Notes:</span> {submittedData.exploreNotes}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary bg-white hover:bg-slate-50 border border-primary/30 rounded-lg shadow-2xs transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Submit another enquiry
              </button>
            </div>
          </motion.div>
        ) : (
          /* Real Accessible Form */
          <form
            key="form"
            onSubmit={handleSubmit(onSubmit, onValidationError)}
            noValidate
            aria-busy={isSubmitting}
            className="space-y-4 sm:space-y-4.5"
          >
            {/* Honeypot Spam Trap (Hidden from users and assistive tech) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website-trap">Leave this field blank</label>
              <input
                id="website-trap"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>

            {/* Top Blue Pill Badge */}
            <div className="mb-2">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold text-white bg-primary uppercase tracking-wider">
                PERSONALISED WALKTHROUGH
              </span>
            </div>

            {/* Form Heading & Subtitle */}
            <div className="pb-1">
              <h3 className="text-2xl sm:text-[28px] md:text-[32px] font-bold text-navy tracking-tight leading-tight">
                Let’s explore your campus needs.
              </h3>
              <p className="text-xs sm:text-sm md:text-[15px] text-secondary mt-1">
                Tell us a little about your institution.
              </p>
            </div>

            {/* Server Error Alert Banner */}
            {serverError && (
              <div
                ref={errorAlertRef}
                tabIndex={-1}
                role="alert"
                className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm flex items-start gap-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-red-800">We couldn’t send your request. Please try again.</p>
                  <p className="mt-0.5 text-red-700">{serverError}</p>
                </div>
              </div>
            )}

            {/* First Row: Full name & Work email (2 equal columns on tablet/desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs sm:text-sm font-semibold text-navy mb-1.5"
                >
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={errors.fullName ? "true" : "false"}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  {...register("fullName")}
                  className={`w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-navy bg-white border rounded-lg placeholder:text-[#94A3B8] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.fullName ? "border-red-500" : "border-[#CBD5E1]"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-600 mt-1" id="fullName-error" role="alert">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="workEmail"
                  className="block text-xs sm:text-sm font-semibold text-navy mb-1.5"
                >
                  Work email
                </label>
                <input
                  id="workEmail"
                  type="email"
                  placeholder="you@institution.edu"
                  autoComplete="email"
                  aria-invalid={errors.workEmail ? "true" : "false"}
                  aria-describedby={errors.workEmail ? "workEmail-error" : undefined}
                  {...register("workEmail")}
                  className={`w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-navy bg-white border rounded-lg placeholder:text-[#94A3B8] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.workEmail ? "border-red-500" : "border-[#CBD5E1]"
                  }`}
                />
                {errors.workEmail && (
                  <p className="text-xs text-red-600 mt-1" id="workEmail-error" role="alert">
                    {errors.workEmail.message}
                  </p>
                )}
              </div>
            </div>

            {/* Second Row: Institution name (Full width) */}
            <div>
              <label
                htmlFor="institutionName"
                className="block text-xs sm:text-sm font-semibold text-navy mb-1.5"
              >
                Institution name
              </label>
              <input
                id="institutionName"
                type="text"
                placeholder="Your institution"
                autoComplete="organization"
                aria-invalid={errors.institutionName ? "true" : "false"}
                aria-describedby={errors.institutionName ? "institutionName-error" : undefined}
                {...register("institutionName")}
                className={`w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-navy bg-white border rounded-lg placeholder:text-[#94A3B8] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.institutionName ? "border-red-500" : "border-[#CBD5E1]"
                }`}
              />
              {errors.institutionName && (
                <p className="text-xs text-red-600 mt-1" id="institutionName-error" role="alert">
                  {errors.institutionName.message}
                </p>
              )}
            </div>

            {/* Third Row: Institution type (Accessible single-choice radio group) */}
            <div>
              <InstitutionTypeSelector
                value={selectedInstitutionType}
                registration={register("institutionType")}
                error={errors.institutionType?.message}
                onChange={(val) => setValue("institutionType", val, { shouldValidate: true })}
              />
            </div>

            {/* Fourth Row: Your role (Select dropdown) */}
            <div>
              <label
                htmlFor="role"
                className="block text-xs sm:text-sm font-semibold text-navy mb-1.5"
              >
                Your role
              </label>
              <div className="relative">
                <select
                  id="role"
                  aria-invalid={errors.role ? "true" : "false"}
                  aria-describedby={errors.role ? "role-error" : undefined}
                  {...register("role")}
                  className={`w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-navy bg-white border rounded-lg appearance-none transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10 cursor-pointer ${
                    errors.role ? "border-red-500" : "border-[#CBD5E1]"
                  }`}
                >
                  <option value="">Select your role</option>
                  {rolesList.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#64748B]"
                  aria-hidden="true"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {errors.role && (
                <p className="text-xs text-red-600 mt-1" id="role-error" role="alert">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Fifth Row: What would you like to explore? (optional textarea) */}
            <div>
              <label
                htmlFor="exploreNotes"
                className="block text-xs sm:text-sm font-semibold text-navy mb-1.5"
              >
                What would you like to explore? <span className="font-normal text-secondary">(optional)</span>
              </label>
              <textarea
                id="exploreNotes"
                rows={3}
                placeholder="Your priorities, questions or current challenges"
                aria-invalid={errors.exploreNotes ? "true" : "false"}
                aria-describedby={errors.exploreNotes ? "exploreNotes-error" : undefined}
                {...register("exploreNotes")}
                className={`w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-navy bg-white border rounded-lg placeholder:text-[#94A3B8] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y min-h-[88px] ${
                  errors.exploreNotes ? "border-red-500" : "border-[#CBD5E1]"
                }`}
              />
              {errors.exploreNotes && (
                <p className="text-xs text-red-600 mt-1" id="exploreNotes-error" role="alert">
                  {errors.exploreNotes.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-primary hover:bg-[#0039DE] active:bg-[#0034C0] text-white font-semibold text-sm sm:text-base rounded-lg shadow-sm transition-colors duration-150 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed select-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Sending your request…</span>
                  </>
                ) : (
                  <>
                    <span>Request my demo</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>

            {/* Helper Text */}
            <div className="text-center pt-1 text-xs text-secondary select-none">
              <p>Our team will contact you to arrange your demo.</p>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
