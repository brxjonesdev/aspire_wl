import type { Config } from 'tailwindcss'

const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                black: {
                    DEFAULT: '#202020',
                    100: '#070707',
                    200: '#0d0d0d',
                    300: '#141414',
                    400: '#1b1b1b',
                    500: '#202020',
                    600: '#4e4e4e',
                    700: '#7a7a7a',
                    800: '#a6a6a6',
                    900: '#d3d3d3',
                    transparent: {
                        DEFAULT: 'rgba(32, 32, 32, 0.5)',

                        30: 'rgba(32, 32, 32, 0.3)',

                        10: 'rgba(32, 32, 32, 0.1)',
                    },

                    border: 'hsl(var(--border))',

                    input: 'hsl(var(--input))',

                    ring: 'hsl(var(--ring))',

                    background: 'hsl(var(--background))',

                    foreground: 'hsl(var(--foreground))',

                    primary: {
                        DEFAULT: 'hsl(var(--primary))',

                        foreground: 'hsl(var(--primary-foreground))',
                    },

                    secondary: {
                        DEFAULT: 'hsl(var(--secondary))',

                        foreground: 'hsl(var(--secondary-foreground))',
                    },

                    destructive: {
                        DEFAULT: 'hsl(var(--destructive))',

                        foreground: 'hsl(var(--destructive-foreground))',
                    },

                    muted: {
                        DEFAULT: 'hsl(var(--muted))',

                        foreground: 'hsl(var(--muted-foreground))',
                    },

                    accent: {
                        DEFAULT: 'hsl(var(--accent))',

                        foreground: 'hsl(var(--accent-foreground))',
                    },

                    popover: {
                        DEFAULT: 'hsl(var(--popover))',

                        foreground: 'hsl(var(--popover-foreground))',
                    },

                    card: {
                        DEFAULT: 'hsl(var(--card))',

                        foreground: 'hsl(var(--card-foreground))',
                    },
                },
                whisper: {
                    DEFAULT: '#FAF5FF',
                },
                grape: {
                    DEFAULT: 'hsla(267, 62%, 46%, 1)',
                    light: 'hsla(267, 62%, 66%, 1)',
                    dark: 'hsla(267, 62%, 26%, 1)',
                    translucent: 'hsla(267, 62%, 46%, 0.5)',
                },
                amethyst: {
                    DEFAULT: 'hsla(278, 51%, 59%, 1)',
                    light: 'hsla(278, 51%, 79%, 1)',
                    dark: 'hsla(278, 51%, 39%, 1)',
                    translucent: 'hsla(278, 51%, 59%, 0.5)',
                },
                wisteria: {
                    DEFAULT: 'hsla(263, 49%, 73%, 1)',
                    light: 'hsla(263, 49%, 93%, 1)',
                    dark: 'hsla(263, 49%, 53%, 1)',
                    translucent: 'hsla(263, 49%, 73%, 0.5)',
                },
                columbiaBlue: {
                    DEFAULT: 'hsla(212, 56%, 82%, 1)',
                    light: 'hsla(212, 56%, 92%, 1)',
                    dark: 'hsla(212, 56%, 62%, 1)',
                    translucent: 'hsla(212, 56%, 82%, 0.5)',
                },
                celeste: {
                    DEFAULT: 'hsla(178, 87%, 85%, 1)',
                    light: 'hsla(178, 87%, 95%, 1)',
                    dark: 'hsla(178, 87%, 65%, 1)',
                    translucent: 'hsla(178, 87%, 85%, 0.5)',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
