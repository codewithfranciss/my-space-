"use client"

import type React from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import Header from "@/components/shared /Header"
import { useState } from "react"
import {
  QrCode,
  Copy,
  ArrowRight,
  Clock,
  Lock,
  Globe,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent} from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

export default function Dashboard() {
 
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [spaceName, setSpaceName] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [pin, setPin] = useState("")
  const [expirationType, setExpirationType] = useState("hours")
  const [expirationValue, setExpirationValue] = useState("24")
  const [showQrCode, setShowQrCode] = useState(false)
  const [createdSpaceId, setCreatedSpaceId] = useState("")
  const [loading, setLoading] = useState(false)


const handleCreateSpace = async (e: React.FormEvent) => {
  e.preventDefault()
  if (loading) return 
  setLoading(true)

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push("/auth/signin")
      return
    }

    const userId = user.id

    if (!spaceName.trim()) return
    if (isPrivate && (!pin || pin.length < 4)) return

    const randomId = Math.random().toString(36).substring(2, 10)
    setCreatedSpaceId(randomId)

    const res = await fetch("/api/spaces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: spaceName,
        is_private: isPrivate,
        pin: isPrivate ? pin : null,
        expiration_type: expirationType,
        expiration_value: expirationValue,
        short_id: randomId,
        expires_at: null,
        user_id: userId,
      }),
    })

    if (res.ok) {
      setShowQrCode(true)
    } else {
      const errorData = await res.json().catch(() => null)
      console.error("Error creating space:", errorData?.error || "Unknown error")
    }
  } finally {
    setLoading(false)
  }
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
  return (
    <div className="flex min-h-screen flex-col">
     <Header />
      <main className="flex-1 container py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="create" className="max-w-5xl">
          

            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle >Create a New Space</CardTitle>
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
                            <Button type="submit" className="flex-1 bg-black hover:bg-gray-900 text-white" disabled={loading}>
                              {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}

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

            
          </Tabs>
        </div>
      </main>

      <footer className="w-full border-t bg-background py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MySpaceIs. All rights reserved.
        </div>
      </footer>

    </div>
  )
}
