"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import {
  Share2,
  Send,
  ImageIcon,
  FileText,
  Video,
  Paperclip,
  MoreVertical,
  Trash2,
  Settings,
  ChevronLeft,
  Download,
  Copy,
  Clock,
  Lock,
  Globe,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

import { cn } from "@/lib/utils"
import { QrCode } from "lucide-react"


// Mock data for demonstration
const MOCK_SPACE = {
  id: "abc123",
  name: "Project Collaboration",
  isPrivate: true,
  pin: "1234",
  expirationType: "days",
  expirationValue: "7",
  createdAt: new Date().toISOString(),
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
}
type MessageType = {
  id: string
  type: "text" | "image" | "video" | "file"
  content: string
  sender: string
  timestamp: string
  isMine: boolean
  caption?: string
  fileSize?: string
}
// Mock messages for demonstration
const MOCK_MESSAGES : MessageType[] = [
  {
    id: "1",
    type: "text",
    content: "Hey team, I've started working on the project. Let me know your thoughts!",
    sender: "You",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isMine: true,
  },
  {
    id: "2",
    type: "text",
    content: "Looks great! I'll review it this afternoon.",
    sender: "Sarah",
    timestamp: new Date(Date.now() - 3000000).toISOString(),
    isMine: false,
  },
  {
    id: "3",
    type: "image",
    content: "/placeholder.svg?height=400&width=600&text=Design+Mockup",
    sender: "You",
    timestamp: new Date(Date.now() - 2400000).toISOString(),
    isMine: true,
    caption: "Here's the design mockup",
  },
  {
    id: "4",
    type: "file",
    content: "project-requirements.pdf",
    sender: "Mike",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    isMine: false,
    fileSize: "2.4 MB",
  },
  {
    id: "5",
    type: "video",
    content: "/placeholder.svg?height=400&width=600&text=Product+Demo+Video",
    sender: "You",
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    isMine: true,
    caption: "Quick demo of the product",
  },
]



