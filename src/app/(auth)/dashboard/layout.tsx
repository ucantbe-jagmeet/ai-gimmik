'use client'
import ListChat from "@/components/ListChat";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const { userId, isLoaded } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if(isLoaded && !userId){
            router.push('/signIn')
        }
    }, [isLoaded, userId, router]);

    if(!isLoaded) return "loading"

    return (
      <div className="dashboardLayout grid grid-flow-col gap-10 pt-5 grid-cols-5 h-full">
        <div className="menu col-span-1 overflow-auto">
          <ListChat />
        </div>
        <div className="content col-span-4 bg-[#12101b] h-full">{children}</div>
      </div>
    ); 
}

