export interface Country {
    id: number;
    name: string;
    slug: string;
    flag: string;
    currency: string;
    image: string;
    video_url: string;
    poster_url: string;
    description: string;
    timezone: string;
    createdAt: string;
}

export interface Location {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    createdAt: string;
}

export interface ActivityCategory {
    id: number;
    name: string;
    slug: string;
    image_url?: string;
    createdAt: string;
}

export interface GalleryCity {
    id: number;
    city: string;
    image: string;
    alt: string;
    type: string;
    createdAt: string;
}

export interface Booking {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    preferred_travel_date: string;
    no_of_travelers: number;
    adults?: number;
    children?: number;
    special_requests: string | null;
    hotel_preferences: string | string[];
    food_preferences: string | string[];
    vehicle_preferences: string | string[];
    occasions?: string | string[];
    travel_buddies?: string;
    activities?: any[];
    created_at: string;
    updated_at: string;
}