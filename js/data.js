/**
 * LumaLife - Lifestyle Magazine & Blog
 * Data Module & LocalStorage Initialization
 * 
 * Provides curated lifestyle articles, categories, and helper persistence logic.
 */

// Master list of categories with visual icons and descriptions
const CATEGORIES_DATA = [
  {
    id: "travel",
    name: "Travel",
    icon: "✈️",
    description: "Wanderlust guides, hidden gems, weekend escapes, and mindful journeys across the world.",
    color: "#E07A5F",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "food",
    name: "Food",
    icon: "🍴",
    description: "Nourishing recipes, artisanal kitchen tips, seasonal farm-to-table dining, and coffee rituals.",
    color: "#F4A261",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "👗",
    description: "Capsule wardrobes, sustainable style, timeless aesthetics, and everyday outfit inspiration.",
    color: "#D4A373",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "wellness",
    name: "Wellness",
    icon: "🌿",
    description: "Holistic well-being, mindfulness, restorative sleep routines, and inner tranquility.",
    color: "#81B29A",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "fitness",
    name: "Fitness",
    icon: "🧘",
    description: "Gentle movement, energizing yoga sequences, strength building, and outdoor activity.",
    color: "#2A9D8F",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "self-care",
    name: "Self-Care",
    icon: "✨",
    description: "Quiet rituals, evening bath soaks, skin nourishment, and intentional slow living.",
    color: "#E76F51",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "personal-growth",
    name: "Personal Growth",
    icon: "🌱",
    description: "Habit formation, emotional intelligence, life reflections, and continuous self-discovery.",
    color: "#3D5A80",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "productivity",
    name: "Productivity",
    icon: "📖",
    description: "Deep work frameworks, gentle focus techniques, time balance, and burnout prevention.",
    color: "#457B9D",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "hobbies",
    name: "Hobbies",
    icon: "🎨",
    description: "Ceramics, film photography, journaling, botanical gardening, and weekend creations.",
    color: "#9B5DE5",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "books",
    name: "Books & Entertainment",
    icon: "📚",
    description: "Heartwarming literature, cozy poetry collections, cinematic films, and music playlists.",
    color: "#6D597A",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "home",
    name: "Home & Living",
    icon: "🏠",
    description: "Warm interior styling, natural lighting, decluttering, cozy nooks, and indoor flora.",
    color: "#B5838D",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
  }
];

