import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSaveConsent } from "../hooks/useQueries";

export default function ConsentScreen() {
  const { mutateAsync, isPending } = useSaveConsent();

  const handleConsent = async () => {
    try {
      await mutateAsync(true);
    } catch {
      toast.error("Could not save consent. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div
        data-ocid="consent.dialog"
        className="bg-card rounded-2xl shadow-card max-w-md w-full p-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <Heart className="w-8 h-8 text-primary fill-primary/30" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome to MindCare AI</h1>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Before we begin, we need your consent. By continuing, you agree to the
          collection and processing of your mood and chat data to provide
          personalized mental health support. Your data is stored securely and
          never shared with third parties.
        </p>
        <div className="bg-muted/40 rounded-xl p-4 text-sm text-left mb-6 space-y-2">
          <p>✅ Mood tracking & journaling</p>
          <p>✅ Supportive chat responses</p>
          <p>✅ Weekly progress analytics</p>
          <p>✅ All data encrypted on-chain</p>
        </div>
        <Button
          data-ocid="consent.confirm_button"
          onClick={handleConsent}
          disabled={isPending}
          className="w-full bg-teal text-white hover:bg-teal/90"
        >
          {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          I Agree & Continue
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
          This app does not provide medical diagnosis. Always consult a
          professional for mental health concerns.
        </p>
      </div>
    </div>
  );
}
