import { LoginForm } from "@/components/admin/LoginForm";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 text-center font-display text-2xl font-bold">
          PR ONE <span className="font-mono text-sm font-normal text-accent">ADMIN</span>
        </div>
        <LoginForm next={next ?? "/admin"} />
      </div>
    </div>
  );
}
