"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Upload, Loader2 } from "lucide-react"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)

    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file || !title || !description || !price) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Crear un FormData para enviar el archivo
      const formData = new FormData()
      formData.append("file", file)
      formData.append("title", title)
      formData.append("description", description)
      formData.append("price", price)

      // Enviar a nuestra API route que manejará la carga a Vercel Blob
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Error al subir el archivo")
      }

      const data = await response.json()

      toast({
        title: "¡Subida exitosa!",
        description: `NFT "${title}" ha sido subido correctamente.`,
      })

      // Resetear el formulario
      setFile(null)
      setTitle("")
      setDescription("")
      setPrice("")
      setPreview(null)
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error al subir",
        description: "Ocurrió un error al subir el archivo. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container py-10">
      <h1 className="font-cartoon text-4xl md:text-5xl mb-6">Subir Nuevo NFT</h1>
      <p className="text-lg mb-8">
        Sube una nueva ilustración para la colección "Not Found Ink". La imagen se almacenará en Vercel Blob y estará
        disponible para ser minteada como NFT.
      </p>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Detalles del NFT</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Trust Me"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe tu NFT..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Precio (SOL)</Label>
              <Input
                id="price"
                type="number"
                step="0.1"
                min="0.1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ej: 1.5"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Imagen</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input id="file" type="file" accept="image/*" onChange={handleFileChange} required className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Formatos aceptados: PNG, JPG, GIF. Tamaño máximo: 5MB.
                  </p>
                </div>
                {preview && (
                  <div className="aspect-square relative rounded-md overflow-hidden border">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt="Vista previa"
                      className="object-contain w-full h-full"
                    />
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" disabled={isUploading} className="w-full">
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subiendo...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Subir NFT
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
