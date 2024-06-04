import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenu,
} from '@/components/ui/dropdown-menu'

export default function Home() {
    return (
        <main className="flex h-screen flex-col items-center justify-center">
            <div className="flex min-h-[100dvh] flex-col">
                <header className="flex h-14 w-full items-center px-6 py-6">
                    <Link
                        href="#"
                        className="flex items-center justify-center"
                        prefetch={false}
                    >
                        <h2 className="text-xl font-semibold text-grape">
                            Aspire
                        </h2>
                    </Link>
                    <div className="ml-auto flex items-center gap-2 text-xs">
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
                <hr className="w-full border-t" />

                {/* <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
  <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
    <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
      <div>
        <h1 className="bg-wisteria bg-clip-text text-transparent lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
          The ultimate wishlist app for savvy shoppers
        </h1>
        <p className="mx-auto max-w-[700px] text-amethyst-dark">
          Quirky Tagline
        </p>
        <div className="space-x-4 mt-6">
          <Link
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-md bg-whisper px-4 py-2 text-sm font-medium text-amethyst-translucent hover:text-amethyst hover:bg-amethyst-light dark:bg-amethyst-dark dark:text-amethyst-foreground transition-all duration-150"
            prefetch={false}
          >
            Sign Up / Login
          </Link>
         
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
</section> */}

                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="space-y-12 px-4 md:px-6">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-wisteria-light px-3 py-1 text-sm dark:bg-gray-800">
                                Key Features
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                Streamline your shopping experience
                            </h2>
                            <p className="max-w-[900px] text-wisteria dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Wishlist App offers a suite of powerful features
                                to help you stay organized and get the best
                                deals.
                            </p>
                        </div>

                        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">
                                    Create Wishlists
                                </h3>
                                <p className="text-sm text-wisteria-dark dark:text-gray-400">
                                    Easily create and manage wishlists for all
                                    your shopping needs.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">
                                    Share with Friends
                                </h3>
                                <p className="text-sm text-wisteria-dark dark:text-gray-400">
                                    Collaborate with friends and family to find
                                    the perfect gifts.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">
                                    Price Alerts
                                </h3>
                                <p className="text-sm text-wisteria-dark dark:text-gray-400">
                                    Get notified when the items on your wishlist
                                    go on sale.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">
                                    Personalized Recommendations
                                </h3>
                                <p className="text-sm text-wisteria-dark dark:text-gray-400">
                                    Discover new products based on your shopping
                                    history and interests.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">
                                    Cross-Platform Sync
                                </h3>
                                <p className="text-sm text-wisteria-dark dark:text-gray-400">
                                    Access your wishlists from any device,
                                    anytime.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">
                                    Secure and Private
                                </h3>
                                <p className="text-sm text-wisteria-dark dark:text-gray-400">
                                    Your data is protected with industry-leading
                                    security measures.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full rounded-lg bg-whisper py-12 md:py-24 lg:py-32">
                    <div className="px-4 md:px-6">
                        <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                            <div className="space-y-4">
                                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                                    Powered by Rust & WebAssembly
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Supercharged Wishlist with Rust and
                                    WebAssembly
                                </h2>
                                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Our wishlist feature leverages the power of
                                    Rust and WebAssembly to quickly and
                                    efficiently scrape the web and fetch
                                    detailed product information. This allows
                                    you to easily track and manage your desired
                                    items, all while enjoying lightning-fast
                                    performance.
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                        <WrenchIcon className="h-6 w-6" />
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                        <WebcamIcon className="h-6 w-6" />
                                    </div>
                                </div>
                            </div>
                            <Image
                                src="/placeholder.svg"
                                width="550"
                                height="310"
                                alt="Rust and WebAssembly"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                            />
                        </div>
                    </div>
                </section>

                <footer className="mt-20 flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        &copy; 2024 Wishlist App. All rights reserved.
                    </p>
                    <nav className="flex gap-4 sm:ml-auto sm:gap-6">
                        <Link
                            href="#"
                            className="text-xs underline-offset-4 hover:underline"
                            prefetch={false}
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="#"
                            className="text-xs underline-offset-4 hover:underline"
                            prefetch={false}
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="#"
                            className="under text-xs hover:underline"
                            prefetch={false}
                        />
                    </nav>
                </footer>
            </div>
        </main>
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
