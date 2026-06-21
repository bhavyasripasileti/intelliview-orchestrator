"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/Dialog";
import { useEffect } from "react";
import { Command, Search, Users, Activity, BarChart3, Settings, LayoutDashboard, Keyboard } from "lucide-react";

interface ShortcutsHelpProps {
  open: boolean;
  onClose: () => void;
}

const SHORTCUTS = [
  { keys: ["⌘", "K"], label: "Open command palette", icon: Search },
  { keys: ["G", "S"], label: "Go to Sessions", icon: Activity },
  { keys: ["G", "W"], label: "Go to Workers", icon: Users },
  { keys: ["G", "A"], label: "Go to Analytics", icon: BarChart3 },
  { keys: ["G", "O"], label: "Go to Overview", icon: LayoutDashboard },
  { keys: ["G", ","], label: "Go to Settings", icon: Settings },
  { keys: ["?"], label: "Show this help", icon: Keyboard },
  { keys: ["ESC"], label: "Close dialog", icon: Command },
];

export function ShortcutsHelp({ open, onClose }: ShortcutsHelpProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent onClose={onClose} className="max-w-md">
        <div className="border-b border-border px-5 py-4">
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <p className="mt-0.5 text-xs text-muted">Navigate faster with these shortcuts.</p>
        </div>
        <div className="p-3">
          {SHORTCUTS.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between gap-3 rounded-md px-3 py-2 hover:bg-bg-card"
            >
              <div className="flex items-center gap-2 text-sm text-zinc-200">
                <s.icon size={14} className="text-muted" />
                {s.label}
              </div>
              <div className="flex items-center gap-1">
                {s.keys.map((k) => (
                  <kbd
                    key={k}
                    className="rounded border border-border bg-bg-card px-1.5 py-0.5 text-[10px] font-mono text-zinc-300"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
