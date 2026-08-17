/**
 * Реальные пожертвования из выгрузки CloudPayments — 10 последних успешных транзакций.
 *
 * Отображаются только дата и сумма — без имени, email и любых персональных данных
 * (152-ФЗ о защите персональных данных).
 */

export interface StaticDonation {
  /** Дата транзакции в формате DD.MM.YYYY */
  date: string;
  /** Сумма в рублях */
  amount: number;
  /** "once" | "monthly" */
  type: "once" | "monthly";
}

export const STATIC_DONATIONS: StaticDonation[] = [
  { date: "14.08.2026", amount: 600,  type: "once"    },
  { date: "14.08.2026", amount: 500,  type: "monthly" },
  { date: "13.08.2026", amount: 10,   type: "monthly" },
  { date: "07.08.2026", amount: 300,  type: "once"    },
  { date: "06.08.2026", amount: 1000, type: "monthly" },
  { date: "05.08.2026", amount: 300,  type: "monthly" },
  { date: "04.08.2026", amount: 300,  type: "monthly" },
  { date: "03.08.2026", amount: 222,  type: "monthly" },
  { date: "03.08.2026", amount: 700,  type: "once"    },
  { date: "01.08.2026", amount: 300,  type: "monthly" },
];

const MONTHS_RU = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

/** "14.08.2026" → "14 августа 2026" */
export function formatDateRu(ddmmyyyy: string): string {
  const [d, m, y] = ddmmyyyy.split(".");
  const month = MONTHS_RU[parseInt(m, 10) - 1] ?? "";
  return `${parseInt(d, 10)} ${month} ${y}`;
}

/** Date object → "14 августа 2026" */
export function formatDateFromDate(date: Date): string {
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
