export const metadata = {
  title: "Wang Jingpeng | Software Developer",
  description: "Welcome to my portfolio! Learn more about my skills, experience, and projects.",
  metadataBase: new URL("https://www.wangjingpeng.me"),
  openGraph: {
    title: "Wang Jingpeng | Software Developer",
    description: "Welcome to my portfolio! Learn more about my skills, experience, and projects.",
    images: ["/avatar.jpg"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
