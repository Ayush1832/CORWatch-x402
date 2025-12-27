import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/sessions", label: "Sessions" },
  { href: "/validate", label: "Validate" },
  { href: "/pricing", label: "Pricing" },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();

  const handleConnect = () => {
    if (isConnected) {
      open();
    } else {
      open({ view: "Connect" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Activity className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
          </div>
          <span className="font-mono font-bold text-lg">CORWatch</span>
          <Badge variant="premium" className="ml-1">
            x402
          </Badge>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleConnect}>
            {isConnected && address
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : "Connect Wallet"}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background p-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={handleConnect}
            >
              {isConnected && address
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "Connect Wallet"}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
