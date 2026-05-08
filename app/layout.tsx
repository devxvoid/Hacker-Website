import "./globals.css";

export const metadata = {
  title: "Mr. Robot AI Workspace",
  description: "Cyberpunk multi-agent AI workspace for builders, Android developers, and automation systems."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}