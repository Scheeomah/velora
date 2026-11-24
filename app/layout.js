import "./globals.css";

export const metadata = {
  title: "VÉLORA | Discover Your Style",
  description:
    "Discover timeless fashion, curated collections and your personal AI shopping stylist at VÉLORA.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
