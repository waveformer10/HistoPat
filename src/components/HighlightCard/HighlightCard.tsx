import { HighlightCardProps } from "./HighlightCard.types";


export function HighlightCard(props: HighlightCardProps){
  return (
    <div className="bg-[#26406C] place-items-center place-content-center w-fit !p-6 rounded">
      <p className="!p-2">{props.title}</p>
      <h1 className={"text-4xl !p-2 hover:transform hover:scale-125"}>{formatThousands(props.value)}</h1>
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