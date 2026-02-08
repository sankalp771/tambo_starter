"use client";

import React, { createContext, useContext, useState } from 'react';

interface Passenger {
    name: string;
    age: string;
    gender: 'Male' | 'Female' | 'Other';
}

interface BookingState {
    passengers: Passenger[];
    contactEmail: string;
    contactMobile: string;
    selectedFlightId: string | null;
    selectedSeats: string[];
}

interface BookingContextType {
    booking: BookingState;
    setBooking: React.Dispatch<React.SetStateAction<BookingState>>;
    updateBooking: (updates: Partial<BookingState>) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [booking, setBooking] = useState<BookingState>({
        passengers: [],
        contactEmail: '',
        contactMobile: '',
        selectedFlightId: null,
        selectedSeats: [],
    });

    const updateBooking = (updates: Partial<BookingState>) => {
        setBooking(prev => ({ ...prev, ...updates }));
    };

    return (
        <BookingContext.Provider value={{ booking, setBooking, updateBooking }}>
            {children}
        </BookingContext.Provider>
    );
}

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
