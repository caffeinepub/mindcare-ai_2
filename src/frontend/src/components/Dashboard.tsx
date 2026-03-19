import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart2,
  BookHeart,
  Leaf,
  Library,
  MessageCircleHeart,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import Header from "./Header";
import JournalView from "./JournalView";
import MoodCheckIn from "./MoodCheckIn";
import SelfHelpSuggestions from "./SelfHelpSuggestions";
import SupportChat from "./SupportChat";
import WeeklyProgress from "./WeeklyProgress";

interface DashboardProps {
  username: string;
}

export default function Dashboard({ username }: DashboardProps) {
  const sectionRefs = {
    dashboard: useRef<HTMLDivElement>(null),
    journal: useRef<HTMLDivElement>(null),
    chat: useRef<HTMLDivElement>(null),
    insights: useRef<HTMLDivElement>(null),
    resources: useRef<HTMLDivElement>(null),
  };

  const scrollTo = (id: string) => {
    const ref = sectionRefs[id as keyof typeof sectionRefs];
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header username={username} onNavClick={scrollTo} />

      <main className="flex-1">
        {/* Hero */}
        <section
          ref={sectionRefs.dashboard}
          data-ocid="dashboard.section"
          className="max-w-7xl mx-auto px-6 pt-10 pb-6"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold">
                {greeting}, {username}.
              </h1>
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <p className="text-lg text-muted-foreground">
              Let's check in with your well-being today.
            </p>
          </motion.div>
        </section>

        {/* Row 1 */}
        <section className="max-w-7xl mx-auto px-6 pb-6 grid grid-cols-1 lg:grid-cols-5 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="lg:col-span-3"
          >
            <Card className="shadow-card h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookHeart className="w-5 h-5 text-primary" />
                  Mood Check-In
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MoodCheckIn />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="lg:col-span-2"
            ref={sectionRefs.chat}
          >
            <Card className="shadow-card h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageCircleHeart className="w-5 h-5 text-primary" />
                  Your Support Buddy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SupportChat />
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Row 2 */}
        <section
          ref={sectionRefs.insights}
          className="max-w-7xl mx-auto px-6 pb-6 grid grid-cols-1 lg:grid-cols-5 gap-5"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="lg:col-span-3"
          >
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart2 className="w-5 h-5 text-primary" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <WeeklyProgress />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Self-Help Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <SelfHelpSuggestions />
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Journal */}
        <section
          ref={sectionRefs.journal}
          className="max-w-7xl mx-auto px-6 pb-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookHeart className="w-5 h-5 text-primary" />
                  My Journal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <JournalView />
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Resources / Community */}
        <section
          ref={sectionRefs.resources}
          className="max-w-7xl mx-auto px-6 pb-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div data-ocid="resources.section">
                    <div className="flex items-center gap-2 mb-3">
                      <Library className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-lg">Resources</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>📘 Understanding Anxiety — A Beginner's Guide</li>
                      <li>🌿 Mindfulness & Meditation for Beginners</li>
                      <li>💤 The Science of Healthy Sleep Habits</li>
                      <li>🏃 Exercise & Its Impact on Mental Health</li>
                      <li>🤝 Finding the Right Therapist for You</li>
                    </ul>
                    <Button
                      data-ocid="resources.explore.primary_button"
                      className="mt-4 bg-teal text-white hover:bg-teal/90"
                      size="sm"
                    >
                      Explore All Resources
                    </Button>
                  </div>

                  <div data-ocid="community.section">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-lg">Community Hub</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>💬 Join the Daily Check-In Thread</li>
                      <li>🌸 Share Your Gratitude Moments</li>
                      <li>📅 Upcoming: Online Mindfulness Workshop</li>
                      <li>🏅 Weekly Wellness Challenge — Join Now</li>
                      <li>📖 Member Stories: Real Journeys of Healing</li>
                    </ul>
                    <Button
                      data-ocid="community.join.primary_button"
                      className="mt-4 bg-teal text-white hover:bg-teal/90"
                      size="sm"
                    >
                      Join Community
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-sage-dark py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-white">
              <BookHeart className="w-5 h-5" />
              <span className="font-bold">MindCare AI</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-4 text-white/70 text-sm">
              <span className="hover:text-white transition-colors cursor-pointer">
                About
              </span>
              <span className="hover:text-white transition-colors cursor-pointer">
                FAQ
              </span>
              <span className="hover:text-white transition-colors cursor-pointer">
                Privacy
              </span>
              <span className="hover:text-white transition-colors cursor-pointer">
                Contact
              </span>
              <span className="hover:text-white transition-colors cursor-pointer">
                Terms
              </span>
            </nav>
          </div>
          <div className="mt-6 pt-6 border-t border-white/20 text-center text-white/50 text-sm">
            <p>
              © {new Date().getFullYear()}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                className="underline hover:text-white/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
