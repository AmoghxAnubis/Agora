import { motion } from 'framer-motion';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

const GlassCard = ({ children, className = '' }: GlassCardProps) => (
    <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={`
      bg-white/60 dark:bg-black/60 
      backdrop-blur-xl 
      border border-white/20 dark:border-white/10
      rounded-2xl shadow-xl
      ${className}
    `}
    >
        {children}
    </motion.div>
);

export default GlassCard;
