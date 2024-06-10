'use client'
import React, { ReactNode } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '../ui/drawer'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

type ModalInfoProps = {
    trigger: ReactNode
    title: string
    content: ReactNode
    isDialogOpen: boolean
    setIsDialogOpen: (isOpen: boolean) => void
    isDrawerOpen: boolean
    setIsDrawerOpen: (isOpen: boolean) => void
}
export default function ModalDrawer({
    trigger,
    title,
    content,
    isDialogOpen,
    setIsDialogOpen,
    isDrawerOpen,
    setIsDrawerOpen,
}: ModalInfoProps) {
    return (
        <>
            <Dialog
                open={isDialogOpen}
                onOpenChange={(isDialogOpen) => setIsDialogOpen(isDialogOpen)}
            >
                <DialogTrigger className="hidden sm:block">
                    {trigger}
                </DialogTrigger>
                <DialogContent className="bg-white text-black-100">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{content}</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Drawer
                open={isDrawerOpen}
                onOpenChange={(isDrawerOpen) => setIsDrawerOpen(isDrawerOpen)}
            >
                <DrawerTrigger className="block sm:hidden">
                    {trigger}
                </DrawerTrigger>
                <DrawerContent className="text-black-100">
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                    </DrawerHeader>
                    <div>{content}</div>
                    <DrawerFooter>
                        <DrawerClose>
                            <Button
                                variant="outline"
                                className="w-full bg-black-700 text-white"
                            >
                                Close
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
