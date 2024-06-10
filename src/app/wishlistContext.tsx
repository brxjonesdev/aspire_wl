'use client'
import React, { createContext, useContext, useState } from 'react'
import { WishlistProps } from '@/components/sidebar/wishlist-list'
import { useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
interface WishlistContextType {
    wishlists: WishlistProps[]
    setWishlists: React.Dispatch<React.SetStateAction<any[]>>
}

export const WishlistContext = createContext<WishlistContextType>({
    wishlists: [],
    setWishlists: () => {},
})

export default function WishlistContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [wishlists, setWishlists] = useState<any[]>([])
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    useEffect(() => {
        // Fetch all wishlists that belong to the current user
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            if (!user) {
                console.error('User not logged in')
                return 'User not logged in'
            }
            return user
        }

        const fetchWishlists = async () => {
            const user = await getUser()
            if (user === 'User not logged in') {
                return
            }

            const { data: wishlists, error } = await supabase
                .from('Wishlists')
                .select('*')
                .eq('owner', user.id)
            if (error) {
                console.error('Error fetching wishlists -> ', error)
                return
            }
            setWishlists(wishlists)
        }
        fetchWishlists()
        console.log(wishlists)
    }, [])

    return (
        <WishlistContext.Provider value={{ wishlists, setWishlists }}>
            {children}
        </WishlistContext.Provider>
    )
}
