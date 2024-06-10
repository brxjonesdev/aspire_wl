'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { WishlistContext } from '@/app/wishlistContext'
import { useParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import AddItemBtn from '@/components/dashboard/addItem_btn'
import WishlistItem from '@/components/dashboard/item'
import EditWishlistBtn from '@/components/dashboard/editWishlist_btn'
import ModalDrawer from '@/components/component/modalDrawer'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useEffect, useState } from 'react'

export type ItemProps = {
    name: string
    price: number
    url: string
    photo?: string
    description?: string
    priority?: 'P1' | 'P2' | 'P3'
    parent_wishlist?: string
}

export default function WishlistPage() {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const router = useRouter()
    const { wishlists, setWishlists } = useContext(WishlistContext)
    const { wishlistID } = useParams()
    const selectedWishlist = wishlists.find(
        (wishlist) => wishlist.wishlist_id === wishlistID
    )

    const [items, setItems] = useState<ItemProps[]>([])

    useEffect(() => {
        async function fetchItems() {
            const { data, error } = await supabase
                .from('Items')
                .select('*')
                .eq('parent_wishlist', wishlistID)
            if (error) {
                console.error(error)
                return
            }
            setItems(data)
        }
        fetchItems()
    }, [])

    const deleteWishlist = async () => {
        const { error } = await supabase
            .from('Wishlists')
            .delete()
            .eq('wishlist_id', wishlistID)
        if (error) {
            console.error(error)
            return
        }
        setWishlists((prev) =>
            prev.filter((item) => item.wishlist_id !== wishlistID)
        )
        router.push('/home/dashboard/')
    }

    return (
        <section className="h-full w-full py-12">
            <div className="h-full px-4 md:px-6">
                <div className="flex h-full flex-col gap-6">
                    <div className="flex w-full flex-col items-center justify-between gap-3 xl:flex-row">
                        <div className="grid w-full gap-2">
                            <h1 className="text-3xl font-bold tracking-tight text-wisteria sm:text-4xl">
                                {selectedWishlist?.name || 'Loading...'}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                {selectedWishlist?.description}
                            </p>
                        </div>
                        <div className="flex w-full xl:justify-end">
                            <div className="flex gap-3">
                                <AddItemBtn
                                    wishlist={selectedWishlist}
                                    items={items}
                                    setItems={setItems}
                                />
                                <Popover>
                                    <PopoverTrigger className="h-10 w-10">
                                        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-amethyst hover:bg-amethyst-light">
                                            <ShareIcon className="h-4 w-4" />
                                            <span className="sr-only">
                                                Share
                                            </span>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-fit">
                                        This feature is coming soon!
                                    </PopoverContent>
                                </Popover>

                                <EditWishlistBtn wishlist={selectedWishlist} />
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-amethyst hover:bg-amethyst-light">
                                            <TrashIcon className="h-4 w-4" />
                                            <span className="sr-only">
                                                Delete
                                            </span>
                                        </div>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                                This will permanently delete
                                                this wishlist and all of its
                                                items from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                className="bg-wisteria text-black-200 hover:bg-wisteria-dark"
                                                onClick={deleteWishlist}
                                            >
                                                Yes, delete.
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>

                    {selectedWishlist && items.length > 0 && (
                        <ul className="grid h-full gap-6 overflow-x-scroll rounded-md bg-black-500 p-4 md:grid-cols-2  xl:grid-cols-4">
                            {items.map((item) => (
                               <WishlistItem key={item.name} item={item} />
                            ))}
                        </ul>
                    )}

                    {/* {items.length > 0 && (
                        // > Greater than 0
                        <div className="flex flex-grow items-center justify-center rounded-md bg-black-500">
                            <p className="text-2xl text-gray-500 dark:text-gray-400">
                                No items in this wishlist
                            </p>
                        </div>
                    )} */}
                </div>
            </div>
        </section>
    )
}

function ArrowLeftIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
        </svg>
    )
}

function ShareIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" x2="12" y1="2" y2="15" />
        </svg>
    )
}

function TrashIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="3 6 5 6 21 6" />
            <path d="M6 6V21a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6" />
            <path d="M10 3L10 6" />
            <path d="M14 3L14 6" />
        </svg>
    )
}
