import { HighlightCardProps } from "./HighlightCard.types";


export function HighlightCard(props: HighlightCardProps) {
  return (
    <div className="h-full w-full bg-[#26406C] border rounded-xl shadow-sm p-6 flex flex-col justify-center items-center transform transition-all duration-300 hover:scale-102 ">
      <h3 className="text-white text-2x1 text-center font-bold">{props.title}</h3>
      <span className="text-3xl font-bold mt-2">{props.value}</span>
    </div>
  )
}

function formatThousands(value: number | string, opts?: {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}): string {
  const n = typeof value === "string" ? Number(value.replace(",", ".")) : value;
  if (!isFinite(n)) return String(value);
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: opts?.minimumFractionDigits,
    maximumFractionDigits: opts?.maximumFractionDigits,
  }).format(n);
}