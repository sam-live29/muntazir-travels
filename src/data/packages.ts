export interface Package {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  days: number;
  nights: number;
  hotelRating: string;
  mealsIncluded: boolean;
  tags: string[];
  region: string;
  months: string[];
  itinerary: { day: number; title: string; desc: string }[];
  isRamadanSpecial?: boolean;
}

export const packages: Package[] = [
  {
    id: 1,
    title: "Gulmarg Skiing Adventure",
    location: "Srinagar, J&K",
    region: "Baramulla",
    price: 15999,
    rating: 4.9,
    image: "/images/kashmir_banner_snow_1773077629818.png",
    description: "Experience the thrill of skiing in the world-famous slopes of Gulmarg. Perfect for adventure seekers and nature lovers.",
    days: 4,
    nights: 3,
    hotelRating: "4★",
    mealsIncluded: true,
    tags: ["Snow", "Skiing"],
    months: ["December", "January", "February", "March"],
    isRamadanSpecial: true,
    itinerary: [
      { day: 1, title: "Arrival & Transfer to Gulmarg", desc: "Pickup from Srinagar Airport and drive to Gulmarg. Check-in at your hotel." },
      { day: 2, title: "Skiing & Gondola Ride", desc: "Enjoy skiing on the slopes and take the famous Gondola ride to Apharwat Peak." },
      { day: 3, title: "Local Exploration", desc: "Visit the St. Mary's Church and the Gulmarg Golf Course." },
      { day: 4, title: "Departure", desc: "Transfer back to Srinagar Airport for your flight." }
    ]
  },
  {
    id: 2,
    title: "Pahalgam Valley Tour",
    location: "Anantnag, J&K",
    region: "Anantnag",
    price: 12499,
    rating: 4.8,
    image: "/images/kashmir_thumb_valley_1773077649913.png",
    description: "Discover the breathtaking beauty of Pahalgam, the 'Valley of Shepherds'. Enjoy serene walks along the Lidder River.",
    days: 3,
    nights: 2,
    hotelRating: "4★",
    mealsIncluded: true,
    tags: ["Valley", "River"],
    months: ["April", "May", "June", "July", "August", "September"],
    isRamadanSpecial: true,
    itinerary: [
      { day: 1, title: "Arrival & Pahalgam Transfer", desc: "Transfer from Srinagar to Pahalgam. Visit the Saffron fields and Awantipora ruins on the way." },
      { day: 2, title: "Aru & Betaab Valley", desc: "Explore the scenic Aru Valley and the famous Betaab Valley." },
      { day: 3, title: "Departure", desc: "Transfer back to Srinagar Airport." }
    ]
  },
  {
    id: 3,
    title: "Srinagar Sightseeing",
    location: "Srinagar, J&K",
    region: "Srinagar",
    price: 12500,
    rating: 4.8,
    image: "/images/kashmir_banner_lake_1773077609357.png",
    description: "Experience the paradise on earth with our curated Srinagar package. From the serene Dal Lake to the historic Mughal Gardens.",
    days: 3,
    nights: 2,
    hotelRating: "4★",
    mealsIncluded: true,
    tags: ["Water", "Houseboat"],
    months: ["March", "April", "May", "June", "September", "October"],
    isRamadanSpecial: true,
    itinerary: [
      { day: 1, title: "Arrival & Dal Lake Experience", desc: "Pickup from Srinagar Airport. Check-in at Houseboat. Enjoy an evening Shikara ride." },
      { day: 2, title: "Mughal Gardens Tour", desc: "Full day sightseeing of famous Mughal Gardens: Nishat Bagh, Shalimar Bagh, and Chashme Shahi." },
      { day: 3, title: "Old City & Departure", desc: "Visit the historic Jamia Masjid and Shah-e-Hamdan shrine before departure." }
    ]
  },
  {
    id: 4,
    title: "Sonamarg Glacier Trek",
    location: "Ganderbal, J&K",
    region: "Ganderbal",
    price: 14500,
    rating: 4.7,
    image: "/images/kashmir_thumb_autumn_1773077687668.png",
    description: "Trek to the Thajiwas Glacier in Sonamarg, the 'Meadow of Gold'. A perfect blend of adventure and scenic beauty.",
    days: 4,
    nights: 3,
    hotelRating: "3★",
    mealsIncluded: true,
    tags: ["Trekking", "Glacier"],
    months: ["May", "June", "July", "August", "September"],
    itinerary: [
      { day: 1, title: "Arrival & Sonamarg Transfer", desc: "Pickup from Srinagar and drive to Sonamarg. Check-in at your camp/hotel." },
      { day: 2, title: "Thajiwas Glacier Trek", desc: "A moderate trek to the Thajiwas Glacier. Enjoy the snow even in summer." },
      { day: 3, title: "Zero Point Visit", desc: "Drive to Zero Point for some high-altitude snow fun." },
      { day: 4, title: "Departure", desc: "Transfer back to Srinagar Airport." }
    ]
  },
  {
    id: 5,
    title: "Doodhpathri Meadows Escape",
    location: "Budgam, J&K",
    region: "Budgam",
    price: 9999,
    rating: 4.6,
    image: "/images/kashmir_doodhpathri_1773078338297.png",
    description: "Visit the 'Valley of Milk', a hidden gem with lush green meadows and a sparkling river.",
    days: 2,
    nights: 1,
    hotelRating: "3★",
    mealsIncluded: true,
    tags: ["Meadows", "Nature"],
    months: ["April", "May", "June", "July", "August", "September"],
    itinerary: [
      { day: 1, title: "Srinagar to Doodhpathri", desc: "Drive to Doodhpathri. Enjoy the meadows and the Shaliganga river." },
      { day: 2, title: "Meadow Walk & Departure", desc: "Explore the deeper meadows before heading back to Srinagar." }
    ]
  },
  {
    id: 6,
    title: "Gurez Valley Expedition",
    location: "Bandipora, J&K",
    region: "Bandipora",
    price: 18999,
    rating: 4.9,
    image: "/images/kashmir_gurez_1773078269626.png",
    description: "Explore the remote and untouched Gurez Valley. Witness the majestic Habba Khatoon peak and the Kishanganga river.",
    days: 5,
    nights: 4,
    hotelRating: "3★",
    mealsIncluded: true,
    tags: ["Remote", "Adventure"],
    months: ["June", "July", "August", "September"],
    itinerary: [
      { day: 1, title: "Srinagar to Gurez", desc: "A long but scenic drive over the Razdan Pass to Gurez Valley." },
      { day: 2, title: "Dawar Exploration", desc: "Visit the main town of Dawar and interact with the local Shina people." },
      { day: 3, title: "Habba Khatoon Peak", desc: "Explore the base of the Habba Khatoon peak and the nearby spring." },
      { day: 4, title: "Tulail Valley", desc: "A day trip to the even more remote Tulail Valley." },
    ]
  },
  {
    id: 7,
    title: "Aharbal Waterfall Day Trip",
    location: "Kulgam, J&K",
    region: "Kulgam",
    price: 4500,
    rating: 4.5,
    image: "/images/kashmir_aharbal_1773078312348.png",
    description: "Visit the 'Niagara Falls of Kashmir'. A stunning waterfall set amidst pine forests.",
    days: 1,
    nights: 0,
    hotelRating: "N/A",
    mealsIncluded: false,
    tags: ["Waterfall", "Day Trip"],
    months: ["April", "May", "June", "July", "August", "September", "October"],
    itinerary: [
      { day: 1, title: "Aharbal Excursion", desc: "Full day trip from Srinagar to Aharbal Waterfall and back." }
    ]
  },
  {
    id: 8,
    title: "Kashmir Honeymoon Special",
    location: "Srinagar & Gulmarg",
    region: "Srinagar",
    price: 45000,
    rating: 5.0,
    image: "/images/kashmir_honeymoon_1773078398332.png",
    description: "A romantic 6-day journey through the most beautiful spots in Kashmir. Includes luxury stays, candle-light dinners, and flower decorations.",
    days: 6,
    nights: 5,
    hotelRating: "5★",
    mealsIncluded: true,
    tags: ["Honeymoon", "Luxury"],
    months: ["March", "April", "May", "June", "September", "October", "November"],
    itinerary: [
      { day: 1, title: "Arrival & Luxury Houseboat", desc: "Welcome to Srinagar. Check-in at a premium houseboat with special honeymoon decor." },
      { day: 2, title: "Romantic Shikara & Mughal Gardens", desc: "Private Shikara ride and a visit to the Nishat and Shalimar gardens." },
      { day: 3, title: "Gulmarg - The Meadow of Flowers", desc: "Drive to Gulmarg. Stay at a luxury resort. Evening walk in the meadows." },
      { day: 4, title: "Gondola Ride & Private Dinner", desc: "Take the Gondola to Phase 2. Enjoy a private candle-light dinner at the hotel." },
      { day: 5, title: "Srinagar Return & Shopping", desc: "Return to Srinagar. Visit the local markets for Pashmina and Saffron." },
      { day: 6, title: "Departure", desc: "Transfer to airport with sweet memories." }
    ]
  },
  {
    id: 9,
    title: "Kashmir Photography Expedition",
    location: "Various Locations",
    region: "Kashmir",
    price: 25000,
    rating: 4.8,
    image: "/images/kashmir_thumb_autumn_1773077687668.png",
    description: "Capture the soul of Kashmir with our photography-focused tour. Led by professional photographers to the most photogenic spots.",
    days: 7,
    nights: 6,
    hotelRating: "3★",
    mealsIncluded: true,
    tags: ["Photography", "Art"],
    months: ["April", "May", "October", "November"],
    itinerary: [
      { day: 1, title: "Srinagar Street Photography", desc: "Explore the old city, its bridges, and the bustling markets." },
      { day: 2, title: "Dal Lake Sunrise", desc: "Early morning Shikara ride to capture the floating vegetable market." },
      { day: 3, title: "Pahalgam Landscapes", desc: "Drive to Pahalgam. Focus on river landscapes and pine forests." },
      { day: 4, title: "Aru Valley Portraits", desc: "Visit Aru village for environmental portraits of the locals." },
      { day: 5, title: "Sonamarg Glaciers", desc: "Capture the dramatic peaks and glaciers of Sonamarg." },
      { day: 6, title: "Dachigam Wildlife", desc: "A visit to Dachigam National Park for wildlife and nature photography." },
      { day: 7, title: "Review & Departure", desc: "Photo review session and transfer to airport." }
    ]
  },
  {
    id: 10,
    title: "Amarnath Yatra Pilgrimage",
    location: "Pahalgam/Baltal",
    region: "Anantnag",
    price: 12000,
    rating: 4.9,
    image: "/images/kashmir_banner_snow_1773077629818.png",
    description: "A spiritual journey to the holy cave of Amarnath. We handle all registrations and logistics for a smooth pilgrimage.",
    days: 4,
    nights: 3,
    hotelRating: "2★",
    mealsIncluded: true,
    tags: ["Pilgrimage", "Spiritual"],
    months: ["July", "August"],
    itinerary: [
      { day: 1, title: "Arrival & Pahalgam Base Camp", desc: "Pickup from Srinagar and transfer to Pahalgam base camp." },
      { day: 2, title: "Trek to Sheshnag", desc: "Start the trek towards the holy cave. Overnight at Sheshnag." },
      { day: 3, title: "Holy Darshan & Return", desc: "Reach the holy cave for Darshan and return to Panchtarni." },
      { day: 4, title: "Departure", desc: "Return to Pahalgam and transfer to Srinagar Airport." }
    ]
  }
];
