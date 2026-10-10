import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <div className="font-mono text-accent">404</div>
        <h1 className="my-4 font-display text-5xl font-bold">This stage is empty.</h1>
        <Link href="/" className="rounded-full bg-accent px-6 py-3 font-semibold text-ink">Back to PR One</Link>
      </div>
    </main>
  );
}
