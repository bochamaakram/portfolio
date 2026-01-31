import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children, width = "100%" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 75 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ width }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
