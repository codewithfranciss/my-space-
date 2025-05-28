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
  Menu,
  Search,
  MoreVertical,
  ExternalLink,
  Settings,
  Home,
   Folder,
  Trash2,
  CheckCircle2
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
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { title: "Dashboard", href: "/dashboard", icon: Home },
    { title: "My Spaces", href: "/dashboard/spaces", icon: Folder },
    { title: "Settings", href: "/dashboard/settings", icon: Settings },
  ]
  const usedSpaces = 120
  const totalSpaces = 500
  const usagePercent = Math.min((usedSpaces / totalSpaces) * 100, 100)
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
  const [linkCopied, setLinkCopied] = useState(false)

  const filteredSpaces = RECENT_SPACES.filter((space) => 
    space.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
    setLinkCopied(true)
  
    
    setTimeout(() => {
      setLinkCopied(false)
    }, 2000)
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

    // In a real app, you would call an API to delete the space


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
    <div className="flex min-h-screen flex-col bg-slate-50">
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/95">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Share2 className="h-6 w-6 text-indigo-600" />
          <span className="text-xl font-bold text-slate-900">MySpaceIs</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(({ title, href, icon: Icon }, index) => (
            <Link
              key={index}
              href={href}
              className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors"
            >
              <Icon className="h-4 w-4" />
              {title}
            </Link>
          ))}
        </nav>

        {/* Desktop Usage Meter */}
        <div className="hidden md:flex flex-col items-end text-sm text-slate-600 w-52">
          <span className="mb-1">
            Used <span className="font-semibold text-slate-900">{usedSpaces}</span> of{" "}
            <span className="font-semibold text-slate-900">{totalSpaces}</span> Spaces
          </span>
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? (
              <X className="h-6 w-6 text-slate-700" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 py-4 space-y-4 border-t bg-white">
          {navItems.map(({ title, href, icon: Icon }, index) => (
            <Link
              key={index}
              href={href}
              className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              <Icon className="h-4 w-4" />
              {title}
            </Link>
          ))}
          <div className="mt-4 text-sm text-slate-600">
            Used <span className="font-semibold text-slate-900">{usedSpaces}</span> of{" "}
            <span className="font-semibold text-slate-900">{totalSpaces}</span> Spaces
          </div>
          <div className="w-full h-2 mt-1 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>
      )}

