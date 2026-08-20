/**
 * Email Service Abstraction Layer
 * 
 * Modular email provider — swap Resend for any other provider
 * by implementing the same interface:
 *   sendEmail({ to, subject, html, replyTo })
 * 
 * Supported providers:
 * - resend (default)
 * - Add more providers by creating new files and updating the switch below
 */

class ResendProvider {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.resend.com';
  }

  async sendEmail({ to, from, subject, html, replyTo }) {
    const response = await fetch(`${this.baseUrl}/emails`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: from || 'RENSOR <onboarding@resend.dev>',
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        reply_to: replyTo,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send email');
    }

    return response.json();
  }
}

class Web3FormsProvider {
  constructor(accessKey) {
    this.accessKey = accessKey;
    this.endpoint = 'https://api.web3forms.com/submit';
  }

  async sendEmail({ to, subject, data }) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        access_key: this.accessKey,
        subject: subject,
        from_name: 'Rensor',
        to_email: Array.isArray(to) ? to[0] : to,
        ...data,
      }),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to send email via Web3Forms');
    }

    return result;
  }
}

/**
 * Factory function to get the configured email provider.
 * Supports: resend | web3forms
 */
export function getEmailProvider() {
  const provider = process.env.EMAIL_PROVIDER || (process.env.WEB3FORMS_KEY ? 'web3forms' : 'resend');

  switch (provider) {
    case 'resend':
      return new ResendProvider(process.env.RESEND_API_KEY);
    case 'web3forms':
      return new Web3FormsProvider(process.env.WEB3FORMS_KEY);
    default:
      return new ResendProvider(process.env.RESEND_API_KEY);
  }
}

/**
 * Generate the HTML email template for a new project enquiry.
 */
export function generateEnquiryEmailHtml(data) {
  const { name, business, email, service, message, budget, timestamp } = data;

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #F7F6F3;">
      <div style="background-color: #111111; padding: 32px; border-radius: 8px; margin-bottom: 24px;">
        <h1 style="color: #F7F6F3; font-size: 18px; font-weight: 700; letter-spacing: 0.1em; margin: 0;">RENSOR</h1>
        <p style="color: #999999; font-size: 12px; letter-spacing: 0.05em; margin: 8px 0 0; text-transform: uppercase;">New Project Enquiry</p>
      </div>
      
      <div style="background-color: #FFFFFF; padding: 32px; border-radius: 8px; border: 1px solid #D0CEC9;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #E9E7E3; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 0.05em; width: 140px; vertical-align: top;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #E9E7E3; font-size: 15px; color: #171717;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #E9E7E3; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Business</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #E9E7E3; font-size: 15px; color: #171717;">${business || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #E9E7E3; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #E9E7E3; font-size: 15px; color: #171717;"><a href="mailto:${email}" style="color: #171717;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #E9E7E3; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Service</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #E9E7E3; font-size: 15px; color: #171717;">${service}</td>
          </tr>
          ${budget ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #E9E7E3; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Budget</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #E9E7E3; font-size: 15px; color: #171717;">${budget}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 12px 0; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Message</td>
            <td style="padding: 12px 0; font-size: 15px; color: #171717; line-height: 1.6;">${message || '—'}</td>
          </tr>
        </table>
      </div>
      
      <p style="text-align: center; font-size: 11px; color: #999999; margin-top: 24px; letter-spacing: 0.05em; text-transform: uppercase;">
        Received ${timestamp ? new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      </p>
    </div>
  `;
}
