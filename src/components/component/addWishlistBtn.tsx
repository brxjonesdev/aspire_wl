'use client'
import React from 'react'
import { Formik, Form, useField, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'

export default function AddWishlistBtn() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(isOpen) => {
                setIsOpen(isOpen)
            }}
        >
            <DialogTrigger
                className="w-full rounded-md bg-black-300 py-3 text-whisper hover:bg-amethyst-dark"
                disabled={isOpen}
                onClick={() => {
                    setIsOpen(true)
                }}
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
                        wishListName: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Name is required'),
                        wishlistDescription: Yup.string().max(
                            100,
                            'Must be 100 characters or less'
                        ),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values)
                        setSubmitting(false)
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
                                    className="mt-1 w-full rounded-md border bg-wisteria-light p-2 text-whisper"
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
                                    className="mt-1 w-full rounded-md border bg-wisteria-light p-2 text-whisper"
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
