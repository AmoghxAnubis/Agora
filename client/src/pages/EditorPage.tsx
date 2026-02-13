import Editor from '@monaco-editor/react';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../socket';
import { supabase } from '../supabaseClient';
import Sidebar from '../components/Sidebar';
import { Save, Copy, Check } from 'lucide-react';

interface User {
    id: string;
    name: string;
    color: string;
    socketId?: string;
}

const EditorPage = () => {
    const { roomId } = useParams();
    const [code, setCode] = useState('// Start coding...\n');
    const [language, setLanguage] = useState('javascript');
    const [users, setUsers] = useState<User[]>([]);
    const [isSaved, setIsSaved] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editorRef = useRef<any>(null);
    const currentUserRef = useRef<User | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadCode = async () => {
            const { data } = await supabase
                .from('saved_code')
                .select('*')
                .eq('room_id', roomId)
                .maybeSingle();

            if (isMounted && data) {
                setCode(data.code_content);
                setLanguage(data.language);
            }
        };

        const init = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!isMounted) return;

            // Load saved code
            await loadCode();

            // Connect to socket
            if (!socket.connected) {
                socket.connect();
            }

            const userData = {
                id: user?.id || 'anonymous',
                name: user?.user_metadata?.username || 'Anonymous',
                color: getRandomColor()
            };

            currentUserRef.current = userData;

            socket.emit('join-room', {
                roomId,
                userData
            });
        };

        init();

        // Socket listeners
        const handleRoomUsers = (usersList: User[]) => {
            if (isMounted) setUsers(usersList);
        };

        const handleUserJoined = (userData: User) => {
            if (isMounted) setUsers(prev => [...prev, userData]);
        };

        const handleUserLeft = (socketId: string) => {
            if (isMounted) setUsers(prev => prev.filter(u => u.socketId !== socketId));
        };

        const handleCodeUpdate = ({ code: newCode, language: newLang }: { code: string; language?: string }) => {
            if (isMounted) {
                setCode(newCode);
                if (newLang) setLanguage(newLang);
            }
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleCursorUpdate = ({ position, userId, userName, color }: any) => {
            // TODO: Implement visual cursor rendering
            // For now, we just acknowledge receipt of cursor updates
            console.log(`Cursor update from ${userName} (${userId}):`, position, color);
        };

        socket.on('room-users', handleRoomUsers);
        socket.on('user-joined', handleUserJoined);
        socket.on('user-left', handleUserLeft);
        socket.on('code-update', handleCodeUpdate);
        socket.on('cursor-update', handleCursorUpdate);

        return () => {
            isMounted = false;
            socket.emit('leave-room', roomId);
            socket.off('room-users', handleRoomUsers);
            socket.off('user-joined', handleUserJoined);
            socket.off('user-left', handleUserLeft);
            socket.off('code-update', handleCodeUpdate);
            socket.off('cursor-update', handleCursorUpdate);
            socket.disconnect();
        };
    }, [roomId]);

    const handleEditorChange = (value: string | undefined) => {
        if (value) {
            setCode(value);
            socket.emit('code-change', { roomId, code: value, language });
            setIsSaved(false);
        }
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
        if (roomId) navigator.clipboard.writeText(roomId);
    };

    const getRandomColor = () => {
        const colors = ['#007AFF', '#FF3B30', '#34C759', '#FF9500', '#AF52DE'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        editor.onDidChangeCursorPosition((e: any) => {
            if (currentUserRef.current) {
                socket.emit('cursor-move', {
                    roomId,
                    position: e.position,
                    userId: currentUserRef.current.id,
                    userName: currentUserRef.current.name,
                    color: currentUserRef.current.color
                });
            }
        });
    };

    return (
        <div className="h-screen flex overflow-hidden bg-white dark:bg-black text-black dark:text-white">
            {/* Sidebar */}
            <Sidebar users={users} roomId={roomId} />

            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar - Technical Header */}
                <div className="h-14 border-b border-black/10 dark:border-white/10 flex items-center justify-between px-6 bg-gray-50/50 dark:bg-[#0A0A0A]/50 backdrop-blur-sm">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="font-mono text-xs uppercase tracking-widest opacity-60">Connected</span>
                        </div>
                        <div className="h-4 w-[1px] bg-black/10 dark:bg-white/10" />
                        <select
                            value={language}
                            onChange={(e) => {
                                setLanguage(e.target.value);
                                socket.emit('code-change', { roomId, code, language: e.target.value });
                            }}
                            className="bg-transparent font-mono text-sm outline-none cursor-pointer uppercase tracking-wider hover:opacity-70 transition-opacity"
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="cpp">C++</option>
                            <option value="typescript">TypeScript</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={copyRoomId}
                            className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors font-mono text-xs uppercase"
                        >
                            <Copy size={14} />
                            <span>Copy ID</span>
                        </button>

                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded hover:opacity-80 transition-opacity font-mono text-xs uppercase font-bold tracking-wide"
                        >
                            {isSaved ? <Check size={14} /> : <Save size={14} />}
                            <span>{isSaved ? 'Saved' : 'Save'}</span>
                        </button>
                    </div>
                </div>

                {/* Editor Container */}
                <div className="flex-1 relative">
                    <Editor
                        height="100%"
                        language={language}
                        value={code}
                        theme="vs-dark"
                        onMount={handleEditorDidMount}
                        onChange={handleEditorChange}
                        options={{
                            fontFamily: "'Fira Code', 'Monaco', 'Menlo', 'Consolas', monospace",
                            fontSize: 14,
                            minimap: { enabled: false },
                            padding: { top: 24, bottom: 24 },
                            lineNumbers: 'on',
                            roundedSelection: false,
                            scrollBeyondLastLine: false,
                            readOnly: false,
                            automaticLayout: true,
                        }}
                        className="border-none"
                    />
                </div>

                {/* Footer Status Bar */}
                <div className="h-8 border-t border-black/10 dark:border-white/10 flex items-center justify-between px-4 bg-gray-50 dark:bg-[#0A0A0A] font-mono text-[10px] opacity-60 select-none">
                    <div className="flex gap-4">
                        <span>Ln {code.split('\n').length}, Col 1</span>
                        <span>UTF-8</span>
                        <span>{language.toUpperCase()}</span>
                    </div>
                    <div>
                        AGORA EDITOR V1.0
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorPage;
