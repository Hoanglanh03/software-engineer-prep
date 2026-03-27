import { AuthLayoutProps } from "@/types";
import { Banknote, Link } from "lucide-react";

export default function Header({ alternateAction }: AuthLayoutProps) {
  return (
    <header className="relative z-10 px-8 py-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-[#1e3a8a] p-1.5 rounded-md">
          <Banknote className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold text-zinc-900">SpendWise</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-500 hidden sm:inline">
          {alternateAction.text}
        </span>
        <Link
          to={alternateAction.href}
          className="text-sm font-semibold text-[#1e3a8a] hover:underline px-4 py-2 rounded-md bg-zinc-100/80 sm:bg-transparent"
        >
          {alternateAction.linkText}
        </Link>
      </div>
    </header>
  );
}
