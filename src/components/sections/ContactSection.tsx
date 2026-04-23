import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Reveal from '../animations/Reveal';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// ─── Icon Components ──────────────────────────────────────────────────────────
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1.04 3.34 2 2 0 0 1 3 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const UniversityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const contactInfo = [
  { icon: <EmailIcon />, label: 'Email', value: 'rockrianto231@gmail.com', href: 'mailto:rockrianto231@gmail.com' },
  { icon: <PhoneIcon />, label: 'Phone', value: '+880 1609302952', href: 'tel:+8801609302952' },
  { icon: <LocationIcon />, label: 'Location', value: 'Dhaka, Bangladesh', href: null },
  { icon: <UniversityIcon />, label: 'University Email', value: 'mahim.cse.20230104015@aust.edu', href: 'mailto:mahim.cse.20230104015@aust.edu' },
];

// ─── Component ────────────────────────────────────────────────────────────────
const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');

    const serviceID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || '';
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '';

    if (!serviceID || !templateID || !publicKey) {
      console.warn('EmailJS keys missing. Configure your .env file.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    emailjs.sendForm(serviceID, templateID, formRef.current, publicKey)
      .then(() => {
        setStatus('success');
        setFormData({ user_name: '', user_email: '', user_phone: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      })
      .catch((err) => {
        console.error('EmailJS Error:', err);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <section id="contact" className="content-section">
      <Reveal direction="down">
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          <span>Get In Touch</span>
        </h2>
      </Reveal>

      <Reveal direction="up" delay={0.2}>
        <div className="contact-layout">

          {/* ── Left panel: Contact Info ── */}
          <div className="contact-left-panel">
            <h3 className="contact-left-heading">Contact Information</h3>
            <p className="contact-left-sub">
              Fill up the form and I'll get back to you within 24 hours. Or reach me directly below.
            </p>

            <div className="contact-left-items">
              {contactInfo.map((item, i) => (
                <div key={i} className="contact-left-item">
                  <div className="contact-left-icon-box">{item.icon}</div>
                  <div>
                    <p className="contact-left-text-label">{item.label}</p>
                    <p className="contact-left-text-value">
                      {item.href ? (
                        <a href={item.href}>{item.value}</a>
                      ) : (
                        item.value
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right panel: Form ── */}
          <Card>
            <h3 style={{ marginBottom: '1.25rem', color: 'var(--primary-accent)', fontSize: '1.1rem' }}>
              <span>Send me a message</span>
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>

              {/* Row 1: Name + Email */}
              <div className="contact-form-row">
                <Input
                  name="user_name"
                  label="Name"
                  placeholder="Your name"
                  required
                  value={formData.user_name}
                  onChange={handleChange('user_name')}
                />
                <Input
                  name="user_email"
                  type="email"
                  label="Email"
                  placeholder="your@email.com"
                  required
                  value={formData.user_email}
                  onChange={handleChange('user_email')}
                />
              </div>

              {/* Row 2: Phone + Subject */}
              <div className="contact-form-row">
                <Input
                  name="user_phone"
                  label="Phone (optional)"
                  placeholder="+880..."
                  value={formData.user_phone}
                  onChange={handleChange('user_phone')}
                />
                <Input
                  name="subject"
                  label="Subject"
                  placeholder="Project inquiry..."
                  value={formData.subject}
                  onChange={handleChange('subject')}
                />
              </div>

              {/* Message */}
              <div className="ui-input-wrapper">
                <label className="ui-label" htmlFor="message"><span>Message</span></label>
                <textarea
                  name="message"
                  id="message"
                  className="ui-input"
                  rows={5}
                  placeholder="Hello, I'd like to work with you..."
                  required
                  value={formData.message}
                  style={{ resize: 'vertical' }}
                  onChange={handleChange('message')}
                />
              </div>

              {/* Submit */}
              <div aria-live="polite">
                <Button
                  type="submit"
                  variant="primary"
                  style={{ width: '100%', opacity: status === 'sending' ? 0.7 : 1 }}
                  disabled={status === 'sending'}
                >
                  <span>{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
                </Button>

                {status === 'success' && (
                  <p className="form-status-success">
                    <span>✅ Message sent! I'll reply soon.</span>
                  </p>
                )}
                {status === 'error' && (
                  <p className="form-status-error">
                    <span>⚠️ Something went wrong. Please email me directly.</span>
                  </p>
                )}
              </div>
            </form>
          </Card>

        </div>
      </Reveal>
    </section>
  );
};

export default ContactSection;
