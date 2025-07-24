
// Mock email service for frontend use
// In production, this would be replaced with actual backend API calls

const logEmail = (type: string, data: any) => {
  console.log(`📧 ${type} Email would be sent:`, data);
  // In production, this would make an API call to your backend
};

const generateWelcomeEmailTemplate = (data: {
  fullName: string;
  program: string;
  techTrack: boolean;
  techSkill?: string;
  monthlyFee: number;
}) => {
  return `
    Welcome Email Template for ${data.fullName}
    Program: ${data.program} ${data.techTrack ? '+ Tech Skills' : ''}
    ${data.techTrack ? `Tech Skill: ${data.techSkill}` : ''}
    Monthly Fee: ₦${data.monthlyFee.toLocaleString()}
    Duration: ${data.techTrack ? '12' : '9'} months
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
    const emailContent = {
      to: recipientEmail,
      subject: '🎉 Welcome to MuslimJambite - Your Journey Begins!',
      template: generateWelcomeEmailTemplate(data),
      data
    };
    
    logEmail('Welcome', emailContent);
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ Welcome email sent successfully (simulated)');
    return { success: true, message: 'Welcome email sent successfully' };
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
    const emailContent = {
      to: 'muslimgrowth@gmail.com',
      replyTo: contactData.email,
      subject: `Contact Form: ${contactData.subject}`,
      data: contactData
    };
    
    logEmail('Contact', emailContent);
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ Contact email sent successfully (simulated)');
    return { success: true, message: 'Contact email sent successfully' };
  } catch (error) {
    console.error('❌ Failed to send contact email:', error);
    throw error;
  }
};
