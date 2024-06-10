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
import { redirect } from 'next/navigation'
import { nanoid } from 'nanoid'
import { WishlistContext } from '@/app/wishlistContext'
import { useContext } from 'react'

type addWishlistProps = {
    wishlistName: string
    wishlistDescription: string
}

export default function AddWishlistBtn() {
    const { wishlists, setWishlists } = useContext(WishlistContext)
    const [isOpen, setIsOpen] = useState(false)
    const [isInteractingWithServer, setIsInteractingWithServer] =
        useState(false)
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    async function AddWishlist({
        wishlistName,
        wishlistDescription,
    }: addWishlistProps) {
        // Log the wishlist details
        console.log(
            'Adding wishlist -> ',
            wishlistName,
            ' ',
            wishlistDescription
        )
        const newWishlistID = `wishlist_${nanoid(20)}`

        // Get the current logged-in user
        const {
            data: { user },
        } = await supabase.auth.getUser()

        // Check if user is logged in
        if (!user) {
            console.error('User not logged in')
            redirect('/')
            return
        }

        // Check if the user exists in the Users table
        const { data: userData, error: userFetchError } = await supabase
            .from('Users')
            .select('*')
            .eq('user_tag', user.id)

        // Handle error while fetching user data
        if (userFetchError) {
            console.error('Error fetching user')
            return 'Error fetching user'
        }

        // If user does not exist in the Users table, add them
        if (userData.length === 0) {
            console.error('User not found in database')

            // Add user to Users table
            const { data: newUser, error: userInsertError } = await supabase
                .from('Users')
                .insert([
                    {
                        name: user.user_metadata.full_name,
                        email: user.email,
                        user_tag: user.id,
                    },
                ])

            // Handle error while adding user to the database
            if (userInsertError) {
                console.error('Error adding user to database')
                return 'Error adding user to database'
            }
        } else {
            console.log('User found in database')
            setIsOpen(false)
            setWishlists([
                ...wishlists,
                {
                    wishlist_id: newWishlistID,
                    owner: user.id,
                    name: wishlistName,
                    description: wishlistDescription,
                    createdAt: new Date().toISOString(),
                    items: [],
                },
            ])
            setIsInteractingWithServer(false)
        }

        // Add wishlist to Wishlists table
        const { data: wishlistData, error: wishlistInsertError } =
            await supabase.from('Wishlists').insert([
                {
                    wishlist_id: newWishlistID,
                    owner: user.id,
                    name: wishlistName,
                    description: wishlistDescription,
                },
            ])

        // Handle error while adding wishlist to the database
        if (wishlistInsertError) {
            console.error('Error adding wishlist to database')
            return 'Error adding wishlist to database'
        }

        // Log success message
        console.log('Wishlist added successfully')
        setIsOpen(false)
        setWishlists([
            ...wishlists,
            {
                wishlist_id: newWishlistID,
                owner: user.id,
                name: wishlistName,
                description: wishlistDescription,
                createdAt: new Date().toISOString(),
            },
        ])
        setIsInteractingWithServer(false)
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
                        setIsInteractingWithServer(true)
                        setSubmitting(false)
                        console.log(values)
                        AddWishlist(values)
                    }}
                >
                    <Form>
                        <div>
                            <div className="flex flex-col gap-2">
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
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                            <ErrorMessage
                                name="wishlistName"
                                component="div"
                                className="pt-1 text-sm text-amethyst-dark"
                            />
                        </div>

                        <div>
                            <div className="mt-4 flex flex-col gap-2">
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
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                            <ErrorMessage
                                name="wishlistDescription"
                                component="div"
                                className="pt-1 text-sm text-amethyst-dark"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-4 w-full rounded-md bg-amethyst py-2 text-sm font-medium text-whisper hover:bg-amethyst-dark"
                        >
                            {isInteractingWithServer
                                ? 'Adding...'
                                : 'Add Wishlist'}
                        </button>
                    </Form>
                </Formik>
            </DialogContent>
        </Dialog>
    )
}
