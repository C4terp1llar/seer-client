import type { IssuesShortStats } from "@/types";

type IssueType = keyof IssuesShortStats;

export const issueTypeMap: Record<IssueType, { label: string; image: string; color: string }> = {
    total: { label: "Всего задач", image: new URL("@/assets/img/issues/total.png", import.meta.url).href, color: "#0E8AD7" },
    in_work: { label: "В работе", image: new URL("@/assets/img/issues/in_work.png", import.meta.url).href, color: "#FFAD5B" },
    accepted: { label: "Проверено", image: new URL("@/assets/img/issues/accepted.png", import.meta.url).href, color: "#28a745" },
    to_do: { label: "К выполнению", image: new URL("@/assets/img/issues/to_do.png", import.meta.url).href, color: "#ffc107" },
    errors: { label: "Ошибки", image: new URL("@/assets/img/issues/errors.png", import.meta.url).href, color: "#dc3545" }
};