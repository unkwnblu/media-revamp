"use client";

import Link from "next/link";
import { RiAddLine, RiEditLine, RiDeleteBinLine } from "react-icons/ri";

interface Column<T> {
  label: string;
  render: (row: T) => React.ReactNode;
  className?: string;
  /** Hide this column on mobile card view (still shown in desktop table) */
  mobileHide?: boolean;
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
  addHref,
  addLabel = "Add New",
  columns,
  rows,
  getEditHref,
  getKey,
  onDelete,
  emptyMessage = "No items yet.",
}: AdminTableProps<T>) {
  const totalCols = columns.length + (getEditHref ? 1 : 0);

  return (
    <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <p className="text-white/40 text-sm">
          {rows.length} item{rows.length !== 1 ? "s" : ""}
        </p>
        <Link
          href={addHref}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <RiAddLine size={16} />
          {addLabel}
        </Link>
      </div>

      {/* ── Mobile card list (< md) ── */}
      <div className="md:hidden space-y-2">
        {rows.length === 0 ? (
          <div className="px-5 py-10 text-center text-white/30 text-sm rounded-xl border border-white/[0.06]">
            {emptyMessage}
          </div>
        ) : (
          rows.map((row) => (
            <div
              key={getKey(row)}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 space-y-2"
            >
              {/* First column = primary title, shown large */}
              <div className="text-sm font-medium text-white">
                {columns[0].render(row)}
              </div>

              {/* Remaining visible columns as label: value pills */}
              {columns.slice(1).filter((c) => !c.mobileHide).map((col) => (
                <div key={col.label} className="flex items-center gap-2">
                  <span className="text-[10px] text-white/30 tracking-widest uppercase w-16 shrink-0">
                    {col.label}
                  </span>
                  <div className="text-xs text-white/70">{col.render(row)}</div>
                </div>
              ))}

              {/* Actions row */}
              {getEditHref && (
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-white/[0.04] mt-2">
                  <Link
                    href={getEditHref(row)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-purple-400 hover:bg-purple-400/10 transition-all"
                  >
                    <RiEditLine size={13} /> Edit
                  </Link>
                  <button
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    onClick={() => onDelete?.(getKey(row))}
                  >
                    <RiDeleteBinLine size={13} /> Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* ── Desktop table (md+) ── */}
      <div className="hidden md:block rounded-xl border border-white/[0.06] overflow-hidden">
        {/* Head */}
        <div
          className="grid gap-4 px-5 py-3 bg-white/[0.03] border-b border-white/[0.06] text-[11px] font-semibold text-white/40 tracking-widest uppercase"
          style={{ gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))` }}
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
              style={{ gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))` }}
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
