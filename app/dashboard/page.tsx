"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Share2,
  QrCode,
  Copy,
  ArrowRight,
  Clock,
  Lock,
  Globe,
  X,
  Search,
  MoreVertical,
  ExternalLink,
  Settings,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"


// Mock data for recent spaces
const RECENT_SPACES = [
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
]

export default function Dashboard() {
 
  const [step, setStep] = useState(1)
  const [spaceName, setSpaceName] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [pin, setPin] = useState("")
  const [expirationType, setExpirationType] = useState("hours")
  const [expirationValue, setExpirationValue] = useState("24")
  const [showQrCode, setShowQrCode] = useState(false)
  const [createdSpaceId, setCreatedSpaceId] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [spaceToDelete, setSpaceToDelete] = useState<string | null>(null)

  const filteredSpaces = RECENT_SPACES.filter((space) => space.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleCreateSpace = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!spaceName.trim()) {

      return
    }

    if (isPrivate && (!pin || pin.length < 4)) {

      return
    }

    // Generate a random space ID (in a real app, this would come from the backend)
    const randomId = Math.random().toString(36).substring(2, 10)
    setCreatedSpaceId(randomId)
    setShowQrCode(true)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://myspaceis.com/space/${createdSpaceId}`)

  }

  const resetForm = () => {
    setSpaceName("")
    setIsPrivate(false)
    setPin("")
    setExpirationType("hours")
    setExpirationValue("24")
    setShowQrCode(false)
    setCreatedSpaceId("")
    setStep(1)
  }

  const handleDeleteSpace = () => {
    if (!spaceToDelete) return

  

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

  const getDaysUntilExpiration = (expiresAt: string) => {
    const expirationDate = new Date(expiresAt)
    const now = new Date()
    const diffInDays = Math.ceil((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diffInDays
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="h-6 w-6 text-black" />
            <span className="text-xl font-bold">MySpaceIs</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:text-gray-700 transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard/spaces" className="text-sm font-medium hover:text-gray-700 transition-colors">
              My Spaces
            </Link>
            <Link href="/dashboard/settings" className="text-sm font-medium hover:text-gray-700 transition-colors">
              Settings
            </Link>
          </nav>
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="create">Create Space</TabsTrigger>
              <TabsTrigger value="recent">Recent Spaces</TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create a New Space</CardTitle>
                  <CardDescription>Create a space to share content across your devices or with others.</CardDescription>
                </CardHeader>
                <CardContent>
                  {!showQrCode ? (
                    <form onSubmit={handleCreateSpace} className="space-y-6">
                      {step === 1 && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="space-name">Space Name</Label>
                            <Input
                              id="space-name"
                              placeholder="Enter a name for your space"
                              value={spaceName}
                              onChange={(e) => setSpaceName(e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="private-toggle">Private Space</Label>
                              <Switch id="private-toggle" checked={isPrivate} onCheckedChange={setIsPrivate} />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {isPrivate
                                ? "This space will be protected with a PIN."
                                : "Anyone with the link can access this space."}
                            </p>
                          </div>

                          {isPrivate && (
                            <div className="space-y-2">
                              <Label htmlFor="pin">PIN (4+ digits)</Label>
                              <Input
                                id="pin"
                                type="password"
                                placeholder="Enter a PIN"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                minLength={4}
                              />
                              <p className="text-sm text-muted-foreground">
                                This PIN will be required to access your space.
                              </p>
                            </div>
                          )}

                          <Button
                            type="button"
                            className="w-full bg-black hover:bg-gray-900 text-white"
                            onClick={() => setStep(2)}
                          >
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label>Expiration</Label>
                            <RadioGroup
                              defaultValue="hours"
                              value={expirationType}
                              onValueChange={setExpirationType}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="hours" id="hours" />
                                <Label htmlFor="hours">Hours</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="days" id="days" />
                                <Label htmlFor="days">Days</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="custom" id="custom" />
                                <Label htmlFor="custom">Custom Date</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          {expirationType !== "custom" ? (
                            <div className="space-y-2">
                              <Label htmlFor="expiration-value">
                                {expirationType === "hours" ? "Hours" : "Days"} until expiration
                              </Label>
                              <Select value={expirationValue} onValueChange={setExpirationValue}>
                                <SelectTrigger id="expiration-value">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  {expirationType === "hours" ? (
                                    <>
                                      <SelectItem value="1">1 hour</SelectItem>
                                      <SelectItem value="6">6 hours</SelectItem>
                                      <SelectItem value="12">12 hours</SelectItem>
                                      <SelectItem value="24">24 hours</SelectItem>
                                      <SelectItem value="48">48 hours</SelectItem>
                                    </>
                                  ) : (
                                    <>
                                      <SelectItem value="1">1 day</SelectItem>
                                      <SelectItem value="3">3 days</SelectItem>
                                      <SelectItem value="7">7 days</SelectItem>
                                      <SelectItem value="14">14 days</SelectItem>
                                      <SelectItem value="30">30 days</SelectItem>
                                    </>
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Label htmlFor="expiration-date">Expiration Date</Label>
                              <Input id="expiration-date" type="date" min={new Date().toISOString().split("T")[0]} />
                            </div>
                          )}

                          <div className="flex gap-3">
                            <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                              Back
                            </Button>
                            <Button type="submit" className="flex-1 bg-black hover:bg-gray-900 text-white">
                              Create Space
                            </Button>
                          </div>
                        </div>
                      )}
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Space Created!</h3>
                        <Button variant="ghost" size="icon" onClick={resetForm}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Close</span>
                        </Button>
                      </div>

                      <div className="flex flex-col items-center justify-center space-y-4 p-6 border rounded-lg bg-gray-50">
                        <div className="text-center mb-2">
                          <h3 className="font-medium">{spaceName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {isPrivate ? (
                              <span className="flex items-center justify-center gap-1">
                                <Lock className="h-3 w-3" /> Private Space
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-1">
                                <Globe className="h-3 w-3" /> Public Space
                              </span>
                            )}
                          </p>
                          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                            <Clock className="h-3 w-3" />
                            <span>
                              Expires in {expirationValue} {expirationType}
                            </span>
                          </div>
                        </div>

                        <div className="bg-white p-2 rounded-lg border">
                          <QrCode className="h-48 w-48" />
                        </div>

                        <div className="w-full space-y-3">
                          <div className="flex items-center">
                            <Input
                              readOnly
                              value={`https://myspaceis.com/space/${createdSpaceId}`}
                              className="rounded-r-none"
                            />
                            <Button variant="outline" className="rounded-l-none border-l-0" onClick={handleCopyLink}>
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" onClick={handleCopyLink}>
                              Share Space
                            </Button>
                            <Button className="bg-black hover:bg-gray-900 text-white">Enter Space</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recent">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Recent Spaces</CardTitle>
                    <CardDescription>View and manage your recently created spaces.</CardDescription>
                  </div>
                  <div className="w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search spaces..."
                        className="pl-10 w-full sm:w-[200px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredSpaces.length > 0 ? (
                    <div className="space-y-4">
                      {filteredSpaces.map((space) => (
                        <Card key={space.id} className="overflow-hidden">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <CardTitle className="text-lg">{space.name}</CardTitle>
                                  <Badge variant={space.isPrivate ? "outline" : "secondary"} className="ml-2">
                                    {space.isPrivate ? (
                                      <span className="flex items-center gap-1">
                                        <Lock className="h-3 w-3" /> Private
                                      </span>
                                    ) : (
                                      <span className="flex items-center gap-1">
                                        <Globe className="h-3 w-3" /> Public
                                      </span>
                                    )}
                                  </Badge>
                                </div>
                                <CardDescription className="flex items-center gap-1 mt-1">
                                  <Clock className="h-3 w-3" />
                                  <span>
                                    Expires in {getDaysUntilExpiration(space.expiresAt)} days
                                    {getDaysUntilExpiration(space.expiresAt) <= 3 && (
                                      <Badge variant="destructive" className="ml-2 text-xs">
                                        Expiring soon
                                      </Badge>
                                    )}
                                  </span>
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
                          <CardContent className="pb-2">
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
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button className="w-full bg-black hover:bg-gray-900 text-white" asChild>
                              <Link href={`/space/${space.id}`}>Enter Space</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        {searchQuery ? `No spaces matching "${searchQuery}"` : "You haven't created any spaces yet."}
                      </p>
                      {!searchQuery && (
                        <Button
                          className="mt-4 bg-black hover:bg-gray-900 text-white"
                          onClick={() => {
                            const tabsList = document.querySelector('[role="tablist"]')
                            const createTab = tabsList?.querySelector('[value="create"]')
                            if (createTab instanceof HTMLElement) {
                              createTab.click()
                            }
                          }}
                        >
                          Create Your First Space
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="w-full border-t bg-background py-6">
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
