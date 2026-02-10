import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ArrowRight, Hash } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

interface Room {
    room_id: string;
    owner_id: string;
    created_at: string;
}

const Dashboard = () => {
    const [user, setUser] = useState<any>(null);
    const [rooms, setRooms] = useState<Room[]>([]);
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

    const loadRooms = async (userId: string) => {
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
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
            {/* Minimal Header */}
            <div className="border-b border-black/10 dark:border-white/10">
                <div className="max-w-[1400px] mx-auto px-6 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <span className="font-mono text-xs opacity-50 uppercase tracking-widest">{user.email}</span>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="text-sm font-bold uppercase tracking-wider hover:text-red-500 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-6 pt-20 pb-32">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10vw] font-bold tracking-tighter leading-none mb-24"
                >
                    WORKSPACE.
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-black/10 dark:border-white/10">
                    {/* Actions Column */}
                    <div className="lg:col-span-4 border-r border-black/10 dark:border-white/10 p-8 lg:p-12 flex flex-col gap-12">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">New Session</h2>
                            <button
                                onClick={createRoom}
                                className="w-full h-40 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all flex flex-col items-center justify-center gap-4 group"
                            >
                                <Plus size={48} strokeWidth={1} className="group-hover:scale-110 transition-transform" />
                                <span className="font-mono text-sm uppercase tracking-widest">Create Room</span>
                            </button>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-6">Join Session</h2>
                            <div className="flex gap-0 border border-black/20 dark:border-white/20 p-1">
                                <input
                                    type="text"
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
                                    placeholder="ENTER ROOM ID"
                                    className="flex-1 bg-transparent px-4 py-4 font-mono text-sm outline-none placeholder:opacity-30"
                                    onKeyDown={(e) => e.key === 'Enter' && joinRoom()}
                                />
                                <button
                                    onClick={joinRoom}
                                    className="px-8 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity"
                                >
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Room List Column */}
                    <div className="lg:col-span-8">
                        <div className="p-8 lg:p-12 border-b border-black/10 dark:border-white/10">
                            <h2 className="text-2xl font-bold">Recent Rooms</h2>
                        </div>

                        <div>
                            {rooms.length === 0 ? (
                                <div className="p-12 text-center opacity-40 font-mono text-sm">
                                    NO ACTIVE SESSIONS FOUND
                                </div>
                            ) : (
                                rooms.map((room, i) => (
                                    <motion.div
                                        key={room.room_id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        onClick={() => navigate(`/room/${room.room_id}`)}
                                        className="group flex flex-col md:flex-row items-start md:items-center justify-between p-8 border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 flex items-center justify-center border border-black/10 dark:border-white/10 rounded-full group-hover:scale-110 transition-transform">
                                                <Hash size={20} />
                                            </div>
                                            <div>
                                                <div className="font-mono text-lg">{room.room_id}</div>
                                                <div className="text-xs opacity-40 font-mono mt-1 uppercase tracking-wider">
                                                    Author: You
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 md:mt-0 font-mono text-xs opacity-40">
                                            {new Date(room.created_at).toLocaleDateString()}
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
