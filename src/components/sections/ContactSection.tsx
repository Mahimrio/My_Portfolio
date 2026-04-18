import React, { useState } from 'react';
import Reveal from '../animations/Reveal';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// SVG Icons for Contact
const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const UniversityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const contactInfo = [
  { icon: <EmailIcon />, label: "Email", value: "rockrianto231@gmail.com", href: "mailto:rockrianto231@gmail.com" },
  { icon: <PhoneIcon />, label: "Phone", value: "+880 1609302952", href: "tel:+8801609302952" },
  { icon: <LocationIcon />, label: "Location", value: "Dhaka, Bangladesh", href: null },
  { icon: <UniversityIcon />, label: "University Email", value: "mahim.cse.20230104015@aust.edu", href: "mailto:mahim.cse.20230104015@aust.edu" },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks ${formData.name}! Your message has been simulated to send.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="content-section">
      <Reveal direction="down">
        <h2 className="section-title" style={{ textAlign: 'center' }}>Get In Touch</h2>
      </Reveal>

      {/* Contact Info Grid */}
      <Reveal direction="up" delay={0.1}>
        <div className="contact-info-grid">
          {contactInfo.map((item, i) => (
            <div key={i} className="contact-info-chip">
              <span className="contact-info-icon" style={{ color: 'var(--primary-accent)' }}>{item.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span className="contact-info-label">{item.label}</span>
                {item.href ? (
                  <a href={item.href} className="contact-info-value contact-info-link" style={{ fontSize: '0.8rem' }}>{item.value}</a>
                ) : (
                  <span className="contact-info-value" style={{ fontSize: '0.8rem' }}>{item.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
      
      <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        <Reveal direction="up" delay={0.3}>
          <Card>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-accent)', fontSize: '1.2rem' }}>Send me a message</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input 
                id="name" 
                label="Name" 
                placeholder="Your name" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <Input 
                id="email" 
                type="email" 
                label="Email" 
                placeholder="your@email.com" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              
              <div className="ui-input-wrapper">
                <label className="ui-label" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  className="ui-input" 
                  rows={5} 
                  placeholder="Hello, I'd like to work with you..."
                  required
                  value={formData.message}
                  style={{ resize: 'vertical' }}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              
              <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>Send Message</Button>
            </form>
          </Card>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
