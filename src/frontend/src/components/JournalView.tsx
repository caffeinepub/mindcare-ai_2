import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllMoodEntries } from "../hooks/useQueries";

const EMOJI_MAP: Record<string, string> = {
  calm: "😌",
  happy: "😊",
  anxious: "😰",
  neutral: "😐",
  sad: "😢",
  stressed: "😤",
  angry: "😠",
};

export default function JournalView() {
  const { data: entries, isLoading } = useGetAllMoodEntries();

  if (isLoading)
    return (
      <Skeleton className="h-40 w-full" data-ocid="journal.loading_state" />
    );

  const sorted = [...(entries ?? [])].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp),
  );

  if (sorted.length === 0) {
    return (
      <div
        data-ocid="journal.empty_state"
        className="text-center text-muted-foreground py-10"
      >
        <p className="text-4xl mb-3">📓</p>
        <p className="font-medium">No mood entries yet.</p>
        <p className="text-sm">
          Start your daily check-in to see your journal here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3" data-ocid="journal.list">
      {sorted.slice(0, 30).map((entry, i) => {
        const date = new Date(Number(entry.timestamp) / 1_000_000);
        const emoji = EMOJI_MAP[entry.emotionTags[0]] ?? "💭";
        const key = `${entry.timestamp}-${i}`;
        return (
          <div
            key={key}
            data-ocid={`journal.item.${i + 1}`}
            className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
          >
            <span className="text-2xl">{emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm">
                  Mood Score: {entry.moodScore}/10
                </span>
                {entry.emotionTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="capitalize text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
                <span className="text-xs text-muted-foreground ml-auto">
                  {date.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              {entry.notes && (
                <p className="text-sm text-muted-foreground mt-1 truncate">
                  {entry.notes}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
