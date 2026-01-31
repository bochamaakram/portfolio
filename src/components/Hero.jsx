import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import "../styles/Hero.css";

const Hero = () => {
    return (
        <section className="hero">
            {/* Content */}
            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className='hi'>
                    Hi, I'm <TypeAnimation
                        sequence={[
                            'Bouchama Akram',
                            3000,
                        ]}
                        wrapper="span"
                        speed={20}
                        repeat={0}
                        cursor={false}
                    />
                </h1>
                <h2>
                    <TypeAnimation
                        sequence={[
                            'Full Stack Web Developer',
                            2000,
                            'aspiring Video Game Creator',
                            2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                </h2>
                <div className="hero-buttons">
                    <a href="#contact" className="btn-primary">
                        Hire Me
                    </a>
                    <a href="#projects" className="btn-secondary">
                        View Work
                    </a>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;