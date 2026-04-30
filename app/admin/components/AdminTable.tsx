"use client";

import Link from "next/link";
import { RiAddLine, RiEditLine, RiDeleteBinLine } from "react-icons/ri";

interface Column<T> {
  label: string;
  render: (row: T) => React.ReactNode;
  className?: string;
}

interface AdminTableProps<T> {
  title: string;
  addHref: string;
  addLabel?: string;
  columns: Column<T>[];
  rows: T[];
  getEditHref?: (row: T) => string;
  getKey: (row: T) => string;
  onDelete?: (key: string) => void;
  emptyMessage?: string;
}

export default function AdminTable<T>({
  title,
  addHref,
  addLabel = "Add New",
  columns,
  rows,
  getEditHref,
  getKey,
  onDelete,
  emptyMessage = "No items yet.",
}: AdminTableProps<T>) {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/40 text-sm mt-0.5">{rows.length} item{rows.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href={addHref}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <RiAddLine size={16} />
          {addLabel}
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/[0.06] overflow-hidden">
        {/* Head */}
        <div className={`grid gap-4 px-5 py-3 bg-white/[0.03] border-b border-white/[0.06] text-[11px] font-semibold text-white/40 tracking-widest uppercase`}
          style={{ gridTemplateColumns: `repeat(${columns.length + (getEditHref ? 1 : 0)}, minmax(0, 1fr))` }}
        >
          {columns.map((col) => (
            <span key={col.label} className={col.className}>{col.label}</span>
          ))}
          {getEditHref && <span className="text-right">Actions</span>}
        </div>

        {/* Body */}
        {rows.length === 0 ? (
          <div className="px-5 py-12 text-center text-white/30 text-sm">{emptyMessage}</div>
        ) : (
          rows.map((row, i) => (
            <div
              key={getKey(row)}
              className={`grid gap-4 px-5 py-4 items-center hover:bg-white/[0.02] transition-colors ${
                i < rows.length - 1 ? "border-b border-white/[0.04]" : ""
              }`}
              style={{ gridTemplateColumns: `repeat(${columns.length + (getEditHref ? 1 : 0)}, minmax(0, 1fr))` }}
            >
              {columns.map((col) => (
                <div key={col.label} className={`text-sm ${col.className ?? ""}`}>
                  {col.render(row)}
                </div>
              ))}
              {getEditHref && (
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={getEditHref(row)}
                    className="p-1.5 rounded-lg text-white/40 hover:text-purple-400 hover:bg-purple-400/10 transition-all"
                    title="Edit"
                  >
                    <RiEditLine size={16} />
                  </Link>
                  <button
                    className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    title="Delete"
                    onClick={() => onDelete?.(getKey(row))}
                  >
                    <RiDeleteBinLine size={16} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
