'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className={`w-14 h-8 flex items-center rounded-full px-1 transition-colors duration-300 ${
        isDark ? 'bg-slate-700' : 'bg-gray-300'
      }`}
    >
      <motion.div
        className="w-6 h-6 rounded-full flex items-center justify-center bg-white shadow-md"
        animate={{ x: isDark ? 24 : 0 }}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30,
        }}
      >
        {isDark ? (
          <svg className="h-4 w-4 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36 6.36l-.71-.71M6.34 6.34l-.71-.71m12.72 0l-.71.71M6.34 17.66l-.71.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="h-4 w-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.35 15.36A9 9 0 018.64 3.64 9 9 0 1012 21a9 9 0 008.35-5.64z" />
          </svg>
        )}
      </motion.div>
    </button>
  )
}
