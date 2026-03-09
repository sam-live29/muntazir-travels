export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    category: string;
    tags: string[];
}

export const blogs: BlogPost[] = [
    {
        id: "kashmiri-cuisine-guide",
        title: "Traditional Kashmiri Cuisine: A Foodie's Paradise",
        excerpt: "Discover the rich flavors and spices of authentic Kashmiri food, from the famous Wazwan feast to the soothing Kahwa tea.",
        content: `
Kashmiri cuisine, deeply rooted in its history and geography, is a rich tapestry of flavors. The use of traditional spices like saffron, fennel, and dried ginger gives the food its unique aroma and taste. 

### The Wazwan Experience
A multi-course meal in Kashmiri tradition, Wazwan is a feast fit for kings. Preparing it is considered an art, and it typically consists of 36 courses. Most dishes are meat-based, emphasizing lamb and chicken, cooked overnight to perfection. Iconic dishes like Rogan Josh (a fragrant lamb curry), Yakhni (yogurt-based mutton gravy), and Gushtaba (velvety meat balls) form the heart of this feast.

### Vegetarian Delights
Dum Aloo (slow-cooked potatoes in a yogurt gravy) and Nadru Yakhni (lotus stems in a yogurt sauce) are testaments to the delicate vegetarian options in Kashmir. The use of mild spices ensures the natural flavors of the vegetables shine.

### The Warmth of Kahwa
No meal in Kashmir is complete without Noon Chai (salt tea) or traditional Kahwa. Brewed with saffron strands, cinnamon bark, cardamom pods, and occasionally Kashmiri roses, this green tea is incredibly fragrant. It's often served with crushed almonds and walnuts, providing the perfect warmth on a cold winter afternoon.
    `,
        author: "Fatima Dar",
        date: "March 5, 2024",
        readTime: "5 min read",
        image: "/images/kashmir_thumb_autumn_1773077687668.png",
        category: "Food & Culture",
        tags: ["Wazwan", "Kahwa", "Food Guide", "Culture"]
    },
    {
        id: "gurez-valley-hidden-jewel",
        title: "Gurez Valley: The Hidden Jewel of Jammu & Kashmir",
        excerpt: "Escape the crowds and explore the untouched, breathtaking beauty of Gurez Valley, located high in the Himalayas.",
        content: `
Nestled deep in the high Himalayas, about 123 kilometers from Srinagar, lies the pristine and relatively unexplored Gurez Valley. Guarded by the formidable Razdan Pass, Gurez opens up like a beautiful secret kept safe for centuries.

### The Journey There
The drive to Gurez is an adventure in itself. Winding mountain roads take you through dense alpine forests and past the shimmering Wular Lake. The defining feature of Gurez is the Habba Khatoon peak, a majestic pyramid-shaped mountain named after the famous Kashmiri poetess.

### Life in the Valley
The traditional log and mud houses of the local Dardic people add a rustic charm to the valley. The Kishanganga River flows vigorously through the meadows, offering excellent spots for trout fishing and riverside camping. 

Gurez is perfect for those looking to disconnect. With limited mobile connectivity and untouched landscapes, it's a place where time slows down, allowing you to truly immerse yourself in the awe-inspiring beauty of the Himalayas.
    `,
        author: "Rahul Mehra",
        date: "February 28, 2024",
        readTime: "8 min read",
        image: "/images/kashmir_gurez_1773078269626.png",
        category: "Destinations",
        tags: ["Gurez", "Offbeat", "Nature", "Mountains"]
    },
    {
        id: "first-trip-gulmarg-packing",
        title: "How to Pack for Your First Trip to Gulmarg",
        excerpt: "Ensure you stay warm and comfortable during your winter adventure in the 'Meadow of Flowers'. Essential packing tips inside.",
        content: `
Gulmarg, famously known as the 'Meadow of Flowers', transforms into a premier ski destination during the winter months. With sub-zero temperatures and heavy snowfall, packing correctly is the key to enjoying your trip.

### Layering is Essential
1. **Base Layer:** Thermal innerwear is non-negotiable. It traps body heat and wicks away moisture.
2. **Middle Layer:** Fleece jackets or thick woolen sweaters provide the necessary insulation.
3. **Outer Layer:** A dedicated, waterproof, and windproof winter jacket (down or synthetic) is critical to protect against the biting wind and snow.

### Footwear
Leave the sneakers at home. You will need sturdy, insulated, and waterproof snow boots with good grip. The paths can be incredibly slippery.

### Accessories Make the Difference
- **Gloves:** Waterproof ski gloves, not just woolen ones.
- **Headwear:** A warm beanie that covers your ears.
- **Socks:** Multiple pairs of thick woolen socks.
- **Sunglasses/Goggles:** Snow reflects sunlight intensely, making UV protection for your eyes vital.

Don't forget to pack heavy-duty moisturizers and lip balms, as the cold mountain air can be very drying!
    `,
        author: "Aryan Singh",
        date: "February 20, 2024",
        readTime: "4 min read",
        image: "/images/kashmir_banner_snow_1773077629818.png",
        category: "Travel Tips",
        tags: ["Gulmarg", "Winter", "Skiing", "Packing Guide"]
    },
    {
        id: "dal-lake-houseboat-experience",
        title: "A Night on Dal Lake: The Signature Houseboat Experience",
        excerpt: "Floating palaces of cedar wood. Discover what makes staying on a traditional Kashmiri houseboat an unforgettable memory.",
        content: `
A trip to Srinagar is incomplete without spending at least one night on a traditional houseboat on Dal Lake or Nigeen Lake. These aren't just boats; they are floating pieces of history and art.

### Intricate Craftsmanship
Kashmiri houseboats are marvels of local craftsmanship. Built mainly from cedar wood, which stays healthy even in water for years, the interiors are adorned with intricate walnut wood carvings, luxurious Kashmiri carpets, and traditional crewel-embroidered curtains.

### Serene Mornings
Waking up on a houseboat is a surreal experience. You are greeted by the gentle lapping of water against the wood. Open your window to see the sun rising over the Zabarwan mountain range, casting a golden hue over the lake.

### The Floating Market
Early in the morning, taking a Shikara to the floating vegetable market is a must-do. It’s a bustling, vibrant exchange of fresh produce traded directly from boats, offering an incredibly photogenic slice of local life.

A houseboat stay offers unmatched tranquility and a unique glimpse into the aquatic lifestyle of Kashmir.
    `,
        author: "Fatima Dar",
        date: "January 15, 2024",
        readTime: "6 min read",
        image: "/images/240_F_1305283767_27cPMdIZ12Lxv6ZydDhDSe8DakR5DxAo.jpg",
        category: "Experiences",
        tags: ["Dal Lake", "Houseboat", "Srinagar", "Luxury"]
    }
];
