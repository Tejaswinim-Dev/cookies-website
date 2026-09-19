export interface Product {
  id: string;
  name: string;
  category: 'Cookies' | 'Cupcakes' | 'Granola & Bars' | 'Healthy Snacks';
  price: number;
  weight: string;
  tagline: string;
  description: string;
  ingredients: string[];
  allergens: string;
  freshness: string;
  storage: string;
  tags: string[];
  image: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  nutritionHighlights: {
    label: string;
    value: string;
  }[];
}

export const PRODUCTS: Product[] = [
  {
    id: "choco-oats-cookie",
    name: "Chocolate Oats Cookie",
    category: "Cookies",
    price: 380,
    weight: "250g (Pack of 6)",
    tagline: "Crunchy edges, soft chewy center, wholesome oats & 70% dark chocolate.",
    description: "Crunchy on the edges, soft in the middle, packed with rolled oats and 70% dark chocolate chunks. Sweetened naturally with organic country jaggery and baked fresh in our Hyderabad home kitchen.",
    ingredients: ["Rolled Oats", "Whole Wheat Flour", "70% Dark Couverture Chocolate", "A2 Butter", "Organic Jaggery", "Crushed California Almonds"],
    allergens: "Contains gluten, dairy, and tree nuts.",
    freshness: "Best enjoyed within 7 days. Baked fresh on order.",
    storage: "Store in an airtight container in a cool, dry place.",
    tags: ["High Fibre", "No Refined Sugar", "Eggless"],
    image: "/images/products/choco-oats.jpg",
    rating: 4.9,
    reviewsCount: 48,
    inStock: true,
    nutritionHighlights: [
      { label: "Dietary Fibre", value: "4.8g per cookie" },
      { label: "Refined Sugar", value: "0%" },
      { label: "Trans Fat", value: "0g" }
    ]
  },
  {
    id: "almond-cranberry-cookie",
    name: "Almond Cranberry Cookie",
    category: "Cookies",
    price: 420,
    weight: "250g (Pack of 6)",
    tagline: "Slow-baked golden crispness with toasted California almonds & ruby cranberries.",
    description: "Our signature golden cookie baked with sliced California almonds and tart ruby cranberries. Packed with real nutty crunch and sweetened gently with palm jaggery.",
    ingredients: ["Whole Wheat Flour", "Toasted California Almonds", "Dried Cranberries", "Rolled Oats", "Cold-Pressed Ghee", "Palm Jaggery", "Natural Vanilla Bean"],
    allergens: "Contains gluten, dairy, and almonds.",
    freshness: "Best enjoyed within 10 days.",
    storage: "Keep in a cool, dry place in an airtight glass jar.",
    tags: ["No Maida", "Protein Rich", "Eggless"],
    image: "/images/products/almond-cranberry.jpg",
    rating: 5.0,
    reviewsCount: 36,
    inStock: true,
    nutritionHighlights: [
      { label: "Protein", value: "5.2g per cookie" },
      { label: "Antioxidants", value: "Rich" },
      { label: "Preservatives", value: "Zero" }
    ]
  },
  {
    id: "jaggery-millet-cookie",
    name: "Jaggery Millet Cookie",
    category: "Cookies",
    price: 360,
    weight: "250g (Pack of 8)",
    tagline: "Ancient Telangana foxtail millet, golden jaggery & aromatic green cardamom.",
    description: "Inspired by traditional South Indian confectionery, these cookies combine foxtail millet (kangni) flour with country jaggery and fresh cardamom. Hearty, nostalgic, and deeply satisfying.",
    ingredients: ["Foxtail Millet Flour", "Little Millet Flour", "Desi Ghee", "Organic Telangana Jaggery", "Green Cardamom", "Roasted White Sesame"],
    allergens: "Contains dairy (ghee) and sesame. Naturally gluten-friendly millet blend.",
    freshness: "Best enjoyed within 14 days.",
    storage: "Store in a dry tin or glass container.",
    tags: ["Millet Based", "No Refined Sugar", "Traditional"],
    image: "/images/products/jaggery-millet.jpg",
    rating: 4.8,
    reviewsCount: 52,
    inStock: true,
    nutritionHighlights: [
      { label: "Millet Content", value: "65%" },
      { label: "Minerals", value: "Iron & Calcium rich" },
      { label: "Glycemic Index", value: "Low GI" }
    ]
  },
  {
    id: "healthy-choco-cupcake",
    name: "Healthy Choco Cupcake",
    category: "Cupcakes",
    price: 440,
    weight: "4 pieces (approx. 240g)",
    tagline: "Fluffy raw cacao sponge sweetened with Medjool dates and pure cocoa swirl.",
    description: "An indulgent treat without the sugar crash. Soft and moist cacao sponge made from almond flour and oat flour, sweetened with ripe Medjool dates and topped with a pure cacao ganache.",
    ingredients: ["Fine Oat Flour", "Almond Flour", "Raw Cacao Powder", "Medjool Dates Puree", "Cold-Pressed Coconut Oil", "Pure 70% Dark Ganache", "Almond Milk"],
    allergens: "Contains tree nuts (almonds). Eggless & Dairy-Free friendly.",
    freshness: "Best enjoyed within 3 days. Keep refrigerated in warm weather.",
    storage: "Refrigerate in an airtight box. Bring to room temperature 10 mins before eating.",
    tags: ["No Refined Sugar", "Eggless", "Date Sweetened"],
    image: "/images/products/choco-cupcake.jpg",
    rating: 4.9,
    reviewsCount: 29,
    inStock: true,
    nutritionHighlights: [
      { label: "Refined Sugar", value: "0g" },
      { label: "Cacao Polyphenols", value: "High" },
      { label: "Flour Type", value: "Almond & Oat" }
    ]
  },
  {
    id: "banana-walnut-muffin",
    name: "Banana Walnut Muffin",
    category: "Cupcakes",
    price: 390,
    weight: "4 pieces (approx. 260g)",
    tagline: "Wholesome morning bake with caramelised ripe bananas & toasted walnut crumble.",
    description: "Wholesome breakfast muffins made from naturally ripe banana puree, crunchy toasted Kashmiri walnuts, and a dusting of Ceylon cinnamon. Dense, comforting, and filling.",
    ingredients: ["Caramelised Ripe Bananas", "Whole Wheat Flour", "Rolled Oats", "Kashmiri Walnuts", "Raw Forest Honey", "Cold-Pressed Coconut Oil", "Ceylon Cinnamon"],
    allergens: "Contains gluten and tree nuts (walnuts).",
    freshness: "Best enjoyed within 4 days.",
    storage: "Store in a cool dry container or refrigerate after day 2.",
    tags: ["High Fibre", "No Maida", "Heart Healthy"],
    image: "/images/products/banana-muffin.jpg",
    rating: 4.9,
    reviewsCount: 41,
    inStock: true,
    nutritionHighlights: [
      { label: "Potassium", value: "Rich" },
      { label: "Omega 3s", value: "Walnut rich" },
      { label: "Sweetener", value: "Banana & Honey" }
    ]
  },
  {
    id: "homemade-granola-bar",
    name: "Homemade Granola Bar",
    category: "Granola & Bars",
    price: 350,
    weight: "5 bars (200g)",
    tagline: "Slow-roasted rolled oats, raw honey, pumpkin seeds & dried wild blueberries.",
    description: "Chewy, nutrient-rich energy bars crafted from slow-roasted rolled oats, 4 varieties of seeds, creamy stone-ground almond butter, and raw honey. The perfect on-the-go snack.",
    ingredients: ["Thick Rolled Oats", "Pumpkin Seeds", "Sunflower Seeds", "Chia Seeds", "Raw Forest Honey", "Stone-Ground Almond Butter", "Dried Blueberries"],
    allergens: "Contains tree nuts (almonds) and seeds.",
    freshness: "Best enjoyed within 30 days.",
    storage: "Keep in a cool dry place.",
    tags: ["Protein Rich", "High Fibre", "Clean Energy"],
    image: "/images/products/granola-bar.jpg",
    rating: 5.0,
    reviewsCount: 64,
    inStock: true,
    nutritionHighlights: [
      { label: "Plant Protein", value: "6.5g per bar" },
      { label: "Good Fats", value: "Seed & Nut based" },
      { label: "Energy", value: "Sustained slow-burn" }
    ]
  },
  {
    id: "millet-snack-mix",
    name: "Millet Snack Mix",
    category: "Healthy Snacks",
    price: 240,
    weight: "200g Pouch",
    tagline: "Crunchy dry-roasted sorghum & pearl millet with fresh Hyderabad curry leaves.",
    description: "A traditional savory namkeen reinvented with clean ingredients. Dry-roasted jowar and bajra pearls crisped with fresh garden curry leaves, crunchy peanuts, and a dash of Himalayan pink salt.",
    ingredients: ["Roasted Sorghum (Jowar) Puffs", "Roasted Pearl Millet (Bajra)", "Roasted Peanuts", "Fresh Curry Leaves", "Cold-Pressed Peanut Oil", "Himalayan Pink Salt", "Roasted Cumin"],
    allergens: "Contains peanuts.",
    freshness: "Best enjoyed within 45 days.",
    storage: "Keep sealed in its airtight resealable kraft pouch.",
    tags: ["Millet Based", "Zero Maida", "Roasted Not Fried"],
    image: "/images/products/millet-snack.jpg",
    rating: 4.8,
    reviewsCount: 38,
    inStock: true,
    nutritionHighlights: [
      { label: "Oil Content", value: "< 5% cold-pressed" },
      { label: "Fibre", value: "High digestive fibre" },
      { label: "Crunch", value: "100% Roasted" }
    ]
  },
  {
    id: "roasted-seed-mix",
    name: "Roasted Seed Mix",
    category: "Healthy Snacks",
    price: 290,
    weight: "200g Jar",
    tagline: "5 super seeds slow-roasted with rock salt & cold-pressed virgin olive oil.",
    description: "A powerhouse medley of slow-roasted pumpkin seeds, sunflower seeds, watermelon seeds, flax, and sesame seeds with a pinch of rock salt. Great to toss over breakfast bowls or enjoy as an afternoon munch.",
    ingredients: ["Pumpkin Seeds", "Sunflower Seeds", "Watermelon Seeds", "Flax Seeds", "White Sesame Seeds", "Extra Virgin Olive Oil", "Rock Salt", "Black Pepper"],
    allergens: "Contains sesame seeds.",
    freshness: "Best enjoyed within 60 days.",
    storage: "Store in a cool, dark cupboard in an airtight container.",
    tags: ["Protein Rich", "Keto Friendly", "Omega-3"],
    image: "/images/products/roasted-seeds.jpg",
    rating: 4.9,
    reviewsCount: 45,
    inStock: true,
    nutritionHighlights: [
      { label: "Omega-3", value: "Rich in ALA" },
      { label: "Zinc & Magnesium", value: "Daily requirement boost" },
      { label: "Carbs", value: "Very low net carbs" }
    ]
  }
];

