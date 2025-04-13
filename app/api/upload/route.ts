import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request): Promise<NextResponse> {
  const formData = await request.formData()
  const file = formData.get("file") as File
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const price = formData.get("price") as string

  if (!file || !title || !description || !price) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
  }

  try {
    // Generar un nombre de archivo único basado en el título y timestamp
    const timestamp = Date.now()
    const fileName = title.toLowerCase().replace(/\s+/g, "-")
    const fileExtension = file.name.split(".").pop()
    const uniqueFileName = `nfts/${fileName}-${timestamp}.${fileExtension}`

    // Subir el archivo a Vercel Blob
    const blob = await put(uniqueFileName, file, {
      access: "public",
    })

    // Aquí podrías guardar los metadatos en una base de datos
    // Por ejemplo, título, descripción, precio, URL del blob, etc.

    // Para este ejemplo, simplemente devolvemos la información del blob
    return NextResponse.json({
      success: true,
      blob: {
        url: blob.url,
        title,
        description,
        price,
      },
    })
  } catch (error) {
    console.error("Error al subir a Vercel Blob:", error)
    return NextResponse.json({ error: "Error al procesar la subida" }, { status: 500 })
  }
}
