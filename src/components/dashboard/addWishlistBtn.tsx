'use client'
import { createBrowserClient } from '@supabase/ssr'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { AddWishlist } from '@/utils/dashboard/wishlist-utils'

type addWishlistProps = {
    values: {
        wishlistName: string
        wishlistDescription: string
    }
}

export default function AddWishlistBtn() {
    const [isOpen, setIsOpen] = useState(false)
    const [wishlists, setWishlists] = useState([])
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    async function AddWishlist({ values }: addWishlistProps) {
       
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger
                className="w-full rounded-md bg-wisteria py-3 text-black hover:bg-amethyst-light"
                disabled={isOpen}
                onClick={() => setIsOpen(true)}
            >
                + New Wishlist
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new wishlist</DialogTitle>
                    <DialogDescription>
                        Create a new wishlist to keep track of your present and
                        future purchases!
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={{
                        wishlistName: '',
                        wishlistDescription: '',
                    }}
                    validationSchema={Yup.object({
                        wishlistName: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Name is required'),
                        wishlistDescription: Yup.string().max(
                            100,
                            'Must be 100 characters or less'
                        ),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        // Handle form submission here
                        setSubmitting(false)
                        console.log(values)
                        AddWishlist({ values })
                    }}
                >
                    <Form>
                        <div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="wishlistName"
                                    className="text-sm font-medium text-black-300"
                                >
                                    Wishlist Name
                                </label>
                                <Field
                                    name="wishlistName"
                                    type="text"
                                    placeholder="Enter Wishlist Name"
                                    className="mt-1 w-full rounded-md border bg-black-400 p-2 text-whisper"
                                />
                            </div>
                            <ErrorMessage
                                name="wishlistName"
                                component="div"
                                className="text-red-500"
                            />
                        </div>

                        <div>
                            <div className="mt-4 flex flex-col">
                                <label
                                    htmlFor="wishlistDescription"
                                    className="text-sm font-medium text-black-300"
                                >
                                    Wishlist Description
                                </label>
                                <Field
                                    name="wishlistDescription"
                                    as="textarea"
                                    placeholder="Enter Wishlist Description"
                                    className="mt-1 w-full rounded-md border bg-black-400 p-2 text-whisper"
                                />
                            </div>
                            <ErrorMessage
                                name="wishlistDescription"
                                component="div"
                                className="text-red-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-4 w-full rounded-md bg-amethyst py-2 text-whisper hover:bg-amethyst-dark"
                        >
                            Create Wishlist
                        </button>
                    </Form>
                </Formik>
            </DialogContent>
        </Dialog>
    )
}