export const CATEGORIES = [
  {
    id: "cookies",
    name: "Cookies",
    label: "Wholesome Cookies",
    description: "Crunchy, chewy & naturally sweetened bakes.",
    count: 3,
    image: "/images/categories/cookies.jpg",
    slug: "Cookies"
  },
  {
    id: "cupcakes",
    name: "Cupcakes",
    label: "Cupcakes & Muffins",
    description: "Soft sponges made with whole grains & fruit purees.",
    count: 2,
    image: "/images/categories/cupcakes.jpg",
    slug: "Cupcakes"
  },
  {
    id: "granola",
    name: "Granola & Bars",
    label: "Granola & Energy Bars",
    description: "Loaded with toasted seeds, honey & rolled oats.",
    count: 1,
    image: "/images/categories/granola.jpg",
    slug: "Granola & Bars"
  },
  {
    id: "snacks",
    name: "Healthy Snacks",
    label: "Savory Snacks & Seeds",
    description: "Roasted millets and super-seeds with warm spices.",
    count: 2,
    image: "/images/categories/snacks.jpg",
    slug: "Healthy Snacks"
  }
];

export const HYDERABAD_LOCALITIES = [
  "Jubilee Hills",
  "Banjara Hills",
  "Madhapur / HITEC City",
  "Gachibowli",
  "Kondapur",
  "Financial District",
  "Kukatpally",
  "Begumpet",
  "Somajiguda",
  "Himayatnagar",
  "Secunderabad",
  "Tellapur",
  "Manikonda",
  "Nanakramguda",
  "Other Hyderabad Locality"
];

