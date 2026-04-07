import logo from "@/assets/pepsico-resized.svg";

const links = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Contact Us", href: "#" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <img src={logo} alt="Logo" className="h-12 w-auto sm:h-16" />
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-6 border-t pt-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PepsiCo, Inc. All rights reserved. PepsiCo
            Confidential — For internal use only. Unauthorized distribution is
            prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
}
