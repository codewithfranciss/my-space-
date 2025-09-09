import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { navigationItems } from '../../../lib/constant /navlinks'


type ResponsiveHeaderProp ={
    user: {storageUsed: number, storageLimit: number}
    percentage: number
}
export default function ResponsiveHeader({user, percentage}: ResponsiveHeaderProp) {
     const [showMobileMenu, setShowMobileMenu] = useState(false)
    return(
        <>
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
                      <span className="text-sm font-medium text-gray-900">{percentage}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full bg-black transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">{user.storageUsed} MB used</span>
                      <span className="text-xs text-gray-500">{user.storageLimit} MB total</span>
                    </div>
                  </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          </>
    )
}