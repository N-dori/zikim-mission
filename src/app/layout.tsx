import type { Metadata } from "next";
import { Alef } from "next/font/google";
import "../app/assets/scss/main.scss";
import NavBar from "./cmps/NavBar";
import { AuthProvider } from "./Providers";

const alef = Alef({ subsets:['hebrew'],  weight: ['400'] });

export const metadata: Metadata = {
  title: "ידיעת הארץ -זיקים בארי",
  description: "התמצאות במרחב מאמרים חידון חטיבה 179",
  icons:{
    icon:['/favicon.ico?v=4'],
    apple:['/apple-touch-icon.png?v=4'],
    shortcut:['/apple-touch-icon.png']
  },
  manifest:'/site.webmanifest'
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={alef.className} lang="en">
      
      <body className={`main-layout`} >
       <AuthProvider>
          <NavBar/>
        {children}
        </AuthProvider> 
        
        </body>
    </html>
  );
}
