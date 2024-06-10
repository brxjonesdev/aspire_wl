'use client'
import Link from 'next/link'
import React from 'react'
import { WishlistProps } from './wishlist-list'
import { usePathname } from 'next/navigation'

export default function Wishlist({
    wishlist_id,
    owner,
    name,
    description,
    createdAt,
}: WishlistProps) {
    const currentPath = usePathname()
    const isActive = currentPath.includes(wishlist_id)
    return (
        <Link href={`/home/dashboard/wishlist/${wishlist_id}`}>
            <section className="space-y-4">
                <div
                    className={`rounded-md p-3 transition-colors hover:bg-celeste-dark ${
                        isActive ? 'bg-celeste' : 'bg-wisteria-light'
                    }`}
                >
                    <h2 className="font-semibold">{name}</h2>
                    <hr className="my-2 h-0.5 rounded-lg bg-black-100" />
                    <div>
                        <h2 className="text-sm font-semibold">
                            Wishlist Purpose:
                        </h2>
                        <p className="text-sm">&quot;{description}&quot;</p>
                    </div>
                </div>
            </section>
        </Link>
    )
}
