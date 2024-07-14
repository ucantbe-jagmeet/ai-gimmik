import { SignUp } from '@clerk/nextjs';
import React from 'react'

const Page = () => {
  return (
    <div>
      <SignUp path="/signUp" />
    </div>
  );
}

export default Page