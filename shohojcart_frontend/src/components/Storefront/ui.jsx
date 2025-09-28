// src/components/Storefront/ui.jsx
export function Button({ className = "", variant = "primary", ...props }) {
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition";
  const styles = {
    primary: "bg-neutral-900 text-white hover:bg-neutral-800",
    outline: "bg-white border border-neutral-300 text-neutral-900 hover:shadow-sm",
    ghost: "hover:bg-neutral-100",
  };
  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
}

export function Price({ value, className = "" }) {
  const v = Number(value || 0);
  return <span className={`tabular-nums ${className}`}>৳ {v.toFixed(2)}</span>;
}

export function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-2 py-0.5 text-xs text-neutral-600">
      {children}
    </span>
  );
}

export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-neutral-200/70 ${className}`} />;
}