export default function SpacePage() {
  const params = useParams()
  const router = useRouter()
  
  const [messages, setMessages] = useState<MessageType[]>(MOCK_MESSAGES)
  const [newMessage, setNewMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showInfoDialog, setShowInfoDialog] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const spaceId = params.id as string

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const newMsg: MessageType = {
      id: Date.now().toString(),
      type: "text",
      content: newMessage,
      sender: "You",
      timestamp: new Date().toISOString(),
      isMine: true,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const handleFileUpload = (type: "file" | "image" | "video") => {
    setIsUploading(true)

    // Simulate file upload delay
    setTimeout(() => {
      let newMsg: MessageType

      if (type === "image") {
        newMsg = {
          id: Date.now().toString(),
          type: "image",
          content: "/placeholder.svg?height=400&width=600&text=Uploaded+Image",
          sender: "You",
          timestamp: new Date().toISOString(),
          isMine: true,
          caption: "Uploaded image",
        }
      } else if (type === "video") {
        newMsg = {
          id: Date.now().toString(),
          type: "video",
          content: "/placeholder.svg?height=400&width=600&text=Uploaded+Video",
          sender: "You",
          timestamp: new Date().toISOString(),
          isMine: true,
          caption: "Uploaded video",
        }
      } else {
        newMsg = {
          id: Date.now().toString(),
          type: "file",
          content: "uploaded-document.pdf",
          sender: "You",
          timestamp: new Date().toISOString(),
          isMine: true,
          fileSize: "1.2 MB",
        }
      }

      setMessages([...messages, newMsg])
      setIsUploading(false)
    }, 1500)
  }

  const handleDeleteSpace = () => {
    // In a real app, this would make an API call to delete the space
    router.push("/dashboard/spaces")
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://myspaceis.com/space/${spaceId}`)

  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 mx-auto items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="md:flex">
              <Link href="/dashboard/spaces">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex flex-col">
              <span className="text-base font-medium truncate max-w-[150px] sm:max-w-xs md:max-w-md">
                {MOCK_SPACE.name}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                {MOCK_SPACE.isPrivate ? (
                  <>
                    <Lock className="h-3 w-3" /> <span className="hidden xs:inline">Private</span>
                  </>
                ) : (
                  <>
                    <Globe className="h-3 w-3" /> <span className="hidden xs:inline">Public</span>
                  </>
                )}
                <span className="mx-1 hidden xs:inline">•</span>
                <Clock className="h-3 w-3" />{" "}
                <span className="hidden xs:inline">
                  Expires in {MOCK_SPACE.expirationValue} {MOCK_SPACE.expirationType}
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setShowShareDialog(true)} title="Share">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowInfoDialog(true)} title="Space Info">
              <Clock className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/space/${spaceId}/settings`} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Space Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => setShowDeleteDialog(true)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Space
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {MOCK_SPACE.name}
            </h2>
      
          </div>

        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
            Actions
          </h3>
          <div className="space-y-2">
            <SheetClose asChild>
              <Button
                variant="ghost"
                className="w-full justify-start h-11 px-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                onClick={() => setShowShareDialog(true)}
              >
                <div className="mr-3 p-1.5 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition-colors">
                  <Share2 className="h-4 w-4" />
                </div>
                <span className="font-medium text-gray-900">Share Space</span>
              </Button>
            </SheetClose>
            
            <SheetClose asChild>
              <Button
                variant="ghost"
                className="w-full justify-start h-11 px-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                onClick={() => setShowInfoDialog(true)}
              >
                <div className="mr-3 p-1.5 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition-colors">
                  <Clock className="h-4 w-4" />
                </div>
                <span className="font-medium text-gray-900">Space Info</span>
              </Button>
            </SheetClose>
            
            <SheetClose asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start h-11 px-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group" 
                asChild
              >
                <Link href={`/space/${spaceId}/settings`} className="flex items-center w-full">
                  <div className="mr-3 p-1.5 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition-colors">
                    <Settings className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-gray-900">Space Settings</span>
                </Link>
              </Button>
            </SheetClose>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 border-t border-gray-200">
        <SheetClose asChild>
          <Button 
            variant="ghost" 
            className="w-full h-11 rounded-xl hover:bg-gray-100 transition-all duration-200 group font-medium"
          >
            <div className="mr-3 p-1.5 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition-colors">
              <Trash2 className="h-4 w-4" />
            </div>
            <span className="text-gray-900">Delete Space</span>
          </Button>
        </SheetClose>
      </div>
    </SheetContent>
  </Sheet>
</div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[80%]",
              message.isMine ? "ml-auto flex-row-reverse" : "",
            )}
          >
            <Avatar className="h-7 w-7 sm:h-8 sm:w-8 mt-1 flex-shrink-0">
              <AvatarFallback>{message.sender[0]}</AvatarFallback>
            </Avatar>
            <div className={cn("flex flex-col", message.isMine ? "items-end" : "items-start")}>
              <div
                className={cn(
                  "rounded-lg p-2 sm:p-3",
                  message.isMine ? "bg-black text-white rounded-tr-none" : "bg-gray-100 rounded-tl-none",
                )}
              >
                {message.type === "text" && (
                  <p className="whitespace-pre-wrap break-words text-sm sm:text-base">{message.content}</p>
                )}

                {message.type === "image" && (
                  <div className="space-y-2">
                    <div className="relative rounded-md overflow-hidden">
                      <Image
                        src={message.content || "/placeholder.svg"}
                        alt={message.caption || "Image"}
                        width={300}
                        height={200}
                        className="object-cover max-w-[200px] sm:max-w-[300px] w-full"
                      />
                    </div>
                    {message.caption && <p className="text-xs sm:text-sm">{message.caption}</p>}
                  </div>
                )}

                {message.type === "video" && (
                  <div className="space-y-2">
                    <div className="relative rounded-md overflow-hidden">
                      <Image
                        src={message.content || "/placeholder.svg"}
                        alt={message.caption || "Video"}
                        width={300}
                        height={200}
                        className="object-cover max-w-[200px] sm:max-w-[300px] w-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full bg-black/50 p-2 sm:p-3">
                          <Video className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                      </div>
                    </div>
                    {message.caption && <p className="text-xs sm:text-sm">{message.caption}</p>}
                  </div>
                )}

                {message.type === "file" && (
                  <div className="flex items-center gap-2 sm:gap-3 min-w-[150px] sm:min-w-[200px]">
                    <div className="rounded-full bg-gray-200 p-1.5 sm:p-2">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-xs sm:text-sm">{message.content}</p>
                      <p className="text-xs text-muted-foreground">{message.fileSize}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
                      <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <span>{message.sender}</span>
                <span>•</span>
                <span>{formatTimestamp(message.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-2 sm:p-4">
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <div className="flex-1 relative">
            <Textarea
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="min-h-[60px] resize-none pr-12"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage(e)
                }
              }}
            />
            <div className="absolute bottom-2 right-2 flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8"
                onClick={() => imageInputRef.current?.click()}
                disabled={isUploading}
              >
                <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8"
                onClick={() => videoInputRef.current?.click()}
                disabled={isUploading}
              >
                <Video className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            size="icon"
            className="h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] rounded-full bg-black hover:bg-gray-900"
            disabled={!newMessage.trim() || isUploading}
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </form>

        {/* Hidden file inputs */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.zip,.rar"
          onChange={() => handleFileUpload("file")}
        />
        <input
          type="file"
          ref={imageInputRef}
          className="hidden"
          accept="image/*"
          onChange={() => handleFileUpload("image")}
        />
        <input
          type="file"
          ref={videoInputRef}
          className="hidden"
          accept="video/*"
          onChange={() => handleFileUpload("video")}
        />
      </div>

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

      {/* Share Space Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Space</DialogTitle>
            <DialogDescription>Share this space with others using the link or QR code.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-2 rounded-lg border">
              <div className="h-48 w-48 flex items-center justify-center bg-gray-50">
                <QrCode className="h-40 w-40" />
              </div>
            </div>
            <div className="flex items-center w-full">
              <Input
                readOnly
                value={`https://myspaceis.com/space/${spaceId}`}
                className="rounded-r-none text-xs sm:text-sm"
              />
              <Button variant="outline" className="rounded-l-none border-l-0" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {MOCK_SPACE.isPrivate && (
              <div className="w-full">
                <p className="text-sm font-medium mb-2">PIN Code</p>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <span className="font-mono text-lg tracking-widest">{MOCK_SPACE.pin}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(MOCK_SPACE.pin)
                    }}
                  >
                    <Copy className="h-4 w-4 mr-1" /> Copy
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Share this PIN with people you want to access this private space.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Space Info Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Space Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Space Name</h3>
              <p className="text-base">{MOCK_SPACE.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">Privacy</h3>
              <p className="text-base flex items-center gap-1">
                {MOCK_SPACE.isPrivate ? (
                  <>
                    <Lock className="h-4 w-4" /> Private Space
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4" /> Public Space
                  </>
                )}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">Created</h3>
              <p className="text-base">
                {new Date(MOCK_SPACE.createdAt).toLocaleDateString()} at{" "}
                {new Date(MOCK_SPACE.createdAt).toLocaleTimeString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">Expires</h3>
              <p className="text-base">
                {new Date(MOCK_SPACE.expiresAt).toLocaleDateString()} at{" "}
                {new Date(MOCK_SPACE.expiresAt).toLocaleTimeString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">Space ID</h3>
              <p className="font-mono text-sm break-all">{spaceId}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
