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

// Simulated data
const MOCK_BOOKINGS: Booking[] = [
    {
        id: '1',
        package_id: 101,
        package_title: 'Munnar Paradise',
        package_image: 'https://images.unsplash.com/photo-1593693397690-362ae9666ec2',
        package_travel_duration: '3 Days / 2 Nights',
        guests: 2,
        date: '2024-10-15',
        total_price: 15000,
        status: 'Confirmed',
        created_at: new Date().toISOString()
    }
];

const MOCK_REVIEWS: Review[] = [
    {
        id: 1,
        package_id: 101,
        rating: 5,
        comment: 'Amazing experience! Highly recommended.',
        created_at: new Date().toISOString()
    }
];

const MOCK_ASSETS: UserAsset[] = [];

export const api = {
    getBookings: async (): Promise<Booking[]> => {
        const session = localStorage.getItem('simulated_session');
        if (!session) return [];
        return MOCK_BOOKINGS;
    },

    createBooking: async (bookingData: any): Promise<{ message: string }> => {
        const session = localStorage.getItem('simulated_session');
        if (!session) throw new Error("Must be logged in to book");
        MOCK_BOOKINGS.push({
            ...bookingData,
            id: Math.random().toString(36).substr(2, 9),
            status: 'Confirmed',
            created_at: new Date().toISOString()
        });
        return { message: "Booking created successfully (simulated)" };
    },

    getReviews: async (packageId: string | number): Promise<Review[]> => {
        return MOCK_REVIEWS.filter(r => r.package_id === Number(packageId));
    },

    createReview: async (reviewData: { package_id: number, rating: number, comment: string }): Promise<{ message: string }> => {
        const session = localStorage.getItem('simulated_session');
        if (!session) throw new Error("Must be logged in to review");

        MOCK_REVIEWS.unshift({
            ...reviewData,
            id: Math.floor(Math.random() * 1000),
            created_at: new Date().toISOString()
        });
        return { message: "Review submitted successfully (simulated)" };
    },

    getUserAssets: async (): Promise<UserAsset[]> => {
        const session = localStorage.getItem('simulated_session');
        if (!session) return [];
        return MOCK_ASSETS;
    },

    saveUserAsset: async (assetData: Partial<UserAsset>): Promise<UserAsset> => {
        const session = localStorage.getItem('simulated_session');
        if (!session) throw new Error("Must be logged in to save assets");

        const newAsset: UserAsset = {
            ...assetData,
            id: Math.random().toString(36).substr(2, 9),
            user_id: 'mock-user-id',
            created_at: new Date().toISOString()
        } as UserAsset;

        MOCK_ASSETS.unshift(newAsset);
        return newAsset;
    },

    uploadFile: async (bucket: 'user-images' | 'itineraries-pdfs', file: File): Promise<string> => {
        const session = localStorage.getItem('simulated_session');
        if (!session) throw new Error("Must be logged in to upload files");

        // Return a placeholder URL for simulation
        return URL.createObjectURL(file);
    }
};
