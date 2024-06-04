import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenu,
} from '@/components/ui/dropdown-menu'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import ModalDrawer from '@/components/component/modalDrawer'
import AddWishlist from '@/components/forms/add_wishlist'
import AddWishlistBtn from '@/components/component/addWishlistBtn'

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const cookieStore = cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }
    return (
        <div className="flex h-screen w-full flex-col">
            <header className="flex h-16 items-center justify-between bg-black-300 px-5 text-whisper dark:border-gray-800 dark:bg-gray-950">
                <Link
                    className="flex items-center gap-2"
                    href="/home/dashboard/"
                >
                    <span className="text-lg font-semibold">
                        Aspire Wishlist Service
                    </span>
                </Link>
                <div className="flex items-center gap-8">
                    {/* <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Grid View</span>
                        <Switch />
                        <span className="text-sm font-medium">List View</span>
                    </div> */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-800"
                                size="icon"
                                variant="ghost"
                            >
                                <Image
                                    alt="Avatar"
                                    className="rounded-full"
                                    height="32"
                                    src="/placeholder.svg"
                                    style={{
                                        aspectRatio: '32/32',
                                        objectFit: 'cover',
                                    }}
                                    width="32"
                                />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <div className="flex h-full rounded-lg">
                <nav className="hidden w-80 flex-col space-y-10 border-r bg-black-500 p-4 md:flex">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Lists</CardTitle>
                            <CardDescription>Lists made by You</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[250px]">
                                <section className="space-y-4">
                                    <div className="rounded-md bg-wisteria-light p-3">
                                        <h2 className="font-semibold">
                                            Braxton's EDC 2.0
                                        </h2>
                                        <p className="text-sm">
                                            This is a list of items that I would
                                            like to have in my everyday carry.
                                        </p>
                                    </div>
                                </section>
                            </ScrollArea>
                        </CardContent>
                        <CardFooter>
                            <AddWishlistBtn />
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-md">
                                Wishlist Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="m-0 px-2">
                            <ScrollArea className="h-[250px] py-1">
                                <section className="space-y-4">
                                    <div className="w-full space-y-3 rounded-md bg-celeste-light p-3">
                                        <h2 className="font-semibold">
                                            Braxton's EDC 2.0
                                        </h2>
                                        <p className="text-sm">
                                            This is a list of items that I would
                                            like to have in my everyday carry.
                                        </p>
                                        <div className="flex gap-2 text-sm">
                                            <p>Total Cost:</p>
                                            <p>$200.00</p>
                                        </div>
                                        <Progress
                                            value={50}
                                            className="h-2 rounded-md bg-columbiaBlue"
                                        />
                                    </div>
                                </section>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </nav>
                {children}
            </div>
        </div>
    )
}

function HeartIcon(props) {
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
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}

function ListIcon(props) {
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
            <line x1="8" x2="21" y1="6" y2="6" />
            <line x1="8" x2="21" y1="12" y2="12" />
            <line x1="8" x2="21" y1="18" y2="18" />
            <line x1="3" x2="3.01" y1="6" y2="6" />
            <line x1="3" x2="3.01" y1="12" y2="12" />
            <line x1="3" x2="3.01" y1="18" y2="18" />
        </svg>
    )
}

function PlusIcon(props) {
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}

function ShareIcon(props) {
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
function Grid3x3Icon(props) {
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
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M3 15h18" />
            <path d="M9 3v18" />
            <path d="M15 3v18" />
        </svg>
    )
}
