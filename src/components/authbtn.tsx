'use client'

import { createBrowserClient } from '@supabase/ssr'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export default function AuthButton({ type }: { type: 'login' | 'logout' }) {
    const router = useRouter()
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'https://aspire-brx.netlify.app/auth/callback',
            },
        })
        if (error) {
            console.error('Error logging in:', error.message)
            return
        }
        console.log('Logged in:', data)
    }

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error logging out:', error.message)
            return
        }
        router.push('/')
        console.log('Logged out')
    }

    return (
        <Button
            className="rounded-lg bg-gradient-to-l from-grape to-celeste-dark px-12 py-6 text-lg font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:from-grape-dark hover:to-celeste-dark"
            onClick={type === 'login' ? handleLogin : handleLogout}
        >
            {type === 'login' ? 'Login' : 'Logout'}
        </Button>
    )
}
