import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
  return (
    <div>
      <SignIn path="/signIn"/>I
    </div>
  )
}

export default Page