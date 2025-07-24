
// SMTP.js email service for production-ready email functionality

interface EmailConfig {
  Host: string;
  Username: string;
  Password: string;
  To: string;
  From: string;
  Subject: string;
  Body: string;
}

// Load SMTP.js dynamically
const loadSMTPJS = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if ((window as any).Email) {
      resolve((window as any).Email);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://smtpjs.com/v3/smtp.js';
    script.onload = () => {
      if ((window as any).Email) {
        resolve((window as any).Email);
      } else {
        reject(new Error('SMTP.js failed to load'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load SMTP.js'));
    document.head.appendChild(script);
  });
};

const generateWelcomeEmailTemplate = (data: {
  fullName: string;
  program: string;
  techTrack: boolean;
  techSkill?: string;
  monthlyFee: number;
}) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to MuslimJambite</title>
      <style>
        body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #05B34D, #FFD700); padding: 30px; text-align: center; color: white; }
        .content { padding: 30px; }
        .button { display: inline-block; background: linear-gradient(135deg, #05B34D, #1F8B4C); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; }
        .highlight { background: #E9FBF1; padding: 15px; border-radius: 8px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🕌 Assalamu Alaikum ${data.fullName}!</h1>
          <p>Welcome to the MuslimJambite Family</p>
        </div>
        <div class="content">
          <h2 style="color: #05B34D;">Alhamdulillah! Your Registration is Complete</h2>
          <p>JazakAllahu khairan for joining MuslimJambite! Your journey towards academic excellence and spiritual growth begins now.</p>
          
          <div class="highlight">
            <h3>📚 Your Program Details:</h3>
            <ul>
              <li><strong>Program:</strong> ${data.program}${data.techTrack ? ' + Tech Skills' : ''}</li>
              ${data.techTrack ? `<li><strong>Tech Skill:</strong> ${data.techSkill}</li>` : ''}
              <li><strong>Monthly Fee:</strong> ₦${data.monthlyFee.toLocaleString()}</li>
              <li><strong>Duration:</strong> ${data.techTrack ? '12' : '9'} months</li>
            </ul>
          </div>

          <h3>🚀 What's Next?</h3>
          <ol>
            <li>Complete your payment to activate your account</li>
            <li>Join our WhatsApp and Telegram communities</li>
            <li>Attend your orientation session</li>
            <li>Begin your learning journey!</li>
          </ol>

          <div style="text-align: center;">
            <a href="#" class="button">Access Your Dashboard</a>
          </div>

          <p><strong>Barakallahu feeki,</strong><br>The MuslimJambite Team</p>
          
          <div style="background: #E3F2FD; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; font-style: italic; color: #1976D2;">
              "And say: My Lord, increase me in knowledge." - Quran 20:114
            </p>
          </div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} MuslimJambite. Building the future of Islamic education.</p>
          <p>📧 muslimgrowth@gmail.com | 📱 +2349158480530</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const generateContactEmailTemplate = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #05B34D, #FFD700); padding: 30px; text-align: center; color: white; }
        .content { padding: 30px; }
        .detail-box { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #05B34D; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 New Contact Form Submission</h1>
          <p>MuslimJambite Contact Form</p>
        </div>
        <div class="content">
          <div class="detail-box">
            <strong>Name:</strong> ${data.name}
          </div>
          <div class="detail-box">
            <strong>Email:</strong> ${data.email}
          </div>
          <div class="detail-box">
            <strong>Subject:</strong> ${data.subject}
          </div>
          <div class="detail-box">
            <strong>Message:</strong><br>
            ${data.message.replace(/\n/g, '<br>')}
          </div>
          <div style="margin-top: 20px; padding: 15px; background: #E9FBF1; border-radius: 8px;">
            <p style="margin: 0; color: #1F8B4C;">
              <strong>Submitted on:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const sendWelcomeEmail = async (recipientEmail: string, data: {
  fullName: string;
  program: string;
  techTrack: boolean;
  techSkill?: string;
  monthlyFee: number;
}) => {
  try {
    console.log('🔄 Initializing SMTP.js for welcome email...');
    
    const Email = await loadSMTPJS();
    
    const emailConfig: EmailConfig = {
      Host: import.meta.env.VITE_SMTP_HOST || "smtp.gmail.com",
      Username: import.meta.env.VITE_SMTP_USERNAME || "",
      Password: import.meta.env.VITE_SMTP_PASSWORD || "",
      To: recipientEmail,
      From: import.meta.env.VITE_CONTACT_EMAIL || "muslimgrowth@gmail.com",
      Subject: "🎉 Welcome to MuslimJambite - Your Journey Begins!",
      Body: generateWelcomeEmailTemplate(data)
    };

    console.log('📧 Sending welcome email to:', recipientEmail);
    
    const result = await Email.send(emailConfig);
    
    if (result === "OK") {
      console.log('✅ Welcome email sent successfully');
      return { success: true, message: 'Welcome email sent successfully' };
    } else {
      throw new Error(`Email send failed: ${result}`);
    }
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
    throw error;
  }
};

export const sendContactEmail = async (contactData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    console.log('🔄 Initializing SMTP.js for contact email...');
    
    const Email = await loadSMTPJS();
    
    const emailConfig: EmailConfig = {
      Host: import.meta.env.VITE_SMTP_HOST || "smtp.gmail.com",
      Username: import.meta.env.VITE_SMTP_USERNAME || "",
      Password: import.meta.env.VITE_SMTP_PASSWORD || "",
      To: import.meta.env.VITE_CONTACT_EMAIL || "muslimgrowth@gmail.com",
      From: import.meta.env.VITE_CONTACT_EMAIL || "muslimgrowth@gmail.com",
      Subject: `📨 Contact Form: ${contactData.subject}`,
      Body: generateContactEmailTemplate(contactData)
    };

    console.log('📧 Sending contact email from:', contactData.email);
    
    const result = await Email.send(emailConfig);
    
    if (result === "OK") {
      console.log('✅ Contact email sent successfully');
      return { success: true, message: 'Contact email sent successfully' };
    } else {
      throw new Error(`Email send failed: ${result}`);
    }
  } catch (error) {
    console.error('❌ Failed to send contact email:', error);
    throw error;
  }
};

// Auto-reply to contact form submissions
export const sendContactAutoReply = async (contactData: {
  name: string;
  email: string;
  subject: string;
}) => {
  try {
    const Email = await loadSMTPJS();
    
    const autoReplyTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; padding: 30px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { background: linear-gradient(135deg, #05B34D, #FFD700); color: white; padding: 20px; border-radius: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <h1>🕌 MuslimJambite</h1>
            </div>
          </div>
          <h2>Assalamu Alaikum ${contactData.name}!</h2>
          <p>JazakAllahu khairan for contacting MuslimJambite. We have received your message regarding "<strong>${contactData.subject}</strong>" and will respond within 24 hours, in sha Allah.</p>
          
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>📚 Explore our programs at our website</li>
            <li>📱 Join our WhatsApp community</li>
            <li>📧 Follow us on our social channels</li>
          </ul>
          
          <p><strong>Barakallahu feeki,</strong><br>The MuslimJambite Team</p>
          
          <div style="margin-top: 30px; padding: 20px; background: #E9FBF1; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #1F8B4C; font-style: italic;">
              "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth." - Quran 6:73
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const emailConfig: EmailConfig = {
      Host: import.meta.env.VITE_SMTP_HOST || "smtp.gmail.com",
      Username: import.meta.env.VITE_SMTP_USERNAME || "",
      Password: import.meta.env.VITE_SMTP_PASSWORD || "",
      To: contactData.email,
      From: import.meta.env.VITE_CONTACT_EMAIL || "muslimgrowth@gmail.com",
      Subject: "✅ Your Message Has Been Received - MuslimJambite",
      Body: autoReplyTemplate
    };

    const result = await Email.send(emailConfig);
    
    if (result === "OK") {
      console.log('✅ Auto-reply sent successfully');
      return { success: true, message: 'Auto-reply sent successfully' };
    }
  } catch (error) {
    console.error('❌ Failed to send auto-reply:', error);
    // Don't throw error for auto-reply failures
  }
};
