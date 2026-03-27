import Header from "@/layouts/header";
import { AuthLayoutProps } from "@/types";
import  Footer  from "@/layouts/footer";

export default function AuthLayout({
  children,
  title,
  subtitle,
  alternateAction,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative bg-zinc-50/50">
      <div
        className="absolute inset-0 z-0 opacity-40 grayscale-[0.2]"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
        }}
      />

      <Header alternateAction={alternateAction} />

      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-zinc-900 mb-2">{title}</h1>
              <p className="text-zinc-500">{subtitle}</p>
            </div>
            {children}
          </div>

          <div className="px-8 py-6 bg-zinc-50/80 border-t border-zinc-100 text-center">
            <p className="text-xs text-zinc-400 leading-relaxed">
              By signing in, you agree to our{" "}
              <a href="#" className="text-[#1e3a8a] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#1e3a8a] hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
