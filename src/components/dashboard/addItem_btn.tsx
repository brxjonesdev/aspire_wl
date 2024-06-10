import React from 'react'
import { Button } from '@/components/ui/button'
import ModalDrawer from '../component/modalDrawer'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { ItemProps } from '@/app/home/dashboard/wishlist/[wishlistID]/page'
import { WishlistProps } from '../sidebar/wishlist-list'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { nanoid } from 'nanoid'

export default function AddItemBtn({
    wishlist,
    setItems,
    items,
}: {
    wishlist: WishlistProps | undefined
    setItems: React.Dispatch<React.SetStateAction<ItemProps[]>>
    items: ItemProps[]
}) {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const [isSubmittingItem, setIsSubmittingItem] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    async function addItem(values: ItemProps) {
        const itemID = `item_${nanoid(20)}`
        const newItem: ItemProps = {
            item_id: itemID,
            name: values.name,
            description: values.description,
            price: values.price,
            url: values.url,
            photo: values.photo,
            parent_wishlist: wishlist?.wishlist_id,
        }
        const { data, error } = await supabase.from('Items').insert([newItem])
        if (error) {
            console.error(error)
            return 'Error adding item'
        }
        setIsSubmittingItem(false)
        setIsDialogOpen(false)
        setIsDrawerOpen(false)
        setItems([...items, newItem])
        return 'Item added successfully'
    }
    return (
        <ModalDrawer
            trigger={
                <div className="flex h-10 w-24 cursor-pointer items-center justify-center rounded-md bg-amethyst hover:bg-amethyst-light">
                    <span className="sr-only">Add Item</span>
                    <p className="min-w-fit text-sm">Add Item</p>
                </div>
            }
            title="Add Item to Wishlist"
            content={
                <Formik
                    initialValues={{
                        name: '',
                        price: 0,
                        url: '',
                        photo: undefined,
                        description: undefined,
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
                        price: Yup.number()
                            .required('Required')
                            .min(0, 'Must be at least 0'),
                        url: Yup.string()
                            .required('Required')
                            .url('Must be a valid URL'),
                    })}
                    onSubmit={(values) => {
                        setIsSubmittingItem(true)
                        addItem(values)
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
                                className="text-sm text-wisteria"
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
                                className="text-sm text-wisteria"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="price">Price</label>
                            <Field
                                id="price"
                                name="price"
                                type="text"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <ErrorMessage
                                name="price"
                                className="text-sm text-wisteria"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="url">URL</label>
                            <Field
                                id="url"
                                name="url"
                                type="text"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <ErrorMessage
                                name="url"
                                className="text-sm text-wisteria"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="photo">Photo</label>
                            <Field
                                id="photo"
                                name="photo"
                                type="file"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <ErrorMessage
                                name="photo"
                                className="text-sm text-wisteria"
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            {isSubmittingItem ? 'Adding...' : 'Add Item'}
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
