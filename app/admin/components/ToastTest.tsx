"use client";

import { useToast } from "./Toast";

export default function ToastTest() {
  const { showToast } = useToast();

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => showToast("Success toast is working!", "success")} className="px-3 py-1.5 text-xs rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors">
        Test Success
      </button>
      <button onClick={() => showToast("Info toast is working!", "info")} className="px-3 py-1.5 text-xs rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors">
        Test Info
      </button>
      <button onClick={() => showToast("Error toast is working!", "error")} className="px-3 py-1.5 text-xs rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors">
        Test Error
      </button>
    </div>
  );
}
