import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import AuthButton from '@/components/authbtn'

export default function Home() {
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
        <div className="flex h-full w-full flex-col border-amethyst-light">
            <header className="flex h-14 w-full max-w-[1500px] items-center self-center px-6 py-6">
                <Link
                    href="#"
                    className="flex items-center justify-center"
                    prefetch={false}
                >
                    <h2 className="text-xl font-bold text-whisper">Aspire</h2>
                </Link>
                <div className="ml-auto flex items-center gap-2 text-xs text-whisper">
                    <p>Created with</p>
                    <HeartIcon className="h-5 w-5 text-wisteria" />
                    <p>by</p>
                    <Link
                        href="#"
                        className="text-amethyst hover:text-amethyst-dark"
                        prefetch={false}
                    >
                        brxjonesdev
                    </Link>
                </div>
            </header>

            <section className="w-full border-y py-28">
                <div className="space-y-10 px-4 md:px-6 xl:space-y-16">
                    <div className="mx-auto grid max-w-[1300px] gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16 md:px-10">
                        <div className="space-y-6">
                            <h1 className="lg:leading-tighter bg-wisteria bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                                The ultimate wishlist app for savvy shoppers
                            </h1>
                            <p className="mx-auto max-w-[700px] text-whisper">
                                Discover new products, track prices, and share
                                wishlists with friends. Sign up today and start
                                saving time and money.
                            </p>
                            <div className="mt-6 space-x-4">
                                <AuthButton type="login" />
                            </div>
                        </div>
                        <div className="flex flex-col items-start space-y-4">
                            <Image
                                src="/placeholder.svg"
                                width="400"
                                height="310"
                                alt="Hero"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full border-y pb-12 pt-12 md:pt-24 lg:pt-32">
                <div className="flex flex-col items-center space-y-10 px-4 md:px-6 xl:space-y-16">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <h2 className="inline-block rounded-lg bg-wisteria-light px-3 py-1 text-sm dark:bg-gray-800">
                            Powered by Rust & WebAssembly
                        </h2>
                        <h2 className="text-3xl font-bold tracking-tighter text-wisteria sm:text-5xl">
                            Supercharged Wishlist with Rust and WebAssembly
                        </h2>
                        <p className="max-w-[800px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our wishlist feature leverages the power of Rust and
                            WebAssembly to quickly and efficiently scrape the
                            web and fetch detailed product information. This
                            allows you to easily track and manage your desired
                            items, all while enjoying lightning-fast
                            performance.
                        </p>
                    </div>
                    <div className="mb-4 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                            <WrenchIcon className="h-6 w-6" />
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                            <WebcamIcon className="h-6 w-6" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="space-y-12 px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <div className="inline-block rounded-lg bg-wisteria-light px-3 py-1 text-sm dark:bg-gray-800">
                            Key Features
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter text-wisteria sm:text-5xl">
                            Streamline your shopping experience
                        </h2>
                        <p className="max-w-[900px] text-whisper dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Wishlist App offers a suite of powerful features to
                            help you stay organized and get the best deals.
                        </p>
                    </div>

                    <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold text-wisteria">
                                Create Wishlists
                            </h3>
                            <p className="text-sm text-whisper dark:text-gray-400">
                                Easily create and manage wishlists for all your
                                shopping needs.
                            </p>
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold text-wisteria">
                                Share with Friends
                            </h3>
                            <p className="text-sm text-whisper dark:text-gray-400">
                                Collaborate with friends and family to find the
                                perfect gifts.
                            </p>
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold text-wisteria">
                                Price Alerts
                            </h3>
                            <p className="text-sm text-whisper dark:text-gray-400">
                                Get notified when the items on your wishlist go
                                on sale.
                            </p>
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold text-wisteria">
                                Personalized Recommendations
                            </h3>
                            <p className="text-sm text-whisper dark:text-gray-400">
                                Discover new products based on your shopping
                                history and interests.
                            </p>
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold text-wisteria">
                                Cross-Platform Sync
                            </h3>
                            <p className="text-sm text-whisper dark:text-gray-400">
                                Access your wishlists from any device, anytime.
                            </p>
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold text-wisteria">
                                Secure and Private
                            </h3>
                            <p className="text-sm text-whisper dark:text-gray-400">
                                Your data is protected with industry-leading
                                security measures.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="flex h-24 w-full items-center justify-center bg-amethyst">
                <p className="text-sm text-gray-800 dark:text-gray-400">
                    brxjonesdev @ 2024
                </p>
            </footer>
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

function WebcamIcon(props) {
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
            <circle cx="12" cy="10" r="8" />
            <circle cx="12" cy="10" r="3" />
            <path d="M7 22h10" />
            <path d="M12 22v-4" />
        </svg>
    )
}

function WrenchIcon(props) {
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
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    )
}
