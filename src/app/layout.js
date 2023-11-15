import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '../lib/AntdRegistry';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Frontend React Next',
  description: 'Criado por Guilherme Alvarenga',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>  
      </body>
    </html>
  )
}
