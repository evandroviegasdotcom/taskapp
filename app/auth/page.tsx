'use client'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import React from 'react'
import { FaGoogle } from "react-icons/fa"
export default function page() {

    const signin= async() => {
        await authClient.signIn.social({
            provider: "google"
        })
    }
  return (
    <div className='h-screen w-full flex justify-center items-center'>
        <Button className='flex items-center gap-1.5' onClick={signin}>
        <FaGoogle />
        <span>Sign in with Google</span>
        </Button>
    </div>
  )
}
