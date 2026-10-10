export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="mb-3 font-mono text-[13px] tracking-[0.08em] text-accent">{children}</div>;
}

export function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`m-0 font-display text-[clamp(34px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.03em] ${className}`}>
      {children}
    </h2>
  );
}

export function Container({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={`mx-auto max-w-[1280px] px-6 ${className}`}>
      {children}
    </div>
  );
}

export function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-sm text-[#FF9C8A]">{msg}</p>;
}
