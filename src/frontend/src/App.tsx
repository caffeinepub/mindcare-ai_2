import { Toaster } from "@/components/ui/sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import ConsentScreen from "./components/ConsentScreen";
import Dashboard from "./components/Dashboard";
import ProfileSetup from "./components/ProfileSetup";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useGetCallerUserProfile, useHasConsented } from "./hooks/useQueries";

function LoginPage() {
  const { login, loginStatus } = useInternetIdentity();
  const isLoggingIn = loginStatus === "logging-in";

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-card rounded-2xl shadow-card max-w-md w-full p-10 text-center"
        data-ocid="login.dialog"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
          <span className="text-4xl">🧠</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">MindCare AI</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Your personal mental wellness companion. Track your mood, chat with a
          supportive AI, and gain insights into your well-being journey.
        </p>
        <div className="bg-muted/40 rounded-xl p-4 text-sm text-left mb-6 space-y-1.5">
          <p>💚 Daily mood check-ins</p>
          <p>💬 Supportive AI chat buddy</p>
          <p>📈 Weekly progress insights</p>
          <p>🧘 Self-help resources</p>
        </div>
        <button
          type="button"
          data-ocid="login.primary_button"
          onClick={login}
          disabled={isLoggingIn}
          className="w-full bg-teal text-white font-medium py-3 rounded-xl hover:bg-teal/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {isLoggingIn ? "Signing in..." : "Sign In to Get Started"}
        </button>
        <p className="text-xs text-muted-foreground mt-4">
          Secured by Internet Identity. No passwords required.
        </p>
      </motion.div>
    </div>
  );
}

function AppContent() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: hasConsented, isLoading: consentLoading } = useHasConsented();
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  if (
    isInitializing ||
    (isAuthenticated && (consentLoading || profileLoading))
  ) {
    return (
      <div
        className="min-h-screen bg-cream flex items-center justify-center"
        data-ocid="app.loading_state"
      >
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-3" />
          <p className="text-muted-foreground">Loading MindCare AI...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <LoginPage />;
  if (!hasConsented) return <ConsentScreen />;

  const showProfileSetup =
    isAuthenticated &&
    !profileLoading &&
    profileFetched &&
    userProfile === null;
  if (showProfileSetup) return <ProfileSetup />;

  const username = userProfile?.name ?? "Friend";

  return <Dashboard username={username} />;
}

export default function App() {
  return (
    <>
      <AppContent />
      <Toaster position="top-right" richColors />
    </>
  );
}
