import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { loginApi } from "@/api/auth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget as HTMLFormElement;
    const email =
      (form.elements.namedItem("email") as HTMLInputElement | null)?.value ??
      "";
    const password =
      (form.elements.namedItem("password") as HTMLInputElement | null)?.value ??
      "";

    try {
      const result = await loginApi({ email, password });

      if (result.user.role !== "admin") {
        setError("You are not authorized to access the admin area.");
        setIsLoading(false);
        return;
      }

      login(
        {
          id: String(result.user.id),
          name: result.user.userName,
          email: result.user.email,
          role: result.user.role,
        },
        result.token,
      );

      navigate("/admin/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Admin login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Admin Sign In"
      subtitle="Sign in with an admin account to manage the system"
      alternateAction={{
        text: "Back to user login?",
        linkText: "User Sign In",
        href: "/signin",
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Admin Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="admin@example.com"
            required
            className="h-12 bg-zinc-50/50 border-zinc-200 focus:border-[#1e3a8a] focus:ring-[#1e3a8a]"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              className="h-12 bg-zinc-50/50 border-zinc-200 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-bold text-lg shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In as Admin"}
        </Button>
      </form>
    </AuthLayout>
  );
}

