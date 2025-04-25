"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Wallet,
  Dices,
  Coins,
  Share2,
  Bot,
  Settings,
  Search,
  MessageSquare,
  Clock,
  Bookmark,
  Plus,
  BarChart2,
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  hasSubItems?: boolean;
  isActive?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const NavItem = ({
  icon,
  label,
  href,
  hasSubItems = false,
  isActive = false,
  isExpanded = false,
  onToggle,
}: NavItemProps) => {
  const router = useRouter();

  // Handle click on the main part of the nav item
  const handleMainClick = (e: React.MouseEvent) => {
    if (href) {
      router.push(href);
    }
    // If it has sub-items, also toggle the expansion
    if (hasSubItems && onToggle) {
      onToggle();
    }
  };

  // Handle click on the dropdown icon
  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 transition-all cursor-pointer border-b-2 border-black ${
        isActive
          ? "bg-primary text-primary-foreground font-bold"
          : "hover:bg-secondary hover:text-black text-foreground font-medium"
      }`}
    >
      <div className="flex items-center flex-1" onClick={handleMainClick}>
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
      </div>
      {hasSubItems && (
        <span
          className="p-1 rounded-full hover:bg-white/20"
          onClick={handleToggleClick}
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
      )}
    </div>
  );
};

interface SubNavItemProps {
  label: string;
  href: string;
  isActive?: boolean;
}

const SubNavItem = ({ label, href, isActive = false }: SubNavItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center pl-11 pr-4 py-2 transition-all ${
        isActive
          ? "bg-accent text-accent-foreground font-bold"
          : "hover:bg-muted hover:text-black text-foreground"
      }`}
    >
      {label}
    </Link>
  );
};

interface ChatHistoryItemProps {
  title: string;
  date: string;
  href: string;
}

const ChatHistoryItem = ({ title, date, href }: ChatHistoryItemProps) => {
  return (
    <Link
      href={href}
      className="flex flex-col gap-1 pl-11 pr-4 py-2 hover:bg-muted transition-all"
    >
      <span className="text-sm font-medium truncate">{title}</span>
      <span className="text-xs text-muted-foreground flex items-center gap-1">
        <Clock size={12} />
        {date}
      </span>
    </Link>
  );
};

