import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload } from 'react-icons/fi';
import '../styles/cv-modal.css';

const CVModal = ({ isOpen, onClose, cvUrl }) => {
  // Prevent scroll when modal is open and handle Esc key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cv-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="cv-modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cv-modal-header">
              <h3>Akram Bouchama</h3>
              <button
                className="cv-modal-close-btn"
                onClick={onClose}
                aria-label="Close modal"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="cv-viewer-container">
              <iframe
                src={`${cvUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                title="CV Viewer"
                frameBorder="0"
              ></iframe>
            </div>

            <div className="cv-modal-actions">
              <a
                href={cvUrl}
                download="Akram_Bouchama_CV.pdf"
                className="cv-download-btn"
              >
                <FiDownload size={18} />
                Download PDF
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVModal;

