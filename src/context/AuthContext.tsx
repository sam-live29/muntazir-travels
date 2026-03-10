import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { cartService } from '../services/cartService';
import { wishlistService } from '../services/wishlistService';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    isLoading: boolean;
    signOut: () => Promise<void>;
    signIn: (email: string) => Promise<void>;
    signUp: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    isLoading: true,
    signOut: async () => { },
    signIn: async () => { },
    signUp: async () => { },
});

// Dummy user for simulation
const MOCK_USER: User = {
    id: 'b6360fb9-7f0d-41aa-b7b5-e05b5682cb34',
    email: 'user@example.com',
    app_metadata: {},
    user_metadata: { full_name: 'Traveler' },
    aud: 'authenticated',
    created_at: new Date().toISOString(),
};

const MOCK_SESSION: Session = {
    access_token: 'mock-token',
    refresh_token: 'mock-refresh-token',
    expires_in: 3600,
    token_type: 'bearer',
    user: MOCK_USER,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load simulated session from local storage
        const storedSession = localStorage.getItem('simulated_session');
        if (storedSession) {
            try {
                const parsedSession = JSON.parse(storedSession);
                setSession(parsedSession);
                setUser(parsedSession.user);
                cartService.loadCart();
                wishlistService.loadWishlist();
            } catch (e) {
                console.error("Failed to parse simulated session", e);
            }
        }
        setIsLoading(false);
    }, []);

    const signIn = async (email: string) => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockUser = { ...MOCK_USER, email };
        const mockSession = { ...MOCK_SESSION, user: mockUser };

        setSession(mockSession);
        setUser(mockUser);
        localStorage.setItem('simulated_session', JSON.stringify(mockSession));

        cartService.loadCart();
        wishlistService.loadWishlist();
        setIsLoading(false);
    };

    const signUp = async (email: string) => {
        await signIn(email); // For simulation, sign up is same as login
    };

    const signOut = async () => {
        setSession(null);
        setUser(null);
        localStorage.removeItem('simulated_session');
    };

    return (
        <AuthContext.Provider value={{ session, user, isLoading, signOut, signIn, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
