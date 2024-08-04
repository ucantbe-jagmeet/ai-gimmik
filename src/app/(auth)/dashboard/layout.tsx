'use client'
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
        <div className={`dashboardLayout`}>
            <div className="menu">Menu</div>
            <div className="content">{children}</div>
        </div>
    ); 
}
