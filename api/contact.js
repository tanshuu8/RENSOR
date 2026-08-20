import { getEmailProvider, generateEnquiryEmailHtml } from './_lib/email.js';

/**
 * POST /api/contact
 * 
 * Handles project enquiry form submissions.
 * Validates input, sends email notification via configured provider.
 */
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, business, email, service, message, budget } = req.body;

    // Validation
    const errors = [];
    if (!name || name.trim().length < 2) {
      errors.push('Name is required (minimum 2 characters)');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('A valid email address is required');
    }
    if (!service) {
      errors.push('Please select a service');
    }

    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const timestamp = new Date().toISOString();

    // Send email notification
    const emailProvider = getEmailProvider();
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'rensor.studio@gmail.com';

    await emailProvider.sendEmail({
      to: notificationEmail,
      subject: `New Project Enquiry — ${name}${business ? ` (${business})` : ''}`,
      html: generateEnquiryEmailHtml({
        name: name.trim(),
        business: business?.trim(),
        email: email.trim(),
        service,
        message: message?.trim(),
        budget,
        timestamp,
      }),
      replyTo: email.trim(),
    });

    return res.status(200).json({
      success: true,
      message: 'Project enquiry received successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Something went wrong. Please try again or email us directly.',
    });
  }
}
