import { Settings as SettingsIcon, BarChart3, Layers } from 'lucide-react'
export const navigationItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3, isActive: false },
    { href: '/spaces', label: 'My Spaces', icon: Layers, isActive: true },
    { href: '/settings', label: 'Settings', icon: SettingsIcon, isActive: false }
  ]