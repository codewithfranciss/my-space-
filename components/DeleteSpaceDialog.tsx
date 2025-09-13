"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Props = {
  spaceId: string | null
  open: boolean
  onClose: () => void
  onDeleted: (id: string) => void
}

export default function DeleteSpaceDialog({ spaceId, open, onClose, onDeleted }: Props) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!spaceId) return
    setLoading(true)
    try {
      const res = await fetch(`/api/spaces/${spaceId}`, { method: "DELETE" })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Failed to delete space")
      }
      onDeleted(spaceId) // ✅ update parent
      onClose()
    } catch (err) {
      console.error("Error deleting space:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Space</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this space? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="sm:flex-1" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="sm:flex-1"
          >
            {loading ? "Deleting..." : "Delete Space"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
