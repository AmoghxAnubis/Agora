import { motion } from 'framer-motion';
import { Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
    users: { id: string; name: string; color: string }[];
    roomId?: string;
}

const Sidebar = ({ users, roomId }: SidebarProps) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <motion.div
            initial={false}
            animate={{ width: isExpanded ? 240 : 48 }}
            className="flex-shrink-0 bg-gray-50 dark:bg-[#0A0A0A] border-r border-black/10 dark:border-white/10 flex flex-col transition-all duration-300 relative"
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center hover:scale-110 transition-transform z-10"
            >
                {isExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
            </button>

            {/* Header */}
            <div className="h-14 border-b border-black/10 dark:border-white/10 flex items-center px-4 overflow-hidden">
                <div className="flex items-center gap-3 min-w-[200px]">
                    <Users size={16} className="opacity-50" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider opacity-70">
                        Active Users
                    </span>
                    <span className="ml-auto bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-mono">
                        {users.length}
                    </span>
                </div>
            </div>

            {/* Users List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {users.map((user, index) => (
                    <motion.div
                        key={user.id || index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center gap-3 p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${!isExpanded ? 'justify-center ml-0.5' : ''}`}
                    >
                        <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                            style={{ backgroundColor: user.color || '#333333' }}
                        >
                            {user.name?.[0]?.toUpperCase() || 'A'}
                        </div>
                        {isExpanded && (
                            <span className="font-mono text-xs truncate opacity-80">
                                {user.name || 'Anonymous'}
                            </span>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Footer / Room Info */}
            <div className="border-t border-black/10 dark:border-white/10 p-4 overflow-hidden">
                {isExpanded && roomId && (
                    <div className="space-y-1">
                        <div className="text-[10px] uppercase tracking-wider opacity-40 font-bold">Session ID</div>
                        <div className="font-mono text-[10px] opacity-60 truncate select-all">
                            {roomId}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Sidebar;
