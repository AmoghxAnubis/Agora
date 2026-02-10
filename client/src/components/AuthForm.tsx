import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

const AuthForm = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isSignUp) {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { username }
                    }
                });
                if (error) throw error;

                // Create profile
                if (data.user) {
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .insert({
                            id: data.user.id,
                            username: username,
                            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
                        });
                    if (profileError) throw profileError;
                }

                alert('Check your email for confirmation!');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
                if (error) throw error;
                navigate('/dashboard');
            }
        } catch (error: any) {
            setError(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8">
            <GlassCard className="w-full max-w-md p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-600 dark:text-red-400"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignUp && (
                        <div>
                            <label className="block text-sm font-medium mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-black/50 border border-white/20 dark:border-white/10 focus:border-apple-blue outline-none transition-colors"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-black/50 border border-white/20 dark:border-white/10 focus:border-apple-blue outline-none transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-black/50 border border-white/20 dark:border-white/10 focus:border-apple-blue outline-none transition-colors"
                            required
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-apple-blue text-white rounded-lg font-semibold disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                    </motion.button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-apple-blue hover:underline"
                    >
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </GlassCard>
        </div>
    );
};

export default AuthForm;