// Initial 15+ curated, realistic lifestyle blog articles
const INITIAL_BLOGS = [
  {
    id: 1,
    title: "10 Simple Ways to Make Your Morning Better and Start Each Day with Calm",
    slug: "10-simple-ways-to-make-your-morning-better",
    excerpt: "Transform rushed, chaotic mornings into a sanctuary of peaceful intention with these gentle, scientifically supported habits.",
    category: "Wellness",
    author: {
      name: "Elena Vance",
      role: "Mindfulness Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    date: "August 14, 2026",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    likes: 128,
    featured: true,
    tags: ["Morning Routine", "Mindfulness", "Wellness", "Slow Living"],
    content: `
      <h2>The Art of the Mindful Morning</h2>
      <p>How you begin your morning often dictates the cadence of your entire day. When we wake up and immediately react to blaring alarms, urgent notification badges, and rushed deadlines, our nervous system enters an unnecessary fight-or-flight state before our feet even touch the floor.</p>
      
      <p>Creating a grounding morning ritual isn't about waking up at 4:30 AM or executing an exhausting 15-step checklist. Rather, it is about curating two or three intentional micro-moments that anchor your soul in calm awareness.</p>
      
      <div class="article-quote">
        <blockquote>"Peace is not something you must search for in distant places; it begins in the quiet pauses you gift yourself when the morning light first touches your window."</blockquote>
      </div>

      <h2>1. The 10-Minute Phone Buffer</h2>
      <p>Give your mind a grace period. Before checking emails, social feeds, or global headlines, allow yourself at least ten minutes of screen-free awakening. Let your thoughts wander naturally and give your brain time to transition out of theta sleep waves.</p>

      <h2>2. Warm Hydration with Lemon & Sea Salt</h2>
      <p>During sleep, our bodies lose substantial hydration. Drinking a tall glass of lukewarm water with a squeeze of fresh lemon and a tiny pinch of Himalayan pink salt helps replenish lost electrolytes and kickstarts cellular vitality.</p>

      <h2>3. Natural Sunlight Exposure</h2>
      <p>Step outside on your balcony, patio, or near an open window within the first thirty minutes of waking. Early morning photons hitting the retinas signal your brain to suppress melatonin and synchronize your natural circadian rhythm.</p>

      <h2>4. Gentle Five-Minute Mobility</h2>
      <p>You don't need an intense workout immediately. A few cat-cow stretches, gentle spinal twists, and deep diaphragmatic breaths encourage healthy lymphatic circulation and release overnight muscle tension.</p>

      <h2>5. The Sacred Brew Ritual</h2>
      <p>Whether you prefer ceremonial grade matcha, rich pour-over coffee, or herbal infusions, treat the brewing process as a sensory meditation. Notice the steam, the aroma, and the warmth of the ceramic mug between your palms.</p>

      <h2>Key Takeaways for Your Week</h2>
      <ul>
        <li>Start small: pick just two habits from this list to test tomorrow morning.</li>
        <li>Protect your peace by setting your phone's 'Do Not Disturb' to turn off 30 minutes after your alarm.</li>
        <li>Remember that consistency matters infinitely more than perfection.</li>
      </ul>
    `
  },
  {
    id: 2,
    title: "How to Plan a Perfect Weekend Getaway: A Stress-Free Itinerary Guide",
    slug: "how-to-plan-a-perfect-weekend-getaway",
    excerpt: "Master the secrets of quick 48-hour escapes that leave you rejuvenated rather than exhausted, from smart packing to destination scouting.",
    category: "Travel",
    author: {
      name: "Marcus Thorne",
      role: "Travel & Culture Writer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    date: "August 12, 2026",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    likes: 94,
    featured: true,
    tags: ["Travel", "Weekend Escape", "Itinerary", "Adventure"],
    content: `
      <h2>The Magic of the 48-Hour Reset</h2>
      <p>We often believe that meaningful travel requires weeks of PTO and long international flights. In reality, a thoughtfully planned weekend escape within a two-to-four hour radius of your home can provide the exact psychological reset you need.</p>

      <p>The key to an unforgettable weekend trip is resisting the urge to over-schedule. The greatest travel memories arise in unstructured gaps—stumbling upon a sunlit bakery, lingering over local wine, or discovering an unmapped forest trail.</p>

      <div class="article-quote">
        <blockquote>"Travel is not about collecting passport stamps; it is about collecting perspectives and breathing fresh air into tired routines."</blockquote>
      </div>

      <h2>Step 1: The Radius Rule</h2>
      <p>Keep your travel transit time under 3.5 hours each way. Spending six hours in heavy traffic or airports for a two-day trip creates transit fatigue that cancels out the relaxation of the destination.</p>

      <h2>Step 2: Curate One Anchor Activity Per Day</h2>
      <p>Pick one central experience for Saturday (e.g., visiting a local farmers market or hiking a coastal bluff) and one for Sunday morning (e.g., exploring an art studio or relaxing at a thermal bath). Leave the remainder of the day completely open for serendipity.</p>

      <h2>Step 3: Carry-On Only Philosophy</h2>
      <p>Never check a bag for a weekend trip. A single 35L duffle or backpack with two versatile outfits, comfortable walking shoes, and a light jacket ensures effortless mobility from train to hotel.</p>

      <h2>Packing Checklist</h2>
      <ul>
        <li>Neutral layer pieces (linen shirt, cozy knit sweater, versatile denim).</li>
        <li>Comfortable walking loafers or trail sneakers.</li>
        <li>Compact power bank, notebook, and travel journal.</li>
        <li>A reusable insulated water bottle and organic sunscreen.</li>
      </ul>
    `
  },
  {
    id: 3,
    title: "Easy Dinner Ideas for Busy Weeknights: Delicious Meals in Under 30 Minutes",
    slug: "easy-dinner-ideas-for-busy-weeknights",
    excerpt: "Wholesome, restaurant-quality dinners made with simple pantry staples that will make you look forward to weeknight cooking.",
    category: "Food",
    author: {
      name: "Sophia Chen",
      role: "Culinary & Lifestyle Chef",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    date: "August 10, 2026",
    readTime: 4,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    likes: 115,
    featured: true,
    tags: ["Recipes", "Quick Meals", "Food", "Healthy Eating"],
    content: `
      <h2>Weeknight Cooking Without the Chaos</h2>
      <p>After a long workday, the last thing anyone wants is a mountain of dirty cookware and a recipe requiring 18 obscure ingredients. Cooking at home should feel like an unwinding ritual, not a stressful second job.</p>

      <p>By leveraging high-impact flavor builders—like good extra virgin olive oil, toasted sesame, fresh herbs, and bright citrus—you can create nourishing dinners in less time than it takes for food delivery to arrive.</p>

      <h2>Recipe 1: Crispy Lemon Garlic White Bean Skillet</h2>
      <p><strong>Time:</strong> 15 minutes | <strong>Pantry Essentials:</strong> Cannellini beans, garlic, baby spinach, parmesan, lemon zest.</p>
      <p>Sauté minced garlic in rich olive oil until fragrant. Toss in drained cannellini beans, mashing a quarter of them to create a creamy sauce. Fold in fresh baby spinach until just wilted, finishing with freshly grated parmesan, cracked black pepper, and bright lemon juice. Serve alongside toasted sourdough.</p>

      <h2>Recipe 2: 20-Minute Sesame Ginger Soba Noodles</h2>
      <p><strong>Time:</strong> 20 minutes | <strong>Key Ingredients:</strong> Buckwheat soba, julienned cucumber, edamame, toasted sesame oil, tamari.</p>
      <p>Boil soba noodles for 4 minutes and rinse under cold water. Whisk together tamari, rice vinegar, grated ginger, and sesame oil. Toss the cold noodles with shelled edamame, crisp bell peppers, and fresh cilantro for an invigorating, nutrient-dense bowl.</p>

      <h2>Pantry Staples to Always Keep in Stock</h2>
      <ul>
        <li>Canned legumes (chickpeas, black beans, cannellini beans).</li>
        <li>High-grade extra virgin olive oil and unrefined toasted sesame oil.</li>
        <li>Fresh garlic, lemons, shallots, and leafy greens.</li>
        <li>Quick-cooking grains (quinoa, soba noodles, jasmine rice).</li>
      </ul>
    `
  },
  {
    id: 4,
    title: "How to Build a Simple Self-Care Routine That Genuinely Restores Your Energy",
    slug: "how-to-build-a-simple-self-care-routine",
    excerpt: "Move past consumerist face-mask trends and discover intentional emotional, physical, and sensory self-care practices that truly recharge you.",
    category: "Self-Care",
    author: {
      name: "Elena Vance",
      role: "Mindfulness Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    date: "August 08, 2026",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
    likes: 87,
    featured: false,
    tags: ["Self-Care", "Rest", "Mental Health", "Mindfulness"],
    content: `
      <h2>Redefining Self-Care</h2>
      <p>In recent years, the concept of self-care has often been commercialized into bath bombs and luxury shopping sprees. While physical pampering is delightful, genuine self-care is often much quieter, more honest, and fundamentally protective of your inner peace.</p>

      <p>True self-care is setting boundaries, drinking enough water, forgiving yourself for unfinished to-do lists, and giving your nervous system permission to pause without guilt.</p>

      <h2>The Four Pillars of Sustainable Self-Care</h2>
      
      <h3>1. Sensory Rest</h3>
      <p>We are bombarded with artificial blue light, sirens, notifications, and chatter. Sensory self-care involves dimming evening lights, playing soothing instrumental music, or spending thirty minutes in pure silence.</p>

      <h3>2. Emotional Boundaries</h3>
      <p>Saying 'no' to social commitments that drain you is an act of deep self-respect. Protecting your weekend schedule ensures you have emotional bandwidth for what truly matters.</p>

      <h3>3. Physical Nourishment</h3>
      <p>Warm herbal teas, comfortable organic cotton loungewear, gentle stretching, and early sleep times are foundational gifts you can offer your body every single day.</p>

      <h3>4. Mental Decluttering</h3>
      <p>Keep a bedside journal. Spending five minutes writing down 'brain dump' thoughts before sleep prevents bedtime rumination and promotes deeper REM rest.</p>
    `
  },
  {
    id: 5,
    title: "Creating a Minimalist Capsule Wardrobe: 25 Pieces for Effortless Everyday Style",
    slug: "creating-a-minimalist-capsule-wardrobe",
    excerpt: "Eliminate morning decision fatigue and curate a timeless, versatile closet tailored to your personal aesthetic and lifestyle.",
    category: "Fashion",
    author: {
      name: "Chloe Dupont",
      role: "Style & Aesthetics Columnist",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
    },
    date: "August 06, 2026",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    likes: 102,
    featured: false,
    tags: ["Fashion", "Capsule Wardrobe", "Minimalism", "Sustainable Style"],
    content: `
      <h2>Less Clutter, More Elegance</h2>
      <p>Have you ever stared at a closet bursting with clothes and felt like you had absolutely nothing to wear? This common paradox happens when our wardrobes are filled with disjointed fast-fashion impulse buys rather than cohesive, high-quality staples.</p>

      <p>A capsule wardrobe is a curated collection of interchangeable garments that effortlessly coordinate with one another, maximizing outfits while minimizing total items.</p>

      <h2>Core Color Palette Foundation</h2>
      <p>Select a cohesive palette composed of:</p>
      <ul>
        <li><strong>Base Neutrals:</strong> Crisp white, warm oat, charcoal grey, deep navy, or rich espresso.</li>
        <li><strong>Accent Shades:</strong> Olive sage, burnt terracotta, camel, or dusty rose.</li>
        <li><strong>Metallics:</strong> Warm gold or brushed silver hardware.</li>
      </ul>

      <h2>The Essential 25-Piece Blueprint</h2>
      <p>Here is a foundational formula that adapts across seasons:</p>
      <ul>
        <li><strong>Tops (8):</strong> 3 classic cotton tees, 2 relaxed linen button-downs, 2 fine merino wool knits, 1 silk camisole.</li>
        <li><strong>Bottoms (6):</strong> 2 pairs of tailored trousers, 2 classic straight-leg denim, 1 slip skirt, 1 linen shorts/culottes.</li>
        <li><strong>Outerwear (4):</strong> 1 structured trench coat, 1 oversized wool blazer, 1 denim jacket, 1 cozy cardigan.</li>
        <li><strong>Dresses & One-Pieces (3):</strong> 1 versatile black midi dress, 1 daytime shirt dress, 1 linen wrap dress.</li>
        <li><strong>Footwear (4):</strong> 1 clean leather sneakers, 1 tailored loafers, 1 ankle boots, 1 minimal strap sandals.</li>
      </ul>
    `
  },
  {
    id: 6,
    title: "How to Stay Productive Without Burning Out: The Gentle Focus Method",
    slug: "how-to-stay-productive-without-burning-out",
    excerpt: "Trade relentless hustle culture for sustainable rhythms that honor your cognitive energy while producing high-quality creative output.",
    category: "Productivity",
    author: {
      name: "Marcus Thorne",
      role: "Productivity & Life Design",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    date: "August 04, 2026",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80",
    likes: 140,
    featured: false,
    tags: ["Productivity", "Deep Work", "Mindset", "Work-Life Balance"],
    content: `
      <h2>The Fallacy of Constant Optimization</h2>
      <p>Modern work culture has conditioned us to believe that productivity equals being busy every waking hour. But human beings are biological organisms, not machines—we operate in rhythmic pulses of exertion and renewal.</p>

      <p>When you align your most demanding cognitive work with your natural energy peaks, you accomplish in three hours what previously took an exhausting eight.</p>

      <h2>The Rule of 3 Essential Priorities</h2>
      <p>Every morning, ask yourself: <em>If I could only accomplish three things today to feel satisfied, what would they be?</em> Write those three tasks down on a physical card and fiercely protect your morning hours from distractions until they are completed.</p>

      <h2>Ultradian Rhythm Cycles</h2>
      <p>Research demonstrates that the human brain can sustain high-focus deep work for approximately 90 minutes before requiring a 15-to-20 minute recovery cycle. Honor this boundary by stepping away from your desk, hydrating, and resting your vision.</p>
    `
  },
  {
    id: 7,
    title: "7 Cozy Books to Read on a Quiet Weekend: Stories That Warm the Heart",
    slug: "7-cozy-books-to-read-on-a-quiet-weekend",
    excerpt: "Curl up with a blanket and a warm drink. These heartwarming and evocative books offer the ultimate literary escape.",
    category: "Books",
    author: {
      name: "Sophia Chen",
      role: "Literary & Lifestyle Columnist",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    date: "August 02, 2026",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
    likes: 76,
    featured: false,
    tags: ["Books", "Reading List", "Cozy Living", "Literature"],
    content: `
      <h2>The Therapeutic Power of a Good Story</h2>
      <p>There is a unique solace in losing oneself inside the pages of a well-crafted book. When the rain taps gently against the windowpane and a steaming mug of cinnamon chai sits at your elbow, the world outside slows to a peaceful hum.</p>

      <h2>Our Top Handpicked Weekend Selections</h2>
      
      <h3>1. Days at the Morisaki Bookshop by Satoshi Yagisawa</h3>
      <p>A gentle, heartwarming Japanese novel set in the historic second-hand book district of Jimbocho, Tokyo. It explores healing, family ties, and the magic of forgotten vintage books.</p>

      <h3>2. The House in the Cerulean Sea by TJ Klune</h3>
      <p>An uplifting, masterfully written fantasy about an ordinary caseworker who discovers an extraordinary family on a secluded coastal island. It feels like a warm, comforting hug in book form.</p>

      <h3>3. Braiding Sweetgrass by Robin Wall Kimmerer</h3>
      <p>An enchanting blend of indigenous wisdom, botanical science, and poetic reflection on our sacred reciprocal relationship with the natural living world.</p>
    `
  },
  {
    id: 8,
    title: "Simple Ways to Make Your Home Feel Cozy, Warm, and Filled with Character",
    slug: "simple-ways-to-make-your-home-feel-cozy",
    excerpt: "Transform ordinary rooms into inviting sanctuaries using layered ambient lighting, natural textures, and personal vintage accents.",
    category: "Home & Living",
    author: {
      name: "Chloe Dupont",
      role: "Interior & Living Specialist",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
    },
    date: "July 30, 2026",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    likes: 112,
    featured: false,
    tags: ["Home Decor", "Interior Design", "Cozy Living", "Hygge"],
    content: `
      <h2>Home as a Sacred Sanctuary</h2>
      <p>A beautiful home isn't measured by expensive designer furniture or sterile showroom trends. It is defined by how you feel when you cross the threshold after a demanding day—enveloped in warmth, soft light, and comforting scents.</p>

      <h2>1. The Power of Layered Lighting</h2>
      <p>Never rely solely on harsh overhead lighting (the notorious 'big light'). Instead, scatter 3 to 4 warm-toned light sources throughout your living space: an amber bedside lamp, a sculptural floor uplight, and natural soy wax candles.</p>

      <h2>2. Tactile Textiles & Natural Textures</h2>
      <p>Mix materials to create rich visual warmth. Pair breathable washed linen throws with chunky waffle knits, woven jute rugs, and raw clay pottery.</p>

      <h2>3. Living Greenery</h2>
      <p>Potted plants like pothos, fiddle-leaf figs, and fragrant eucalyptus bring oxygen, vitality, and organic softness to any corner.</p>
    `
  },
  {
    id: 9,
    title: "Healthy Habits That Are Surprisingly Easy to Maintain: Small Shifts, Big Results",
    slug: "healthy-habits-that-are-easy-to-maintain",
    excerpt: "Ditch extreme diets and grueling regimens. These micro-habits slip naturally into your daily routine and compound over time.",
    category: "Fitness",
    author: {
      name: "Elena Vance",
      role: "Wellness & Health Coach",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    date: "July 28, 2026",
    readTime: 4,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    likes: 89,
    featured: false,
    tags: ["Health", "Fitness", "Habits", "Wellness"],
    content: `
      <h2>The Compounding Power of 1% Changes</h2>
      <p>When we commit to getting healthy, our instinct is often to attempt radical overhauls: joining intense bootcamps, throwing out all carbohydrates, and setting punishing schedules. Within three weeks, willpower collapses and burnout sets in.</p>

      <p>Sustainable wellness is built on micro-habits—actions so small and effortless that it is virtually impossible to say no to them.</p>

      <h2>Habit 1: The 15-Minute Post-Meal Walk</h2>
      <p>Taking a gentle stroll after lunch or dinner aids digestion, stabilizes blood glucose spikes, and provides a refreshing midday mental break.</p>

      <h2>Habit 2: Habit Stacking Your Hydration</h2>
      <p>Attach a healthy behavior to an existing anchor. For instance: drink a glass of water every time your morning coffee pot is brewing, or do 10 calf raises while brushing your teeth.</p>

      <h2>Habit 3: The 10-Minute Evening Stretch</h2>
      <p>Unwind your hamstrings, hips, and shoulders before getting into bed. It lowers resting heart rate and prepares the nervous system for deep restorative sleep.</p>
    `
  },
  {
    id: 10,
    title: "How to Plan an Unforgettable Budget-Friendly Trip Without Sacrificing Quality",
    slug: "how-to-plan-a-budget-friendly-trip",
    excerpt: "Travel the world without breaking your bank account by leveraging shoulder season travel, local culinary markets, and smart bookings.",
    category: "Travel",
    author: {
      name: "Marcus Thorne",
      role: "Travel & Culture Writer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    date: "July 25, 2026",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    likes: 98,
    featured: false,
    tags: ["Budget Travel", "Travel Tips", "Wanderlust", "Adventure"],
    content: `
      <h2>Luxury Experiences on an Accessible Budget</h2>
      <p>Affordable travel doesn't mean enduring grimy accommodations or missing out on authentic cultural moments. In fact, traveling on a conscious budget often leads to far more genuine local immersion than staying in generic tourist bubble hotels.</p>

      <h2>1. The Shoulder Season Advantage</h2>
      <p>Travel during the transition months (May-June or September-October in Europe and North America). Flights and boutique stays are 40-60% cheaper, the weather is milder, and historic landmarks are free from overwhelming crowds.</p>

      <h2>2. Dine Like a Local Resident</h2>
      <p>Skip tourist-trap restaurants situated directly on main plazas. Walk three blocks deeper into residential neighborhoods to find family-run trattorias, bustling food markets, and authentic street vendors serving unforgettable culinary masterpieces for a fraction of the cost.</p>

      <h2>3. Free Cultural Walking Tours & City Passes</h2>
      <p>Almost every major city offers volunteer-led historic walking tours where you only tip what you feel is appropriate. You gain rich historical context and insider local recommendations.</p>
    `
  },
  {
    id: 11,
    title: "6 Creative Hobbies You Should Try This Weekend to Spark Joy and Flow",
    slug: "6-creative-hobbies-you-should-try-this-weekend",
    excerpt: "Step away from screens and reignite your creative spark with tactile, soothing pastimes that bring deep fulfillment.",
    category: "Hobbies",
    author: {
      name: "Sophia Chen",
      role: "Creative Arts Contributor",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    date: "July 22, 2026",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
    likes: 83,
    featured: false,
    tags: ["Hobbies", "Creativity", "Art", "Mindfulness"],
    content: `
      <h2>The Joy of Creating Without Monetization</h2>
      <p>In our hyper-capitalist world, we are constantly pressured to turn every passion into a side hustle. But there is profound healing in pursuing a hobby purely for the joy of play, experimentation, and tactile discovery.</p>

      <h2>1. Air-Dry Clay Sculpting & Pottery</h2>
      <p>You don't need a kiln to create beautiful incense holders, ring dishes, and sculptural vases. A small pack of non-toxic air-dry clay and basic carving tools offer hours of meditative focus.</p>

      <h2>2. Botanical Watercolor Painting</h2>
      <p>Pick a single fallen leaf, flower blossom, or piece of citrus. Observing the gradient of natural colors and painting wet-on-wet washes trains your eye to see subtle beauty in ordinary objects.</p>

      <h2>3. Vintage Film Photography</h2>
      <p>Shooting on a simple 35mm film camera forces intentionality. With only 36 exposures per roll, you slow down, compose carefully, and savor the anticipation of film development.</p>
    `
  },
  {
    id: 12,
    title: "The Art of Taking Better Travel Photos with Your Phone: A Guide for Everyone",
    slug: "how-to-take-better-travel-photos",
    excerpt: "You don't need bulky professional camera gear to capture breathtaking travel memories. Learn lighting, framing, and storytelling tricks.",
    category: "Travel",
    author: {
      name: "Marcus Thorne",
      role: "Visual Storyteller",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    date: "July 19, 2026",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
    likes: 105,
    featured: false,
    tags: ["Photography", "Travel", "Creativity", "Visual Storytelling"],
    content: `
      <h2>Storytelling Over Megapixels</h2>
      <p>The best camera in the world is the one you carry with you. Modern smartphones pack incredible optical sensors, but great photography is 90% composition, lighting, and human emotion.</p>

      <h2>1. Master the Golden Hour</h2>
      <p>The hour after sunrise and the hour before sunset bathe landscapes in warm, diffused honey tones with long, dramatic shadows. Avoid harsh midday sun whenever possible.</p>

      <h2>2. Activate the Rule of Thirds Grid</h2>
      <p>Turn on the 3x3 grid in your camera settings. Position horizons along the lower or upper third lines, and place architectural focal points or subjects at line intersections.</p>

      <h2>3. Look for Natural Frames & Foreground Depth</h2>
      <p>Frame your subject through an ancient stone archway, hanging olive branches, or a sunlit café window to add dimensional storytelling to your shot.</p>
    `
  },
  {
    id: 13,
    title: "Why You Should Try a 48-Hour Digital Detox: Reclaiming Your Mental Freedom",
    slug: "why-you-should-try-a-digital-detox",
    excerpt: "Discover the shocking clarity, improved sleep, and deep presence that occurs when you temporarily silence notifications and step offline.",
    category: "Personal Growth",
    author: {
      name: "Elena Vance",
      role: "Mindfulness Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    date: "July 15, 2026",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    likes: 122,
    featured: false,
    tags: ["Digital Detox", "Mindfulness", "Mental Clarity", "Personal Growth"],
    content: `
      <h2>The Chronic Distraction Dilemma</h2>
      <p>The average adult checks their smartphone over 140 times a day. We have become unconsciously conditioned to reach for digital dopamine whenever there is a second of boredom, silence, or stillness.</p>

      <p>A 48-hour digital detox is an intentional sabbatical from the endless scroll, allowing your dopamine receptors to reset and reconnecting you with real-world presence.</p>

      <h2>How to Prepare for Success</h2>
      <ul>
        <li><strong>Inform Loved Ones:</strong> Send a quick note to family and close friends letting them know you'll be offline for the weekend and can be reached via phone call for emergencies.</li>
        <li><strong>Physical Analog Alternatives:</strong> Stock up on paperbacks, vinyl records, board games, and walking trails.</li>
        <li><strong>Store Devices Out of Sight:</strong> Place tablets and smartphones in a drawer or closed closet. Friction is your best ally against subconscious habits.</li>
      </ul>
    `
  },
  {
    id: 14,
    title: "How to Spend a Truly Relaxing Sunday to Recharge for the Week Ahead",
    slug: "how-to-spend-a-relaxing-sunday",
    excerpt: "Say goodbye to the dreaded 'Sunday Scaries'. Cultivate an intentional slow weekend ritual of rest, good food, and gentle prep.",
    category: "Wellness",
    author: {
      name: "Chloe Dupont",
      role: "Lifestyle Columnist",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
    },
    date: "July 12, 2026",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80",
    likes: 118,
    featured: false,
    tags: ["Sunday Reset", "Wellness", "Self-Care", "Slow Living"],
    content: `
      <h2>Reclaiming the Sunday Sanctuary</h2>
      <p>Sunday evening anxiety—colloquially known as the 'Sunday Scaries'—steals away the second half of our weekend. When we transform Sunday into a deliberate ritual of slow restoration and light proactive preparation, we replace dread with peaceful confidence.</p>

      <h2>1. The Slow Morning Breakfast</h2>
      <p>Make breakfast an event. Bake fresh blueberry scones, brew loose-leaf herbal tea, and sit by a sunlit window with a book or gentle acoustic music.</p>

      <h2>2. The 30-Minute Weekly Tidy</h2>
      <p>Do not spend your entire Sunday cleaning. Spend exactly thirty minutes putting away laundry, sweeping living room floors, and wiping kitchen countertops. A clean visual space invites peace of mind.</p>

      <h2>3. The 15-Minute Monday Preview</h2>
      <p>At 5:00 PM, spend 15 minutes reviewing your calendar for the coming week, noting top priorities, and laying out your outfit for Monday morning. Once written down, mentally close work until Monday morning arrives.</p>
    `
  },
  {
    id: 15,
    title: "Small Lifestyle Changes That Make a Big Difference in Everyday Happiness",
    slug: "small-lifestyle-changes-that-make-a-big-difference",
    excerpt: "Lasting joy isn't found in monumental milestones, but in the micro-rituals and mindful gratitude woven into everyday moments.",
    category: "Personal Growth",
    author: {
      name: "Elena Vance",
      role: "Mindfulness Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    date: "July 08, 2026",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    likes: 135,
    featured: false,
    tags: ["Personal Growth", "Happiness", "Mindfulness", "Gratitude"],
    content: `
      <h2>The Science of Micro-Moments</h2>
      <p>Psychologists have long noted the hedonic treadmill: we believe that getting a promotion, buying a larger house, or booking a dream vacation will permanently boost our happiness, yet we quickly adapt back to our baseline.</p>

      <p>True life satisfaction is cultivated through micro-gratitude, conscious presence, and small shifts in how we relate to daily experiences.</p>

      <h2>Practical Micro-Shifts to Practice:</h2>
      <ul>
        <li><strong>Celebrate the ordinary:</strong> Savor the first sip of your morning coffee or the crisp smell of autumn air as if it were a rare luxury.</li>
        <li><strong>Practice unprompted kindness:</strong> Send one genuine appreciation text message to a friend or colleague every morning.</li>
        <li><strong>Protect your sleep envelope:</strong> Keep screens out of your bedroom and invest in breathable linen bedding.</li>
      </ul>
    `
  }
];

// Initial realistic comments
const INITIAL_COMMENTS = {
  1: [
    {
      id: "c1",
      name: "Sarah Jenkins",
      email: "sarah.j@example.com",
      text: "The phone buffer habit has completely changed my anxiety levels in the morning! I've been doing 15 minutes of quiet time for the past week and feel so much more grounded.",
      date: "August 15, 2026",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: "c2",
      name: "David Kim",
      email: "davidk@example.com",
      text: "Warm water with lemon and Himalayan salt is now my non-negotiable ritual. Fantastic, easy-to-digest article Elena!",
      date: "August 16, 2026",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
    }
  ],
  2: [
    {
      id: "c3",
      name: "Amara Woods",
      email: "amara@example.com",
      text: "The 'one anchor activity per day' rule is brilliant. We used to cram 10 tourist spots in two days and come home more exhausted than before we left!",
      date: "August 13, 2026",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
    }
  ],
  3: [
    {
      id: "c4",
      name: "Lucas Rivera",
      email: "lucas@example.com",
      text: "Made the crispy garlic white bean skillet last night! Took 12 minutes total and felt like something from a rustic bistro.",
      date: "August 11, 2026",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80"
    }
  ]
};

/**
 * Initialize Storage with default seed data if not yet present
 */
function initializeDatabase() {
  if (!localStorage.getItem("lumalife_blogs")) {
    localStorage.setItem("lumalife_blogs", JSON.stringify(INITIAL_BLOGS));
  }
  if (!localStorage.getItem("lumalife_comments")) {
    localStorage.setItem("lumalife_comments", JSON.stringify(INITIAL_COMMENTS));
  }
  if (!localStorage.getItem("lumalife_likes")) {
    localStorage.setItem("lumalife_likes", JSON.stringify([]));
  }
  if (!localStorage.getItem("lumalife_bookmarks")) {
    localStorage.setItem("lumalife_bookmarks", JSON.stringify([1, 2]));
  }
  if (!localStorage.getItem("lumalife_newsletter")) {
    localStorage.setItem("lumalife_newsletter", JSON.stringify([]));
  }
}

// Automatically seed database on script evaluation
initializeDatabase();
