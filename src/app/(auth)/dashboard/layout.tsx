export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={`dashboardLayout`}>
        <div className="menu">Menu</div>
        <div className="content">{children}</div>
      </div>
  ); 
}
