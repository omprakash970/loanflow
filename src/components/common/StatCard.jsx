import Card from "./Card";

export default function StatCard({ title, value, meta, accent = "#2dd4bf", icon }) {
    return (
        <Card
            glow
            className="group relative space-y-2 overflow-hidden"
        >
            {/* Subtle top accent line */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[14px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
            />

            {/* Icon + Title row */}
            <div className="flex items-center justify-between">
                <p
                    className="text-[10.5px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200"
                    style={{ color: "rgba(100,116,139,1)", fontFamily: "'DM Sans', sans-serif" }}
                >
                    {title}
                </p>
                {icon && (
                    <span
                        className="text-base opacity-50 group-hover:opacity-80 transition-opacity duration-200"
                        style={{ color: accent }}
                    >
            {icon}
          </span>
                )}
            </div>

            {/* Value */}
            <p
                className="text-[28px] font-bold leading-none tracking-tight text-[#f0f4f8] transition-all duration-200"
                style={{ fontFamily: "'Syne', sans-serif" }}
            >
                {value}
            </p>

            {/* Meta */}
            <p
                className="text-[12px] font-light leading-relaxed transition-colors duration-200"
                style={{ color: "rgba(71,90,112,1)", fontFamily: "'DM Sans', sans-serif" }}
            >
                {meta}
            </p>
        </Card>
    );
}