"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Mail,
  MapPin,
  Phone,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import MobileShell from "@/components/MobileShell";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useToast } from "@/components/Toast";
import { useRightSidebar } from "@/context/SidebarContext";

const STORAGE_KEY = "reallife101.resume";

interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  details: string;
}

interface EducationEntry {
  id: string;
  degree: string;
  school: string;
  period: string;
}

interface ResumeData {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
}

const SAMPLE: ResumeData = {
  name: "Maya Chen",
  headline: "Marketing Coordinator",
  email: "maya.chen@example.com",
  phone: "+1 (555) 010-2030",
  location: "Austin, TX",
  summary:
    "Marketing grad who turns data into campaigns people actually click. Three years of social media and content experience across two startups.",
  skills: ["Copywriting", "SEO", "Google Analytics", "Figma", "Public Speaking"],
  experience: [
    {
      id: "e1",
      role: "Marketing Coordinator",
      company: "BrightWave Media",
      period: "2023 — Present",
      details:
        "Run 4 social channels, growing followers 38% in one year\nPlanned 12 campaign launches on a $40k quarterly budget",
    },
    {
      id: "e2",
      role: "Social Media Intern",
      company: "LocalFlow",
      period: "2021 — 2023",
      details:
        "Wrote 150+ posts and 20 newsletters\nShort-form video clips averaging 12k views",
    },
  ],
  education: [
    {
      id: "d1",
      degree: "B.A. Communication",
      school: "University of Texas",
      period: "2019 — 2023",
    },
  ],
};

