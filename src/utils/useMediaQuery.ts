'use client'
import { useState, useEffect } from 'react'

export default function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia(query)
        setMatches(mediaQuery.matches)

        const listener = () => setMatches(mediaQuery.matches)
        mediaQuery.addEventListener('change', listener)

        return () => mediaQuery.removeEventListener('change', listener)
    }, [query])

    return matches
}
