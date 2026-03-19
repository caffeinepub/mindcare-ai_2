import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSaveUserProfile } from "../hooks/useQueries";

export default function ProfileSetup() {
  const [name, setName] = useState("");
  const { mutateAsync, isPending } = useSaveUserProfile();

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    try {
      await mutateAsync({ name: name.trim() });
    } catch {
      toast.error("Could not save profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div
        data-ocid="profile.dialog"
        className="bg-card rounded-2xl shadow-card max-w-md w-full p-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <Heart className="w-8 h-8 text-primary fill-primary/30" />
        </div>
        <h1 className="text-2xl font-bold mb-2">What's your name?</h1>
        <p className="text-muted-foreground mb-6">
          We'll use this to personalize your experience.
        </p>
        <Input
          data-ocid="profile.name.input"
          placeholder="Your first name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
          }}
          className="mb-4"
        />
        <Button
          data-ocid="profile.save.primary_button"
          onClick={handleSave}
          disabled={isPending}
          className="w-full bg-teal text-white hover:bg-teal/90"
        >
          {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          Get Started
        </Button>
      </div>
    </div>
  );
}
