import nodemailer from 'nodemailer'
import { Inquiry } from '@/../../packages/db/models/Inquiry'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  } : undefined,
})

export async function sendInquiryEmail(inquiry: Inquiry): Promise<boolean> {
  try {
    const serviceTypeLabels = {
      purchase: 'Aircraft Purchase',
      charter: 'Private Charter',
      ride: 'Helicopter Experience'
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #D4AF37 0%, #FBBF24 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">New Inquiry - Kayo Charters</h1>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e5e5e5;">
          <h2 style="color: #D4AF37; margin-bottom: 20px;">Inquiry Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f8f9fa;">
              <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Service Type</td>
              <td style="padding: 12px; border: 1px solid #dee2e6;">${serviceTypeLabels[inquiry.service_type]}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Name</td>
              <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiry.name}</td>
            </tr>
            <tr style="background: #f8f9fa;">
              <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Email</td>
              <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiry.email}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Phone</td>
              <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiry.phone}</td>
            </tr>
            ${inquiry.preferred_date ? `
            <tr style="background: #f8f9fa;">
              <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6;">Preferred Date</td>
              <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiry.preferred_date}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px; font-weight: bold; border: 1px solid #dee2e6; vertical-align: top;">Message</td>
              <td style="padding: 12px; border: 1px solid #dee2e6;">${inquiry.message}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              This inquiry was submitted on ${new Date(inquiry.createdAt).toLocaleDateString()} at ${new Date(inquiry.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <div style="background: #343a40; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">Kayo Charters - Premium Aviation Services</p>
        </div>
      </div>
    `

    if (!process.env.FROM_EMAIL) {
      console.warn('FROM_EMAIL not set; skipping email send in development')
      return true
    }

    await transporter.sendMail({
      from: `"${process.env.FROM_NAME || 'Kayo Charters'}" <${process.env.FROM_EMAIL}>`,
      to: process.env.FROM_EMAIL,
      subject: `New ${serviceTypeLabels[inquiry.service_type]} Inquiry - ${inquiry.name}`,
      html: htmlContent,
    })

    return true
  } catch (error) {
    console.error('Email sending failed:', error)
    return false
  }
}