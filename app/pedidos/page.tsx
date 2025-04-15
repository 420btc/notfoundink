"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "../../styles/animate-bounce-slow.css";

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
    <div className="relative min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-nfi-blue/5 via-nfi-pink/10 to-nfi-yellow/5 overflow-hidden">
      {/* Fondo decorativo: pikachuu.png */}
      <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none select-none">
        <img
          src="/images/pikachuu.png"
          alt="Fondo Pedidos Pikachuu"
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-xl max-w-lg w-full p-8 border border-nfi-purple/30">
        <h1 className="text-3xl md:text-4xl font-cartoon text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue">
          Solicita tu Dibujo Personalizado
        </h1>
        <div className="flex justify-center mb-6">
          {/* Imagen con lupa */}
          {(() => {
            const [zoom, setZoom] = useState(false);
            // offset: porcentaje. mouse: coordenadas para la lupa
            const [offset, setOffset] = useState({ x: 50, y: 50 });
            const [mouse, setMouse] = useState({ lensLeft: 0, lensTop: 0, bgX: 0, bgY: 0 });
            const imgContainerRef = useRef<HTMLDivElement>(null);

            const handleMouseMove = (e: React.MouseEvent) => {
              if (!zoom || !imgContainerRef.current) return;
              const rect = imgContainerRef.current.getBoundingClientRect();
              // Coordenadas relativas al contenedor
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const percentX = (x / rect.width) * 100;
              const percentY = (y / rect.height) * 100;
              setOffset({ x: percentX, y: percentY });

              // Lupa de 120px, zoom 2x
              const lensSize = 120;
              const zoomLevel = 2;
              // Posición de la lupa (centrada en el cursor)
              const lensLeft = x - lensSize / 2;
              const lensTop = y - lensSize / 2;
              // Posición del fondo de la lupa
              const bgX = x * zoomLevel - lensSize / 2;
              const bgY = y * zoomLevel - lensSize / 2;
              setMouse({ lensLeft, lensTop, bgX, bgY });
            };

            return (
              <div
                ref={imgContainerRef}
                className="relative max-h-80 w-auto rounded-lg shadow-lg overflow-hidden"
                style={{ display: 'inline-block' }}
                onMouseEnter={() => setZoom(true)}
                onMouseLeave={() => setZoom(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src="/images/collage.png"
                  alt="Collage Not Found Ink"
                  className="object-contain max-h-80 w-auto"
                  style={{ display: 'block' }}
                />
                {/* Lupa real usando background-image */}
                {zoom && imgContainerRef.current && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `${mouse.lensLeft}px`,
                      top: `${mouse.lensTop}px`,
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      pointerEvents: 'none',
                      zIndex: 10,
                      border: '4px solid #ec407a99',
                      boxShadow: '0 0 0 2px #fff, 0 0 16px 4px #ec407a55',
                      backgroundImage: `url(/images/collage.png)`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: `${imgContainerRef.current.offsetWidth * 2}px ${imgContainerRef.current.offsetHeight * 2}px`,
                      backgroundPosition: `-${mouse.bgX}px -${mouse.bgY}px`,
                    }}
                  />
                )}
              </div>
            );
          })()}
        </div>
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
              className="w-full py-3 rounded-lg bg-gradient-to-r from-nfi-yellow via-nfi-pink to-nfi-blue text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-60 animate-bounce-slow"
            >
              {sending ? "Enviando..." : "Enviar Pedido"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
