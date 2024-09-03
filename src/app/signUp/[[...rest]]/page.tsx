import { SignUp } from '@clerk/nextjs';
import React from 'react'

const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#140e2d]">
      <SignUp
        path="/signUp"
        signInUrl="/signIn"
        forceRedirectUrl={"/dashboard"}
      />
    </div>
  );
}

export default Page