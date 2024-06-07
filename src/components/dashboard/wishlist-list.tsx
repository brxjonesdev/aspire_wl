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
import AddWishlistBtn from '@/components/dashboard/addWishlistBtn'
import Wishlist from './wishlist'

export default function WishlistList() {
    const wishlists = []
    return (
        <Card className="max-h-full border-none bg-black-400 text-whisper">
            <CardHeader>
                <CardTitle>Your Lists</CardTitle>
                <CardDescription>Lists made by You</CardDescription>
            </CardHeader>
            <CardContent className="flex max-h-full flex-col space-y-4 pb-10 text-black-400">
                <AddWishlistBtn />
                {wishlists.length > 0 ? (<section className="space-y-4">
                    <div className="text-center text-whisper">
                        <p>No lists yet.</p>
                        <p>
                            Create a new list to keep track of things you want
                            to buy!
                        </p>
                    </div>
                </section>):(
                  <Wishlist
                    name='My Wishlist'
                    description='This is a wishlist'
                    totalItems={3}
                    createdAt='2021-09-21'
                    id='12345'
                    />
                )}
                
            </CardContent>
        </Card>
    )
}
