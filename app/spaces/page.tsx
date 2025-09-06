"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Share2,
  Plus,
  Search,
  MoreVertical,
  Trash2,
  Settings,
  ExternalLink,
  Clock,
  Lock,
  Globe,
  Layers,
  User,
  Home,
  LayoutDashboard,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


// Mock data for demonstration
const MOCK_SPACES = [
  {
    id: "abc123",
    name: "Project Collaboration",
    isPrivate: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivity: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    messageCount: 24,
    fileCount: 5,
  },
  {
    id: "def456",
    name: "Family Photos",
    isPrivate: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    messageCount: 12,
    fileCount: 32,
  },
  {
    id: "ghi789",
    name: "Travel Plans",
    isPrivate: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivity: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    messageCount: 45,
    fileCount: 8,
  },
  {
    id: "jkl012",
    name: "Work Documents",
    isPrivate: true,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    messageCount: 67,
    fileCount: 23,
  },
]

export default function SpacesPage() {
  const router = useRouter()

  const [spaces, setSpaces] = useState(MOCK_SPACES)
  const [searchQuery, setSearchQuery] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [spaceToDelete, setSpaceToDelete] = useState<string | null>(null)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const filteredSpaces = spaces.filter((space) => space.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleDeleteSpace = () => {
    if (!spaceToDelete) return

    // In a real app, this would make an API call to delete the space
    setSpaces(spaces.filter((space) => space.id !== spaceToDelete))
    setSpaceToDelete(null)
    setShowDeleteDialog(false)


  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "just now"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`
    } else {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} day${days > 1 ? "s" : ""} ago`
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center mx-auto justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Share2 className="h-6 w-6 text-black" />
            <span className="text-xl font-bold">MySpaceIs</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:text-gray-700 transition-colors">
              Dashboard
            </Link>
            <Link
              href="/dashboard/spaces"
              className="text-sm font-medium text-black transition-colors border-b-2 border-black pb-1"
            >
              My Spaces
            </Link>
            <Link href="/dashboard/settings" className="text-sm font-medium hover:text-gray-700 transition-colors">
              Settings
            </Link>
          </nav>

          {/* Mobile Menu Button */}
<div className="flex items-center gap-2">
            <div className="md:hidden">
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
                  {/* Header */}
                  <div className="px-6 py-5 bg-gray-50 border-b border-gray-200">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Menu
                      </h2>
                      <p className="text-sm text-gray-500 mt-0.5">Navigate to different sections</p>
                    </div>
                  </div>

                  <div className="px-6 py-6 space-y-8">
                    {/* Main Navigation */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
                        Navigation
                      </h3>
                      <div className="space-y-2">
                        <SheetClose asChild>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start h-11 px-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group" 
                            asChild
                          >
                            <Link href="/dashboard" className="flex items-center w-full">
                              <div className="mr-3 p-1.5 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition-colors">
                                <LayoutDashboard className="h-4 w-4" />
                              </div>
                              <span className="font-medium text-gray-900">Dashboard</span>
                            </Link>
                          </Button>
                        </SheetClose>

                        <SheetClose asChild>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start h-11 px-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-all duration-200 group" 
                            asChild
                          >
                            <Link href="/dashboard/spaces" className="flex items-center w-full">
                              <div className="mr-3 p-1.5 rounded-lg bg-white/20 text-white transition-colors">
                                <Layers className="h-4 w-4" />
                              </div>
                              <span className="font-medium">My Spaces</span>
                            </Link>
                          </Button>
                        </SheetClose>

                        <SheetClose asChild>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start h-11 px-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group" 
                            asChild
                          >
                            <Link href="/dashboard/settings" className="flex items-center w-full">
                              <div className="mr-3 p-1.5 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition-colors">
                                <Settings className="h-4 w-4" />
                              </div>
                              <span className="font-medium text-gray-900">Settings</span>
                            </Link>
                          </Button>
                        </SheetClose>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
                        Quick Actions
                      </h3>
                      <div className="space-y-2">
                        <SheetClose asChild>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start h-11 px-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group" 
                            asChild
                          >
                            <Link href="/dashboard/spaces/new" className="flex items-center w-full">
                              <div className="mr-3 p-1.5 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition-colors">
                                <Plus className="h-4 w-4" />
                              </div>
                              <span className="font-medium text-gray-900">Create Space</span>
                            </Link>
                          </Button>
                        </SheetClose>

                        <SheetClose asChild>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start h-11 px-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group" 
                            asChild
                          >
                            <Link href="/dashboard/profile" className="flex items-center w-full">
                              <div className="mr-3 p-1.5 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition-colors">
                                <User className="h-4 w-4" />
                              </div>
                              <span className="font-medium text-gray-900">Profile</span>
                            </Link>
                          </Button>
                        </SheetClose>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 border-t border-gray-200">
                    <SheetClose asChild>
                      <Button 
                        variant="ghost" 
                        className="w-full h-11 rounded-xl hover:bg-gray-100 transition-all duration-200 group font-medium" 
                        asChild
                      >
                        <Link href="/" className="flex items-center justify-center w-full">
                          <div className="mr-3 p-1.5 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition-colors">
                            <Home className="h-4 w-4" />
                          </div>
                          <span className="text-gray-900">Back to Home</span>
                        </Link>
                      </Button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-4 sm:py-8 px-4 sm:px-6 mx-auto">
        <div className="max-w-5xl mx-auto">


          <div className="mb-4 sm:mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search spaces..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="private">Private</TabsTrigger>
              <TabsTrigger value="public">Public</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {filteredSpaces.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSpaces.map((space) => (
                    <Card key={space.id} className="overflow-hidden">
                      <CardHeader className="pb-2 sm:pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg sm:text-xl truncate">{space.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1 mt-1 flex-wrap">
                              {space.isPrivate ? (
                                <>
                                  <Lock className="h-3 w-3" /> <span className="hidden xs:inline">Private</span>
                                </>
                              ) : (
                                <>
                                  <Globe className="h-3 w-3" /> <span className="hidden xs:inline">Public</span>
                                </>
                              )}
                              <span className="mx-1 hidden xs:inline">•</span>
                              <Clock className="h-3 w-3" /> <span className="hidden xs:inline">Expires</span>{" "}
                              {formatDate(space.expiresAt)}
                            </CardDescription>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/space/${space.id}`} className="cursor-pointer">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Open Space
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/space/${space.id}/settings`} className="cursor-pointer">
                                  <Settings className="mr-2 h-4 w-4" />
                                  Space Settings
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 focus:text-red-600"
                                onClick={() => {
                                  setSpaceToDelete(space.id)
                                  setShowDeleteDialog(true)
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Space
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            <div>Created {formatDate(space.createdAt)}</div>
                            <div>Last activity {formatTimeAgo(space.lastActivity)}</div>
                          </div>
                          <div className="flex gap-3 text-xs sm:text-sm">
                            <div className="flex flex-col items-center">
                              <span className="font-bold">{space.messageCount}</span>
                              <span className="text-muted-foreground">Messages</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="font-bold">{space.fileCount}</span>
                              <span className="text-muted-foreground">Files</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          className="w-full mt-4 bg-black hover:bg-gray-900 text-white"
                          onClick={() => router.push(`/space/${space.id}`)}
                        >
                          Enter Space
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium mb-2">No spaces found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery ? `No spaces matching "${searchQuery}"` : "You haven't created any spaces yet."}
                  </p>
                  {!searchQuery && (
                    <Button className="bg-black hover:bg-gray-900 text-white" asChild>
                      <Link href="/dashboard">
                        <Plus className="mr-2 h-4 w-4" /> Create Your First Space
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="private">
              {filteredSpaces.filter((space) => space.isPrivate).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSpaces
                    .filter((space) => space.isPrivate)
                    .map((space) => (
                      <Card key={space.id} className="overflow-hidden">
                        <CardHeader className="pb-2 sm:pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg sm:text-xl truncate">{space.name}</CardTitle>
                              <CardDescription className="flex items-center gap-1 mt-1 flex-wrap">
                                <Lock className="h-3 w-3" /> <span className="hidden xs:inline">Private</span>
                                <span className="mx-1 hidden xs:inline">•</span>
                                <Clock className="h-3 w-3" /> <span className="hidden xs:inline">Expires</span>{" "}
                                {formatDate(space.expiresAt)}
                              </CardDescription>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/space/${space.id}`} className="cursor-pointer">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Open Space
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/space/${space.id}/settings`} className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Space Settings
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600 focus:text-red-600"
                                  onClick={() => {
                                    setSpaceToDelete(space.id)
                                    setShowDeleteDialog(true)
                                  }}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Space
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                            <div className="text-xs sm:text-sm text-muted-foreground">
                              <div>Created {formatDate(space.createdAt)}</div>
                              <div>Last activity {formatTimeAgo(space.lastActivity)}</div>
                            </div>
                            <div className="flex gap-3 text-xs sm:text-sm">
                              <div className="flex flex-col items-center">
                                <span className="font-bold">{space.messageCount}</span>
                                <span className="text-muted-foreground">Messages</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className="font-bold">{space.fileCount}</span>
                                <span className="text-muted-foreground">Files</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            className="w-full mt-4 bg-black hover:bg-gray-900 text-white"
                            onClick={() => router.push(`/space/${space.id}`)}
                          >
                            Enter Space
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium mb-2">No private spaces found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery
                      ? `No private spaces matching "${searchQuery}"`
                      : "You haven't created any private spaces yet."}
                  </p>
                  {!searchQuery && (
                    <Button className="bg-black hover:bg-gray-900 text-white" asChild>
                      <Link href="/dashboard">
                        <Plus className="mr-2 h-4 w-4" /> Create Private Space
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="public">
              {filteredSpaces.filter((space) => !space.isPrivate).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSpaces
                    .filter((space) => !space.isPrivate)
                    .map((space) => (
                      <Card key={space.id} className="overflow-hidden">
                        <CardHeader className="pb-2 sm:pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg sm:text-xl truncate">{space.name}</CardTitle>
                              <CardDescription className="flex items-center gap-1 mt-1 flex-wrap">
                                <Globe className="h-3 w-3" /> <span className="hidden xs:inline">Public</span>
                                <span className="mx-1 hidden xs:inline">•</span>
                                <Clock className="h-3 w-3" /> <span className="hidden xs:inline">Expires</span>{" "}
                                {formatDate(space.expiresAt)}
                              </CardDescription>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/space/${space.id}`} className="cursor-pointer">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Open Space
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/space/${space.id}/settings`} className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Space Settings
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600 focus:text-red-600"
                                  onClick={() => {
                                    setSpaceToDelete(space.id)
                                    setShowDeleteDialog(true)
                                  }}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Space
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                            <div className="text-xs sm:text-sm text-muted-foreground">
                              <div>Created {formatDate(space.createdAt)}</div>
                              <div>Last activity {formatTimeAgo(space.lastActivity)}</div>
                            </div>
                            <div className="flex gap-3 text-xs sm:text-sm">
                              <div className="flex flex-col items-center">
                                <span className="font-bold">{space.messageCount}</span>
                                <span className="text-muted-foreground">Messages</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className="font-bold">{space.fileCount}</span>
                                <span className="text-muted-foreground">Files</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            className="w-full mt-4 bg-black hover:bg-gray-900 text-white"
                            onClick={() => router.push(`/space/${space.id}`)}
                          >
                            Enter Space
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium mb-2">No public spaces found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery
                      ? `No public spaces matching "${searchQuery}"`
                      : "You haven't created any public spaces yet."}
                  </p>
                  {!searchQuery && (
                    <Button className="bg-black hover:bg-gray-900 text-white" asChild>
                      <Link href="/dashboard">
                        <Plus className="mr-2 h-4 w-4" /> Create Public Space
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="w-full border-t bg-background py-4 sm:py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MySpaceIs. All rights reserved.
        </div>
      </footer>

      {/* Delete Space Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Space</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this space? This action cannot be undone and all content will be
              permanently lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="sm:flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteSpace} className="sm:flex-1">
              Delete Space
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
