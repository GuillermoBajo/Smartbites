"use client";

import '@/ui/assets/css/main.css';
import React from 'react';
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <ul className="actions">
      <li>
        <a href="/login" className="button next" onClick={(e) => {
          e.preventDefault(); // Prevent the default link behavior
          signIn('google', { callbackUrl: '/dashboard' }); // Call the signIn function from NextAuth
        }}>
          Get Started
        </a>
      </li>
    </ul>
  );
}