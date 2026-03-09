import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Upload, Image as ImageIcon, X, Loader2, Plus } from 'lucide-react';
import { api, UserAsset } from '../lib/api';
import { motion, AnimatePresence } from 'motion/react';

const GalleryUpload: React.FC = () => {
    const navigate = useNavigate();
    const [assets, setAssets] = useState<UserAsset[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadAssets();
    }, []);

    const loadAssets = async () => {
        try {
            setIsLoading(true);
            const data = await api.getUserAssets();
            setAssets(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load assets');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file.');
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            const publicUrl = await api.uploadFile('user-images', file);
            await api.saveUserAsset({
                image_url: publicUrl,
                metadata: { fileName: file.name, size: file.size }
            });
            await loadAssets(); // Refresh list
        } catch (err: any) {
            setError(err.message || 'Upload failed');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col">
            <header className="sticky top-0 z-10 flex items-center bg-white p-4 justify-between border-b border-slate-100 shadow-sm">
                <button onClick={() => navigate(-1)} className="text-slate-900 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-lg font-black text-slate-900">My Gallery</h1>
                <div className="size-10"></div>
            </header>

            <main className="flex-1 p-6 space-y-8">
                {/* Upload Section */}
                <section>
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-white rounded-[2rem] p-8 border-2 border-dashed border-slate-200 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 text-center"
                    >
                        <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            {isUploading ? <Loader2 size={32} className="animate-spin" /> : <Upload size={32} />}
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-900">Upload New Photo</h3>
                            <p className="text-sm text-slate-500 font-medium">Keep your travel memories safe in the cloud</p>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>
                    {error && (
                        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold flex items-center justify-between">
                            <span>{error}</span>
                            <button onClick={() => setError(null)}><X size={16} /></button>
                        </div>
                    )}
                </section>

                {/* Gallery Grid */}
                <section className="space-y-4">
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                        <ImageIcon size={20} className="text-primary" />
                        My Uploads
                    </h2>

                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 size={40} className="text-slate-200 animate-spin" />
                        </div>
                    ) : assets.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <AnimatePresence>
                                {assets.map((asset) => (
                                    <motion.div
                                        key={asset.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="aspect-square rounded-3xl overflow-hidden shadow-sm border border-slate-100 group relative"
                                    >
                                        <img
                                            src={asset.image_url}
                                            alt="Uploaded memory"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                            <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest">
                                                {new Date(asset.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2rem] p-12 text-center border border-slate-100 flex flex-col items-center">
                            <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                                <ImageIcon size={40} />
                            </div>
                            <h3 className="text-lg font-black text-slate-900 mb-2">No photos yet</h3>
                            <p className="text-slate-500 text-sm max-w-[240px]">Start uploading your Kashmir travel photos to see them here.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default GalleryUpload;
