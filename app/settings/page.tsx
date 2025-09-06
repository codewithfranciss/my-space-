"use client"
import { useState } from 'react'
import Link from 'next/link'
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Settings as SettingsIcon,
  ChevronRight,
  ChevronLeft,
  Save,
  Edit3,
  Mail,
  Phone,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Monitor,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Upload
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function ModernSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  // Mock user data
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Product designer and space enthusiast.',
    website: 'https://johndoe.com'
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    activityVisible: false,
    searchable: true
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon }
  ]

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Profile Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your personal information and profile visibility.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="border-black text-black hover:bg-black hover:text-white transition-all duration-200"
        >
          <Edit3 className="h-4 w-4 mr-2" />
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      {/* Profile Avatar */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Profile Picture</CardTitle>
          <CardDescription>Upload a profile picture to personalize your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-semibold">
              {userProfile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
              <p className="text-xs text-gray-500">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
          <CardDescription>Update your personal details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={userProfile.name}
                onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                disabled={!isEditing}
                className="disabled:bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={userProfile.email}
                onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                disabled={!isEditing}
                className="disabled:bg-gray-50"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={userProfile.phone}
                onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                disabled={!isEditing}
                className="disabled:bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={userProfile.website}
                onChange={(e) => setUserProfile({...userProfile, website: e.target.value})}
                disabled={!isEditing}
                className="disabled:bg-gray-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={userProfile.bio}
              onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
              disabled={!isEditing}
              className="disabled:bg-gray-50 min-h-[100px]"
              placeholder="Tell us about yourself..."
            />
          </div>

          {isEditing && (
            <Button className="bg-black text-white hover:bg-gray-800">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationsTab = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Notification Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Choose how you want to be notified about activity.</p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Communication Preferences</CardTitle>
          <CardDescription>Choose how we communicate with you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-600" />
              <div>
                <Label className="text-sm font-medium">Email Notifications</Label>
                <p className="text-xs text-gray-500">Receive updates via email</p>
              </div>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-gray-600" />
              <div>
                <Label className="text-sm font-medium">Push Notifications</Label>
                <p className="text-xs text-gray-500">Get notified on your device</p>
              </div>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-600" />
              <div>
                <Label className="text-sm font-medium">SMS Notifications</Label>
                <p className="text-xs text-gray-500">Receive text messages for important updates</p>
              </div>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-600" />
              <div>
                <Label className="text-sm font-medium">Marketing Communications</Label>
                <p className="text-xs text-gray-500">Product updates and promotional content</p>
              </div>
            </div>
            <Switch
              checked={notifications.marketing}
              onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPrivacyTab = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Privacy & Security</h2>
        <p className="text-sm text-gray-500 mt-1">Control your privacy settings and account security.</p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Privacy Settings</CardTitle>
          <CardDescription>Control who can see your information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-gray-600" />
              <div>
                <Label className="text-sm font-medium">Profile Visibility</Label>
                <p className="text-xs text-gray-500">Make your profile visible to others</p>
              </div>
            </div>
            <Switch
              checked={privacy.profileVisible}
              onCheckedChange={(checked) => setPrivacy({...privacy, profileVisible: checked})}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-gray-600" />
              <div>
                <Label className="text-sm font-medium">Searchable</Label>
                <p className="text-xs text-gray-500">Allow others to find you in search</p>
              </div>
            </div>
            <Switch
              checked={privacy.searchable}
              onCheckedChange={(checked) => setPrivacy({...privacy, searchable: checked})}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Security</CardTitle>
          <CardDescription>Manage your account security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative mt-1">
                <Input
                  id="current-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter current password"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                className="mt-1"
              />
            </div>
          </div>

          <Button className="bg-black text-white hover:bg-gray-800">
            Update Password
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderBillingTab = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Billing & Subscription</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your subscription and billing information.</p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Current Plan</CardTitle>
          <CardDescription>You're currently on the Free plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h3 className="font-semibold">Free Plan</h3>
              <p className="text-sm text-gray-500">250 MB of 1 GB used</p>
            </div>
            <Button className="bg-black text-white hover:bg-gray-800">
              Upgrade to Pro
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Data Export</CardTitle>
          <CardDescription>Download a copy of your data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
            <Download className="h-4 w-4 mr-2" />
            Export My Data
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderPreferencesTab = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Preferences</h2>
        <p className="text-sm text-gray-500 mt-1">Customize your experience and app preferences.</p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Appearance</CardTitle>
          <CardDescription>Customize how the interface looks.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 p-4 border-2 border-black rounded-xl bg-black text-white">
              <Sun className="h-4 w-4" />
              <span className="text-sm font-medium">Light</span>
            </div>
            <div className="flex items-center space-x-2 p-4 border border-gray-200 rounded-xl hover:border-gray-300 cursor-pointer">
              <Moon className="h-4 w-4" />
              <span className="text-sm font-medium">Dark</span>
            </div>
            <div className="flex items-center space-x-2 p-4 border border-gray-200 rounded-xl hover:border-gray-300 cursor-pointer">
              <Monitor className="h-4 w-4" />
              <span className="text-sm font-medium">System</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50/30">
        <CardHeader>
          <CardTitle className="text-lg text-red-800">Danger Zone</CardTitle>
          <CardDescription className="text-red-600">Actions that cannot be undone.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab()
      case 'notifications':
        return renderNotificationsTab()
      case 'privacy':
        return renderPrivacyTab()
      case 'billing':
        return renderBillingTab()
      case 'preferences':
        return renderPreferencesTab()
      default:
        return renderProfileTab()
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                    {activeTab === tab.id && <ChevronRight className="h-4 w-4 ml-auto" />}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
