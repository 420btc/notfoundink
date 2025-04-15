"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

// Instrucciones: configura tus claves en el dashboard de emailjs.com y reemplaza los valores abajo
const SERVICE_ID = "TU_SERVICE_ID";
const TEMPLATE_ID = "TU_TEMPLATE_ID";
const USER_ID = "TU_USER_ID_PUBLIC_KEY";

export default function PedidosPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    descripcion: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [enviado, setEnviado] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);

    // Convierte la imagen a base64
    let fileBase64 = "";
    if (file) {
      fileBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    const templateParams = {
      nombre: form.nombre,
      email: form.email,
      descripcion: form.descripcion,
      foto: fileBase64,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then(() => {
        setEnviado(true);
        setSending(false);
        setForm({ nombre: "", email: "", descripcion: "" });
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      })
      .catch((err) => {
        setError("Hubo un error al enviar el pedido. Intenta de nuevo.");
        setSending(false);
      });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-nfi-blue/5 via-nfi-pink/10 to-nfi-yellow/5">
      <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-xl max-w-lg w-full p-8 border border-nfi-purple/30">
        <h1 className="text-3xl md:text-4xl font-cartoon text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
          Solicita tu Dibujo Personalizado
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Completa el formulario para pedir un dibujo único hecho por Ana María. ¡Describe tu idea y nos pondremos en contacto contigo!
        </p>
        {enviado ? (
          <div className="text-center text-green-600 font-bold text-xl py-12">
            ¡Tu pedido ha sido enviado!<br />Ana María se pondrá en contacto contigo pronto.
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium mb-1">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-nfi-purple/50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-nfi-purple/50"
              />
            </div>
            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium mb-1">Descripción del dibujo</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                required
                rows={4}
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-nfi-purple/50"
              />
            </div>
            <div>
              <label htmlFor="foto" className="block text-sm font-medium mb-1">Foto de referencia (opcional)</label>
              <input
                type="file"
                id="foto"
                name="foto"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="w-full rounded-lg border p-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-nfi-yellow/20 file:text-nfi-pink hover:file:bg-nfi-yellow/40"
              />
              {file && <p className="text-xs text-green-600 mt-1">Imagen seleccionada: {file.name}</p>}
            </div>
            {error && <div className="text-red-600 text-center">{error}</div>}
            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
            >
              {sending ? "Enviando..." : "Enviar Pedido"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
