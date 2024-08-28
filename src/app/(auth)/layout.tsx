import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
          <>
              <div className="authLayout">
                <header>
                  <Link href={"/"}>NOT GPT</Link>
                </header>
              </div>
              <main>{children}</main>
          </>
  );
}
