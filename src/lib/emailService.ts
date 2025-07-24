
import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: import.meta.env.VITE_GMAIL_USER,
      pass: import.meta.env.VITE_GMAIL_APP_PASSWORD
    }
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
      <meta charset="utf-8">
      <title>Welcome to MuslimJambite</title>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #05B34D, #10D86B); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
        .content { background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .badge { background: rgba(255, 255, 255, 0.2); padding: 8px 16px; border-radius: 20px; display: inline-block; margin-top: 10px; }
        .program-details { background: #f8fffe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #05B34D; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .cta-button { background: linear-gradient(135deg, #05B34D, #10D86B); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">MuslimJambite</div>
          <h1>Assalamu Alaikum, ${data.fullName}!</h1>
          <div class="badge">Welcome to Islamic Excellence</div>
        </div>
        
        <div class="content">
          <h2 style="color: #05B34D;">🎉 Alhamdulillah! Your Registration is Complete</h2>
          
          <p>JazakAllahu khairan for joining MuslimJambite! We're excited to be part of your journey toward academic success and spiritual growth.</p>
          
          <div class="program-details">
            <h3>📚 Your Program Details:</h3>
            <ul>
              <li><strong>Program:</strong> ${data.program} ${data.techTrack ? '+ Tech Skills' : ''}</li>
              ${data.techTrack ? `<li><strong>Tech Skill:</strong> ${data.techSkill}</li>` : ''}
              <li><strong>Monthly Fee:</strong> ₦${data.monthlyFee.toLocaleString()}</li>
              <li><strong>Duration:</strong> ${data.techTrack ? '12' : '9'} months</li>
            </ul>
          </div>
          
          <h3>🚀 What's Next?</h3>
          <ol>
            <li>You'll receive login credentials within 24 hours</li>
            <li>Join our WhatsApp and Telegram communities</li>
            <li>Attend the orientation session (details coming soon)</li>
            <li>Begin your journey to success, In'sha'Allah!</li>
          </ol>
          
          <div style="text-align: center;">
            <a href="${import.meta.env.VITE_WHATSAPP_CHANNEL}" class="cta-button">Join WhatsApp Community</a>
            <a href="${import.meta.env.VITE_TELEGRAM_CHANNEL}" class="cta-button">Join Telegram Channel</a>
          </div>
          
          <p><strong>Remember:</strong> Success comes from Allah (SWT). We're here to provide the tools and support, but ultimate success is in His hands. May Allah grant you success in this life and the next.</p>
        </div>
        
        <div class="footer">
          <p>For support: muslimgrowth@gmail.com | +2349158480530</p>
          <p>Federal University Of Agriculture, Abeokuta, Ogun State, Nigeria</p>
          <p>© 2024 MuslimJambite. All rights reserved.</p>
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
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"MuslimJambite" <${import.meta.env.VITE_GMAIL_USER}>`,
      to: recipientEmail,
      subject: '🎉 Welcome to MuslimJambite - Your Journey Begins!',
      html: generateWelcomeEmailTemplate(data),
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Failed to send welcome email:', error);
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
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"${contactData.name}" <${import.meta.env.VITE_GMAIL_USER}>`,
      to: 'muslimgrowth@gmail.com',
      replyTo: contactData.email,
      subject: `Contact Form: ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #05B34D;">New Contact Form Submission</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Subject:</strong> ${contactData.subject}</p>
            <div style="margin-top: 20px;">
              <strong>Message:</strong>
              <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                ${contactData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            This email was sent from the MuslimJambite contact form.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully');
  } catch (error) {
    console.error('Failed to send contact email:', error);
    throw error;
  }
};
