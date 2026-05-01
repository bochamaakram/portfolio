import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import "../styles/Hero.css";

const Hero = () => {
    return (
        <section className="hero">
            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1>
                    Hi, I'm <span>
                        <TypeAnimation
                            sequence={['Bouchama Akram', 1000]}
                            wrapper="span"
                            speed={20}
                            repeat={0}
                            cursor={false}
                        />
                    </span>
                </h1>
                <h2>
                    <TypeAnimation
                        sequence={[
                            'Full Stack Web Developer',
                            2000,
                            'Creative Problem Solver',
                            2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                </h2>
                <div className="hero-buttons">
                    <a href="#projects" className="btn-primary">
                        View Work
                    </a>
                    <a href="#contact" className="btn-secondary">
                        Get In Touch
                    </a>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;