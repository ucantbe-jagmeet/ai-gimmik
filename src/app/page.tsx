'use client'
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href={'/dashboard'}>Go to dashboard</Link>
    </main>
  );
}
