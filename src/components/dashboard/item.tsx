import React from 'react'
import { Button } from '@/components/ui/button'
import ModalDrawer from '../component/modalDrawer'
import Image from 'next/image'
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
import { ItemProps } from '@/app/home/dashboard/wishlist/[wishlistID]/page'
import { useState } from 'react'

export default function WishlistItem({ item }: { item: ItemProps }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    return (
        <li
            key={item.name}
            className="flex h-fit flex-col items-start gap-4 rounded-lg border border-gray-200 p-4 text-wisteria dark:border-gray-800"
        >
            <Image
                src="/placeholder.svg"
                alt={item.name}
                width={150}
                height={150}
                className="aspect-square w-full rounded-lg object-cover"
            />
            <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                </p>
                <div className="mt-2 font-semibold">${item.price}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-black-100">
                <ModalDrawer
                    trigger={
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-none bg-wisteria-dark"
                        >
                            Edit
                        </Button>
                    }
                    title="Edit Item"
                    content={'Hello'}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    isDrawerOpen={isDrawerOpen}
                    setIsDrawerOpen={setIsDrawerOpen}
                />

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-none bg-wisteria-dark"
                        >
                            Remove
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </li>
    )
}
