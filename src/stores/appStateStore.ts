import { createStore } from 'zustand/vanilla'

export type AppState = {
    view: 'list' | 'grid'
    wishlists: {
        id: string
        avatar: string
        name: string
        description?: string
        items: {
            id: string
            name: string
            url: string
            price: number
            image: string
        }[]
    }[]
}

export type AppStateActions = {
    toggleView: (view: 'list' | 'grid') => void
    addWishlist: (wishlist: AppState['wishlists'][0]) => void
    addItem: (wishlistId: string, item: AppState['wishlists'][0]['items'][0]) => void
}

export const useAppState = createStore<AppState & AppStateActions>((set) => ({
    view: 'list',
    wishlists: [],
    toggleView: (view) => set({ view }),
    addWishlist: (wishlist) =>
        set((state) => ({
            wishlists: [...state.wishlists, wishlist],
        })),
    addItem: (wishlistId, item) =>
        set((state) => ({
            wishlists: state.wishlists.map((wishlist) => ({
                ...wishlist,
                items:
                    wishlist.id === wishlistId
                        ? [...(wishlist.items || []), item]
                        : wishlist.items,
            })),
        })),
}))