<div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 md:hidden">
        <div className="flex justify-around items-center h-16">
          {navItems.map(({ title, href, icon: Icon }, index) => (
            <Link
              key={index}
              href={href}
              className="flex flex-col items-center justify-center text-xs font-medium text-slate-700 hover:text-indigo-600"
            >
              <Icon className="h-5 w-5 mb-1" />
              {title}
            </Link>
          ))}
        </div>
      </div>
    </header>

      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">

          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100">
              <TabsTrigger 
                value="create" 
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Create Space
              </TabsTrigger>
              <TabsTrigger 
                value="recent"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Recent Spaces
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900">Create a New Space</CardTitle>
                  <CardDescription className="text-slate-600">Create a space to share content across your devices or with others.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {!showQrCode ? (
                    <form onSubmit={handleCreateSpace} className="space-y-6">
                      {step === 1 && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="space-name" className="text-slate-700">Space Name</Label>
                            <Input
                              id="space-name"
                              placeholder="Enter a name for your space"
                              value={spaceName}
                              onChange={(e) => setSpaceName(e.target.value)}
                              className="border-slate-200 focus:border-indigo-600 focus:ring-indigo-600"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="private-toggle" className="text-slate-700">Private Space</Label>
                              <Switch 
                                id="private-toggle" 
                                checked={isPrivate} 
                                onCheckedChange={setIsPrivate}
                                className="data-[state=checked]:bg-indigo-600"
                              />
                            </div>
                            <p className="text-sm text-slate-600">
                              {isPrivate
                                ? "This space will be protected with a PIN."
                                : "Anyone with the link can access this space."}
                            </p>
                          </div>

                          {isPrivate && (
                            <div className="space-y-2">
                              <Label htmlFor="pin" className="text-slate-700">PIN (4+ digits)</Label>
                              <Input
                                id="pin"
                                type="password"
                                placeholder="Enter a PIN"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                minLength={4}
                                className="border-slate-200 focus:border-indigo-600 focus:ring-indigo-600"
                              />
                              <p className="text-sm text-slate-600">
                                This PIN will be required to access your space.
                              </p>
                            </div>
                          )}

                          <Button
                            type="button"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                            onClick={() => setStep(2)}
                          >
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label className="text-slate-700">Expiration</Label>
                            <RadioGroup
                              defaultValue="hours"
                              value={expirationType}
                              onValueChange={setExpirationType}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="hours" id="hours" className="text-indigo-600 border-indigo-600" />
                                <Label htmlFor="hours" className="text-slate-700">Hours</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="days" id="days" className="text-indigo-600 border-indigo-600" />
                                <Label htmlFor="days" className="text-slate-700">Days</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="custom" id="custom" className="text-indigo-600 border-indigo-600" />
                                <Label htmlFor="custom" className="text-slate-700">Custom Date</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          {expirationType !== "custom" ? (
                            <div className="space-y-2">
                              <Label htmlFor="expiration-value" className="text-slate-700">
                                {expirationType === "hours" ? "Hours" : "Days"} until expiration
                              </Label>
                              <Select value={expirationValue} onValueChange={setExpirationValue}>
                                <SelectTrigger id="expiration-value" className="border-slate-200 focus:ring-indigo-600">
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
                              <Label htmlFor="expiration-date" className="text-slate-700">Expiration Date</Label>
                              <Input 
                                id="expiration-date" 
                                type="date" 
                                min={new Date().toISOString().split("T")[0]}
                                className="border-slate-200 focus:border-indigo-600 focus:ring-indigo-600"
                              />
                            </div>
                          )}

                          <div className="flex gap-3">
                            <Button 
                              type="button" 
                              variant="outline" 
                              className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
                              onClick={() => setStep(1)}
                            >
                              Back
                            </Button>
                            <Button 
                              type="submit" 
                              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                              Create Space
                            </Button>
                          </div>
                        </div>
                      )}
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-slate-900">Space Created!</h3>
                        <Button variant="ghost" size="icon" onClick={resetForm} className="text-slate-700 hover:bg-slate-100">
                          <X className="h-4 w-4" />
                          <span className="sr-only">Close</span>
                        </Button>
                      </div>

                      <div className="flex flex-col items-center justify-center space-y-4 p-6 border rounded-lg bg-indigo-50 border-indigo-100">
                        <div className="text-center mb-2">
                          <h3 className="font-medium text-slate-900">{spaceName}</h3>
                          <p className="text-sm text-slate-600">
                            {isPrivate ? (
                              <span className="flex items-center justify-center gap-1">
                                <Lock className="h-3 w-3 text-indigo-600" /> Private Space
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-1">
                                <Globe className="h-3 w-3 text-indigo-600" /> Public Space
                              </span>
                            )}
                          </p>
                          <div className="flex items-center justify-center gap-1 text-sm text-slate-600 mt-1">
                            <Clock className="h-3 w-3 text-indigo-600" />
                            <span>
                              Expires in {expirationValue} {expirationType}
                            </span>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                          <QrCode className="h-48 w-48 text-indigo-600" />
                        </div>

                        <div className="w-full space-y-4">
                          <div className="flex items-center">
                            <Input
                              readOnly
                              value={`https://myspaceis.com/space/${createdSpaceId}`}
                              className="rounded-r-none border-slate-200"
                            />
                            <Button 
                              variant="outline" 
                              className="rounded-l-none border-l-0 border-slate-200 hover:bg-indigo-50" 
                              onClick={handleCopyLink}
                            >
                              {linkCopied ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <Button 
                              variant="outline" 
                              onClick={handleCopyLink}
                              className="border-slate-200 text-slate-700 hover:border-indigo-600 hover:text-indigo-600"
                            >
                              Share Space
                            </Button>
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                              Enter Space
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recent">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-slate-900">Recent Spaces</CardTitle>
                    <CardDescription className="text-slate-600">View and manage your recently created spaces.</CardDescription>
                  </div>
                  <div className="w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                      <Input
                        placeholder="Search spaces..."
                        className="pl-10 w-full sm:w-[200px] border-slate-200 focus:border-indigo-600 focus:ring-indigo-600"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {filteredSpaces.length > 0 ? (
                    <div className="space-y-4">
                      {filteredSpaces.map((space) => (
                        <Card key={space.id} className="overflow-hidden border-slate-200 transition-all hover:shadow-md">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <CardTitle className="text-lg text-slate-900">{space.name}</CardTitle>
                                  <Badge 
                                    variant={space.isPrivate ? "outline" : "secondary"} 
                                    className={`ml-2 ${space.isPrivate ? 'border-indigo-600 text-indigo-600' : 'bg-indigo-100 text-indigo-600'}`}
                                  >
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
                                <CardDescription className="flex items-center gap-1 mt-1 text-slate-600">
                                  <Clock className="h-3 w-3 text-indigo-600" />
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
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-700 hover:bg-indigo-50">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="border-slate-200">
                                  <DropdownMenuItem asChild className="text-slate-700 focus:text-indigo-600 focus:bg-indigo-50">
                                    <Link href={`/space/${space.id}`} className="cursor-pointer">
                                      <ExternalLink className="mr-2 h-4 w-4" />
                                      Open Space
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild className="text-slate-700 focus:text-indigo-600 focus:bg-indigo-50">
                                    <Link href={`/space/${space.id}/settings`} className="cursor-pointer">
                                      <Settings className="mr-2 h-4 w-4" />
                                      Space Settings
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
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
                              <div className="text-xs sm:text-sm text-slate-600">
                                <div>Created {formatDate(space.createdAt)}</div>
                                <div>Last activity {formatTimeAgo(space.lastActivity)}</div>
                              </div>
                              <div className="flex gap-6 text-xs sm:text-sm">
                                <div className="flex flex-col items-center">
                                  <span className="font-bold text-slate-900">{space.messageCount}</span>
                                  <span className="text-slate-600">Messages</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <span className="font-bold text-slate-900">{space.fileCount}</span>
                                  <span className="text-slate-600">Files</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                              <Link href={`/space/${space.id}`}>Enter Space</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-indigo-50/50 rounded-lg">
                      <p className="text-slate-600 mb-2">
                        {searchQuery ? `No spaces matching "${searchQuery}"` : "You haven't created any spaces yet."}
                      </p>
                      {!searchQuery && (
                        <Button
                          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
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



      {/* Delete Space Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-slate-900">Delete Space</DialogTitle>
            <DialogDescription className="text-slate-600">
              Are you sure you want to delete this space? This action cannot be undone and all content will be
              permanently lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <DialogClose asChild>
              <Button 
                variant="outline" 
                className="sm:flex-1 border-slate-200 text-slate-700 hover:border-indigo-600 hover:text-indigo-600"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={handleDeleteSpace} 
              className="sm:flex-1 bg-red-600 hover:bg-red-700"
            >
              Delete Space
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}