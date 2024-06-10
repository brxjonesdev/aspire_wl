'use client'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import AddWishlistBtn from '@/components/sidebar/addWishlistBtn'
import Wishlist from './wishlist'
import { createBrowserClient } from '@supabase/ssr'
import { useContext } from 'react'
import { WishlistContext } from '@/app/wishlistContext'
import Spinner from '../ui/spinner'

type ItemProps = {
    name: string
    price: string
    url?: string
    photo?: string
    description?: string
    parent_id: string
}
export type WishlistProps = {
    wishlist_id: string
    owner: string
    name: string
    description: string
    createdAt: string
    items?: ItemProps[]
}

export default function WishlistList() {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { wishlists, setWishlists } = useContext(WishlistContext)

    return (
        <Card className="min-h-full overflow-hidden border-none bg-black-400 text-whisper">
            <CardHeader>
                <CardTitle>Your Lists</CardTitle>
                <CardDescription>Lists made by You</CardDescription>
            </CardHeader>
            <CardContent className="flex max-h-full flex-col space-y-4 pb-10 text-black-400">
                <AddWishlistBtn />
                <section className="flex flex-col gap-4 overflow-scroll pb-20 pt-5">
                    {wishlists.length === 0 && (
                        <section className="mx-auto">
                            <div className="flex gap-4">
                                <Spinner />
                                <h2 className="text-center text-2xl font-bold text-wisteria">
                                    Loading...
                                </h2>
                            </div>
                        </section>
                    )}
                    {wishlists.map((wishlist) => (
                        <Wishlist
                            key={wishlist.wishlist_id}
                            wishlist_id={wishlist.wishlist_id}
                            owner={wishlist.owner}
                            name={wishlist.name}
                            description={wishlist.description}
                            createdAt={wishlist.createdAt}
                        />
                    ))}
                </section>
            </CardContent>
        </Card>
    )
}
