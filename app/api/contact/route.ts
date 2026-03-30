import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { fullName, email, phone, message } = await request.json()

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Send email to program coordinator
    await resend.emails.send({
      from: "DES Program Inquiry <onboarding@resend.dev>",
      to: "jbeaulieu@centennialcollege.ca",
      replyTo: email,
      subject: `DES Program Inquiry from ${fullName}`,
      html: `
        <h2>New Program Inquiry</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}
