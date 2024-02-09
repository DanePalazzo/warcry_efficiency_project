import { React, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home({user}) {
  let navigate = useNavigate()



  return (
    <div className='flex flex-col justify-center gap-2'>
      {user ? <h2 className="text-3xl text-green-100 font-semibold">Welcome, {user.name}.</h2> : <h2 className="text-3xl text-green-100 font-semibold">Welcome to LIVE CODE</h2>}
      <h2 className="text-9xl text-green-100 font-black">LIVE CODE</h2>
      <div className="divider"></div>
      <div className="justify-self-center">
        <div className="flex flex-col h-96">
          <p className="text-3xl font-semibold">Classes where you can code and communicate in real time!</p>
        </div>
        <div className="divider"></div>
        <div classname="w-1/2">
          <p className="text-2xl font-semibold">Become a part of a passionat community of coders at all levels.</p>
          <p className="text-xl font-medium">Join sessions with live instruction, live code, and live communication and see changes to the code as they happen!</p>
          <button className='btn btn-outline btn-success' onClick={(e) => navigate("/signup")}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}
