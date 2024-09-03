import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#140e2d]">
      <SignIn path="/signIn" signUpUrl="/signUp" />
    </div>
  );
}

export default Page