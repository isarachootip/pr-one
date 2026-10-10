export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="mb-3 font-mono text-[13px] tracking-[0.08em] text-accent">{children}</div>;
}

export function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`m-0 font-display text-[clamp(32px,4vw,56px)] font-bold leading-[1.1] tracking-[-0.03em] ${className}`}>{children}</h2>
  );
}

export function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 text-sm text-[#FF9C8A]" role="alert">
      {msg}
    </p>
  );
}

export function Cover({ src, alt, className = "", label }: { src: string; alt: string; className?: string; label?: string }) {
  if (!src)
    return (
      <div className={`ph flex items-end p-3 ${className}`}>
        <span className="font-mono text-[11px] text-dim">{label ?? "PR ONE"}</span>
      </div>
    );
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" className={`bg-panel object-cover ${className}`} />;
}
