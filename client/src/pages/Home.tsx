import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, Zap, Database, Focus, Smartphone, ArrowRight, Check, Globe, Cpu, Users } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="min-h-screen relative overflow-x-hidden selection:bg-black/10 dark:selection:bg-white/20">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-black dark:bg-white z-[100] origin-left"
                style={{ scaleX }}
            />

            {/* Aurora Background - Monochrome */}
            <div className="aurora-bg">
                <div className="aurora-blob w-[500px] h-[500px] bg-gray-200/50 dark:bg-white/5 top-[-10%] left-[-10%]" />
                <div className="aurora-blob w-[500px] h-[500px] bg-gray-300/50 dark:bg-white/5 bottom-[-10%] right-[-10%] animation-delay-2000" />
                <div className="aurora-blob w-[400px] h-[400px] bg-gray-100/50 dark:bg-white/10 top-[40%] left-[30%] animation-delay-4000" />
            </div>

            {/* Floating Navigation */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4"
            >
                <div className="backdrop-blur-xl bg-white/80 dark:bg-black/80 border border-black/5 dark:border-white/10 rounded-full px-2 py-2 shadow-2xl flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <div className="bg-black dark:bg-white p-1.5 rounded-lg text-white dark:text-black">
                            <Code2 size={16} />
                        </div>
                        <span className="font-semibold tracking-tight text-lg">Agora</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-full p-1 border border-black/5 dark:border-white/5">
                        {['Product', 'Solutions', 'Open Source', 'Pricing'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(' ', '-')}`}
                                className="px-4 py-1.5 text-sm font-medium hover:text-black dark:hover:text-white transition-colors rounded-full hover:bg-white/50 dark:hover:bg-white/10"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 hidden md:block" />
                        <Link to="/auth" className="hidden md:block text-sm font-medium hover:text-black dark:hover:text-white transition-colors">
                            Log in
                        </Link>
                        <Link
                            to="/auth"
                            className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg shadow-black/10 dark:shadow-white/10"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="pt-48 pb-32 px-6 text-center relative z-10 w-full max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white text-xs font-semibold mb-8 border border-black/10 dark:border-white/10"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black dark:bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-black dark:bg-white"></span>
                    </span>
                    v1.0 Public Beta
                </motion.div>

                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 30 }}
                    className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-[0.9]"
                >
                    Code together.<br />
                    <span className="text-gray-500 dark:text-gray-400">Instantly.</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 30 }}
                    className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-normal leading-relaxed text-gray-500 dark:text-gray-400"
                >
                    A seamless real-time collaborative environment. <br className="hidden md:block" />
                    No setup. No friction. Just flow.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-4"
                >
                    <Link to="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full text-lg font-medium shadow-xl shadow-black/10 dark:shadow-white/10 hover:shadow-2xl transition-shadow flex items-center gap-2 group w-full md:w-auto justify-center"
                        >
                            Start Coding for Free
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </Link>
                    <a href="#how-it-works">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white dark:bg-white/10 text-black dark:text-white border border-gray-200 dark:border-white/10 rounded-full text-lg font-medium shadow-lg hover:bg-gray-50 dark:hover:bg-white/20 transition-all w-full md:w-auto"
                        >
                            How it works
                        </motion.button>
                    </a>
                </motion.div>

                {/* 3D Editor Mockup */}
                <motion.div
                    initial={{ y: 100, opacity: 0, rotateX: 20 }}
                    whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, type: "spring", bounce: 0.2 }}
                    className="mt-24 max-w-5xl mx-auto perspective-1000"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-900 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-white/80 dark:bg-[#121212]/80 backdrop-blur-2xl rounded-[2rem] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
                            {/* Editor Chrome */}
                            <div className="flex items-center gap-2 px-6 py-4 border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
                                <div className="flex gap-2 opacity-50 grayscale">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-inner"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-inner"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-inner"></div>
                                </div>
                                <div className="ml-4 flex gap-1 bg-black/5 dark:bg-white/10 px-3 py-1 rounded-md">
                                    <span className="text-xs font-medium opacity-60">agora</span>
                                    <span className="text-xs opacity-40">/</span>
                                    <span className="text-xs font-medium">main.tsx</span>
                                </div>
                                <div className="ml-auto flex items-center gap-2">
                                    <div className="flex -space-x-2 grayscale">
                                        <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white dark:border-black" />
                                        <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-white dark:border-black" />
                                    </div>
                                    <span className="text-xs font-medium opacity-60">3 users active</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-[auto,1fr] p-8 gap-6 font-mono text-sm leading-relaxed overflow-hidden text-left">
                                <div className="text-right select-none opacity-30 flex flex-col gap-1 w-8">
                                    {Array.from({ length: 12 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                                </div>
                                <div className="flex flex-col gap-1 w-full text-gray-800 dark:text-gray-300">
                                    <div><span className="text-gray-500 font-bold">import</span> React, {'{'} useState, useEffect {'}'} <span className="text-gray-500 font-bold">from</span> 'react';</div>
                                    <div>&nbsp;</div>
                                    <div><span className="text-gray-500 font-bold">export default function</span> <span className="font-bold">Collaboration</span>() {'{'}</div>
                                    <div className="pl-4"><span className="text-gray-500 font-bold">const</span> [users, setUsers] = useState([]);</div>
                                    <div className="pl-4"><span className="text-gray-400 italic">// Real-time magic happens here</span></div>
                                    <div className="pl-4"><span className="text-gray-500 font-bold">return</span> (</div>
                                    <div className="pl-8">&lt;<span className="font-bold">AgoraEditor</span></div>
                                    <div className="pl-12"><span className="text-gray-500">mode</span>="live"</div>
                                    <div className="pl-12"><span className="text-gray-500">users</span>={'{'}users{'}'}</div>
                                    <div className="pl-12"><span className="text-gray-500">theme</span>="dark"</div>
                                    <div className="pl-8">/&gt;</div>
                                    <div className="pl-4">);</div>
                                    <div>{'}'}</div>
                                </div>
                            </div>

                            {/* Fake Cursors */}
                            <motion.div
                                animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-2/3 left-1/3 pointer-events-none"
                            >
                                <div className="flex flex-col gap-1 items-start">
                                    <svg width="18" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-black dark:text-white">
                                        <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19169L11.7841 12.3673H5.65376Z" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    <div className="bg-black dark:bg-white text-white dark:text-black text-[10px] px-1.5 py-0.5 rounded-br-md rounded-bl-md rounded-tr-md font-bold">Ayush</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* How it Works Section */}
            <section id="how-it-works" className="py-24 px-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-bold tracking-tight mb-6">Designed for flow.</h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                            We stripped away the complexity. No configurations, no setups. Just instant collaboration.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                title: "Create a Room",
                                desc: "One click to generate a secure, unique environment for your session.",
                                icon: <Globe size={24} className="text-white dark:text-black" />,
                                bg: "bg-black dark:bg-white"
                            },
                            {
                                title: "Share the Link",
                                desc: "Send the URL to your team. They join instantly—no account needed.",
                                icon: <Users size={24} className="text-white dark:text-black" />,
                                bg: "bg-gray-800 dark:bg-gray-200"
                            },
                            {
                                title: "Code Together",
                                desc: "See cursors, selections, and edits in real-time. It just works.",
                                icon: <Cpu size={24} className="text-white dark:text-black" />,
                                bg: "bg-gray-600 dark:bg-gray-400"
                            }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="mb-6 inline-flex p-4 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl">
                                    <div className={`w-12 h-12 rounded-2xl ${step.bg} flex items-center justify-center shadow-lg`}>
                                        {step.icon}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section id="features" className="py-24 px-8 max-w-7xl mx-auto relative z-10">
                <div className="mb-20">
                    <h2 className="text-5xl font-bold mb-6 tracking-tight">Pro-grade tools.</h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl">
                        Everything you need to ship faster. Built for performance, designed for collaboration.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[minmax(350px,auto)]">
                    {/* Real-time Sync (Large) */}
                    <GlassCard className="md:col-span-6 lg:col-span-8 group overflow-hidden relative" delay={0.1}>
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="h-14 w-14 rounded-2xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black mb-6 shadow-lg shadow-black/10 dark:shadow-white/10">
                                    <Zap size={28} fill="currentColor" />
                                </div>
                                <h3 className="text-3xl font-semibold mb-3">Instant Sync</h3>
                                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
                                    Latency so low it feels local. Powered by WebSocket edge networks for millisecond updates.
                                </p>
                            </div>
                            {/* Animation: Progress Bar */}
                            <div className="mt-8 bg-black/5 dark:bg-white/5 p-6 rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-md">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-semibold uppercase tracking-wider opacity-60">Sync Status</span>
                                    <span className="text-xs font-bold text-black dark:text-white flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse" />
                                        Connected
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                        className="h-full w-1/3 bg-gradient-to-r from-transparent via-black dark:via-white to-transparent opacity-50"
                                    />
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Database (Small) */}
                    <GlassCard className="md:col-span-3 lg:col-span-4 flex flex-col justify-center items-center text-center p-8" delay={0.2}>
                        <div className="h-20 w-20 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-black dark:text-white mb-6">
                            <Database size={40} />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Supabase</h3>
                        <p className="text-gray-500 dark:text-gray-400">PostgreSQL reliability<br />with real-time capabilities.</p>
                    </GlassCard>

                    {/* Mobile (Small) */}
                    <GlassCard className="md:col-span-3 lg:col-span-4 flex flex-col justify-center items-center text-center p-8" delay={0.3}>
                        <div className="h-20 w-20 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-black dark:text-white mb-6">
                            <Smartphone size={40} />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Responsive</h3>
                        <p className="text-gray-500 dark:text-gray-400">Code on any device.<br />Touch optimized.</p>
                    </GlassCard>

                    {/* Zen Mode (Medium) */}
                    <GlassCard className="md:col-span-6 lg:col-span-8 flex flex-col md:flex-row gap-8 items-center" delay={0.4}>
                        <div className="flex-1">
                            <div className="h-14 w-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6">
                                <Focus size={28} />
                            </div>
                            <h3 className="text-3xl font-semibold mb-3">Zen Mode</h3>
                            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                                Remove distractions. Focus on the logic. Toggle UI elements with a single keystroke.
                            </p>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 w-full aspect-square max-w-[200px] rounded-3xl flex items-center justify-center shadow-inner relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="w-24 h-12 bg-black dark:bg-white rounded-full p-1.5 shadow-xl flex items-center"
                                >
                                    <motion.div
                                        className="w-9 h-9 bg-white dark:bg-black rounded-full shadow-lg ml-auto"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 px-8 relative z-10 bg-black/5 dark:bg-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-bold mb-6 tracking-tight">Simple Pricing.</h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400">
                            Start for free, upgrade for power.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                name: "Free",
                                price: "$0",
                                features: ["Unlimited Public Rooms", "3 Users per Room", "Community Support"],
                                cta: "Get Started",
                                highlight: false
                            },
                            {
                                name: "Pro",
                                price: "$12",
                                features: ["Unlimited Private Rooms", "20 Users per Room", "Version History", "Priority Support"],
                                cta: "Start Free Trial",
                                highlight: true
                            },
                            {
                                name: "Team",
                                price: "$49",
                                features: ["Unlimited Everything", "SSO & Security", "Custom Domain", "Dedicated Support"],
                                cta: "Contact Sales",
                                highlight: false
                            }
                        ].map((plan, i) => (
                            <motion.div
                                key={plan.name}
                                whileHover={{ y: -10 }}
                                className={`p-8 rounded-3xl border ${plan.highlight ? 'bg-white dark:bg-black border-black dark:border-white shadow-xl shadow-black/5 dark:shadow-white/5 scale-105 z-10' : 'bg-white/50 dark:bg-white/5 border-transparent'}`}
                            >
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <div className="text-4xl font-bold mb-6">{plan.price}<span className="text-base font-normal text-gray-500">/mo</span></div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map(f => (
                                        <li key={f} className="flex items-center gap-2 text-sm">
                                            <Check size={16} className="text-black dark:text-white" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-3 rounded-xl font-bold transition-colors ${plan.highlight ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200' : 'bg-gray-100 dark:bg-white/10 hover:bg-gray-200'}`}>
                                    {plan.cta}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-8 text-center relative z-10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-6xl md:text-7xl font-bold mb-8 tracking-tighter">Ready to code?</h2>
                    <Link to="/dashboard">
                        <button className="px-12 py-6 bg-black dark:bg-white text-white dark:text-black rounded-full text-2xl font-bold hover:scale-105 transition-transform shadow-2xl">
                            Start a Session
                        </button>
                    </Link>
                </div>
            </section>

            <footer className="py-12 border-t border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-2 font-bold text-xl mb-4">
                            <div className="bg-black dark:bg-white p-1 rounded-md text-white dark:text-black"><Code2 size={16} /></div>
                            Agora
                        </div>
                        <p className="text-sm text-gray-500">
                            The future of collaborative coding provided today.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Changelog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-sm text-gray-500 pt-8 border-t border-black/5 dark:border-white/5">
                    <p>© 2026 Agora Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

// Internal GlassCard
const GlassCard = ({ children, className = '', delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay, type: 'spring', stiffness: 300, damping: 30 }}
        whileHover={{ y: -5, scale: 1.005 }}
        className={`bg-white/50 dark:bg-[#1C1C1E]/60 backdrop-blur-2xl border border-black/5 dark:border-white/5 rounded-3xl p-8 shadow-2xl shadow-black/5 dark:shadow-white/5 ${className}`}
    >
        {children}
    </motion.div>
);

export default Home;
