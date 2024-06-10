'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import ModalDrawer from '../component/modalDrawer'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { WishlistProps } from '../sidebar/wishlist-list'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { WishlistContext } from '@/app/wishlistContext'
import { useContext } from 'react'

export default function EditWishlistBtn({
    wishlist,
}: {
    wishlist: WishlistProps | undefined
}) {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const [isSubmittingChange, setIsSubmittingChange] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const { setWishlists } = useContext(WishlistContext)

    const editWishlist = async (values: {
        name: string | undefined
        description: string | undefined
    }) => {
        const { name, description } = values
        const { data, error } = await supabase
            .from('Wishlists')
            .update({
                name: name,
                description: description,
            })
            .eq('wishlist_id', wishlist?.wishlist_id)
        if (error) {
            console.error(error)
            return 'Error editing wishlist'
        }
        setIsSubmittingChange(false)
        setIsDialogOpen(false)
        setIsDrawerOpen(false)
        setWishlists((prev) => {
            return prev.map((item) => {
                if (item.wishlist_id === wishlist?.wishlist_id) {
                    return {
                        ...item,
                        name: name,
                        description: description,
                    }
                }
                return item
            })
        })
        return 'Wishlist edited successfully'
    }
    return (
        <ModalDrawer
            trigger={
                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-amethyst p-2 hover:bg-amethyst-light">
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">Edit Wishlist</span>
                </div>
            }
            title={`Edit ${wishlist?.name}`}
            content={
                <Formik
                    initialValues={{
                        name: wishlist?.name,
                        description: wishlist?.description,
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .required('Required')
                            .min(2, 'Must be at least 2 characters')
                            .max(50, 'Must be 50 characters or less'),
                        description: Yup.string()
                            .required('Required')
                            .min(2, 'Must be at least 2 characters')
                            .max(500, 'Must be 500 characters or less'),
                    })}
                    onSubmit={(values) => {
                        setIsSubmittingChange(true)
                        editWishlist(values)
                    }}
                >
                    <Form className="mt-4 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="name">Name</label>
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-sm text-red-500"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="description">Description</label>
                            <Field
                                id="description"
                                name="description"
                                type="text"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="text-sm text-red-500"
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            {isSubmittingChange ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Form>
                </Formik>
            }
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
        />
    )
}

function FilePenIcon(props) {
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
            <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
        </svg>
    )
}
