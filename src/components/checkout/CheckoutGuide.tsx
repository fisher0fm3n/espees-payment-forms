"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import CodeBlock from "@/components/ai/Codeblock";

export type GuideCode = {
  language: string;
  // A snippet that varies by the selected backend/frontend language.
  // Keyed by the option label (e.g. "Node.js", "React"). Falls back to the
  // first entry when the current selection has no variant.
  group?: "backend" | "frontend";
  variants?: Record<string, string>;
  code?: string;
};

export type GuideStep = {
  title: string;
  body: ReactNode;
  code?: GuideCode;
};

export type CheckoutGuideProps = {
  title: string;
  tag?: { label: string; tone: "recommended" | "preview" };
  intro: ReactNode;
  steps: GuideStep[];
  preview: ReactNode;
  demoHref: string;
};

const FRONTEND = ["HTML", "React", "Next.js"];
const BACKEND = ["Ruby", "Node.js", "PHP", "Python", "Go", ".NET", "Java"];

function LangToggle({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </span>
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
              value === opt
                ? "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
                : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function resolveCode(code: GuideCode, backend: string, frontend: string) {
  if (code.variants) {
    const sel = code.group === "frontend" ? frontend : backend;
    return code.variants[sel] ?? Object.values(code.variants)[0];
  }
  return code.code ?? "";
}

export default function CheckoutGuide({
  title,
  tag,
  intro,
  steps,
  preview,
  demoHref,
}: CheckoutGuideProps) {
  const [backend, setBackend] = useState("Node.js");
  const [frontend, setFrontend] = useState("React");

  return (
    <div>
      {/* Breadcrumb / back */}
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-brand-500">
          Home
        </Link>
        <span>/</span>
        <Link href="/checkout" className="hover:text-brand-500">
          Build a payments page
        </Link>
        <span>/</span>
        <span className="text-gray-800 dark:text-white/90">{title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.3fr_1fr]">
        {/* Left: documentation */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
              {title}
            </h1>
            {tag && (
              <span
                className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                  tag.tone === "recommended"
                    ? "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
                    : "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                }`}
              >
                {tag.label}
              </span>
            )}
          </div>
          <div className="mb-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {intro}
          </div>

          <Link
            href={demoHref}
            target="_blank"
            className="mb-6 inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white transition hover:bg-brand-600"
          >
            View live demo
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 15L15 5M7 5h8v8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Language switchers */}
          <div className="mb-8 flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/[0.02]">
            <LangToggle
              label="Frontend"
              options={FRONTEND}
              value={frontend}
              onChange={setFrontend}
            />
            <LangToggle
              label="Backend"
              options={BACKEND}
              value={backend}
              onChange={setBackend}
            />
          </div>

          {/* Steps */}
          <ol className="space-y-8">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="mt-1 w-px flex-1 bg-gray-200 dark:bg-gray-800" />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <h2 className="mb-2 text-base font-semibold text-gray-800 dark:text-white/90">
                    {step.title}
                  </h2>
                  <div className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {step.body}
                  </div>
                  {step.code && (
                    <div className="mt-4">
                      <CodeBlock
                        language={step.code.language}
                        code={resolveCode(step.code, backend, frontend)}
                        showLineNumbers
                      />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Right: sticky live preview */}
        <div>
          <div className="sticky top-24">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path
                  d="M6 8l4-4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Preview
            </div>
            {preview}
            <p className="mt-3 text-xs text-gray-400">
              This is a static preview for the proof of concept. No live Stripe
              session is created.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
