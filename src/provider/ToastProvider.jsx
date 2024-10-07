"use client";

import { Toaster } from 'react-hot-toast';
import "../app/globals.css";

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
