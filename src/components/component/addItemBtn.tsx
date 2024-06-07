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

export default function AddItemBtn() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(isOpen) => {
                setIsOpen(isOpen)
            }}
        >
            <DialogTrigger className="text-sm hover:text-grape-light">
                Or add manually here
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a new item to a wishlist</DialogTitle>
                    <DialogDescription>
                        Enter the details of the item you want to add
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={{
                        itemName: '',
                        itemDescription: '',
                        itemPrice: '',
                        itemUrl: '',
                        itemImageUrl: '',
                    }}
                    validationSchema={Yup.object({
                        itemName: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Name is required'),
                        itemDescription: Yup.string().max(
                            100,
                            'Must be 100 characters or less'
                        ),
                        itemPrice: Yup.number().required('Price is required'),
                        itemUrl: Yup.string().url(),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values)
                        setSubmitting(false)
                    }}
                >
                    <Form className="space-y-4">
                        <div>
                            <div className="flex flex-col space-y-2">
                                <label
                                    htmlFor="itemName"
                                    className="text-sm font-medium text-black-300"
                                >
                                    Item Name
                                </label>
                                <Field
                                    type="text"
                                    id="itemName"
                                    name="itemName"
                                    className="mt-1 w-full rounded-md border bg-wisteria-light p-2 text-black-500"
                                />
                            </div>
                            <ErrorMessage name="itemName" className="text-xs" />
                        </div>
                        <div>
                            <div className="flex flex-col space-y-2">
                                <label
                                    htmlFor="itemDescription"
                                    className="text-sm font-medium text-black-300"
                                >
                                    Description
                                </label>
                                <Field
                                    type="text"
                                    id="itemDescription"
                                    name="itemDescription"
                                    className="mt-1 w-full rounded-md border bg-wisteria-light p-2 text-black-500"
                                />
                            </div>
                            <ErrorMessage
                                name="itemDescription"
                                className="text-sm"
                            />
                        </div>
                        <div>
                            <div className="flex flex-col space-y-2">
                                <label
                                    htmlFor="itemPrice"
                                    className="text-sm font-medium text-black-300"
                                >
                                    Price
                                </label>
                                <Field
                                    type="text"
                                    id="itemPrice"
                                    name="itemPrice"
                                    className="mt-1 w-full rounded-md border bg-wisteria-light p-2 text-black-500"
                                />
                            </div>
                            <ErrorMessage
                                name="itemPrice"
                                className="text-sm"
                            />
                        </div>
                        <div>
                            <div className="flex flex-col space-y-2">
                                <label
                                    htmlFor="itemUrl"
                                    className="text-sm font-medium text-black-300"
                                >
                                    URL
                                </label>
                                <Field
                                    type="text"
                                    id="itemUrl"
                                    name="itemUrl"
                                    className="mt-1 w-full rounded-md border bg-wisteria-light p-2 text-black-500"
                                />
                            </div>
                            <ErrorMessage name="itemUrl" className="text-sm" />
                        </div>
                        {/* <div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="itemImageUrl">Image URL</label>
                                <Field
                                    type="text"
                                    id="itemImageUrl"
                                    name="itemImageUrl"
                                    className="input"
                                />
                            </div>
                            <ErrorMessage name="itemImageUrl" />
                        </div> */}

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="w-full rounded-sm bg-wisteria py-2 hover:bg-wisteria-dark"
                            >
                                Add Item
                            </button>
                            <button
                                type="reset"
                                className="w-full rounded-sm bg-celeste py-2 hover:bg-celeste-dark"
                                onClick={() => {
                                    setIsOpen(false)
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </Form>
                </Formik>
            </DialogContent>
        </Dialog>
    )
}
