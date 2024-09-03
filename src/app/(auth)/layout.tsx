import { UserProfile } from "@clerk/clerk-react";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
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
            AI Gimmik
          </Link>
          <div className="user">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main className="flex-1 overflow-hidden h-full">{children}</main>
      </div>
  );
}
