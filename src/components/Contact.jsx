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
            <a
              href="https://wa.me/212621111542?text=Hi%20Akram!%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect."
              target="_blank"
              rel="noreferrer"
              className="whatsapp-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Start a whatsapp chat
            </a>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;