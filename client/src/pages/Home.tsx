import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, ArrowRight, Zap, Database, Shield, Terminal, MoveRight } from 'lucide-react';
import { useRef } from 'react';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Parallax effects
    const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <div ref={containerRef} className="min-h-screen relative bg-white dark:bg-black text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black font-sans">

            {/* Global Noise Texture */}
            <div className="bg-noise fixed inset-0 z-50 pointer-events-none mix-blend-overlay opacity-50"></div>

            {/* Progress Bar */}
            <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-current z-[100] origin-left" style={{ scaleX: scrollYProgress }} />

            {/* Navigation */}
            <nav className="fixed top-0 inset-x-0 z-40 border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-md">
                <div className="max-w-[1400px] mx-auto h-16 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold tracking-tighter text-xl">
                        <Code2 size={24} />
                        <span>AGORA</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-tight">
                        <a href="#features" className="hover:opacity-50 transition-opacity">Features</a>
                        <a href="#how-it-works" className="hover:opacity-50 transition-opacity">Process</a>
                        <Link to="/docs" className="hover:opacity-50 transition-opacity">Docs</Link>
                        <div className="w-px h-4 bg-current opacity-20"></div>
                        <ThemeToggle />
                        <Link to="/auth" className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-80 transition-opacity">
                            Start Coding
                        </Link>
                    </div>
                </div>
            </nav>

            <main>
                {/* Massive Hero */}
                <section className="min-h-[90vh] flex flex-col justify-center px-6 relative overflow-hidden border-b border-black/5 dark:border-white/10">
                    <div className="max-w-[1400px] mx-auto w-full pt-20">
                        <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="relative z-10">
                            <h1 className="text-[12vw] leading-[0.8] font-bold tracking-tighter mb-8">
                                AGORA <br />
                                <span className="ml-[10vw] text-[6vw] block">CODE SYNC.</span>
                            </h1>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-6xl ml-auto border-t border-black/10 dark:border-white/10 pt-8 mt-12">
                                <p className="text-xl md:text-2xl max-w-xl font-medium leading-tight text-gray-500 dark:text-gray-400">
                                    The collaborative editor for high-performance teams.
                                    Zero latency. Zero config. Pure flow state.
                                </p>
                                <div className="flex items-center gap-4">
                                    <Link to="/dashboard" className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full text-lg font-bold hover:scale-105 transition-transform flex items-center gap-2">
                                        Enter Room <ArrowRight size={18} />
                                    </Link>
                                    <Link to="/docs" className="px-8 py-4 border border-black/10 dark:border-white/10 rounded-full text-lg font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                        Read Docs
                                    </Link>
                                </div>
                            </div>

                        </motion.div>

                        {/* Floating Code Snippet */}
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                            className="absolute top-32 right-8 hidden lg:block w-[550px] bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl shadow-2xl p-8 font-mono text-sm z-20 rotate-[-5deg] hover:rotate-0 transition-transform duration-500"
                        >
                            <div className="flex gap-1.5 mb-4 opacity-30">
                                <div className="w-2.5 h-2.5 rounded-full bg-current" />
                                <div className="w-2.5 h-2.5 rounded-full bg-current" />
                                <div className="w-2.5 h-2.5 rounded-full bg-current" />
                            </div>
                            <div className="space-y-1 text-gray-500 dark:text-gray-400">
                                <div><span className="text-black dark:text-white font-bold">function</span> <span className="text-black dark:text-white italic">collaborate</span>() {'{'}</div>
                                <div className="pl-4">const users = await Agora.sync();</div>
                                <div className="pl-4">return (</div>
                                <div className="pl-8">&lt;<span className="text-black dark:text-white font-bold">Editor</span> </div>
                                <div className="pl-12">mode="real-time"</div>
                                <div className="pl-12">cursor=<span className="text-black dark:text-white">{'{'}true{'}'}</span></div>
                                <div className="pl-8">/&gt;</div>
                                <div className="pl-4">);</div>
                                <div>{'}'}</div>
                            </div>

                            {/* Hovering Cursor */}
                            <motion.div
                                animate={{
                                    x: [0, 50, 0],
                                    y: [0, 20, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute bottom-10 right-10"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-black dark:text-white drop-shadow-lg transform rotate-[-15deg]">
                                    <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19169L11.7841 12.3673H5.65376Z" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <div className="absolute top-4 left-2 bg-black dark:bg-white text-white dark:text-black text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md tracking-wider">
                                    YOU
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Abstract Decorative Elements */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[30vw] h-[30vw] border border-black/5 dark:border-white/5 rounded-full pointer-events-none animate-spin-slow opacity-50" />
                    <div className="absolute left-[-10%] bottom-[-10%] w-[40vw] h-[40vw] border border-black/5 dark:border-white/5 rounded-full pointer-events-none animate-spin-slower opacity-30" />
                </section >

                {/* Marquee */}
                < div className="border-b border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden py-4" >
                    <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-4xl font-bold text-transparent stroke-text opacity-20">
                        <span>JAVASCRIPT</span> <span>TYPESCRIPT</span> <span>PYTHON</span> <span>RUST</span> <span>GO</span> <span>JAVA</span> <span>C++</span>
                        <span>JAVASCRIPT</span> <span>TYPESCRIPT</span> <span>PYTHON</span> <span>RUST</span> <span>GO</span> <span>JAVA</span> <span>C++</span>
                    </div>
                </div >

                {/* Sticky Scroll Features */}
                < section id="features" className="max-w-[1400px] mx-auto px-6 py-32" >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="lg:sticky lg:top-32 h-fit">
                            <h2 className="text-6xl font-bold tracking-tighter mb-8">
                                PRECISION <br /> TOOLS.
                            </h2>
                            <p className="text-2xl text-gray-500 dark:text-gray-400 mb-12 max-w-md">
                                Everything you need to ship faster. Nothing you don't.
                            </p>
                            <div className="space-y-4">
                                {['Real-time Sync', 'Secure Storage', 'Zen Mode', 'Multi-language'].map((item, i) => (
                                    <div key={item} className="flex items-center gap-4 py-4 border-b border-black/5 dark:border-white/10 group cursor-pointer">
                                        <span className="text-sm font-mono opacity-50">0{i + 1}</span>
                                        <span className="text-2xl font-medium group-hover:pl-4 transition-all">{item}</span>
                                        <MoveRight className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-12">
                            <FeatureBlock
                                icon={<Zap size={32} />}
                                title="50ms Latency"
                                desc="Powered by WebSocket edge networks. Every keystroke is broadcast instantly across the globe. It feels local because it basically is."
                            />
                            <FeatureBlock
                                icon={<Database size={32} />}
                                title="PostgreSQL"
                                desc="Your code is versioned and stored securely in Supabase. Row-level security ensures only your team sees your work."
                            />
                            <FeatureBlock
                                icon={<Terminal size={32} />}
                                title="Monaco Editor"
                                desc="The same engine that powers VS Code. Intellisense, syntax highlighting, and themes for over 20 languages."
                            />
                            <FeatureBlock
                                icon={<Shield size={32} />}
                                title="Secure by Design"
                                desc="End-to-end encryption for all sessions. We don't store your data any longer than necessary."
                            />
                        </div>
                    </div>
                </section >

                {/* Large Grid "Swiss Style" Layout */}
                < section className="border-t border-black/5 dark:border-white/10" >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black/5 dark:divide-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                        <StatBox label="Active Users" value="10k+" />
                        <StatBox label="Lines of Code" value="50M+" />
                        <StatBox label="Countries" value="120+" />
                        <StatBox label="Uptime" value="99.9%" />
                    </div>
                </section >

                {/* Technical Specs Grid */}
                <section className="border-t border-black/5 dark:border-white/10">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/5 dark:divide-white/10">
                            <TechSpecBlock
                                title="RUNTIME"
                                specs={[
                                    { label: "Latency", value: "< 50ms" },
                                    { label: "Uptime", value: "99.99%" },
                                    { label: "Region", value: "Global Edge" }
                                ]}
                            />
                            <TechSpecBlock
                                title="SECURITY"
                                specs={[
                                    { label: "Encryption", value: "AES-256" },
                                    { label: "Compliance", value: "SOC2 Ready" },
                                    { label: "Auth", value: "OAuth 2.0" }
                                ]}
                            />
                            <TechSpecBlock
                                title="INFRASTRUCTURE"
                                specs={[
                                    { label: "Database", value: "PostgreSQL" },
                                    { label: "Scaling", value: "Auto-elastic" },
                                    { label: "Backup", value: "Continuous" }
                                ]}
                            />
                        </div>
                    </div>
                </section>

                {/* Minimal Timeline */}
                <section id="how-it-works" className="py-32 px-6 max-w-[1400px] mx-auto border-t border-black/5 dark:border-white/10">
                    <h2 className="text-4xl font-bold mb-20 tracking-tighter">THE WORKFLOW</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black dark:border-white pt-12">
                        <Step number="01" title="Create" text="Spin up a fresh environment with one click. No provisioning required." />
                        <Step number="02" title="Invite" text="Share a secure link. Collaborators join instantly without sign-up." />
                        <Step number="03" title="Build" text="Write, debug, and ship together in real-time." />
                    </div>
                </section>

                {/* Manifesto Section */}
                <section className="py-40 border-t border-black/5 dark:border-white/10 bg-black dark:bg-white text-white dark:text-black overflow-hidden relative">
                    <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                        <h2 className="text-[8vw] leading-[0.9] font-bold tracking-tighter mb-12">
                            CODE AT THE <br />
                            SPEED OF THOUGHT.
                        </h2>
                        <p className="text-2xl md:text-3xl max-w-4xl opacity-80 leading-relaxed font-medium">
                            We believe that collaboration shouldn't come at the cost of performance.
                            Agora is built on the philosophy that your tools should be invisible,
                            allowing you to enter a state of pure flow.
                        </p>
                    </div>
                    {/* Decorative giant text */}
                    <div className="absolute -bottom-20 -right-20 text-[20vw] font-bold opacity-5 pointer-events-none select-none tracking-tighter leading-none">
                        FLOW
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-white dark:bg-black text-black dark:text-white pt-32 pb-20 px-6 border-t border-black/5 dark:border-white/10">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-32">
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-2 font-bold tracking-tighter text-2xl mb-8">
                                    <Code2 size={32} />
                                    <span>AGORA</span>
                                </div>
                                <p className="text-lg max-w-md text-gray-500 dark:text-gray-400">
                                    The new standard for collaborative development.
                                    Built for teams who ship.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-8 opacity-50">Platform</h3>
                                <ul className="space-y-4 text-sm font-medium">
                                    <li><a href="#" className="hover:opacity-50 transition-opacity">Features</a></li>
                                    <li><a href="#" className="hover:opacity-50 transition-opacity">Pricing</a></li>
                                    <li><a href="#" className="hover:opacity-50 transition-opacity">Enterprise</a></li>
                                    <li><Link to="/docs" className="hover:opacity-50 transition-opacity">Changelog</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-8 opacity-50">Company</h3>
                                <ul className="space-y-4 text-sm font-medium">
                                    <li><a href="#" className="hover:opacity-50 transition-opacity">About</a></li>
                                    <li><a href="#" className="hover:opacity-50 transition-opacity">Blog</a></li>
                                    <li><a href="#" className="hover:opacity-50 transition-opacity">Careers</a></li>
                                    <li><a href="#" className="hover:opacity-50 transition-opacity">Contact</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-black/10 dark:border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-mono opacity-50">
                            <div>© 2024 AGORA INC.</div>
                            <div className="flex gap-8">
                                <a href="#" className="hover:opacity-100 transition-opacity">PRIVACY</a>
                                <a href="#" className="hover:opacity-100 transition-opacity">TERMS</a>
                                <a href="#" className="hover:opacity-100 transition-opacity">TWITTER</a>
                                <a href="#" className="hover:opacity-100 transition-opacity">GITHUB</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </main >
        </div >
    );
};

// (No change needed in logic, just ensuring props are passed correctly)
// Re-writing FeatureBlock to ensure it's clean
const FeatureBlock = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <div className="p-12 border-b border-black/5 dark:border-white/10 group hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
        <div className="mb-6 opacity-50 group-hover:opacity-100 transition-opacity">{icon}</div>
        <h3 className="text-3xl font-bold mb-4 tracking-tight">{title}</h3>
        <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
            {desc}
        </p>
    </div>
);

const StatBox = ({ label, value }: { label: string, value: string }) => (
    <div className="p-12 text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
        <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tighter">{value}</div>
        <div className="text-xs font-mono uppercase tracking-widest opacity-50">{label}</div>
    </div>
);

const Step = ({ number, title, text }: { number: string, title: string, text: string }) => (
    <div className="group">
        <div className="text-xs font-mono mb-4 opacity-50 border-b border-current pb-2 w-fit">{number}</div>
        <h3 className="text-3xl font-bold mb-4 group-hover:pl-4 transition-all">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-xs">{text}</p>
    </div>
);

const TechSpecBlock = ({ title, specs }: { title: string, specs: { label: string, value: string }[] }) => (
    <div className="p-12 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
        <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-8 opacity-50">{title}</h3>
        <ul className="space-y-4">
            {specs.map((spec) => (
                <li key={spec.label} className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-2">
                    <span className="text-sm font-medium opacity-60">{spec.label}</span>
                    <span className="font-mono text-sm">{spec.value}</span>
                </li>
            ))}
        </ul>
    </div>
);

export default Home;
