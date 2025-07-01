import { motion } from 'framer-motion';
import '../styles/testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Youssef Ait Belfadil',
    role: 'fellow developer',
    content:
      'Having worked with him on multiple projects, I can confidently say he is one of the best in the field. His expertise is unmatched he consistently raises the bar. What sets him apart isn’t just his skill, but how he elevates the entire team.',
    avatar: 'https://avatars.githubusercontent.com/u/156646603?v=4',
  },
  {
    id: 2,
    name: 'Alioua Abdallah',
    role: 'fellow developer and entrepreneur',
    content:
      'An excellent colleague and someone who is great to have on the same team possesses a combination of professional skills, interpersonal qualities, and a positive attitude that enhances collaboration and productivity.',
    avatar: 'https://lh3.googleusercontent.com/pw/AP1GczNBQBxHfpysWALRl2R01ERThnrFb1pXiJIEJBDaYYWWaRh2MuKvq5gYfKVzY__wWx0ie74iDsVWHglmtGNmeLR3dEXW2aWXjDoStJTN5mAN7zX7iE3eOmtQ7ZnubwAjBQdqnkI7PFWt3gUZ1p8VR0MN=w676-h899-s-no-gm?authuser=0',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials">
      <motion.div
        className="testimonials-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Testimonials</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="testimonial-content">
                <p>"{testimonial.content}"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                </div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;