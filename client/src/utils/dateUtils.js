import dayjs from "dayjs";

export const normalizeResumeDate = (dateStr) => {
  if (!dateStr) return null;

  const lower = dateStr.toLowerCase();

  if (lower.includes("present") || lower.includes("current")) {
    return new Date();
  }

  const parsed = dayjs(dateStr, ["MMM YYYY", "MMMM YYYY", "YYYY"], true);

  return parsed.isValid() ? parsed.toDate() : null;
};
