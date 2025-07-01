import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import '../styles/contact.css';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "fff8147f-22c9-46cc-9251-4af470db95f5", // Replace with your actual access key
          name: form.current.user_name.value,
          email: form.current.user_email.value,
          subject: form.current.user_subject.value,
          message: form.current.message.value,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ text: 'Message sent successfully!', type: 'success' });
        form.current.reset();
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      setMessage({
        text: error.message || 'Failed to send message. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    }
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
                <p>Marrakech, Morocco</p>
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