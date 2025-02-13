import type { IssuesShortStats } from "@/types";

type IssueType = keyof IssuesShortStats;

export const issueTypeMap: Record<IssueType, { label: string; image: string; color: string }> = {
    total: { label: "Всего задач", image: new URL("@/assets/img/issues/total.svg", import.meta.url).href, color: "#0E8AD7" },
    in_work: { label: "В работе", image: new URL("@/assets/img/issues/in_work.svg", import.meta.url).href, color: "#FFAD5B" },
    accepted: { label: "Проверено", image: new URL("@/assets/img/issues/accepted.svg", import.meta.url).href, color: "#28a745" },
    to_do: { label: "К выполнению", image: new URL("@/assets/img/issues/to_do.svg", import.meta.url).href, color: "#ffc107" },
    errors: { label: "Ошибки", image: new URL("@/assets/img/issues/errors.svg", import.meta.url).href, color: "#dc3545" }
};