export const INGREDIENTS_SHOWCASE = [
  {
    name: "Rolled Oats",
    subtitle: "Complex Slow-Burn Carbs",
    description: "Wholesome, slow-digesting oats for sustained morning energy and rich soluble beta-glucan fibre.",
    image: "/images/ingredients/oats.jpg",
    tag: "High Soluble Fibre",
    origin: "Farm-direct Whole Grain"
  },
  {
    name: "Ancient Millets",
    subtitle: "Telangana Heritage Grain",
    description: "Native foxtail and pearl millets, drought-hardy grains naturally rich in iron, zinc, and bioavailable minerals.",
    image: "/images/ingredients/millets.jpg",
    tag: "Low GI & Mineral Rich",
    origin: "Regional Telangana Farms"
  },
  {
    name: "California Almonds",
    subtitle: "Slow Dry-Roasted",
    description: "Hand-sorted whole almonds gently dry-roasted to release their natural aromatic oils and nutty crispness.",
    image: "/images/ingredients/almonds.jpg",
    tag: "Healthy Fats & Protein",
    origin: "Premium Nut Pantry"
  },
  {
    name: "Organic Country Jaggery",
    subtitle: "Unrefined Pure Sweetener",
    description: "Mineral-rich country jaggery extracted from organic sugarcane. Zero bone-char, zero white sugar.",
    image: "/images/ingredients/jaggery.jpg",
    tag: "Unrefined & Natural",
    origin: "Cold-Pressed Cane"
  },
  {
    name: "70% Dark Chocolate",
    subtitle: "Single-Origin Couverture",
    description: "Pure single-origin cocoa with deep chocolate richness, free from palm oil, emulsifiers, or artificial vanilla.",
    image: "/images/ingredients/chocolate.jpg",
    tag: "Flavonoids & Pure Cocoa",
    origin: "Belgian Single-Origin"
  },
  {
    name: "Super 5-Seed Medley",
    subtitle: "Roasted Crunch",
    description: "Golden flax, chia, pumpkin, sunflower and white sesame packed with plant omega-3s and zinc.",
    image: "/images/ingredients/seeds.jpg",
    tag: "Plant Omega-3",
    origin: "Raw Seed Pantry"
  }
];
