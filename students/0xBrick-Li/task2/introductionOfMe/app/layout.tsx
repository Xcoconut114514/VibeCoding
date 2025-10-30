import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "李天宇 - 个人简历",
  description: "李天宇的个人简历 - 计算机科学与技术专业学生，后端开发工程师",
  keywords: ["李天宇", "简历", "后端开发", "Python", "大数据", "分布式系统"],
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
