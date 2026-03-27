import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import AuthLayout from '../components/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { loginApi, signupApi } from '@/api/auth';

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget as HTMLFormElement;
    const userName =
      (form.elements.namedItem("userName") as HTMLInputElement | null)?.value ??
      "";
    const email = (form.elements.namedItem("email") as HTMLInputElement | null)?.value ?? "";
    const password =
      (form.elements.namedItem("password") as HTMLInputElement | null)?.value ??
      "";
    const confirmPassword =
      (form.elements.namedItem("confirmPassword") as HTMLInputElement | null)
        ?.value ?? "";

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await signupApi({ userName, email, password });
      const result = await loginApi({ email, password });
      login(
        {
          id: String(result.user.id),
          name: result.user.userName,
          email: result.user.email,
          role: result.user.role,
        },
        result.token,
      );
      navigate('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start tracking your wealth today"
      alternateAction={{
        text: "Already have an account?",
        linkText: "Sign In",
        href: "/signin"
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <Input 
              id="name" 
              name="userName"
              placeholder="John Doe" 
              required 
              className="h-12 bg-zinc-50/50 border-zinc-200 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="email@example.com" 
              required 
              className="h-12 bg-zinc-50/50 border-zinc-200 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <Input 
              id="password" 
              name="password"
              type="password" 
              placeholder="••••••••" 
              required 
              className="h-12 bg-zinc-50/50 border-zinc-200 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <Input 
              id="confirm-password" 
              name="confirmPassword"
              type="password" 
              placeholder="••••••••" 
              required 
              className="h-12 bg-zinc-50/50 border-zinc-200 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] pl-10"
            />
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox id="terms" className="mt-1 border-zinc-300 data-[state=checked]:bg-[#1e3a8a] data-[state=checked]:border-[#1e3a8a]" />
          <Label htmlFor="terms" className="text-sm text-zinc-500 leading-tight">
            I agree to the <a href="#" className="text-[#1e3a8a] hover:underline">Terms of Service</a> and <a href="#" className="text-[#1e3a8a] hover:underline">Privacy Policy</a>
          </Label>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-bold text-lg shadow-lg group"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : (
            <span className="flex items-center justify-center gap-2">
              Create Account <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-zinc-500">Or sign up with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-12 border-zinc-200 hover:bg-zinc-50">
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </Button>
          <Button variant="outline" className="h-12 border-zinc-200 hover:bg-zinc-50">
            <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.152-1.11-1.459-1.11-1.459-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            GitHub
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
