import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Calendar as CalendarIcon, Clock, Share2, User } from 'lucide-react';
import { blogs } from '../data/blogs';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const BlogDetailsScreen: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const blog = useMemo(() => blogs.find(b => b.id === id), [id]);

    if (!blog) {
        return (
            <div className="flex flex-col items-center justify-center p-20 min-h-screen bg-slate-50">
                <h2 className="text-2xl font-black text-slate-900 mb-4">Blog Not Found</h2>
                <button onClick={() => navigate('/blogs')} className="bg-primary text-white font-black px-6 py-3 rounded-2xl uppercase tracking-widest text-xs">
                    Return to Stories
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-full flex flex-col pb-24 relative">
            <header className="absolute top-0 inset-x-0 z-20 flex justify-between p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="size-10 bg-black/40 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>
                <button className="size-10 bg-black/40 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-black/60 transition-colors">
                    <Share2 size={16} />
                </button>
            </header>

            <div className="relative h-[40vh] md:h-[50vh] w-full">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute bottom-0 inset-x-0 p-6 md:p-12 text-white">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        <span className="bg-primary px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest mb-4 inline-block shadow-lg">
                            {blog.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 tracking-tighter max-w-4xl drop-shadow-md">
                            {blog.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/80">
                            <span className="flex items-center gap-1.5"><CalendarIcon size={14} /> {blog.date}</span>
                            <span className="flex items-center gap-1.5"><Clock size={14} /> {blog.readTime}</span>
                            <span className="flex items-center gap-1.5"><User size={14} /> {blog.author}</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <main className="max-w-3xl mx-auto px-6 py-12 w-full">
                <p className="text-lg md:text-xl font-medium text-slate-600 leading-relaxed mb-10 italic border-l-4 border-primary pl-4">
                    {blog.excerpt}
                </p>

                <article className="prose prose-slate md:prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-primary">
                    {blog.content.split('\n').filter(p => p.trim() !== '').map((paragraph, idx) => {
                        if (paragraph.startsWith('###')) {
                            return <h3 key={idx} className="text-2xl font-black text-slate-900 mt-10 mb-4">{paragraph.replace('###', '').trim()}</h3>;
                        }
                        if (paragraph.startsWith('- ') || paragraph.match(/^\d+\./)) {
                            return <p key={idx} className="mb-4 pl-4 text-slate-700 leading-relaxed"><span className="font-bold text-slate-900">{paragraph.split(':')[0]}</span>{paragraph.includes(':') ? ':' + paragraph.split(':').slice(1).join(':') : ''}</p>
                        }
                        return <p key={idx} className="text-slate-700 leading-relaxed mb-6">{paragraph.trim()}</p>;
                    })}
                </article>

                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-2">
                    {blog.tags.map(tag => (
                        <span key={tag} className="bg-slate-50 text-slate-500 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest border border-slate-100">
                            #{tag}
                        </span>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default BlogDetailsScreen;
