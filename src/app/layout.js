import localFont from "next/font/local";
import "./globals.css";

import { Bebas_Neue, Orbitron, Inter, Roboto_Condensed } from 'next/font/google'

export const metadata = {
  title: "Great gaming",
  description: "Dirty Games",
};

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas-neue'
})

const orbitron = Orbitron({
  weight: ['500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron'
  
})

const inter = Inter({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const robotoCondensed = Roboto_Condensed({
  weight: ['300', '400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-condensed'
})

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`
        ${bebasNeue.variable} 
        ${orbitron.variable} 
        ${inter.variable} 
        ${robotoCondensed.variable}
      `}
    >
    
    
    
    <head>
        {/* Google AdSense Script */}
        <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ></script>
    </head>
      <body>
        {children}
      </body>
    </html>
  )
}