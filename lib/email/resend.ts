/**
 * Email Service - Prepared for Resend Integration
 * 
 * To activate:
 * 1. npm install resend
 * 2. Add RESEND_API_KEY to .env
 * 3. Uncomment the implementation below
 */

export interface EmailService {
  sendEmail(to: string, subject: string, html: string): Promise<void>
}

// Future Resend implementation:
// import { Resend } from 'resend'
// const resend = new Resend(process.env.RESEND_API_KEY)

export class PlaceholderEmailService implements EmailService {
  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    // TODO: Implement with Resend
    // await resend.emails.send({
    //   from: 'noreply@yourdomain.com',
    //   to,
    //   subject,
    //   html,
    // })
    console.log(`[EMAIL PLACEHOLDER] To: ${to}, Subject: ${subject}`)
  }
}

export const emailService = new PlaceholderEmailService()

// Email trigger points (future use):
// - New enrollment inquiry → emailService.sendEmail(adminEmail, 'New Enrollment', html)
// - Contact form submission → emailService.sendEmail(adminEmail, 'Contact Form', html)
// - Schedule change → emailService.sendEmail(studentEmail, 'Schedule Update', html)

export const emailTemplates = {
  enrollmentInquiry: (studentName: string, className: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Enrollment Inquiry</h2>
      <p><strong>Student:</strong> ${studentName}</p>
      <p><strong>Class:</strong> ${className}</p>
    </div>
  `,
  contactForm: (name: string, email: string, message: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    </div>
  `,
}
