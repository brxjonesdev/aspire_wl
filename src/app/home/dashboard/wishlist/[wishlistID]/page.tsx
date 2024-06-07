'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function page() {
    const wishlistItems = [
        {
          id: 1,
          image: "/placeholder.svg",
          name: "Cozy Knit Sweater",
          description: "A soft and stylish sweater perfect for chilly days.",
          price: 59.99,
        },
        {
          id: 2,
          image: "/placeholder.svg",
          name: "Leather Backpack",
          description: "A durable and versatile backpack for everyday use.",
          price: 99.99,
        },
        {
          id: 3,
          image: "/placeholder.svg",
          name: "Noise-Cancelling Headphones",
          description: "High-quality headphones that block out external noise.",
          price: 149.99,
        },
        // {
        //   id: 4,
        //   image: "/placeholder.svg",
        //   name: "Outdoor Adventure Tent",
        //   description: "A spacious and weatherproof tent for camping trips.",
        //   price: 199.99,
        // },
        // {
        //     id: 5,
        //     image: "/placeholder.svg",
        //     name: "Smart Fitness Watch",
        //     description: "A sleek and feature-packed watch to track your workouts.",
        //     price: 249.99,
        // },
        // {
        //     id: 6,
        //     image: "/placeholder.svg",
        //     name: "Professional Camera Kit",
        //     description: "A complete camera kit for capturing stunning photos and videos.",
        //     price: 499.99,
        // },
        // {
        //     id: 7,
        //     image: "/placeholder.svg",
        //     name: "Home Theater System",
        //     description: "A premium sound system for an immersive home theater experience.",
        //     price: 799.99,
        // },
        // {
        //     id: 8,
        //     image: "/placeholder.svg",
        //     name: "Luxury Smartwatch",
        //     description: "A luxury smartwatch with advanced features and elegant design.",
        //     price: 999.99,
        // }
      ]
      const handleRemoveFromWishlist = (id) => {
        console.log(`Removing item with ID ${id} from wishlist`)
      }
  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8">
          <div className="flex items-center justify-between">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-wisteria">My Wishlist</h1>
              <p className="text-gray-500 dark:text-gray-400">These are the items I'd like to purchase.</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/home/dashboard/"
                className="inline-flex h-9 items-center justify-center rounded-md border-none  bg-wisteria-light px-4 text-sm font-medium shadow-sm hover:bg-wisteria "
                prefetch={false}
              >
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <Button variant="ghost" size="icon" className='bg-amethyst hover:bg-amethyst-light'>
                <ShareIcon className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
              <Button variant="ghost" size="icon" className='bg-amethyst hover:bg-amethyst-light'>
                <FilePenIcon className="h-4 w-4" />
                <span className="sr-only">Edit Wishlist</span>
              </Button>
            </div>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlistItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-col items-start gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800 text-wisteria"
              >
                <Image
                  src="/placeholder.svg"
                  alt={item.name}
                  width={300}
                  height={300}
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                  <div className="mt-2 font-semibold">${item.price}</div>
                </div>
                <div className='text-black-100 grid grid-cols-2 gap-4'>
                <Button variant="outline" size="sm" className='bg-celeste-dark hover:bg-celeste border-none'>
                    Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleRemoveFromWishlist(item.id)} className='border-none bg-wisteria-dark'>
                  Remove
                </Button>

                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ArrowLeftIcon(props) {
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
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
    )
  }
  
  
  function FilePenIcon(props) {
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
        <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
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
