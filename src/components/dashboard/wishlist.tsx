import Link from 'next/link'
import React from 'react'

type WishlistProps = {
    name: string
    description: string
    totalItems: number
    createdAt: string
    id: string
}
export default function Wishlist({
    name,
    description,
    totalItems,
    createdAt,
    id
}: WishlistProps) {
    return (
        <Link href={`/home/dashboard/wishlist/${id}`}>
        <section className="space-y-4">
            <div className="rounded-md bg-wisteria-light p-3">
                <h2 className="font-semibold">{name}</h2>
                <p className="text-sm">{description}</p>
            </div>
        </section>
        </Link>
    )
}
