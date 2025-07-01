import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiSend, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import '../styles/contact.css';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        'service_id',
        'template_id',
        form.current,
        'user_id'
      )
      .then(
        (result) => {
          setMessage({ text: 'Message sent successfully!', type: 'success' });
          form.current.reset();
          setIsSubmitting(false);
          setTimeout(() => setMessage({ text: '', type: '' }), 5000);
        },
        (error) => {
          setMessage({
            text: 'Failed to send message. Please try again.',
            type: 'error',
          });
          setIsSubmitting(false);
        }
      );
  };

  return (
    <section id="contact" className="contact">
      <motion.div
        className="contact-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">
                <FiMail />
              </div>
              <div>
                <h4>Email</h4>
                <p>boouchamaakraam@gmail.com</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <FiPhone />
              </div>
              <div>
                <h4>Phone</h4>
                <p>+212 06 21 11 15 42</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <FiMapPin />
              </div>
              <div>
                <h4>Location</h4>
                <p>Marrakech ,Morocco</p>
              </div>
            </div>
          </div>
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            {message.text && (
              <div className={`form-message ${message.type}`}>{message.text}</div>
            )}
            <div className="form-group">
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="user_subject"
                placeholder="Subject"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Sending...' : 'Send Message'} <FiSend />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;