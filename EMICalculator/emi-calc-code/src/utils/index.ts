export function preciseRound(num: number, point: number = 2) {
  const precision = 10 ** point;
  return Math.round((num + Number.EPSILON) * precision) / precision;
}

export function calculateEMI(
  principal: number,
  roi: number,
  tenure: number
): number {
  // [P x Ix (1+I) ^T]/ [((1+I) ^T)-1)]

  const emi =
    (principal * (roi / 1200) * (1 + roi / 1200) ** tenure) /
    ((1 + roi / 1200) ** tenure - 1);

  return preciseRound(emi);
}

const currencyFormatter = Intl.NumberFormat("en-US", {
  currency: "INR",
  style: "currency",
});
const dateFormatter = Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  day: "2-digit",
});

export const formatCurrency = (n: number) => currencyFormatter.format(n);
export const formatDate = (d: Date, display: boolean = true) =>
  display
    ? dateFormatter.format(d)
    : [
        d.getFullYear(),
        ("0" + (d.getMonth() + 1)).slice(-2),
        ("0" + d.getDate()).slice(-2),
      ].join("-");
