"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/shared /Header"
import { MOCK_SPACES } from "@/lib/constant /mock_data"
import { formatDate, formatTimeAgo } from "@/lib/utils"
import { useRouter } from "next/navigation"
import {
  Plus,
  Search,
  MoreVertical,
  Trash2,
  Settings,
  ExternalLink,
  Clock,
  Lock,
  Globe,
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SpacesPage() {
  const router = useRouter()
  const [spaces, setSpaces] = useState(MOCK_SPACES)
  const [searchQuery, setSearchQuery] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [spaceToDelete, setSpaceToDelete] = useState<string | null>(null)
  const filteredSpaces = spaces.filter((space) => space.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleDeleteSpace = () => {
    if (!spaceToDelete) return
    // In a real app, this would make an API call to delete the space
    setSpaces(spaces.filter((space) => space.id !== spaceToDelete))
    setSpaceToDelete(null)
    setShowDeleteDialog(false)
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
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
