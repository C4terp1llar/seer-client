export function formatShortName(fullName?: string): string {
    if (!fullName) return "";

    const parts = fullName.trim().split(" ");
    const [lastName, firstName, patronymic] = parts;

    return [
        lastName || "",
        firstName?.[0] ? firstName[0] + "." : "",
        patronymic?.[0] ? patronymic[0] + "." : ""
    ].join(" ").trim();
}