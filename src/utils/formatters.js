export function formatCurrency(value) {
  return "$" + Number(value).toLocaleString("en-US");
}

export function formatPercent(value) {
  return value.toFixed(1) + "%";
}

export function formatDate(dateStr) {
  if (!dateStr || dateStr === "—") return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