const inputCls =
  "w-full bg-brand-bg border border-brand-border rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand-teal/60 transition-colors";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-neutral-400">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export default function ResumeBuilderPage() {
  const router = useRouter();
  const notify = useToast();
  const isMobile = useIsMobile();
  const { isRightSidebarOpen, toggleRightSidebar } = useRightSidebar();

  const [resume, setResume] = useState<ResumeData>(SAMPLE);
  const [skillDraft, setSkillDraft] = useState("");
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  // Hydrate the saved draft once on mount.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setResume({ ...SAMPLE, ...(JSON.parse(stored) as Partial<ResumeData>) });
      }
    } catch {
      /* keep sample data */
    }
  }, []);

  // Persist every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
    } catch {
      /* no-op */
    }
  }, [resume]);

  type PersonalKey = "name" | "headline" | "email" | "phone" | "location" | "summary";

  const update = (key: PersonalKey, value: string) =>
    setResume((r) => ({ ...r, [key]: value }));

  const updateExperience = (
    id: string,
    key: keyof ExperienceEntry,
    value: string
  ) =>
    setResume((r) => ({
      ...r,
      experience: r.experience.map((e) =>
        e.id === id ? { ...e, [key]: value } : e
      ),
    }));

  const updateEducation = (
    id: string,
    key: keyof EducationEntry,
    value: string
  ) =>
    setResume((r) => ({
      ...r,
      education: r.education.map((e) =>
        e.id === id ? { ...e, [key]: value } : e
      ),
    }));

  const addExperience = () =>
    setResume((r) => ({
      ...r,
      experience: [
        ...r.experience,
        { id: `e-${Date.now()}`, role: "", company: "", period: "", details: "" },
      ],
    }));

  const removeExperience = (id: string) =>
    setResume((r) => ({ ...r, experience: r.experience.filter((e) => e.id !== id) }));

  const addEducation = () =>
    setResume((r) => ({
      ...r,
      education: [
        ...r.education,
        { id: `d-${Date.now()}`, degree: "", school: "", period: "" },
      ],
    }));

  const removeEducation = (id: string) =>
    setResume((r) => ({ ...r, education: r.education.filter((e) => e.id !== id) }));

  const addSkill = () => {
    const s = skillDraft.trim();
    if (!s || resume.skills.includes(s)) return;
    setResume((r) => ({ ...r, skills: [...r.skills, s] }));
    setSkillDraft("");
  };

  const removeSkill = (s: string) =>
    setResume((r) => ({ ...r, skills: r.skills.filter((x) => x !== s) }));

  const download = () =>
    notify("PDF export is coming soon — this is a prototype", "info");

  /* ---- Form ---- */
  const formSections = (
    <div className="flex flex-col gap-4">
      {/* Personal details */}
      <section className="rounded-2xl bg-brand-surface border border-brand-border p-4">
        <h2 className="text-white font-bold text-sm mb-3">Personal details</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Full name">
            <input
              className={inputCls}
              value={resume.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Maya Chen"
            />
          </Field>
          <Field label="Headline">
            <input
              className={inputCls}
              value={resume.headline}
              onChange={(e) => update("headline", e.target.value)}
              placeholder="Marketing Coordinator"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              className={inputCls}
              value={resume.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
            />
          </Field>
          <Field label="Phone">
            <input
              className={inputCls}
              value={resume.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+1 (555) 010-2030"
            />
          </Field>
          <Field label="Location">
            <input
              className={inputCls}
              value={resume.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="Austin, TX"
            />
          </Field>
        </div>
      </section>

      {/* Summary */}
      <section className="rounded-2xl bg-brand-surface border border-brand-border p-4">
        <h2 className="text-white font-bold text-sm mb-3">Summary</h2>
        <textarea
          rows={3}
          className={inputCls}
          value={resume.summary}
          onChange={(e) => update("summary", e.target.value)}
          placeholder="Two or three lines about you"
        />
      </section>

      {/* Experience */}
      <section className="rounded-2xl bg-brand-surface border border-brand-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold text-sm">Experience</h2>
          <button
            onClick={addExperience}
            className="flex items-center gap-1 text-brand-teal text-xs font-semibold hover:underline cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            Add
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {resume.experience.map((exp, i) => (
            <div
              key={exp.id}
              className="rounded-xl bg-brand-bg border border-brand-border p-3 relative"
            >
              <button
                onClick={() => removeExperience(exp.id)}
                aria-label="Remove entry"
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg flex items-center justify-center text-neutral-600 hover:text-brand-rust hover:bg-brand-rust/10 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                Experience {i + 1}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Role">
                  <input
                    className={inputCls}
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                    placeholder="Marketing Coordinator"
                  />
                </Field>
                <Field label="Company">
                  <input
                    className={inputCls}
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                    placeholder="BrightWave Media"
                  />
                </Field>
              </div>
              <div className="mt-3">
                <Field label="Period">
                  <input
                    className={inputCls}
                    value={exp.period}
                    onChange={(e) => updateExperience(exp.id, "period", e.target.value)}
                    placeholder="2023 — Present"
                  />
                </Field>
              </div>
              <div className="mt-3">
                <Field label="Highlights (one per line)">
                  <textarea
                    rows={3}
                    className={inputCls}
                    value={exp.details}
                    onChange={(e) => updateExperience(exp.id, "details", e.target.value)}
                    placeholder={"Grew followers 38% in one year\nPlanned 12 campaign launches"}
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="rounded-2xl bg-brand-surface border border-brand-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold text-sm">Education</h2>
          <button
            onClick={addEducation}
            className="flex items-center gap-1 text-brand-teal text-xs font-semibold hover:underline cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            Add
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {resume.education.map((edu, i) => (
            <div
              key={edu.id}
              className="rounded-xl bg-brand-bg border border-brand-border p-3 relative"
            >
              <button
                onClick={() => removeEducation(edu.id)}
                aria-label="Remove entry"
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg flex items-center justify-center text-neutral-600 hover:text-brand-rust hover:bg-brand-rust/10 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                Education {i + 1}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Degree">
                  <input
                    className={inputCls}
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    placeholder="B.A. Communication"
                  />
                </Field>
                <Field label="School">
                  <input
                    className={inputCls}
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                    placeholder="University of Texas"
                  />
                </Field>
              </div>
              <div className="mt-3">
                <Field label="Period">
                  <input
                    className={inputCls}
                    value={edu.period}
                    onChange={(e) => updateEducation(edu.id, "period", e.target.value)}
                    placeholder="2019 — 2023"
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="rounded-2xl bg-brand-surface border border-brand-border p-4">
        <h2 className="text-white font-bold text-sm mb-3">Skills</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addSkill();
          }}
          className="flex gap-2"
        >
          <input
            className={inputCls}
            value={skillDraft}
            onChange={(e) => setSkillDraft(e.target.value)}
            placeholder="Type a skill and press Enter"
            aria-label="Add a skill"
          />
          <button
            type="submit"
            aria-label="Add skill"
            className="w-10 h-10 shrink-0 rounded-xl bg-brand-teal text-black flex items-center justify-center hover:bg-brand-teal/90 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </form>
        <div className="flex flex-wrap gap-2 mt-3">
          {resume.skills.map((s) => (
            <span
              key={s}
              className="flex items-center gap-1.5 bg-brand-bg border border-brand-border text-neutral-200 text-xs font-medium px-2.5 py-1.5 rounded-full"
            >
              {s}
              <button
                onClick={() => removeSkill(s)}
                aria-label={`Remove ${s}`}
                className="text-neutral-500 hover:text-brand-rust transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" strokeWidth={2.5} />
              </button>
            </span>
          ))}
          {resume.skills.length === 0 && (
            <span className="text-xs text-neutral-600">
              No skills yet — add a few above.
            </span>
          )}
        </div>
      </section>
    </div>
  );

  /* ---- Live preview ---- */
  const previewCard = (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
          Live preview
        </span>
        <button
          onClick={download}
          className="flex items-center gap-1.5 bg-brand-teal hover:bg-brand-teal/90 text-black text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" strokeWidth={2.5} />
          Download PDF
        </button>
      </div>

      {/* Paper */}
      <div className="bg-white text-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/40">
        <p className="text-2xl font-extrabold tracking-tight leading-tight">
          {resume.name || "Your Name"}
        </p>
        {resume.headline && (
          <p className="text-sm font-semibold text-teal-700 mt-0.5">{resume.headline}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-neutral-500">
          {resume.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {resume.email}
            </span>
          )}
          {resume.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {resume.phone}
            </span>
          )}
          {resume.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {resume.location}
            </span>
          )}
        </div>

        {resume.summary && (
          <div className="mt-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 mb-1">
              Summary
            </p>
            <p className="text-sm leading-relaxed text-neutral-700">{resume.summary}</p>
          </div>
        )}

        {resume.experience.length > 0 && (
          <div className="mt-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 mb-2">
              Experience
            </p>
            <div className="flex flex-col gap-3.5">
              {resume.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <p className="text-sm font-bold text-neutral-900">
                      {exp.role || "Role"}
                    </p>
                    <p className="text-[11px] text-neutral-400 font-medium">{exp.period}</p>
                  </div>
                  {exp.company && (
                    <p className="text-xs font-semibold text-teal-700 mt-0.5">
                      {exp.company}
                    </p>
                  )}
                  {exp.details.trim() && (
                    <ul className="mt-1.5 flex flex-col gap-1 list-disc pl-4">
                      {exp.details
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean)
                        .map((line, i) => (
                          <li key={i} className="text-sm text-neutral-700 leading-snug">
                            {line}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.education.length > 0 && (
          <div className="mt-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 mb-2">
              Education
            </p>
            <div className="flex flex-col gap-2.5">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <p className="text-sm font-bold text-neutral-900">
                      {edu.degree || "Degree"}
                    </p>
                    <p className="text-[11px] text-neutral-400 font-medium">{edu.period}</p>
                  </div>
                  {edu.school && (
                    <p className="text-xs text-neutral-600 mt-0.5">{edu.school}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.skills.length > 0 && (
          <div className="mt-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 mb-2">
              Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {resume.skills.map((s) => (
                <span
                  key={s}
                  className="bg-neutral-100 text-neutral-700 text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-[11px] text-neutral-600">
        Prototype — your draft saves automatically on this device.
      </p>
    </div>
  );

  /* ---- Mobile: Edit / Preview tabs ---- */
  if (isMobile) {
    return (
      <MobileShell>
        <div className="px-4 pt-1 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => router.push("/tools")}
              aria-label="Back to tools"
              className="w-9 h-9 rounded-xl bg-[#1E232A] border border-[#2E2E2E] flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Resume Builder</h1>
              <p className="text-[#9CA3AF] text-xs">Draft → polish → preview</p>
            </div>
          </div>

          <div className="flex gap-1 bg-[#161A1E] rounded-lg p-1">
            {(["edit", "preview"] as const).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setTab(tabKey)}
                className={`flex-1 py-2 rounded-md text-xs font-medium transition-colors ${
                  tab === tabKey
                    ? "bg-[#7CE1D4] text-black"
                    : "text-[#9CA3AF] hover:text-white"
                }`}
              >
                {tabKey === "edit" ? "Edit" : "Preview"}
              </button>
            ))}
          </div>

          <div className="mt-4">{tab === "edit" ? formSections : previewCard}</div>
        </div>
      </MobileShell>
    );
  }

  /* ---- Desktop: form + sticky live preview ---- */
  return (
    <div className="flex h-screen bg-brand-bg text-white overflow-hidden">
      <LeftSidebar />

      <div className="flex-1 min-w-0 h-screen overflow-y-auto smooth-scroll bg-brand-bg">
        <div className="sticky top-0 z-20 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 lg:py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/tools")}
                aria-label="Back to tools"
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg lg:text-xl font-bold">Resume Builder</h1>
                <p className="text-neutral-500 text-xs hidden sm:block">
                  Draft → polish → preview
                </p>
              </div>
            </div>
            <button
              onClick={download}
              className="flex items-center gap-1.5 bg-brand-teal hover:bg-brand-teal/90 text-black text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" strokeWidth={2.5} />
              Download PDF
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid lg:grid-cols-2 gap-6 items-start">
          {formSections}
          <div className="lg:sticky lg:top-24">{previewCard}</div>
        </div>
      </div>

      <RightSidebar isOpen={isRightSidebarOpen} onToggle={toggleRightSidebar} />
    </div>
  );
}