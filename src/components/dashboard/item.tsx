"use client";

import { createBrowserClient } from '@supabase/ssr'
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
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default function WishlistItem({ item, items, setItems }: { item: ItemProps, items: ItemProps[], setItems: React.Dispatch<React.SetStateAction<ItemProps[]>>}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

     const deleteItem = async () => {
        const { data, error } = await supabase
            .from('Items')
            .delete()
            .eq('item_id', item.item_id)
        if (error) {
            console.error(error)
            return 'Error deleting item'
        }
        setItems(items.filter((i) => i.item_id !== item.item_id))
        return 'Item deleted successfully'
     }
     const editItem = async (values: ItemProps) => {
        const { data, error } = await supabase
            .from('Items')
            .update({
                name: values.name,
                description: values.description,
                price: values.price,
            })
            .eq('item_id', item.item_id)
        if (error) {
            console.error(error)
            return 'Error updating item'
        }
        setItems(
            items.map((i) =>
                i.item_id === item.item_id ? { ...i, ...values } : i
            )
        )
        return 'Item updated successfully'
     }
    return (
        <li
            key={item.name}
            className="flex h-fit flex-col items-start gap-4 rounded-lg  p-4 text-wisteria bg-black-300 border-amethyst border-2 shadow-lg dark:bg-black-800 dark:border-wisteria-dark dark:text-wisteria-dark dark:shadow-xl dark:border-2 dark:border-black-30"
        >
            <Image
                src="https://placehold.co/150x150/png"
                alt="item image"
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
                    content={
                        <Formik
                            initialValues={{
                                name: item.name,
                                description: item.description,
                                price: item.price,
                            }}
                            validationSchema={Yup.object({
                                name: Yup.string().required('Required'),
                                description: Yup.string().required('Required'),
                                price: Yup.number().required('Required'),
                            })}
                            onSubmit={(values) => {
                                editItem(values)
                            }}
                        >
                            <Form className="flex flex-col gap-4 mt-3">
                                <label htmlFor="name">Name</label>
                                <Field
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500"
                                />
                                <label htmlFor="description">Description</label>
                                <Field
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="text-red-500"
                                />
                                <label htmlFor="price">Price</label>
                                <Field
                                    type="number"
                                    name="price"
                                    id="price"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <ErrorMessage
                                    name="price"
                                    component="div"
                                    className="text-red-500"
                                />
                                <Button
                                    type="submit"
                                    className="w-full bg-wisteria-dark"
                                >
                                    Save
                                </Button>
                            </Form>
                        </Formik>
                    }
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
                                Delete {item.name}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={async () => {
                                    await deleteItem()
                                }}
                                className='bg-wisteria hover:bg-wisteria-dark'
                            >Delete Item</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </li>
    )
}
