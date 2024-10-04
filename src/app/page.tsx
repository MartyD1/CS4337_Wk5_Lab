"use client";
import Image from "next/image";
import TaskManager from './components/taskmanager';
import Login from './components/login';
import { useState } from 'react';



export default function Home() {
 
  const [isLoggedIn, setIsLoggedIn] = useState(true); // we can update this Flag once roger has oauth set up

  return (
    <div>
      {isLoggedIn ? ( 
        <TaskManager />
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
}