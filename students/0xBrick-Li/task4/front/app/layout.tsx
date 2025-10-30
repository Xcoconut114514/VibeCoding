import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ERC721 NFT Minter",
  description: "Mint and manage your ERC721 NFTs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
