import { Skeleton } from "@/components/ui/skeleton";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetRecentMoodEntries } from "../hooks/useQueries";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function WeeklyProgress() {
  const { data: entries, isLoading } = useGetRecentMoodEntries();

  const chartData = (() => {
    const today = new Date();
    const days: { day: string; score: number | null }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const label = DAY_LABELS[d.getDay()];
      days.push({ day: label, score: null });
    }
    if (entries) {
      for (const entry of entries) {
        const date = new Date(Number(entry.timestamp) / 1_000_000);
        const daysAgo = Math.floor(
          (today.getTime() - date.getTime()) / 86400000,
        );
        if (daysAgo >= 0 && daysAgo < 7) {
          const idx = 6 - daysAgo;
          days[idx].score = entry.moodScore;
        }
      }
    }
    return days;
  })();

  const displayData = chartData.every((d) => d.score === null)
    ? chartData.map((d, i) => ({ ...d, score: [6, 7, 5, 8, 7, 9, 8][i] ?? 6 }))
    : chartData;

  if (isLoading) {
    return (
      <Skeleton className="h-48 w-full" data-ocid="insights.loading_state" />
    );
  }

  return (
    <div data-ocid="insights.chart_point">
      <p className="text-xs text-muted-foreground mb-3">
        Mood score (1–10) over the last 7 days
      </p>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={displayData}
          margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#6b7280" }} />
          <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: "#6b7280" }} />
          <Tooltip
            contentStyle={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              fontSize: 13,
            }}
            formatter={(val: number) => [val, "Mood"]}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="oklch(0.59 0.065 220)"
            strokeWidth={2.5}
            dot={{ fill: "oklch(0.62 0.06 160)", r: 4 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
