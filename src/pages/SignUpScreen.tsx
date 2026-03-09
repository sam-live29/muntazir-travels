import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SignUpScreen: React.FC = () => {
    const navigate = useNavigate();
    const [method, setMethod] = useState<'email' | 'phone'>('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        setLoading(true);

        try {
            if (method === 'email') {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (signUpError) throw signUpError;
                setSuccessMsg('Check your email to confirm your account.');
            } else {
                const { error: signUpError } = await supabase.auth.signInWithOtp({
                    phone: `+91${phone}`, // Hardcoded to India for now as per current UI
                });
                if (signUpError) throw signUpError;
                setSuccessMsg('OTP sent to your phone number.');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during sign up.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="bg-slate-50 min-h-full flex flex-col">
            <header className="p-4 flex items-center justify-between bg-white border-b border-slate-100">
                <button onClick={() => navigate(-1)} className="text-slate-900">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-lg font-bold">Create Account</h1>
                <div className="size-6"></div>
            </header>

            <main className="flex-1 p-6 flex flex-col items-center justify-center">
                <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-slate-100 max-w-sm">
                    <h2 className="text-2xl font-black text-slate-900 mb-6 text-center">Create Account</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100 text-center">
                            {error}
                        </div>
                    )}
                    {successMsg && (
                        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm font-bold border border-green-100 text-center">
                            {successMsg}
                        </div>
                    )}

                    <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                        <button
                            onClick={() => setMethod('email')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${method === 'email' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'}`}
                        >
                            Email
                        </button>
                        <button
                            onClick={() => setMethod('phone')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${method === 'phone' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'}`}
                        >
                            Phone
                        </button>
                    </div>

                    <form onSubmit={handleSignUp}>
                        {method === 'email' ? (
                            <>
                                <div className="mb-4">
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Email</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                                            <Mail size={16} />
                                        </span>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Password</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                                            <Lock size={16} />
                                        </span>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-10 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex gap-2 mb-6">
                                <div className="w-16">
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Code</label>
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl py-3 text-center text-sm font-medium text-slate-900">
                                        +91
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Phone</label>
                                    <input
                                        type="tel"
                                        required
                                        maxLength={10}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        placeholder="98765 43210"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-3 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all text-sm mb-4 flex justify-center items-center"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </form>

                    <div className="relative py-2 mb-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-widest bg-white">
                            <span className="bg-white px-2 text-slate-400 font-bold">Or</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3 text-sm rounded-xl transition-all mb-2 flex items-center justify-center gap-2 hover:bg-slate-50"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <p className="text-center text-xs text-slate-500 mt-4">
                        Already have an account?{' '}
                        <button onClick={() => navigate('/login')} className="text-primary font-bold hover:underline">
                            Log in
                        </button>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default SignUpScreen;
