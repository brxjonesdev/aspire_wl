'use client'

import { createBrowserClient } from '@supabase/ssr'
import { Button } from './ui/button'

export default function AuthButton({ type }: { type: 'login' | 'logout' }) {
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

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error logging out:', error.message)
            return
        }
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
