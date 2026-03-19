import { useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface HeaderProps {
  username: string;
  onNavClick: (section: string) => void;
}

export default function Header({ username, onNavClick }: HeaderProps) {
  const { clear } = useInternetIdentity();
  const qc = useQueryClient();

  const handleLogout = async () => {
    await clear();
    qc.clear();
  };

  const navLinks = [
    { label: "Dashboard", id: "dashboard" },
    { label: "My Journal", id: "journal" },
    { label: "Support Chat", id: "chat" },
    { label: "Insights", id: "insights" },
    { label: "Resources", id: "resources" },
  ];

  const initials = username
    ? username
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "A";

  return (
    <header
      className="sticky top-0 z-50 w-full bg-sage shadow-sm"
      data-ocid="header.section"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-4">
          <div className="bg-white/20 rounded-full p-1.5">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            MindCare AI
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-5 flex-1">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.id}
              data-ocid={`nav.${link.id}.link`}
              onClick={() => onNavClick(link.id)}
              className="text-white/90 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Account pill */}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={handleLogout}
            data-ocid="nav.logout.button"
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors rounded-full px-3 py-1.5"
          >
            <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{initials}</span>
            </div>
            <span className="text-white text-sm font-medium hidden sm:inline">
              {username}'s Account
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
