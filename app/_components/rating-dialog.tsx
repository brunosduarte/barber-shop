"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import RatingStars from "./rating-stars"
import { createRating } from "../_actions/create-rating"
import { toast } from "sonner"
import { BookingWithNumberPrice } from "../_types/booking"

interface RatingDialogProps {
  booking: BookingWithNumberPrice
  isOpen: boolean
  onClose: () => void
}

const RatingDialog = ({ booking, isOpen, onClose }: RatingDialogProps) => {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      await createRating({
        rating,
        comment: comment.trim() || undefined,
        bookingId: booking.id,
      })

      toast.success("Avaliação enviada com sucesso!")
      onClose()

      // Reset form
      setRating(5)
      setComment("")
    } catch {
      toast.error("Erro ao enviar avaliação. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-md">
        <DialogHeader>
          <DialogTitle>Avaliar Serviço</DialogTitle>
          <DialogDescription>
            Como foi sua experiência no {booking.service.barbershop.name}?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Service info */}
          <div className="rounded-lg border p-3">
            <h4 className="font-medium">{booking.service.name}</h4>
            <p className="text-sm text-gray-600">
              {booking.service.barbershop.name}
            </p>
            <p className="text-sm text-gray-500">
              {booking.date.toLocaleDateString("pt-BR")}
            </p>
          </div>

          {/* Rating selector */}
          <div className="space-y-2">
            <Label>Sua avaliação</Label>
            <div className="flex justify-center">
              <RatingStars
                rating={rating}
                interactive
                onRatingChange={setRating}
                size={32}
                showValue={false}
              />
            </div>
            <p className="text-center text-sm text-gray-600">
              {rating === 1 && "Muito ruim"}
              {rating === 2 && "Ruim"}
              {rating === 3 && "Regular"}
              {rating === 4 && "Bom"}
              {rating === 5 && "Excelente"}
            </p>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Comentário (opcional)</Label>
            <Textarea
              id="comment"
              placeholder="Conte como foi sua experiência..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
            />
            <p className="text-xs text-gray-500">
              {comment.length}/500 caracteres
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RatingDialog
