import emailjs from '@emailjs/browser';

// ⚠️ INKO APNI DETAILS SE REPLACE KAREIN
const EMAILJS_SERVICE_ID = 'service_xxxxxx';
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxx';
const TEMPLATE_PHOTOGRAPHER = 'template_alert_xxx';
const TEMPLATE_CLIENT = 'template_reply_xxx';

const WHATSAPP_PHONE = '+923001234567'; // Aapka number
const WHATSAPP_API_KEY = '123456'; // CallMeBot se mila hua API key

/**
 * Photographer ko WhatsApp Alert bhejta hai
 */
export async function sendWhatsAppAlert(formData) {
  if (!WHATSAPP_API_KEY) return;
  
  const text = `📸 *New Booking Inquiry!*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message}`;
  const encodedText = encodeURIComponent(text);
  
  try {
    await fetch(`https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_PHONE}&text=${encodedText}&apikey=${WHATSAPP_API_KEY}`);
  } catch (error) {
    console.error('WhatsApp alert failed:', error);
  }
}

/**
 * Emails send karta hai (Photographer alert + Client auto-reply)
 */
export async function sendEmailAlerts(formData) {
  const templateParams = {
    client_name: formData.name,
    client_email: formData.email,
    client_phone: formData.phone,
    message: formData.message,
  };

  try {
    // 1. Photographer ko alert
    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_PHOTOGRAPHER, templateParams, EMAILJS_PUBLIC_KEY);
    
    // 2. Client ko auto-reply
    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_CLIENT, templateParams, EMAILJS_PUBLIC_KEY);
    
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Email could not be sent');
  }
}

/**
 * Main Function: Form submit hote hi ye call karein
 */
export async function automateFormSubmission(formData) {
  // Dono ko parallel run karein taaki time bache
  await Promise.allSettled([
    sendEmailAlerts(formData),
    sendWhatsAppAlert(formData),
  ]);
}