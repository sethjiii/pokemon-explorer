'use client'

import { useEffect, useState } from 'react'

export default function FontWrapper({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return <body className={className}>{children}</body>
}
