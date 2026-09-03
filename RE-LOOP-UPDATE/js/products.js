// products.js
// Centralized mock database for RE-LOOP products

window.reloopProducts = [
    // --- MEN'S FASHION ---
    {
        id: "m1",
        category: "mens-fashion",
        name: "Classic Denim Jacket",
        price: "Rp 450.000",
        rating: 4.8,
        reviews: 320,
        image: "assets/denim_jacket.jpg",
        discount: "15% Off",
        pros: ["Timeless design", "Durable denim material", "Fits true to size"],
        cons: ["Slightly stiff initially", "Limited color options"],
        aiScore: 94,
        description: "A timeless denim jacket that never goes out of style. Perfect for casual outings and layering in cooler weather."
    },
    {
        id: "m2",
        category: "mens-fashion",
        name: "Slim Fit Chino Pants",
        price: "Rp 299.000",
        rating: 4.6,
        reviews: 215,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
        discount: "5% Off",
        pros: ["Comfortable stretch fabric", "Versatile for work or casual", "Multiple color choices"],
        cons: ["Requires ironing", "Pockets are slightly shallow"],
        aiScore: 89,
        description: "Comfortable and stylish slim fit chinos. Made with a hint of stretch for all-day comfort."
    },
    {
        id: "m3",
        category: "mens-fashion",
        name: "Cotton Crewneck T-Shirt",
        price: "Rp 150.000",
        rating: 4.9,
        reviews: 890,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
        discount: "10% Off",
        pros: ["Breathable 100% cotton", "Does not shrink after wash", "Great value"],
        cons: ["Basic design", "Thin collar"],
        aiScore: 96,
        description: "Your everyday essential crewneck t-shirt. Extremely soft, breathable, and durable."
    },
    {
        id: "m4",
        category: "mens-fashion",
        name: "Leather Oxford Shoes",
        price: "Rp 850.000",
        rating: 4.7,
        reviews: 142,
        image: "assets/oxford_shoes.jpg",
        discount: "20% Off",
        pros: ["Genuine leather", "Elegant formal look", "Sturdy sole"],
        cons: ["Requires breaking in", "Needs regular polishing"],
        aiScore: 91,
        description: "Premium leather oxford shoes perfect for formal events and office wear."
    },

    // --- WOMEN'S FASHION ---
    {
        id: "w1",
        category: "womens-fashion",
        name: "Floral Summer Dress",
        price: "Rp 320.000",
        rating: 4.8,
        reviews: 450,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80",
        discount: "10% Off",
        pros: ["Lightweight and breathable", "Beautiful floral pattern", "Flattering fit"],
        cons: ["Wrinkles easily", "Hand wash recommended"],
        aiScore: 95,
        description: "A gorgeous floral dress perfect for summer days, picnics, and beach outings."
    },
    {
        id: "w2",
        category: "womens-fashion",
        name: "High-Waist Mom Jeans",
        price: "Rp 399.000",
        rating: 4.7,
        reviews: 530,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
        discount: "15% Off",
        pros: ["Trendy vintage look", "Comfortable fit around the waist", "Durable denim"],
        cons: ["No stretch material", "Sizing runs slightly small"],
        aiScore: 92,
        description: "Classic high-waisted mom jeans that pair perfectly with crop tops or tucked-in shirts."
    },
    {
        id: "w3",
        category: "womens-fashion",
        name: "Oversized Knit Sweater",
        price: "Rp 275.000",
        rating: 4.9,
        reviews: 310,
        image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=600&q=80",
        discount: "20% Off",
        pros: ["Super cozy and warm", "Stylish oversized fit", "Soft material"],
        cons: ["Prone to pilling", "Bulky for storage"],
        aiScore: 96,
        description: "Stay warm and stylish with this chunky knit oversized sweater."
    },

    // --- TECHNOLOGY ---
    {
        id: "t1",
        category: "technology",
        name: "Apple iPhone 15 128GB",
        price: "Rp 12.249.000",
        rating: 4.9,
        reviews: 1450,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
        discount: "5% Off",
        pros: ["Exceptional camera quality", "USB-C charging", "Smooth performance"],
        cons: ["Price is relatively high", "Fast charging causes slight heating"],
        aiScore: 98,
        description: "The latest iPhone featuring a stunning display, an advanced camera system, and the powerful A16 Bionic chip."
    },
    {
        id: "t2",
        category: "technology",
        name: "Sony WH-1000XM5",
        price: "Rp 4.999.000",
        rating: 4.8,
        reviews: 890,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80",
        discount: "10% Off",
        pros: ["Industry-leading ANC", "Incredible sound clarity", "Lightweight design"],
        cons: ["Cannot fold compactly", "Premium price tag"],
        aiScore: 97,
        description: "Premium noise-canceling wireless headphones delivering unmatched audio performance."
    },
    {
        id: "t3",
        category: "technology",
        name: "Logitech MX Master 3S",
        price: "Rp 1.499.000",
        rating: 4.7,
        reviews: 1200,
        image: "assets/logitech_mouse.jpg",
        discount: "15% Off",
        pros: ["Ergonomic design", "Quiet clicks", "Customizable buttons"],
        cons: ["Slightly heavy", "Expensive for a mouse"],
        aiScore: 94,
        description: "The ultimate productivity mouse featuring quiet clicks and a hyper-fast electromagnetic scroll wheel."
    },

    // --- SHOES ---
    {
        id: "s1",
        category: "shoes",
        name: "Nike Air Max 270",
        price: "Rp 2.100.000",
        rating: 4.8,
        reviews: 3400,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        discount: "10% Off",
        pros: ["Maximum cushioning", "Breathable mesh upper", "Stylish street look"],
        cons: ["Air bubble can puncture", "Runs slightly narrow"],
        aiScore: 95,
        description: "Legendary Air Max cushioning providing unparalleled comfort for everyday wear."
    },
    {
        id: "s2",
        category: "shoes",
        name: "Adidas Ultraboost 22",
        price: "Rp 2.500.000",
        rating: 4.9,
        reviews: 2100,
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80",
        discount: "20% Off",
        pros: ["Incredible energy return", "Sock-like fit", "Durable Continental rubber outsole"],
        cons: ["High price point", "Boost foam gets dirty easily"],
        aiScore: 97,
        description: "High-performance running shoes designed for ultimate comfort and energy return."
    },
    {
        id: "s3",
        category: "shoes",
        name: "Vans Old Skool Classic",
        price: "Rp 850.000",
        rating: 4.7,
        reviews: 5600,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
        discount: "5% Off",
        pros: ["Iconic skate design", "Extremely durable", "Pairs with any outfit"],
        cons: ["Flat sole lacks arch support", "Takes time to break in"],
        aiScore: 93,
        description: "The classic Vans skate shoe featuring the iconic side stripe."
    },

    // --- HEALTH ---
    {
        id: "h1",
        category: "health",
        name: "Whey Protein Isolate 1kg",
        price: "Rp 650.000",
        rating: 4.8,
        reviews: 1250,
        image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80",
        discount: "15% Off",
        pros: ["High protein content per scoop", "Mixes easily", "Great chocolate flavor"],
        cons: ["Contains artificial sweeteners", "Can cause slight bloating for some"],
        aiScore: 94,
        description: "Premium whey protein isolate to support muscle recovery and growth."
    },
    {
        id: "h2",
        category: "health",
        name: "Digital Blood Pressure Monitor",
        price: "Rp 450.000",
        rating: 4.7,
        reviews: 830,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
        discount: "10% Off",
        pros: ["Accurate readings", "Easy to read large display", "Memory function for multiple users"],
        cons: ["Batteries drain quickly", "Cuff can feel tight"],
        aiScore: 92,
        description: "Reliable and easy-to-use digital blood pressure monitor for home health tracking."
    },

    // --- BEAUTY ---
    {
        id: "b1",
        category: "beauty",
        name: "Hydrating Facial Serum",
        price: "Rp 250.000",
        rating: 4.9,
        reviews: 2100,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
        discount: "20% Off",
        pros: ["Deeply hydrates skin", "Absorbs quickly", "Non-greasy formula"],
        cons: ["Small bottle size", "Fragrance might irritate sensitive skin"],
        aiScore: 96,
        description: "A powerful hydrating serum that leaves your skin feeling plump and glowing."
    },
    {
        id: "b2",
        category: "beauty",
        name: "Matte Liquid Lipstick",
        price: "Rp 120.000",
        rating: 4.6,
        reviews: 3400,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
        discount: "5% Off",
        pros: ["Long-lasting color", "Smudge-proof", "Vibrant shades"],
        cons: ["Can be drying on lips", "Hard to remove without oil cleanser"],
        aiScore: 91,
        description: "Vibrant and long-lasting matte liquid lipstick for a bold everyday look."
    },

    // --- SPORTS ---
    {
        id: "sp1",
        category: "sports",
        name: "Yoga Mat 8mm Thick",
        price: "Rp 180.000",
        rating: 4.7,
        reviews: 890,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=600&q=80",
        discount: "15% Off",
        pros: ["Excellent cushioning", "Non-slip surface", "Easy to carry strap included"],
        cons: ["Slight chemical smell initially", "Can tear if used with shoes"],
        aiScore: 93,
        description: "Thick and comfortable yoga mat designed for joint protection and stability."
    },
    {
        id: "sp2",
        category: "sports",
        name: "Adjustable Dumbbell Set 20kg",
        price: "Rp 650.000",
        rating: 4.8,
        reviews: 540,
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80",
        discount: "10% Off",
        pros: ["Space-saving design", "Easy weight adjustment", "Durable cast iron plates"],
        cons: ["Handles can be rough", "Changing weights takes a few seconds"],
        aiScore: 95,
        description: "Versatile adjustable dumbbell set for a complete home workout experience."
    },

    // --- MUSICAL INSTRUMENTS ---
    {
        id: "mi1",
        category: "musical-instruments",
        name: "Acoustic Guitar",
        price: "Rp 1.800.000",
        rating: 4.8,
        reviews: 420,
        image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80",
        discount: "10% Off",
        pros: ["Rich and warm tone", "Solid spruce top", "Comfortable neck profile"],
        cons: ["Action is slightly high out of the box", "Strings need upgrading"],
        aiScore: 94,
        description: "A beautifully crafted acoustic guitar delivering rich, resonant tones perfect for beginners and pros alike."
    },
    {
        id: "mi2",
        category: "musical-instruments",
        name: "61-Key Digital Keyboard",
        price: "Rp 2.450.000",
        rating: 4.7,
        reviews: 310,
        image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80",
        discount: "15% Off",
        pros: ["Hundreds of built-in sounds", "Touch-sensitive keys", "Portable design"],
        cons: ["Keys feel a bit plasticky", "Built-in speakers lack bass"],
        aiScore: 92,
        description: "A versatile digital keyboard packed with features, perfect for learning and creating music."
    },

    // --- AUTOMOTIVE ---
    {
        id: "a1",
        category: "automotive",
        name: "Premium Car Wax Polish",
        price: "Rp 150.000",
        rating: 4.6,
        reviews: 780,
        image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=600&q=80",
        discount: "5% Off",
        pros: ["Deep mirror shine", "Water repellent", "Long-lasting protection"],
        cons: ["Requires effort to buff off", "Strong chemical scent"],
        aiScore: 91,
        description: "Achieve a showroom shine and protect your car's paint with this premium car wax."
    },
    {
        id: "a2",
        category: "automotive",
        name: "Portable Tire Inflator",
        price: "Rp 350.000",
        rating: 4.8,
        reviews: 1120,
        image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=600&q=80",
        discount: "20% Off",
        pros: ["Fast inflation", "Digital pressure gauge", "Auto shut-off feature"],
        cons: ["Can be noisy", "Power cord could be longer"],
        aiScore: 95,
        description: "A must-have emergency tool for your car. Inflate tires quickly and accurately anywhere."
    }
];
