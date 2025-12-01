// app/api/contact/route.ts
import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nombre, email, telefono, servicio, mensaje } = body

    // Validaciones básicas
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      )
    }

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: "Sitecel Contact Form <onboarding@resend.dev>", // Usaremos el dominio de prueba de Resend por ahora
      to: ["sitecelspa@gmail.com"], // Email donde recibirás los mensajes
      replyTo: email, // Email del cliente para poder responderle
      subject: `Nuevo contacto desde la web: ${nombre}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || "No proporcionado"}</p>
        <p><strong>Servicio de interés:</strong> ${servicio || "No especificado"}</p>
        <hr />
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      console.error("Error enviando email:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error("Error en API route:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}