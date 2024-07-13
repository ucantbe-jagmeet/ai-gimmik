import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="authLayout py-4 px-16 h-screen flex flex-col">
        <header className="flex items-center justify-between">
          <Link href={"/"} className="font-mono ">
            NOT GPT
          </Link>
          <div className="user">User</div>
        </header>
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
  );
}
