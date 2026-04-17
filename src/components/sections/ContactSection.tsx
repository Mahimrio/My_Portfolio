import React, { useState } from 'react';
import Reveal from '../animations/Reveal';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

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
      
      <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        <Reveal direction="up" delay={0.2}>
          <Card>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input 
                id="name" 
                label="Name" 
                placeholder="John Doe" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <Input 
                id="email" 
                type="email" 
                label="Email" 
                placeholder="john@example.com" 
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
