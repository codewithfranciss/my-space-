'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Smartphone, Tablet, Clock, Lock, Menu, X, Share2, FileText, ArrowRight, CheckCircle2 } from "lucide-react"

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navItems = [
    { title: "Features", href: "#features" },
    { title: "How It Works", href: "#how-it-works" },
    { title: "Pricing", href: "#pricing" },
    { title: "FAQ", href: "#faq" },
  ]

  return (
     <div className="flex min-h-screen flex-col">
         <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-6">
    
    {/* Logo and Brand */}
    <div className="flex items-center gap-2">
      <Share2 className="h-6 w-6 text-black" />
      <span className="text-xl font-bold">MySpaces</span>
    </div>

    {/* Desktop Navigation */}
    <nav className="hidden md:flex gap-6">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="text-sm font-medium hover:text-gray-700 transition-colors"
        >
          {item.title}
        </Link>
      ))}
    </nav>

    {/* CTA Button */}
    <div className="hidden md:flex items-center">
      <Button className="bg-black hover:bg-gray-900 text-white" asChild>
        <Link href="/auth/signin">Get Started</Link>
      </Button>
    </div>

  </div>
</header>

      <main className="flex-1">
        {/* Hero Section */}
{/* Hero Section */}
<section className="w-full min-h-screen flex items-center justify-center">
  <div className="container px-4  md:px-6 py-20 md:py-32">
    <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-4xl mx-auto">
      {/* Hero Text */}
      <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl mb-6">
          Share Across All Your Devices, <span className="text-gray-600">Instantly</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          MySpaceIs provides seamless and quick cross-device sharing of text and files with real-time sync. Access your
          content anywhere, anytime.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Button size="lg" className="bg-black hover:bg-gray-900 text-white px-8 py-3 text-lg" asChild>
          <Link href="/dashboard">Start Sharing Free</Link>
        </Button>
        <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
          See How It Works
        </Button>
      </div>

      {/* Trust Indicators */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <span>No credit card required</span>
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <span>Cancel anytime</span>
        </div>
      </div>
    </div>

    {/* Hero Image */}
    <div className="mt-16 md:mt-20 lg:mt-24 flex justify-center">
      <div className="relative w-full max-w-5xl">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border shadow-2xl">
          <Image
            src="/placeholder.svg?height=800&width=1280&text=MySpaceIs+Dashboard+Preview"
            alt="MySpaceIs dashboard preview showing seamless device synchronization"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        {/* Floating elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-black rounded-full opacity-20 animate-pulse" />
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gray-400 rounded-full opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 -left-6 w-6 h-6 bg-gray-600 rounded-full opacity-30 animate-pulse delay-500" />
      </div>
    </div>
  </div>
</section>

        {/* Features Section */}
<section id="features" className="w-full min-h-screen flex items-center justify-center py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700">Features</div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything You Need for Seamless Sharing
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-sm md:text-base lg:text-xl">
                  MySpaceIs makes it easy to share content between all your devices with powerful features designed for
                  productivity.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 sm:grid-cols-2 md:py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3">
                  <Clock className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold">Real-time Sync</h3>
                <p className="text-center text-muted-foreground">
                  Changes sync instantly across all your devices, ensuring you always have the latest version.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3">
                  <FileText className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold">Text & File Sharing</h3>
                <p className="text-center text-muted-foreground">
                  Share text snippets, links, and files of any size between your devices with ease.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3">
                  <Lock className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold">End-to-End Encryption</h3>
                <p className="text-center text-muted-foreground">
                  Your data is fully encrypted, ensuring your privacy and security at all times.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3">
                  <Smartphone className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold">Cross-Platform</h3>
                <p className="text-center text-muted-foreground">
                  Works seamlessly across iOS, Android, Windows, macOS, and all modern web browsers.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3">
                  <Share2 className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold">Collaborative Sharing</h3>
                <p className="text-center text-muted-foreground">
                  Share with friends and colleagues for easy collaboration on projects and ideas.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3">
                  <Tablet className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold">Offline Access</h3>
                <p className="text-center text-muted-foreground">
                  Access your content even without an internet connection and sync when you're back online.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className=" w-full min-h-screen flex items-center justify-center py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700">How It Works</div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simple, Fast, and Secure
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-sm md:text-base lg:text-xl">
                  MySpaceIs makes sharing between devices as easy as possible with just a few simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 sm:grid-cols-3 md:py-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">1</div>
                <h3 className="text-xl font-bold">Sign Up</h3>
                <p className="text-center text-muted-foreground">
                  Create your free account in seconds and download the app on your devices.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">2</div>
                <h3 className="text-xl font-bold">Connect Devices</h3>
                <p className="text-center text-muted-foreground">
                  Link all your devices with a simple QR code scan or login with your account.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">3</div>
                <h3 className="text-xl font-bold">Start Sharing</h3>
                <p className="text-center text-muted-foreground">
                  Share text, links, and files instantly between all your connected devices.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <div className="relative w-full max-w-[800px] aspect-video">
                <Image
                  src="/placeholder.svg?height=450&width=800&text=How+It+Works+Video"
                  alt="How MySpaceIs works"
                  width={800}
                  height={450}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

          {/* Pricing Section */}
        <section id="pricing" className="w-full min-h-screen flex items-center justify-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700">Pricing</div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-sm md:text-base lg:text-xl">
                  Choose the plan that's right for you, from free to premium options.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 md:grid-cols-3 md:py-12">
              <div className="flex flex-col rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="text-muted-foreground">Perfect for personal use</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-black" />
                    <span>Up to 3 devices</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-black" />
                    <span>Text & link sharing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-black" />
                    <span>Files up to 100MB</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-black" />
                    <span>7-day history</span>
                  </li>
                </ul>
                <Button className="mt-8" asChild>
                  <Link href="/dashboard">Get Started</Link>
                </Button>
              </div>
              <div className="flex flex-col rounded-lg border border-black p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">Popular</div>
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <p className="text-muted-foreground">Perfect for professionals</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">$9.99</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-black" />
                    <span>Unlimited devices</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-black" />
                    <span>Text, link & file sharing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-black" />
                    <span>Files up to 5GB</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-black" />
                    <span>30-day history</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-black" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="mt-8 bg-black hover:bg-gray-900 text-white" asChild>
                  <Link href="/dashboard">Get Started</Link>
                </Button>
              </div>
              <div className="flex flex-col rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Team</h3>
                  <p className="text-muted-foreground">Perfect for teams</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">$19.99</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-black" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-black" />
                    <span>Up to 10 team members</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-black" />
                    <span>Files up to 10GB</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-black" />
                    <span>Unlimited history</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-black" />
                    <span>Admin controls</span>
                  </li>
                </ul>
                <Button className="mt-8" asChild>
                  <Link href="/dashboard">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

  {/* Testimonials Section */}
        <section className="w-full min-h-screen flex items-center justify-center py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700">Testimonials</div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-sm md:text-base lg:text-xl">
                  Don't just take our word for it. Here's what people are saying about MySpaceIs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3 md:py-12">
              {[
                {
                  quote:
                    "MySpaceIs has completely changed how I work across my devices. No more emailing files to myself!",
                  author: "Sarah Johnson",
                  role: "Graphic Designer",
                },
                {
                  quote:
                    "As someone who switches between multiple devices all day, this tool has been a game-changer for my productivity.",
                  author: "Michael Chen",
                  role: "Software Engineer",
                },
                {
                  quote:
                    "Our team uses MySpaceIs daily for sharing content. The real-time sync has made collaboration so much easier.",
                  author: "Emily Rodriguez",
                  role: "Marketing Director",
                },
              ].map((testimonial, i) => (
                <div key={i} className="flex flex-col rounded-lg border p-6 shadow-sm">
                  <div className="flex-1">
                    <p className="text-muted-foreground">"{testimonial.quote}"</p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="rounded-full bg-muted">
                      <Image
                        src={`/placeholder.svg?height=40&width=40&text=${testimonial.author.charAt(0)}`}
                        alt={testimonial.author}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 min-h-screen flex items-center justify-center md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700">FAQ</div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-sm md:text-base lg:text-xl">
                  Find answers to common questions about MySpaceIs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 py-8 md:py-12">
              {[
                {
                  q: "Is my data secure with MySpaceIs?",
                  a: "Yes, all your data is protected with end-to-end encryption. We never have access to your unencrypted content, and your data is only stored on your devices and our secure servers.",
                },
                {
                  q: "Which platforms does MySpaceIs support?",
                  a: "MySpaceIs works on iOS, Android, Windows, macOS, and all modern web browsers, allowing you to share content across virtually any device.",
                },
                {
                  q: "Can I share with people who don't have MySpaceIs?",
                  a: "Yes, you can generate shareable links that anyone can access, even if they don't have a MySpaceIs account.",
                },
                {
                  q: "How long is my data stored?",
                  a: "Free accounts store data for 7 days, Pro accounts for 30 days, and Team accounts have unlimited history. You can also manually delete content at any time.",
                },
                {
                  q: "Can I use MySpaceIs offline?",
                  a: "Yes, you can access previously synced content offline. Any new content you create while offline will sync automatically when you reconnect to the internet.",
                },
              ].map((faq, i) => (
                <div key={i} className="rounded-lg border p-6 shadow-sm">
                  <h3 className="text-lg font-bold">{faq.q}</h3>
                  <p className="mt-2 text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 min-h flex items-center justify-center md:py-24 lg:py-32 text-center bg-black text-white">
          <div className="container px-4  md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Simplify Your Cross-Device Experience?
                </h2>
                <p className="max-w-[900px] text-sm md:text-base lg:text-xl">
                  Join thousands of users who are already enjoying seamless sharing across all their devices.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 min-[400px]:flex-row">
                <Button className="bg-white text-black hover:bg-gray-100" asChild>
                  <Link href="/dashboard">Get Started Free</Link>
                </Button>
                <Button variant="outline" className="border-white text-black" asChild>
                  <Link href="/dashboard">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>

       <footer className="w-full border-t bg-background py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
              <div className="flex items-center gap-2">
                <Share2 className="h-6 w-6 text-black" />
                <span className="text-lg font-bold">MySpaceIs</span>
              </div>
              <p className="text-sm text-muted-foreground">Seamless cross-device sharing with real-time sync.</p>
              <div className="mt-2 flex gap-2">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">GitHub</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Product</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Features
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Download
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Changelog
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Resources</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Tutorials
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Support
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Company</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Partners
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2 col-span-2 md:col-span-4 lg:col-span-1">
              <h3 className="text-sm font-medium">Subscribe to our newsletter</h3>
              <p className="text-sm text-muted-foreground">Get the latest updates and news directly to your inbox.</p>
              <form className="mt-2 flex gap-2">
                <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                <Button type="submit" className="bg-black hover:bg-gray-900 text-white">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} MySpaceIs. All rights reserved.
            </p>
            <nav className="flex flex-wrap gap-4 justify-center">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>

     </div>
  )
}