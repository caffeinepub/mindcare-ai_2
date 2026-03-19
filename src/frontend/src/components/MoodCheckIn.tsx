import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddMoodEntry } from "../hooks/useQueries";

const EMOTIONS = [
  { label: "Calm", emoji: "😌", value: "calm", score: 7 },
  { label: "Happy", emoji: "😊", value: "happy", score: 9 },
  { label: "Anxious", emoji: "😰", value: "anxious", score: 4 },
  { label: "Neutral", emoji: "😐", value: "neutral", score: 5 },
  { label: "Sad", emoji: "😢", value: "sad", score: 3 },
];

export default function MoodCheckIn() {
  const [selected, setSelected] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const { mutateAsync, isPending } = useAddMoodEntry();

  const handleSave = async () => {
    if (!selected) {
      toast.error("Please select how you're feeling first.");
      return;
    }
    const emotion = EMOTIONS.find((e) => e.value === selected)!;
    try {
      await mutateAsync({
        moodScore: emotion.score,
        emotionTags: [emotion.value],
        notes: notes.trim() || null,
      });
      toast.success("Mood saved! Keep taking care of yourself. 💚");
      setSelected(null);
      setNotes("");
    } catch {
      toast.error("Could not save mood. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-sm text-muted-foreground mb-3">
          How are you feeling right now?
        </p>
        <fieldset className="flex gap-2 flex-wrap border-0 p-0 m-0">
          <legend className="sr-only">Select your emotion</legend>
          {EMOTIONS.map((e) => (
            <button
              type="button"
              key={e.value}
              data-ocid={`mood.${e.value}.toggle`}
              onClick={() => setSelected(e.value === selected ? null : e.value)}
              aria-pressed={selected === e.value}
              className={`flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl border-2 transition-all ${
                selected === e.value
                  ? "border-sage bg-primary/10 shadow-sm scale-105"
                  : "border-border bg-muted/40 hover:border-sage/50"
              }`}
            >
              <span className="text-2xl">{e.emoji}</span>
              <span className="text-xs font-medium">{e.label}</span>
            </button>
          ))}
        </fieldset>
      </div>

      <div>
        <label
          htmlFor="mood-notes"
          className="text-sm text-muted-foreground mb-1.5 block"
        >
          Notes (optional)
        </label>
        <Textarea
          id="mood-notes"
          data-ocid="mood.notes.textarea"
          placeholder="What's on your mind today?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="resize-none h-20"
        />
      </div>

      <Button
        data-ocid="mood.save.primary_button"
        onClick={handleSave}
        disabled={isPending}
        className="bg-teal text-white hover:bg-teal/90 w-full"
      >
        {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
        {isPending ? "Saving..." : "Save My Mood"}
      </Button>
    </div>
  );
}
