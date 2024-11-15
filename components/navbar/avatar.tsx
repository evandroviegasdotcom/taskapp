'use client'

import React from 'react'
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

export default function Profile() {
    const { data: session, isPending } = authClient.useSession()
    if(isPending || !session?.user) return "Loading..."
    else return (
    <Image src={`${session.user.image}`} width={32} height={32} className="mr-2 rounded-full" />
  )
}
