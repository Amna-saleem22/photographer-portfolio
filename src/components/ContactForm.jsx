import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission (frontend only)
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', service: '', date: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-ink/20 py-3 focus:outline-none focus:border-champagne transition-colors placeholder-ink/40"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-ink/20 py-3 focus:outline-none focus:border-champagne transition-colors placeholder-ink/40"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-ink/20 py-3 focus:outline-none focus:border-champagne transition-colors placeholder-ink/40"
        />
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-ink/20 py-3 focus:outline-none focus:border-champagne transition-colors"
        >
          <option value="">Select Service</option>
          <option>Wedding</option>
          <option>Portrait</option>
          <option>Fashion</option>
          <option>Event</option>
          <option>Commercial</option>
          <option>Travel</option>
        </select>
      </div>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full bg-transparent border-b border-ink/20 py-3 focus:outline-none focus:border-champagne transition-colors"
      />
      <textarea
        name="message"
        placeholder="Tell me about your project..."
        rows="5"
        required
        value={formData.message}
        onChange={handleChange}
        className="w-full bg-transparent border-b border-ink/20 py-3 focus:outline-none focus:border-champagne transition-colors placeholder-ink/40 resize-none"
      />
      <button type="submit" className="btn-primary w-full md:w-auto">
        Send Inquiry
      </button>
    </form>
  );
}