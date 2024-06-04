export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <section className="flex h-full w-full flex-col items-center justify-center">
            {children}
        </section>
    )
}
