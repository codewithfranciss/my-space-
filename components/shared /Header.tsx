"use client"
import Link from 'next/link'
import { Share2, Settings as SettingsIcon, BarChart3, Layers } from 'lucide-react'
// Mock data - replace with your actual data
const USER = { storageUsed: 250, storageLimit: 1000 }
const calculateStoragePercentage = () => Math.round((USER.storageUsed / USER.storageLimit) * 100)

export default function ResponsiveModernHeader() {
  

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-black text-white flex-shrink-0">
            <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight truncate">
            MySpaces
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navigationItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`text-sm font-medium transition-colors duration-200 relative group ${
                item.isActive 
                  ? 'text-black' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-200 ${
                item.isActive ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Storage Card - Desktop Only */}

            {/* Storage Card */}
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 transition-colors">
              <div className="flex flex-col min-w-[140px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">Free Plan</span>
                  <span className="text-xs text-gray-500">{calculateStoragePercentage()}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-black transition-all duration-300"
                    style={{ width: `${calculateStoragePercentage()}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">{USER.storageUsed} MB</span>
                  <span className="text-xs text-gray-500">{USER.storageLimit} MB</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </header>
  )
}