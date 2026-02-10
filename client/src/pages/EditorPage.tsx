import Editor from '@monaco-editor/react';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { socket } from '../socket';
import { supabase } from '../supabaseClient';
import Sidebar from '../components/Sidebar';
import { Save, Play, Copy } from 'lucide-react';

const EditorPage = () => {
    const { roomId } = useParams();
    const [code, setCode] = useState('// Start coding...\n');
    const [language, setLanguage] = useState('javascript');
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const editorRef = useRef(null);

    useEffect(() => {
        // Get current user
        supabase.auth.getUser().then(({ data: { user } }) => {
            setCurrentUser(user);

            // Load saved code
            loadCode();

            // Connect to socket
            socket.connect();
            socket.emit('join-room', {
                roomId,
                userData: {
                    id: user?.id || 'anonymous',
                    name: user?.user_metadata?.username || 'Anonymous',
                    color: getRandomColor()
                }
            });
        });

        // Socket listeners
        socket.on('room-users', (usersList) => {
            setUsers(usersList);
        });

        socket.on('user-joined', (userData) => {
            setUsers(prev => [...prev, userData]);
        });

        socket.on('user-left', (userId) => {
            setUsers(prev => prev.filter(u => u.id !== userId));
        });

        socket.on('code-update', ({ code: newCode, language: newLang }) => {
            setCode(newCode);
            if (newLang) setLanguage(newLang);
        });

        return () => {
            socket.emit('leave-room', roomId);
            socket.off('room-users');
            socket.off('user-joined');
            socket.off('user-left');
            socket.off('code-update');
            socket.disconnect();
        };
    }, [roomId]);

    const loadCode = async () => {
        const { data, error } = await supabase
            .from('saved_code')
            .select('*')
            .eq('room_id', roomId)
            .maybeSingle();

        if (data) {
            setCode(data.code_content);
            setLanguage(data.language);
        }
    };

    const handleEditorChange = (value) => {
        setCode(value);
        socket.emit('code-change', { roomId, code: value, language });
        setIsSaved(false);
    };

    const handleSave = async () => {
        const { error } = await supabase
            .from('saved_code')
            .upsert({
                room_id: roomId,
                code_content: code,
                language: language,
                last_updated: new Date()
            }, { onConflict: 'room_id' });

        if (!error) {
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        }
    };

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
    };

    const getRandomColor = () => {
        const colors = ['#007AFF', '#FF3B30', '#34C759', '#FF9500', '#AF52DE'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="h-screen flex overflow-hidden" style={{ background: 'var(--background)' }}>
            {/* Sidebar */}
            <Sidebar users={users} roomId={roomId} />

            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col p-4">
                {/* Top Bar */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <select
                            value={language}
                            onChange={(e) => {
                                setLanguage(e.target.value);
                                socket.emit('code-change', { roomId, code, language: e.target.value });
                            }}
                            className="px-4 py-2 rounded-lg bg-white/60 dark:bg-black/60 backdrop-blur-md border border-white/20 dark:border-white/10"
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="cpp">C++</option>
                            <option value="typescript">TypeScript</option>
                        </select>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={copyRoomId}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 dark:bg-black/60 backdrop-blur-md border border-white/20 dark:border-white/10"
                        >
                            <Copy size={16} />
                            Copy Room ID
                        </motion.button>
                    </div>

                    <div className="flex items-center gap-2">
                        <AnimatePresence>
                            {isSaved && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-green-500 text-sm"
                                >
                                    Saved!
                                </motion.span>
                            )}
                        </AnimatePresence>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 bg-apple-blue text-white rounded-lg"
                        >
                            <Save size={16} />
                            Save
                        </motion.button>
                    </div>
                </div>

                {/* Editor Card */}
                <div className="flex-1 rounded-2xl bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden">
                    <Editor
                        height="100%"
                        language={language}
                        value={code}
                        onChange={handleEditorChange}
                        theme={document.documentElement.classList.contains('dark') ? 'vs-dark' : 'vs-light'}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
                            lineNumbers: 'on',
                            roundedSelection: true,
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            padding: { top: 16, bottom: 16 }
                        }}
                        onMount={(editor) => {
                            editorRef.current = editor;
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditorPage;
