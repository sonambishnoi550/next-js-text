
import React from 'react'
import MyForm from '@/components/MyForm'
import ButtonQuestions from '@/components/ButtonQuestions'
import MyLoginForm from '@/components/MyLoginForm'
import Dashboard from '@/components/Dashboard'


const page = () => {
  return (
    <div>
      {/* <MyForm />
      <ButtonQuestions /> */}
      <MyLoginForm />
      <Dashboard/>
    </div>
  )
}

export default page