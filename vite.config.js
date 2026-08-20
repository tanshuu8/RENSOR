import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { generateEnquiryEmailHtml } from './api/_lib/email.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'api-contact-dev-server',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (req, res, next) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk.toString();
              });
              req.on('end', async () => {
                try {
                  const data = JSON.parse(body);
                  const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
                  const web3Key = env.WEB3FORMS_KEY || process.env.WEB3FORMS_KEY;
                  const notificationEmail =
                    env.NOTIFICATION_EMAIL ||
                    process.env.NOTIFICATION_EMAIL ||
                    'rensor.studio@gmail.com';

                  console.log('\n[CONTACT FORM] Processing enquiry from:', data.name, `(${data.email})`);

                  if (web3Key) {
                    // Web3Forms (direct inbox delivery, no domain limits)
                    const response = await fetch('https://api.web3forms.com/submit', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                      },
                      body: JSON.stringify({
                        access_key: web3Key,
                        subject: `New Project Enquiry — ${data.name}${data.business ? ` (${data.business})` : ''}`,
                        from_name: 'RENOSOR Studio',
                        to_email: notificationEmail,
                        name: data.name,
                        email: data.email,
                        business: data.business || 'Not specified',
                        service: data.service,
                        budget: data.budget || 'Not specified',
                        message: data.message || 'No message provided',
                      }),
                    });

                    const resData = await response.json();
                    if (!resData.success) {
                      console.error('[WEB3FORMS ERROR]', resData);
                      res.statusCode = 500;
                      res.setHeader('Content-Type', 'application/json');
                      return res.end(JSON.stringify({ error: resData.message || 'Web3Forms error' }));
                    }

                    console.log(`[SUCCESS] Email delivered directly to ${notificationEmail} via Web3Forms!\n`);
                  } else if (apiKey && apiKey.startsWith('re_')) {
                    // Resend
                    const response = await fetch('https://api.resend.com/emails', {
                      method: 'POST',
                      headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        from: 'RENSOR <onboarding@resend.dev>',
                        to: [notificationEmail],
                        subject: `New Project Enquiry — ${data.name}${data.business ? ` (${data.business})` : ''}`,
                        html: generateEnquiryEmailHtml({
                          ...data,
                          timestamp: new Date().toISOString(),
                        }),
                        reply_to: data.email,
                      }),
                    });

                    const resData = await response.json();
                    if (!response.ok) {
                      console.error('[RESEND ERROR]', resData);
                      res.statusCode = 500;
                      res.setHeader('Content-Type', 'application/json');
                      return res.end(JSON.stringify({ error: resData.message || 'Failed to send email' }));
                    }

                    console.log(`[SUCCESS] Email dispatched to ${notificationEmail}! (ID: ${resData.id})\n`);
                  } else {
                    console.log(`[DEV SERVER LOG] Notification Email: ${notificationEmail}`);
                    console.log(JSON.stringify(data, null, 2));
                  }

                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      success: true,
                      message: 'Project enquiry received successfully',
                    })
                  );
                } catch (e) {
                  console.error('[CONTACT FORM ERROR]', e);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: e.message || 'Server error' }));
                }
              });
            } else {
              next();
            }
          });
        },
      },
    ],
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            motion: ['framer-motion'],
          },
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
