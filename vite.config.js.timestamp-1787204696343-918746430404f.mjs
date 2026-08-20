// vite.config.js
import { defineConfig, loadEnv } from "file:///C:/Users/user/OneDrive/Desktop/rensor/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/user/OneDrive/Desktop/rensor/node_modules/@vitejs/plugin-react/dist/index.js";

// api/_lib/email.js
function generateEnquiryEmailHtml(data) {
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
            <td style="padding: 12px 0; border-bottom: 1px solid #E9E7E3; font-size: 15px; color: #171717;">${business || "\u2014"}</td>
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
          </tr>` : ""}
          <tr>
            <td style="padding: 12px 0; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Message</td>
            <td style="padding: 12px 0; font-size: 15px; color: #171717; line-height: 1.6;">${message || "\u2014"}</td>
          </tr>
        </table>
      </div>
      
      <p style="text-align: center; font-size: 11px; color: #999999; margin-top: 24px; letter-spacing: 0.05em; text-transform: uppercase;">
        Received ${timestamp ? new Date(timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : (/* @__PURE__ */ new Date()).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
      </p>
    </div>
  `;
}

// vite.config.js
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      {
        name: "api-contact-dev-server",
        configureServer(server) {
          server.middlewares.use("/api/contact", async (req, res, next) => {
            if (req.method === "POST") {
              let body = "";
              req.on("data", (chunk) => {
                body += chunk.toString();
              });
              req.on("end", async () => {
                try {
                  const data = JSON.parse(body);
                  const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
                  const web3Key = env.WEB3FORMS_KEY || process.env.WEB3FORMS_KEY;
                  const notificationEmail = env.NOTIFICATION_EMAIL || process.env.NOTIFICATION_EMAIL || "tanushchandhra.vyogi@gmail.com";
                  console.log("\n[CONTACT FORM] Processing enquiry from:", data.name, `(${data.email})`);
                  if (web3Key) {
                    const response = await fetch("https://api.web3forms.com/submit", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                      },
                      body: JSON.stringify({
                        access_key: web3Key,
                        subject: `New Project Enquiry \u2014 ${data.name}${data.business ? ` (${data.business})` : ""}`,
                        from_name: "RENOSOR Studio",
                        to_email: notificationEmail,
                        name: data.name,
                        email: data.email,
                        business: data.business || "Not specified",
                        service: data.service,
                        budget: data.budget || "Not specified",
                        message: data.message || "No message provided"
                      })
                    });
                    const resData = await response.json();
                    if (!resData.success) {
                      console.error("[WEB3FORMS ERROR]", resData);
                      res.statusCode = 500;
                      res.setHeader("Content-Type", "application/json");
                      return res.end(JSON.stringify({ error: resData.message || "Web3Forms error" }));
                    }
                    console.log(`[SUCCESS] Email delivered directly to ${notificationEmail} via Web3Forms!
`);
                  } else if (apiKey && apiKey.startsWith("re_")) {
                    const response = await fetch("https://api.resend.com/emails", {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        from: "RENSOR <onboarding@resend.dev>",
                        to: [notificationEmail],
                        subject: `New Project Enquiry \u2014 ${data.name}${data.business ? ` (${data.business})` : ""}`,
                        html: generateEnquiryEmailHtml({
                          ...data,
                          timestamp: (/* @__PURE__ */ new Date()).toISOString()
                        }),
                        reply_to: data.email
                      })
                    });
                    const resData = await response.json();
                    if (!response.ok) {
                      console.error("[RESEND ERROR]", resData);
                      res.statusCode = 500;
                      res.setHeader("Content-Type", "application/json");
                      return res.end(JSON.stringify({ error: resData.message || "Failed to send email" }));
                    }
                    console.log(`[SUCCESS] Email dispatched to ${notificationEmail}! (ID: ${resData.id})
`);
                  } else {
                    console.log(`[DEV SERVER LOG] Notification Email: ${notificationEmail}`);
                    console.log(JSON.stringify(data, null, 2));
                  }
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.end(
                    JSON.stringify({
                      success: true,
                      message: "Project enquiry received successfully"
                    })
                  );
                } catch (e) {
                  console.error("[CONTACT FORM ERROR]", e);
                  res.statusCode = 500;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ error: e.message || "Server error" }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    build: {
      outDir: "dist",
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
            motion: ["framer-motion"]
          }
        }
      }
    },
    server: {
      port: 3e3,
      open: true
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAiYXBpL19saWIvZW1haWwuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxccmVuc29yXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxccmVuc29yXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy91c2VyL09uZURyaXZlL0Rlc2t0b3AvcmVuc29yL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgZ2VuZXJhdGVFbnF1aXJ5RW1haWxIdG1sIH0gZnJvbSAnLi9hcGkvX2xpYi9lbWFpbC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XG5cbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAge1xuICAgICAgICBuYW1lOiAnYXBpLWNvbnRhY3QtZGV2LXNlcnZlcicsXG4gICAgICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcbiAgICAgICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKCcvYXBpL2NvbnRhY3QnLCBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXEubWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgICAgICAgICAgbGV0IGJvZHkgPSAnJztcbiAgICAgICAgICAgICAgcmVxLm9uKCdkYXRhJywgKGNodW5rKSA9PiB7XG4gICAgICAgICAgICAgICAgYm9keSArPSBjaHVuay50b1N0cmluZygpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmVxLm9uKCdlbmQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGJvZHkpO1xuICAgICAgICAgICAgICAgICAgY29uc3QgYXBpS2V5ID0gZW52LlJFU0VORF9BUElfS0VZIHx8IHByb2Nlc3MuZW52LlJFU0VORF9BUElfS0VZO1xuICAgICAgICAgICAgICAgICAgY29uc3Qgd2ViM0tleSA9IGVudi5XRUIzRk9STVNfS0VZIHx8IHByb2Nlc3MuZW52LldFQjNGT1JNU19LRVk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBub3RpZmljYXRpb25FbWFpbCA9XG4gICAgICAgICAgICAgICAgICAgIGVudi5OT1RJRklDQVRJT05fRU1BSUwgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9USUZJQ0FUSU9OX0VNQUlMIHx8XG4gICAgICAgICAgICAgICAgICAgICd0YW51c2hjaGFuZGhyYS52eW9naUBnbWFpbC5jb20nO1xuXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnXFxuW0NPTlRBQ1QgRk9STV0gUHJvY2Vzc2luZyBlbnF1aXJ5IGZyb206JywgZGF0YS5uYW1lLCBgKCR7ZGF0YS5lbWFpbH0pYCk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICh3ZWIzS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlYjNGb3JtcyAoZGlyZWN0IGluYm94IGRlbGl2ZXJ5LCBubyBkb21haW4gbGltaXRzKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS53ZWIzZm9ybXMuY29tL3N1Ym1pdCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3Nfa2V5OiB3ZWIzS2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdDogYE5ldyBQcm9qZWN0IEVucXVpcnkgXHUyMDE0ICR7ZGF0YS5uYW1lfSR7ZGF0YS5idXNpbmVzcyA/IGAgKCR7ZGF0YS5idXNpbmVzc30pYCA6ICcnfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tX25hbWU6ICdSRU5PU09SIFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19lbWFpbDogbm90aWZpY2F0aW9uRW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogZGF0YS5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1c2luZXNzOiBkYXRhLmJ1c2luZXNzIHx8ICdOb3Qgc3BlY2lmaWVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6IGRhdGEuc2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZGdldDogZGF0YS5idWRnZXQgfHwgJ05vdCBzcGVjaWZpZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGF0YS5tZXNzYWdlIHx8ICdObyBtZXNzYWdlIHByb3ZpZGVkJyxcbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNEYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdbV0VCM0ZPUk1TIEVSUk9SXScsIHJlc0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNTAwO1xuICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogcmVzRGF0YS5tZXNzYWdlIHx8ICdXZWIzRm9ybXMgZXJyb3InIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbU1VDQ0VTU10gRW1haWwgZGVsaXZlcmVkIGRpcmVjdGx5IHRvICR7bm90aWZpY2F0aW9uRW1haWx9IHZpYSBXZWIzRm9ybXMhXFxuYCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFwaUtleSAmJiBhcGlLZXkuc3RhcnRzV2l0aCgncmVfJykpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVzZW5kXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLnJlc2VuZC5jb20vZW1haWxzJywge1xuICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthcGlLZXl9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiAnUkVOU09SIDxvbmJvYXJkaW5nQHJlc2VuZC5kZXY+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvOiBbbm90aWZpY2F0aW9uRW1haWxdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdDogYE5ldyBQcm9qZWN0IEVucXVpcnkgXHUyMDE0ICR7ZGF0YS5uYW1lfSR7ZGF0YS5idXNpbmVzcyA/IGAgKCR7ZGF0YS5idXNpbmVzc30pYCA6ICcnfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiBnZW5lcmF0ZUVucXVpcnlFbWFpbEh0bWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbHlfdG86IGRhdGEuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc0RhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdbUkVTRU5EIEVSUk9SXScsIHJlc0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNTAwO1xuICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogcmVzRGF0YS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gc2VuZCBlbWFpbCcgfSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFtTVUNDRVNTXSBFbWFpbCBkaXNwYXRjaGVkIHRvICR7bm90aWZpY2F0aW9uRW1haWx9ISAoSUQ6ICR7cmVzRGF0YS5pZH0pXFxuYCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgW0RFViBTRVJWRVIgTE9HXSBOb3RpZmljYXRpb24gRW1haWw6ICR7bm90aWZpY2F0aW9uRW1haWx9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSAyMDA7XG4gICAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgICAgICAgICAgcmVzLmVuZChcbiAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1Byb2plY3QgZW5xdWlyeSByZWNlaXZlZCBzdWNjZXNzZnVsbHknLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdbQ09OVEFDVCBGT1JNIEVSUk9SXScsIGUpO1xuICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA1MDA7XG4gICAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBlLm1lc3NhZ2UgfHwgJ1NlcnZlciBlcnJvcicgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogJ2Rpc3QnLFxuICAgICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgICB2ZW5kb3I6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nXSxcbiAgICAgICAgICAgIG1vdGlvbjogWydmcmFtZXItbW90aW9uJ10sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IDMwMDAsXG4gICAgICBvcGVuOiB0cnVlLFxuICAgIH0sXG4gIH07XG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXHJlbnNvclxcXFxhcGlcXFxcX2xpYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXHJlbnNvclxcXFxhcGlcXFxcX2xpYlxcXFxlbWFpbC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvdXNlci9PbmVEcml2ZS9EZXNrdG9wL3JlbnNvci9hcGkvX2xpYi9lbWFpbC5qc1wiOy8qKlxuICogRW1haWwgU2VydmljZSBBYnN0cmFjdGlvbiBMYXllclxuICogXG4gKiBNb2R1bGFyIGVtYWlsIHByb3ZpZGVyIFx1MjAxNCBzd2FwIFJlc2VuZCBmb3IgYW55IG90aGVyIHByb3ZpZGVyXG4gKiBieSBpbXBsZW1lbnRpbmcgdGhlIHNhbWUgaW50ZXJmYWNlOlxuICogICBzZW5kRW1haWwoeyB0bywgc3ViamVjdCwgaHRtbCwgcmVwbHlUbyB9KVxuICogXG4gKiBTdXBwb3J0ZWQgcHJvdmlkZXJzOlxuICogLSByZXNlbmQgKGRlZmF1bHQpXG4gKiAtIEFkZCBtb3JlIHByb3ZpZGVycyBieSBjcmVhdGluZyBuZXcgZmlsZXMgYW5kIHVwZGF0aW5nIHRoZSBzd2l0Y2ggYmVsb3dcbiAqL1xuXG5jbGFzcyBSZXNlbmRQcm92aWRlciB7XG4gIGNvbnN0cnVjdG9yKGFwaUtleSkge1xuICAgIHRoaXMuYXBpS2V5ID0gYXBpS2V5O1xuICAgIHRoaXMuYmFzZVVybCA9ICdodHRwczovL2FwaS5yZXNlbmQuY29tJztcbiAgfVxuXG4gIGFzeW5jIHNlbmRFbWFpbCh7IHRvLCBmcm9tLCBzdWJqZWN0LCBodG1sLCByZXBseVRvIH0pIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3RoaXMuYmFzZVVybH0vZW1haWxzYCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3RoaXMuYXBpS2V5fWAsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBmcm9tOiBmcm9tIHx8ICdSRU5TT1IgPG9uYm9hcmRpbmdAcmVzZW5kLmRldj4nLFxuICAgICAgICB0bzogQXJyYXkuaXNBcnJheSh0bykgPyB0byA6IFt0b10sXG4gICAgICAgIHN1YmplY3QsXG4gICAgICAgIGh0bWwsXG4gICAgICAgIHJlcGx5X3RvOiByZXBseVRvLFxuICAgICAgfSksXG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCBlcnJvciA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gc2VuZCBlbWFpbCcpO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gIH1cbn1cblxuY2xhc3MgV2ViM0Zvcm1zUHJvdmlkZXIge1xuICBjb25zdHJ1Y3RvcihhY2Nlc3NLZXkpIHtcbiAgICB0aGlzLmFjY2Vzc0tleSA9IGFjY2Vzc0tleTtcbiAgICB0aGlzLmVuZHBvaW50ID0gJ2h0dHBzOi8vYXBpLndlYjNmb3Jtcy5jb20vc3VibWl0JztcbiAgfVxuXG4gIGFzeW5jIHNlbmRFbWFpbCh7IHRvLCBzdWJqZWN0LCBkYXRhIH0pIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHRoaXMuZW5kcG9pbnQsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYWNjZXNzX2tleTogdGhpcy5hY2Nlc3NLZXksXG4gICAgICAgIHN1YmplY3Q6IHN1YmplY3QsXG4gICAgICAgIGZyb21fbmFtZTogJ1JlbnNvcicsXG4gICAgICAgIHRvX2VtYWlsOiBBcnJheS5pc0FycmF5KHRvKSA/IHRvWzBdIDogdG8sXG4gICAgICAgIC4uLmRhdGEsXG4gICAgICB9KSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rIHx8ICFyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gc2VuZCBlbWFpbCB2aWEgV2ViM0Zvcm1zJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuXG4vKipcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2V0IHRoZSBjb25maWd1cmVkIGVtYWlsIHByb3ZpZGVyLlxuICogU3VwcG9ydHM6IHJlc2VuZCB8IHdlYjNmb3Jtc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW1haWxQcm92aWRlcigpIHtcbiAgY29uc3QgcHJvdmlkZXIgPSBwcm9jZXNzLmVudi5FTUFJTF9QUk9WSURFUiB8fCAocHJvY2Vzcy5lbnYuV0VCM0ZPUk1TX0tFWSA/ICd3ZWIzZm9ybXMnIDogJ3Jlc2VuZCcpO1xuXG4gIHN3aXRjaCAocHJvdmlkZXIpIHtcbiAgICBjYXNlICdyZXNlbmQnOlxuICAgICAgcmV0dXJuIG5ldyBSZXNlbmRQcm92aWRlcihwcm9jZXNzLmVudi5SRVNFTkRfQVBJX0tFWSk7XG4gICAgY2FzZSAnd2ViM2Zvcm1zJzpcbiAgICAgIHJldHVybiBuZXcgV2ViM0Zvcm1zUHJvdmlkZXIocHJvY2Vzcy5lbnYuV0VCM0ZPUk1TX0tFWSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBuZXcgUmVzZW5kUHJvdmlkZXIocHJvY2Vzcy5lbnYuUkVTRU5EX0FQSV9LRVkpO1xuICB9XG59XG5cbi8qKlxuICogR2VuZXJhdGUgdGhlIEhUTUwgZW1haWwgdGVtcGxhdGUgZm9yIGEgbmV3IHByb2plY3QgZW5xdWlyeS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlRW5xdWlyeUVtYWlsSHRtbChkYXRhKSB7XG4gIGNvbnN0IHsgbmFtZSwgYnVzaW5lc3MsIGVtYWlsLCBzZXJ2aWNlLCBtZXNzYWdlLCBidWRnZXQsIHRpbWVzdGFtcCB9ID0gZGF0YTtcblxuICByZXR1cm4gYFxuICAgIDxkaXYgc3R5bGU9XCJmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sIHNhbnMtc2VyaWY7IG1heC13aWR0aDogNjAwcHg7IG1hcmdpbjogMCBhdXRvOyBwYWRkaW5nOiA0MHB4IDIwcHg7IGJhY2tncm91bmQtY29sb3I6ICNGN0Y2RjM7XCI+XG4gICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzExMTExMTsgcGFkZGluZzogMzJweDsgYm9yZGVyLXJhZGl1czogOHB4OyBtYXJnaW4tYm90dG9tOiAyNHB4O1wiPlxuICAgICAgICA8aDEgc3R5bGU9XCJjb2xvcjogI0Y3RjZGMzsgZm9udC1zaXplOiAxOHB4OyBmb250LXdlaWdodDogNzAwOyBsZXR0ZXItc3BhY2luZzogMC4xZW07IG1hcmdpbjogMDtcIj5SRU5TT1I8L2gxPlxuICAgICAgICA8cCBzdHlsZT1cImNvbG9yOiAjOTk5OTk5OyBmb250LXNpemU6IDEycHg7IGxldHRlci1zcGFjaW5nOiAwLjA1ZW07IG1hcmdpbjogOHB4IDAgMDsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcIj5OZXcgUHJvamVjdCBFbnF1aXJ5PC9wPlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGOyBwYWRkaW5nOiAzMnB4OyBib3JkZXItcmFkaXVzOiA4cHg7IGJvcmRlcjogMXB4IHNvbGlkICNEMENFQzk7XCI+XG4gICAgICAgIDx0YWJsZSBzdHlsZT1cIndpZHRoOiAxMDAlOyBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1wiPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6IDEycHggMDsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFOUU3RTM7IGZvbnQtc2l6ZTogMTJweDsgY29sb3I6ICM2NjY2NjY7IHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7IGxldHRlci1zcGFjaW5nOiAwLjA1ZW07IHdpZHRoOiAxNDBweDsgdmVydGljYWwtYWxpZ246IHRvcDtcIj5OYW1lPC90ZD5cbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6IDEycHggMDsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFOUU3RTM7IGZvbnQtc2l6ZTogMTVweDsgY29sb3I6ICMxNzE3MTc7XCI+JHtuYW1lfTwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOiAxMnB4IDA7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTlFN0UzOyBmb250LXNpemU6IDEycHg7IGNvbG9yOiAjNjY2NjY2OyB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyBsZXR0ZXItc3BhY2luZzogMC4wNWVtOyB2ZXJ0aWNhbC1hbGlnbjogdG9wO1wiPkJ1c2luZXNzPC90ZD5cbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6IDEycHggMDsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFOUU3RTM7IGZvbnQtc2l6ZTogMTVweDsgY29sb3I6ICMxNzE3MTc7XCI+JHtidXNpbmVzcyB8fCAnXHUyMDE0J308L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzogMTJweCAwOyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0U5RTdFMzsgZm9udC1zaXplOiAxMnB4OyBjb2xvcjogIzY2NjY2NjsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTsgdmVydGljYWwtYWxpZ246IHRvcDtcIj5FbWFpbDwvdGQ+XG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOiAxMnB4IDA7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTlFN0UzOyBmb250LXNpemU6IDE1cHg7IGNvbG9yOiAjMTcxNzE3O1wiPjxhIGhyZWY9XCJtYWlsdG86JHtlbWFpbH1cIiBzdHlsZT1cImNvbG9yOiAjMTcxNzE3O1wiPiR7ZW1haWx9PC9hPjwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOiAxMnB4IDA7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTlFN0UzOyBmb250LXNpemU6IDEycHg7IGNvbG9yOiAjNjY2NjY2OyB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyBsZXR0ZXItc3BhY2luZzogMC4wNWVtOyB2ZXJ0aWNhbC1hbGlnbjogdG9wO1wiPlNlcnZpY2U8L3RkPlxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzogMTJweCAwOyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0U5RTdFMzsgZm9udC1zaXplOiAxNXB4OyBjb2xvcjogIzE3MTcxNztcIj4ke3NlcnZpY2V9PC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICAgICR7YnVkZ2V0ID8gYFxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6IDEycHggMDsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFOUU3RTM7IGZvbnQtc2l6ZTogMTJweDsgY29sb3I6ICM2NjY2NjY7IHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7IGxldHRlci1zcGFjaW5nOiAwLjA1ZW07IHZlcnRpY2FsLWFsaWduOiB0b3A7XCI+QnVkZ2V0PC90ZD5cbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6IDEycHggMDsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFOUU3RTM7IGZvbnQtc2l6ZTogMTVweDsgY29sb3I6ICMxNzE3MTc7XCI+JHtidWRnZXR9PC90ZD5cbiAgICAgICAgICA8L3RyPmAgOiAnJ31cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOiAxMnB4IDA7IGZvbnQtc2l6ZTogMTJweDsgY29sb3I6ICM2NjY2NjY7IHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7IGxldHRlci1zcGFjaW5nOiAwLjA1ZW07IHZlcnRpY2FsLWFsaWduOiB0b3A7XCI+TWVzc2FnZTwvdGQ+XG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOiAxMnB4IDA7IGZvbnQtc2l6ZTogMTVweDsgY29sb3I6ICMxNzE3MTc7IGxpbmUtaGVpZ2h0OiAxLjY7XCI+JHttZXNzYWdlIHx8ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgICA8cCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjsgZm9udC1zaXplOiAxMXB4OyBjb2xvcjogIzk5OTk5OTsgbWFyZ2luLXRvcDogMjRweDsgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcIj5cbiAgICAgICAgUmVjZWl2ZWQgJHt0aW1lc3RhbXAgPyBuZXcgRGF0ZSh0aW1lc3RhbXApLnRvTG9jYWxlU3RyaW5nKCdlbi1JTicsIHsgdGltZVpvbmU6ICdBc2lhL0tvbGthdGEnIH0pIDogbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygnZW4tSU4nLCB7IHRpbWVab25lOiAnQXNpYS9Lb2xrYXRhJyB9KX1cbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgYDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlMsU0FBUyxjQUFjLGVBQWU7QUFDblYsT0FBTyxXQUFXOzs7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
