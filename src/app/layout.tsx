import './globals.css'

export const metadata = {
  title: 'Pokemon Explorer',
  description: 'A simple Pokedex app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-black dark:text-white antialiased">
        {children}
      </body>
    </html>
  )
}
