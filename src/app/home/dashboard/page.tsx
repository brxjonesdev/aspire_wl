import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import ScrapeProduct from '@/components/component/scrapeProduct'

export default async function Dashboard() {
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
    return (
        <main className="flex flex-1 flex-col p-6">
            <div className="mx-auto my-auto w-full max-w-xl space-y-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome to your Aspire dashboard!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p>
                                This app is a work in progress. You can create a wishlist to keep track of your present and
                                future purchases. I want to add browser plugins to make it easier to add items to your wishlist
                                in the near future.
                            </p>
                            <p>
                                I&apos;m also working on a feature to scrape product information from websites to make adding items
                                to your wishlist even easier. Of course, I wanted to make it as hard as possible for myself by using Rust so it might take a while. 🙃
                            </p>
                            <Link
                                href={'https://brx-portfolio.vercel.app/'}
                                className="mt-2 text-right text-celeste-dark hover:text-wisteria"
                            >
                                - brxjonesdev
                            </Link>
                        </div>
                    </CardContent>
                </Card>
                {/* <ScrapeProduct/> */}
                
               
            </div>
        </main>
    )
}

function HeartIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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

function ListIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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

function PlusIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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

function ShareIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
function Grid3x3Icon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
