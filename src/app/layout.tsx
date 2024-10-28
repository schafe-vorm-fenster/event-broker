import type { Metadata } from "next";
import "swagger-ui-react/swagger-ui.css";

export const metadata: Metadata = {
  title: "event-broker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
