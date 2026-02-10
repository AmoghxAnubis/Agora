import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, LogOut, Code2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import ThemeToggle from '../components/ThemeToggle';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check user session
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (!user) {
                navigate('/auth');
            } else {
                setUser(user);
                loadRooms(user.id);
            }
        });
    }, [navigate]);

    const loadRooms = async (userId) => {
        const { data, error } = await supabase
            .from('rooms')
            .select('*')
            .eq('owner_id', userId)
            .order('created_at', { ascending: false });

        if (!error) setRooms(data || []);
    };

    const createRoom = async () => {
        const newRoomId = crypto.randomUUID();
        const { error } = await supabase
            .from('rooms')
            .insert({
                room_id: newRoomId,
                owner_id: user.id
            });

        if (!error) {
            navigate(`/room/${newRoomId}`);
        }
    };

    const joinRoom = () => {
        if (roomId.trim()) {
            navigate(`/room/${roomId.trim()}`);
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="min-h-screen p-8">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
                <h1 className="text-4xl font-bold flex items-center gap-3">
                    <Code2 className="text-apple-blue" size={40} />
                    Agora
                </h1>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg border border-red-500/30"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </motion.button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Create Room Card */}
                <GlassCard className="p-8">
                    <h2 className="text-2xl font-semibold mb-4">Create New Room</h2>
                    <p className="text-secondary mb-6" style={{ color: 'var(--text-secondary)' }}>
                        Start a new collaborative coding session
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 122, 255, 0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={createRoom}
                        className="w-full py-4 bg-apple-blue text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                        <Plus size={20} />
                        Create Room
                    </motion.button>
                </GlassCard>

                {/* Join Room Card */}
                <GlassCard className="p-8">
                    <h2 className="text-2xl font-semibold mb-4">Join Existing Room</h2>
                    <p className="text-secondary mb-6" style={{ color: 'var(--text-secondary)' }}>
                        Enter a room ID to join
                    </p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            placeholder="Room ID"
                            className="flex-1 px-4 py-3 rounded-lg bg-white/50 dark:bg-black/50 border border-white/20 dark:border-white/10 focus:border-apple-blue outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && joinRoom()}
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={joinRoom}
                            className="px-6 py-3 bg-apple-blue text-white rounded-lg font-semibold"
                        >
                            Join
                        </motion.button>
                    </div>
                </GlassCard>
            </div>

            {/* My Rooms */}
            <div className="max-w-6xl mx-auto mt-12">
                <h2 className="text-2xl font-semibold mb-6">My Rooms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rooms.map((room) => (
                        <motion.div
                            key={room.room_id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate(`/room/${room.room_id}`)}
                            className="cursor-pointer"
                        >
                            <GlassCard className="p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <Code2 className="text-apple-blue" size={24} />
                                    <h3 className="font-mono text-sm truncate">{room.room_id}</h3>
                                </div>
                                <p className="text-xs text-secondary" style={{ color: 'var(--text-secondary)' }}>
                                    Created {new Date(room.created_at).toLocaleDateString()}
                                </p>
                            </GlassCard>
                        </motion.div>
                    ))}
                    {rooms.length === 0 && (
                        <div className="col-span-full text-center py-12 text-secondary" style={{ color: 'var(--text-secondary)' }}>
                            No rooms yet. Create one to get started!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
