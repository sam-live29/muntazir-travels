import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="relative mb-8">
                <h1 className="text-[120px] font-black text-slate-200 leading-none">404</h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 transform rotate-3">
                        <span className="text-4xl">🏝️</span>
                    </div>
                </div>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-4">You've reached a dead end</h2>
            <p className="text-slate-500 max-w-md mb-8 font-medium">
                It seems the destination you're looking for doesn't exist or has been moved to a different island.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md">
                <button
                    onClick={() => navigate(-1)}
                    className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
                >
                    <ArrowLeft size={18} />
                    Go Back
                </button>
                <button
                    onClick={() => navigate('/home')}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 px-6 rounded-2xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all"
                >
                    <Home size={18} />
                    Back to Home
                </button>
            </div>

            <div className="mt-16 text-slate-400 text-xs font-bold uppercase tracking-widest">
                Muntazir Travels &copy; {new Date().getFullYear()}
            </div>
        </div>
    );
};

export default NotFound;
