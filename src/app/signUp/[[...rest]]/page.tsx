import { SignUp } from '@clerk/nextjs';
import React from 'react'

const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp path="/signUp" signInUrl="/signIn" />
    </div>
  );
}

export default Page