import Link from "next/link";
import { RiArrowLeftLine, RiSaveLine } from "react-icons/ri";

interface Field {
  label: string;
  name: string;
  type?: "text" | "textarea" | "select" | "number" | "url";
  placeholder?: string;
  options?: string[];
  defaultValue?: string | number;
  required?: boolean;
  hint?: string;
  rows?: number;
}

interface AdminFormProps {
  backHref: string;
  backLabel?: string;
  fields: Field[];
  isEdit?: boolean;
}

export default function AdminForm({ backHref, backLabel = "Back", fields, isEdit = false }: AdminFormProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
      >
        <RiArrowLeftLine size={15} />
        {backLabel}
      </Link>

      {/* Form card */}
      <form className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        <div className="px-6 py-5 border-b border-white/[0.06]">
          <p className="text-sm text-white/50">
            {isEdit ? "Update the fields below and save." : "Fill in the details below to create a new entry."}
          </p>
        </div>

        <div className="px-6 py-6 space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-white/70 mb-1.5">
                {field.label}
                {field.required && <span className="text-pink-400 ml-1">*</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  defaultValue={field.defaultValue as string}
                  rows={field.rows ?? 4}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all resize-none"
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  defaultValue={field.defaultValue as string}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all"
                >
                  <option value="" className="bg-[#0d0d1a]">Select…</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0d0d1a]">{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type ?? "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  defaultValue={field.defaultValue}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all"
                />
              )}

              {field.hint && (
                <p className="text-xs text-white/30 mt-1.5">{field.hint}</p>
              )}
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-end gap-3">
          <Link
            href={backHref}
            className="px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/[0.04] transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <RiSaveLine size={15} />
            {isEdit ? "Save Changes" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
