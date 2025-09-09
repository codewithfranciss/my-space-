"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Share2, Menu, X, User, Bell, Settings as SettingsIcon, BarChart3, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet'

// Mock data - replace with your actual data
const USER = { storageUsed: 250, storageLimit: 1000 }
const calculateStoragePercentage = () => Math.round((USER.storageUsed / USER.storageLimit) * 100)

export default function ResponsiveModernHeader() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const navigationItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3, isActive: false },
    { href: '/spaces', label: 'My Spaces', icon: Layers, isActive: true },
    { href: '/settings', label: 'Settings', icon: SettingsIcon, isActive: false }
  ]

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
        

          {/* Upgrade Button - Hidden on Small Screens */}
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden sm:flex px-3 py-2 border-black text-black hover:bg-black hover:text-white transition-all duration-200 font-medium rounded-xl"
            asChild
          >
            <Link href="/upgrade">
              <span className="hidden md:inline">Upgrade Plan</span>
              <span className="md:hidden">Upgrade</span>
            </Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="p-2 hover:bg-gray-100 transition-colors">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              
              <SheetContent 
                side="right" 
                className="w-[280px] sm:w-[320px] p-0 bg-white border-l border-gray-200 shadow-xl"
              >
                {/* Mobile Header */}
                <SheetHeader className="px-6 py-5 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <SheetTitle className="text-lg font-semibold text-gray-900">
                        Navigation
                      </SheetTitle>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
                      <div className="w-4 h-4 bg-black rounded-full"></div>
                    </div>
                  </div>
                </SheetHeader>

                <div className="px-6 py-6 space-y-8">
                  {/* Mobile Storage Info */}
                 
                  {/* Mobile Navigation */}
                  <div className="space-y-4">

                    <div className="space-y-2">
                      {navigationItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <SheetClose key={item.href} asChild>
                            <Button 
                              variant="ghost" 
                              className={`w-full justify-start h-12 px-3 rounded-xl transition-all duration-200 group ${
                                item.isActive 
                                  ? 'bg-black text-white hover:bg-gray-800' 
                                  : 'hover:bg-gray-100 text-gray-700'
                              }`}
                              asChild
                            >
                              <Link href={item.href} className="flex items-center w-full">
                                <div className={`mr-3 p-1.5 rounded-lg transition-colors ${
                                  item.isActive 
                                    ? 'bg-white/20 text-white' 
                                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                                }`}>
                                  <Icon className="h-4 w-4" />
                                </div>
                                <span className="font-medium">{item.label}</span>
                              </Link>
                            </Button>
                          </SheetClose>
                        )
                      })}
                    </div>
                     <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Storage Usage</span>
                      <span className="text-sm font-medium text-gray-900">{calculateStoragePercentage()}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full bg-black transition-all duration-300"
                        style={{ width: `${calculateStoragePercentage()}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">{USER.storageUsed} MB used</span>
                      <span className="text-xs text-gray-500">{USER.storageLimit} MB total</span>
                    </div>
                  </div>

                  </div>

                  {/* Mobile Quick Actions */}

                </div>

                {/* Mobile Footer */}

              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}