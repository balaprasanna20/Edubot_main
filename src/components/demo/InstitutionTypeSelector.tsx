"use client";

import React from "react";
import { School, GraduationCap, Landmark, MoreHorizontal } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InstitutionOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const options: InstitutionOption[] = [
  {
    id: "School",
    label: "School",
    icon: <School className="w-4 h-4 flex-shrink-0" />,
  },
  {
    id: "College",
    label: "College",
    icon: <GraduationCap className="w-4 h-4 flex-shrink-0" />,
  },
  {
    id: "University",
    label: "University",
    icon: <Landmark className="w-4 h-4 flex-shrink-0" />,
  },
  {
    id: "Other",
    label: "Other",
    icon: <MoreHorizontal className="w-4 h-4 flex-shrink-0" />,
  },
];

export interface InstitutionTypeSelectorProps {
  value: string;
  registration: UseFormRegisterReturn;
  error?: string;
  onChange: (val: string) => void;
}

export default function InstitutionTypeSelector({
  value,
  registration,
  error,
  onChange,
}: InstitutionTypeSelectorProps) {
  return (
    <fieldset className="w-full">
      <legend className="text-xs sm:text-sm font-semibold text-navy mb-2 block">
        Institution type
      </legend>

      <div
        role="radiogroup"
        aria-label="Institution type"
        className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3"
      >
        {options.map((opt) => {
          const isSelected = value === opt.id;

          return (
            <label
              key={opt.id}
              className={`relative flex items-center justify-center gap-2 px-3 py-2.5 sm:py-3 rounded-lg border text-xs sm:text-sm font-medium cursor-pointer transition-all duration-150 select-none ${
                isSelected
                  ? "border-primary bg-[#EFF6FF] text-primary shadow-xs ring-1 ring-primary/20 font-semibold"
                  : "border-[#CBD5E1] bg-white text-navy/80 hover:border-primary/50 hover:bg-slate-50/80"
              } focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2`}
            >
              <input
                type="radio"
                value={opt.id}
                {...registration}
                checked={isSelected}
                onChange={() => onChange(opt.id)}
                className="sr-only"
                aria-checked={isSelected}
              />
              <span
                className={`transition-colors ${
                  isSelected ? "text-primary" : "text-[#64748B]"
                }`}
                aria-hidden="true"
              >
                {opt.icon}
              </span>
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>

      {error && (
        <p className="text-xs text-red-600 mt-1.5" id="institution-type-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

