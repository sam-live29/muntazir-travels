import { supabase } from './supabase';

export interface Booking {
    id: string;
    package_id: number;
    package_title: string;
    package_image: string;
    package_travel_duration: string;
    guests: number;
    date: string;
    total_price: number;
    status: string;
    created_at: string;
}

export interface Review {
    id: number;
    package_id: number;
    rating: number;
    comment: string;
    created_at: string;
}

export interface UserAsset {
    id: string;
    user_id: string;
    prompt_input?: string;
    image_url?: string;
    pdf_url?: string;
    metadata?: any;
    created_at: string;
}

export const api = {
    getBookings: async (): Promise<Booking[]> => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return [];
        const { data } = await supabase.from('bookings').select('*').eq('user_id', session.user.id);
        return data || [];
    },

    createBooking: async (bookingData: any): Promise<{ message: string }> => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) throw new Error("Must be logged in to book");
        const newBooking = {
            ...bookingData,
            user_id: session.user.id,
            status: 'Confirmed'
        };
        const { error } = await supabase.from('bookings').insert([newBooking]);
        if (error) throw error;
        return { message: "Booking created successfully" };
    },

    getReviews: async (packageId: string | number): Promise<Review[]> => {
        const { data } = await supabase.from('reviews').select('*').eq('package_id', Number(packageId)).order('created_at', { ascending: false });
        return data || [];
    },

    createReview: async (reviewData: { package_id: number, rating: number, comment: string }): Promise<{ message: string }> => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) throw new Error("Must be logged in to review");

        const newReview = {
            ...reviewData,
            user_id: session.user.id
        };
        const { error } = await supabase.from('reviews').insert([newReview]);
        if (error) throw error;
        return { message: "Review submitted successfully" };
    },

    getUserAssets: async (): Promise<UserAsset[]> => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return [];
        const { data, error } = await supabase
            .from('user_assets')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    },

    saveUserAsset: async (assetData: Partial<UserAsset>): Promise<UserAsset> => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) throw new Error("Must be logged in to save assets");

        const { data, error } = await supabase
            .from('user_assets')
            .insert([{ ...assetData, user_id: session.user.id }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    uploadFile: async (bucket: 'user-images' | 'itineraries-pdfs', file: File): Promise<string> => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) throw new Error("Must be logged in to upload files");

        const fileExt = file.name.split('.').pop();
        const fileName = `${session.user.id}/${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

        return publicUrl;
    }
};
