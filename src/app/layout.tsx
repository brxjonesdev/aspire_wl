import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import WishlistContextProvider from './wishlistContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Aspire Wishlist App',
    description: 'A Simple Wishlist App made by brxjonesdev',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="flex flex-col items-center justify-center bg-black-200">
                    <WishlistContextProvider>
                        {children}
                    </WishlistContextProvider>
                </main>
            </body>
        </html>
    )
}
