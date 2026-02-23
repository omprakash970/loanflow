const baseStyles = `
  inline-flex items-center justify-center
  font-medium transition-all duration-200 ease-out
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c14]
  disabled:pointer-events-none disabled:opacity-40
  active:scale-[0.96]
  relative overflow-hidden
`;

const variants = {
  primary: `
    bg-[#2dd4bf] text-[#080c14]
    font-bold tracking-wide
    shadow-[0_0_24px_rgba(45,212,191,0.28)]
    hover:opacity-88 hover:shadow-[0_0_38px_rgba(45,212,191,0.45)]
    rounded-[10px]
  `,
  ghost: `
    border border-[rgba(255,255,255,0.08)] text-[#94a3b8]
    hover:border-[rgba(45,212,191,0.3)] hover:bg-[rgba(45,212,191,0.06)] hover:text-[#f0f4f8]
    rounded-[10px]
  `,
  subtle: `
    bg-[rgba(255,255,255,0.04)] text-[#cbd5e1]
    border border-[rgba(255,255,255,0.06)]
    hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.1)] hover:text-[#f0f4f8]
    rounded-[10px]
  `,
  danger: `
    border border-[rgba(248,113,113,0.3)] text-[#f87171]
    hover:bg-[rgba(248,113,113,0.08)] hover:border-[rgba(248,113,113,0.5)]
    rounded-[10px]
  `,
};

const sizes = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-[8px]",
  md: "h-9 px-4 text-sm gap-2",
  lg: "h-11 px-6 text-sm gap-2.5",
};

export default function Button({
                                 children,
                                 className = "",
                                 variant = "primary",
                                 size = "md",
                                 ...props
                               }) {
  return (
      <button
          type="button"
          className={`${baseStyles} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`}
          style={{ fontFamily: "'Syne', sans-serif" }}
          {...props}
      >
        {children}
      </button>
  );
}