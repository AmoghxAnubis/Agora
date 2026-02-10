import { motion } from 'framer-motion';
import { Users, X, Minus } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ users, roomId }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <>
            {isExpanded ? (
                <motion.div
                    initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    exit={{ x: -300 }}
                    className="w-64 bg-white/60 dark:bg-black/60 backdrop-blur-xl border-r border-white/20 dark:border-white/10 p-4 flex flex-col"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Users size={20} className="text-apple-blue" />
                            Active Users
                        </h3>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsExpanded(false)}
                            className="p-1 hover:bg-white/20 dark:hover:bg-black/20 rounded"
                        >
                            <Minus size={18} />
                        </motion.button>
                    </div>

                    <div className="space-y-3 flex-1">
                        {users.map((user, index) => (
                            <motion.div
                                key={user.id || index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 p-2 rounded-lg bg-white/30 dark:bg-black/30"
                            >
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                                    style={{ backgroundColor: user.color || '#007AFF' }}
                                >
                                    {user.name?.[0]?.toUpperCase() || 'A'}
                                </div>
                                <span className="text-sm">{user.name || 'Anonymous'}</span>
                            </motion.div>
                        ))}
                        {users.length === 0 && (
                            <p className="text-sm text-secondary text-center py-4" style={{ color: 'var(--text-secondary)' }}>
                                No other users yet
                            </p>
                        )}
                    </div>

                    <div className="mt-4 p-3 bg-white/30 dark:bg-black/30 rounded-lg">
                        <p className="text-xs font-mono text-secondary break-all" style={{ color: 'var(--text-secondary)' }}>
                            Room: {roomId?.slice(0, 8)}...
                        </p>
                    </div>
                </motion.div>
            ) : (
                <motion.button
                    initial={{ x: -50 }}
                    animate={{ x: 0 }}
                    onClick={() => setIsExpanded(true)}
                    className="absolute top-4 left-4 p-3 bg-white/60 dark:bg-black/60 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg shadow-lg z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Users size={20} className="text-apple-blue" />
                </motion.button>
            )}
        </>
    );
};

export default Sidebar;
