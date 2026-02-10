import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Book, Code2, Terminal, Shield, Zap, Layout, ArrowLeft } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Docs = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black/10 dark:selection:bg-white/20">
            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="flex items-center gap-2 font-semibold">
                            <div className="bg-black dark:bg-white p-1 rounded-md text-white dark:text-black">
                                <Code2 size={16} />
                            </div>
                            <span>Agora Docs</span>
                        </div>
                    </div>
                    <ThemeToggle />
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 flex gap-12">
                {/* Sidebar */}
                <aside className="w-64 hidden md:block sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto pr-4">
                    <div className="space-y-8">
                        <div>
                            <h5 className="font-semibold mb-3 text-sm text-gray-400 uppercase tracking-wider">Getting Started</h5>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <li><a href="#introduction" className="hover:text-black dark:hover:text-white transition-colors block py-1">Introduction</a></li>
                                <li><a href="#quick-start" className="hover:text-black dark:hover:text-white transition-colors block py-1">Quick Start</a></li>
                                <li><a href="#architecture" className="hover:text-black dark:hover:text-white transition-colors block py-1">Architecture</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-3 text-sm text-gray-400 uppercase tracking-wider">Features</h5>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <li><a href="#real-time" className="hover:text-black dark:hover:text-white transition-colors block py-1">Real-time Collaboration</a></li>
                                <li><a href="#editor" className="hover:text-black dark:hover:text-white transition-colors block py-1">Editor Capabilities</a></li>
                                <li><a href="#security" className="hover:text-black dark:hover:text-white transition-colors block py-1">Security</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-3 text-sm text-gray-400 uppercase tracking-wider">API</h5>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <li><a href="#websocket" className="hover:text-black dark:hover:text-white transition-colors block py-1">WebSocket Events</a></li>
                                <li><a href="#rest" className="hover:text-black dark:hover:text-white transition-colors block py-1">REST Endpoints</a></li>
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 max-w-3xl space-y-16">
                    {/* Introduction */}
                    <section id="introduction" className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Introduction</h1>
                            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
                                Agora is a high-performance, real-time collaborative code editor designed for speed and simplicity. Built with React, Node.js, and WebSocket technology, it provides a seamless environment for pair programming, technical interviews, and team collaboration.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
                                <Zap className="mb-4" />
                                <h3 className="font-bold mb-2">Lightning Fast</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Sub-50ms latency for real-time synchronization via WebSocket edge networks.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
                                <Shield className="mb-4" />
                                <h3 className="font-bold mb-2">Secure by Default</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">End-to-end encryption for all sessions and secure Supabase authentication.</p>
                            </div>
                        </div>
                    </section>

                    {/* Quick Start */}
                    <section id="quick-start" className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">Quick Start</h2>
                        <div className="prose prose-lg dark:prose-invert">
                            <p className="text-gray-500 dark:text-gray-400">
                                Get your first session running in seconds. No configuration required.
                            </p>
                            <div className="mt-6 p-6 rounded-2xl bg-black dark:bg-white/10 text-white font-mono text-sm overflow-x-auto">
                                <div className="flex gap-2 text-gray-400 mb-2"># Install dependencies</div>
                                <div>npm install</div>
                                <div className="flex gap-2 text-gray-400 my-2"># Start the development server</div>
                                <div>npm run dev</div>
                            </div>
                        </div>
                    </section>

                    {/* Architecture */}
                    <section id="architecture" className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">Architecture</h2>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                            Agora is built on a modern stack ensuring scalability and reliability.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 border-l-2 border-black dark:border-white">
                                <Layout className="shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold">Frontend</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">React + Vite + TypeScript. Uses Monaco Editor for the coding interface and Framer Motion for animations.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 border-l-2 border-gray-200 dark:border-gray-800">
                                <Terminal className="shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold">Backend</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Node.js + Express + Socket.io. Handles real-time event propagation and room management.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 border-l-2 border-gray-200 dark:border-gray-800">
                                <Book className="shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold">Database</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Supabase (PostgreSQL). Stores user profiles, room metadata, and saved code snippets.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Real-time Collaboration */}
                    <section id="real-time" className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">Real-time Collaboration</h2>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                            The core of Agora is its operational transformation (OT) inspired synchronization. When a user types:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                            <li>Client emits <code className="bg-gray-100 dark:bg-white/10 px-1 py-0.5 rounded text-xs font-mono">code-change</code> event.</li>
                            <li>Server validates user permissions and room state.</li>
                            <li>Server broadcasts change to all other connected sockets in the room `roomId`.</li>
                            <li>Clients receive update and apply delta to Monaco model without disturbing cursor position.</li>
                        </ol>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Docs;