export function SiteLeftbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "dashboard",
  ]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const savedAuth = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(savedAuth === "true");
    };

    // Check on initial load
    checkAuth();

    // Listen for storage changes (for cross-tab synchronization)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Determine active section and expanded sections based on current path
  useEffect(() => {
    if (pathname === "/" || pathname.includes("/dashboard")) {
      setActiveSection("dashboard");
      if (!expandedSections.includes("dashboard")) {
        setExpandedSections((prev) => [...prev, "dashboard"]);
      }
    } else if (
      pathname.includes("/chatbot") ||
      pathname.includes("/hedge-bot")
    ) {
      setActiveSection("hedge-bot");
      if (!expandedSections.includes("hedge-bot")) {
        setExpandedSections((prev) => [...prev, "hedge-bot"]);
      }
    } else if (pathname.includes("/coins")) {
      setActiveSection("coins");
      if (!expandedSections.includes("coins")) {
        setExpandedSections((prev) => [...prev, "coins"]);
      }
    } else if (pathname.includes("/settings")) {
      setActiveSection("settings");
    } else if (pathname.includes("/watchlist")) {
      setActiveSection("watchlist");
    }
  }, [pathname, expandedSections]);

  const toggleSection = (section: string) => {
    setActiveSection(section);

    // Toggle the expanded state
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter((s) => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  // Mock chat history data
  const chatHistory = [
    { title: "Meme coin analysis", date: "2h ago", href: "/chatbot" },
    {
      title: "Market trends research",
      date: "Yesterday",
      href: "/chatbot",
    },
    {
      title: "Portfolio optimization",
      date: "3 days ago",
      href: "/chatbot",
    },
    { title: "Risk assessment", date: "1 week ago", href: "/chatbot" },
    {
      title: "Token launch strategy",
      date: "2 weeks ago",
      href: "/chatbot",
    },
  ];

  // If not authenticated, don't render the sidebar
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-full overflow-y-auto bg-background py-0">
      <nav className="space-y-0 pb-20">
        {/* Dashboard Section */}
        <NavItem
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          href="/dashboard"
          hasSubItems={true}
          isActive={activeSection === "dashboard"}
          isExpanded={expandedSections.includes("dashboard")}
          onToggle={() => toggleSection("dashboard")}
        />

        <AnimatePresence>
          {expandedSections.includes("dashboard") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="overflow-hidden bg-secondary/50"
            >
              <div className="py-1 border-b-2 border-black">
                <SubNavItem
                  label="My Portfolio"
                  href="/dashboard/portfolio"
                  isActive={pathname === "/dashboard/portfolio"}
                />
                <SubNavItem
                  label="My Bets"
                  href="/dashboard/my-bets"
                  isActive={pathname === "/dashboard/my-bets"}
                />
                <SubNavItem
                  label="My Tokens"
                  href="/dashboard/my-tokens"
                  isActive={pathname === "/dashboard/my-tokens"}
                />
                <SubNavItem
                  label="Quick Swap"
                  href="/dashboard/quick-swap"
                  isActive={pathname === "/dashboard/quick-swap"}
                />
                <SubNavItem
                  label="Shill Manager"
                  href="/dashboard/shill-manager"
                  isActive={pathname === "/dashboard/shill-manager"}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wallet Section */}
        <NavItem
          icon={<Wallet size={20} />}
          label="My Wallet"
          href="/wallet"
          isActive={activeSection === "wallet"}
        />

        {/* Bets Section */}
        <NavItem
          icon={<Dices size={20} />}
          label="Bets"
          hasSubItems={true}
          isActive={activeSection === "bets"}
          isExpanded={expandedSections.includes("bets")}
          onToggle={() => toggleSection("bets")}
        />

        <AnimatePresence>
          {expandedSections.includes("bets") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="overflow-hidden bg-secondary/50"
            >
              <div className="py-1 border-b-2 border-black">
                <SubNavItem
                  label="Active Bets"
                  href="/bets/active"
                  isActive={pathname === "/bets/active"}
                />
                <SubNavItem
                  label="Create Bet"
                  href="/bets/create"
                  isActive={pathname === "/bets/create"}
                />
                <SubNavItem
                  label="History"
                  href="/bets/history"
                  isActive={pathname === "/bets/history"}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Coins Section */}
        <NavItem
          icon={<Coins size={20} />}
          label="Coins"
          hasSubItems={true}
          isActive={activeSection === "coins"}
          isExpanded={expandedSections.includes("coins")}
          onToggle={() => toggleSection("coins")}
        />

        <AnimatePresence>
          {expandedSections.includes("coins") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="overflow-hidden bg-secondary/50"
            >
              <div className="py-1 border-b-2 border-black">
                <SubNavItem
                  label="Top Coins"
                  href="/coins"
                  isActive={pathname === "/coins"}
                />
                <SubNavItem
                  label="Trending"
                  href="/coins/trending"
                  isActive={pathname === "/coins/trending"}
                />
                <SubNavItem
                  label="Recent Launches"
                  href="/coins/recent"
                  isActive={pathname === "/coins/recent"}
                />
                <SubNavItem
                  label="My Coins"
                  href="/coins/my-coins"
                  isActive={pathname === "/coins/my-coins"}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Metrics Section */}
        <NavItem
          icon={<BarChart2 size={20} />}
          label="Metrics"
          href="/metrics"
          isActive={activeSection === "metrics"}
        />

        {/* Communities Section */}
        <NavItem
          icon={<Share2 size={20} />}
          label="Communities"
          href="/communities"
          isActive={activeSection === "communities"}
        />

        {/* Hedge Bot Section */}
        <NavItem
          icon={<Bot size={20} />}
          label="Hedge Bot"
          hasSubItems={true}
          isActive={activeSection === "hedge-bot"}
          isExpanded={expandedSections.includes("hedge-bot")}
          onToggle={() => toggleSection("hedge-bot")}
        />

        <AnimatePresence>
          {expandedSections.includes("hedge-bot") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="overflow-hidden bg-secondary/50"
            >
              <div className="py-1 border-b-2 border-black">
                <SubNavItem
                  label="Chat"
                  href="/chatbot"
                  isActive={pathname === "/chatbot"}
                />
                <div className="px-4 py-2">
                  <p className="font-bold mb-2 text-sm">Recent Chats</p>
                  <div className="space-y-1">
                    {chatHistory.map((chat, index) => (
                      <ChatHistoryItem key={index} {...chat} />
                    ))}
                  </div>
                </div>
                <SubNavItem
                  label="Start New Chat"
                  href="/chatbot"
                  isActive={false}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Watchlist */}
        <NavItem
          icon={<Bookmark size={20} />}
          label="Watchlist"
          href="/watchlist"
          isActive={activeSection === "watchlist"}
        />

        {/* Settings */}
        <NavItem
          icon={<Settings size={20} />}
          label="Settings"
          href="/settings"
          isActive={activeSection === "settings"}
        />
      </nav>

      {/* Create New button */}
      <div className="absolute bottom-6 left-0 right-0 px-4">
        <Button
          className="w-full flex items-center justify-center gap-2 neo-brutalism bg-blue-500 text-white"
          size="lg"
        >
          <Plus size={18} />
          <span>Create New</span>
        </Button>
      </div>
    </div>
  );
}
