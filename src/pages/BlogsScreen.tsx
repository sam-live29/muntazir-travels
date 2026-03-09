import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar as CalendarIcon, Clock, ArrowRight } from 'lucide-react';
import { blogs } from '../data/blogs';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const BlogsScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-50 min-h-full flex flex-col pb-24">
            <header className="bg-white px-6 pt-6 pb-6 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="size-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>
                <h1 className="text-lg font-black text-slate-900 tracking-wide uppercase">Travel Stories</h1>
                <div className="size-10"></div>
            </header>

            <main className="p-6">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Kashmir Diaries</h2>
                    <p className="text-slate-500 font-medium text-sm">Discover local insights, guides, and inspiration for your next journey to paradise.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {blogs.map((blog, idx) => (
                        <motion.article
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => navigate(`/blog/${blog.id}`)}
                            className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group cursor-pointer hover:shadow-lg transition-all"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-sm text-primary">
                                        {blog.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                                    <span className="flex items-center gap-1.5"><CalendarIcon size={12} /> {blog.date}</span>
                                    <span className="flex items-center gap-1.5"><Clock size={12} /> {blog.readTime}</span>
                                </div>

                                <h3 className="text-xl font-black text-slate-900 leading-snug mb-3 group-hover:text-primary transition-colors">
                                    {blog.title}
                                </h3>

                                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                                    {blog.excerpt}
                                </p>

                                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="size-8 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 text-xs">
                                            {blog.author.charAt(0)}
                                        </div>
                                        <span className="text-xs font-bold text-slate-600">{blog.author}</span>
                                    </div>
                                    <button className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1 group-hover:pr-2 transition-all">
                                        Read <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default BlogsScreen;
