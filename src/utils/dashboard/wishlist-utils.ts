import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
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

type addWishlistProps = {
    values: {
        wishlistName: string
        wishlistDescription: string
    }
}

export async function AddWishlist({ values }: addWishlistProps) {
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        return 'Error getting user data'
    }
    const user = data?.user

    // check if user is in Users table
    const { data: usersData, error: usersError } = await supabase
        .from('Users')
        .select('*')
        .eq('user_id', user?.id)
    if (usersError) {
        // add user to Users table
        const { data: newUser, error } = await supabase.from('Users').insert([
            {
                user_id: user?.id,
                email: user?.email,
                name: user?.user_metadata.full_name,
            },
        ])

        if (error) {
            return 'Error adding user to Users table'
        }

        // add wishlist to Wishlists table
        const { data: newWishlist, error: wishlistError } = await supabase
            .from('Wishlists')
            .insert([
                {
                    owner: user?.id,
                },
            ])

        if (wishlistError) {
            return 'Error adding wishlist'
        }

        return 'Wishlist added successfully'
    }
}
