import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import CartSidebar from "@/components/CartSidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "PizzaSlice - Premium Pizza Delivery",
  description: "Order hot, fresh, handcrafted pizzas delivered to your door in 30 minutes or less.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ToastProvider>
          <CartProvider>
            <AuthProvider>
              <Navbar />
              <CartSidebar />
              <main className="min-h-screen">
                {children}
              </main>
            </AuthProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}




// import type { Metadata } from "next";
// import { Poppins, Open_Sans } from "next/font/google";
// import "./globals.css";
// import { AuthProvider } from "@/context/AuthContext";
// import Navbar from "@/components/Navbar";
// import { cn } from "@/lib/utils";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-poppins",
// });

// const openSans = Open_Sans({
//   subsets: ["latin"],
//   variable: "--font-open-sans",
// });

// export const metadata: Metadata = {
//   title: "PizzaSlice - Premium Pizza Delivery",
//   description: "Order fresh, hot pizza online. Fast delivery and premium ingredients.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={cn(
//         openSans.className,
//         poppins.variable,
//         "min-h-screen bg-background text-foreground antialiased"
//       )}>
//         <AuthProvider>
//           <Navbar />
//           <div className="flex flex-col min-h-screen">
//             <main className="flex-1">
//               {children}
//             </main>
//           </div>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }
