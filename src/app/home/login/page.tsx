'use client'

import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Component() {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback',
            },
        })
        if (error) {
            console.error('Error logging in:', error.message)
            return
        }
        console.log('Logged in:', data)
    }
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center">
            <div className="mx-auto w-full max-w-md space-y-8">
                <div className="flex items-center justify-center">
                    <Link className="inline-flex items-center gap-2" href="#">
                        <span className="text-3xl font-bold">Aspire</span>
                    </Link>
                </div>
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-center text-2xl">
                            Sign in to your account
                        </CardTitle>
                        <CardDescription className="text-center">
                            Sign in using Google, you will need a Google account
                            for this app.{' '}
                            <span className="text-xs italic text-wisteria">
                                I'd be suprised if you didnt have one.
                            </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button
                            className="w-full rounded-lg bg-gradient-to-l from-grape to-celeste-dark py-12 text-lg font-bold text-white shadow-lg"
                            onClick={handleLogin}
                        >
                            Sign in with Google
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function MountainIcon(props) {
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
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    )
}
