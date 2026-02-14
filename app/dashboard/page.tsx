import { auth } from '@/auth'
import JobsPage from '@/components/JobPage'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const session = await auth()
  
    if(!session){
      redirect('/form')
    }
  return (
    <div><JobsPage /></div>
  )
}

export default page