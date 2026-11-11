export const WHATSAPP_NUMBER = "+91 8590780520";
export const WHATSAPP_URL = "https://wa.me/918590780520";

export function whatsappInquiry(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export type Category = "watches" | "shoes" | "dresses" | "beauty" | "mobiles";

export type MetalId =
  | "yellow-gold"
  | "rose-gold"
  | "platinum"
  | "titanium"
  | "obsidian-ceramic";

export interface Product {
  id: string;
  name: string;
  dept: string;
  badge: string;
  status: "vault" | "bespoke";
  price: number;
  description: string;
  category: Category;
  metals?: MetalId[];
  movement?: "automatic" | "tourbillon" | "quartz";
  caseMm?: number;
  image: string;
  alt: string;
  dots: { bg: string; title: string }[];
  href?: string;
}

const SHOE_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAjZkPfZ98hj3OwQ315Jvgu7gZIE08kcY-n-392BPxhCQBzTojTtuQBUPg2H4bCfNBQ1D1DjTChj9nFH36rP1xmeqFSwc41nuO792JcrArPCOCeyE8hxD2rEsiOAye6h8iQm0h2wlvQ2jZDj2WFTm_GWBb03C5MKPJeqqMcINywFWfY6riMP_JefV5fxnzC-hZdHu5rHegxk1o22TKKYyXU_YQDPbvdcRjB7aluSWI";
const DRESS_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAK_mpJQX_kRiclwNTR1UrOnEyOpeuHHkjbQ8ONje0lZh8jI9OAxrf0EQlJc5MI1KnzpmN9Dk7y_JolgzClUdy8zmlgzt9Tqwe858ePWyNum8Xu5mr0S3gp4C3zJ5iRvjOKRmeDh3EUZDaZ8VlMBvglA4zVpiutKrgdTA7QVZn1SfJihoOjNm3mOVFVxBl_SgQ_yYGpPd5KhMcDNsZvEjj833hTopOIZQB8xPZqa_o";
const BEAUTY_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCATqPnZdxScZ3lVKqNBsaF-Eu8-THgjewiNtmvLLptKDsTmWlMj92yVOGXFd29GGbnCtaYgbZ0-c7HI6IRMsMyrTVdc0JkHkWv2QRijgPWeSRpI6akc6Zp_XVX_eAg9zFGYNUbdWaSJhDzLxkJfeCd3Pthjawx-xfcDSQFIAZcoKon42ioZ3HpowOOKe4kXl1bRlqmvUcUhjtcO2qQfb3uKZkHp26Qp5xClEgihHE";

const USD_RATES: Record<"USD" | "EUR" | "INR", number> = {
  USD: 1,
  EUR: 0.89407,
  INR: 93.93,
};

export const formatPrice = (
  value: number,
  currency: "USD" | "EUR" | "INR" = "USD"
) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value * USD_RATES[currency]);

export const catalogProducts: Product[] = [
  {
    id: "sovereign-royal-oak",
    name: "Sovereign Royal Oak Gold Watch",
    dept: "Watches",
    badge: "Limited edition",
    status: "vault",
    price: 18500,
    metals: ["yellow-gold"],
    movement: "automatic",
    caseMm: 40,
    description:
      "18K yellow gold case, black dial, and sapphire exhibition back.",
    category: "watches",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMq7KfxIKj3q3VLq224cVw3E-kaGxgUy_4PKN2v0VfG0eLU3Oqw6hRsPuyn9Ch_tglayot-l11NKHhPGq425_eB_e2-344e14laJaA_SNqgNXLo3xMqTXR48kfOksrAMH1XUK0N-xzd5did5_8PbH40VcVwlXeFEH0RSLDjJD6SD-KowdCnQiRj84_GaVm7XGaCrTSHUQ2j33pOiiJcrc67e6aP_Ic4RNjUJGjJc8",
    alt: "Sovereign Royal Oak Imperial Gold luxury watch in 18K solid yellow gold",
    dots: [
      { bg: "#f2ca50", title: "18K Yellow Gold" },
      { bg: "#c6c6c6", title: "Platinum" },
      { bg: "#1c1b1b", title: "Obsidian Dial" },
    ],
    href: "/product/sovereign-skeleton-tourbillon",
  },
  {
    id: "aurelia-pave-stilettos",
    name: "Aurélia Gold Stilettos",
    dept: "Shoes",
    badge: "Limited edition",
    status: "vault",
    price: 4250,
    metals: ["yellow-gold"],
    description:
      "Gold heels with satin and crystal detailing.",
    category: "shoes",
    image: SHOE_IMG,
    alt: "Aurélia Pavé 18K Gold Stilettos with sculpted gold heels and diamond pavé",
    dots: [
      { bg: "#1c1b1b", title: "Obsidian Satin" },
      { bg: "#f2ca50", title: "18K Gold Heel" },
      { bg: "#e2e2e2", title: "Diamond Pavé" },
    ],
    href: "/product/aurelia-pave-stilettos",
  },
  {
    id: "nocturne-gilded-brocade-gown",
    name: "Nocturne Brocade Gown",
    dept: "Dresses",
    badge: "Made to order",
    status: "bespoke",
    price: 12800,
    metals: ["yellow-gold"],
    description:
      "Black silk gown with gold embroidery and a fitted bodice.",
    category: "dresses",
    image: DRESS_IMG,
    alt: "Haute couture black and gold embroidered silk evening gown",
    dots: [
      { bg: "#1c1b1b", title: "Noir Silk" },
      { bg: "#f2ca50", title: "Gilded Bullion" },
      { bg: "#454747", title: "Charcoal Velvet" },
    ],
  },
  {
    id: "aurelia-nocturne-parfum",
    name: "Aurélia Nocturne Perfume",
    dept: "Beauty",
    badge: "50 ml",
    status: "vault",
    price: 1450,
    metals: ["yellow-gold"],
    description:
      "Pure parfum in a faceted glass bottle with a gold-tone cap.",
    category: "beauty",
    image: BEAUTY_IMG,
    alt: "Prestige luxury crystal perfume bottle with solid gold cap",
    dots: [
      { bg: "#f2ca50", title: "Amber Nectar" },
      { bg: "#e9c349", title: "Gold Monogram" },
      { bg: "#1c1b1b", title: "Smoked Flacon" },
    ],
  },
  {
    id: "chronos-titan-moonphase",
    name: "Chronos Titan Moonphase Watch",
    dept: "Watches",
    badge: "Limited edition",
    status: "vault",
    price: 9800,
    metals: ["titanium"],
    movement: "automatic",
    caseMm: 42,
    description:
      "Titanium automatic watch with a moonphase display.",
    category: "watches",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4MYJXfmgd2Co1rJvY1OyAAwjJukA_GsaKgs9EalaPWB_PXz18C3F81wHnetOX2ugWxpn5ipJsQaokoNnOn7CuRcGm17MSlzmO-I4kPqefesbfAIflodeOyQY7VIPWn0MllqGL6l9rrqresltq4d9SNWRMbQBVkyvyEX9zh8YkNiC3pEZdZwurGOHhTCW6NQBdMNh-LZK7aQpV8zSVB3x8r95t57mI5UrX6WEBNoo",
    alt: "Chronos Titan Silver Moonphase luxury timepiece",
    dots: [
      { bg: "#c6c6c6", title: "Brushed Titanium" },
      { bg: "#1c1b1b", title: "Obsidian Strap" },
      { bg: "#f2ca50", title: "Champagne Hands" },
    ],
  },
  {
    id: "obsidian-royale-loafers",
    name: "Obsidian Leather Loafers",
    dept: "Shoes",
    badge: "Limited edition",
    status: "vault",
    price: 3200,
    metals: ["obsidian-ceramic"],
    description:
      "Calfskin loafers with a brass-tone bit and dark sole.",
    category: "shoes",
    image: SHOE_IMG,
    alt: "Obsidian Royale Hand-Cut Evening Loafers in polished Italian calfskin",
    dots: [
      { bg: "#0e0e0e", title: "Midnight Obsidian" },
      { bg: "#f2ca50", title: "Brass Bit" },
      { bg: "#454747", title: "Matte Sole" },
    ],
  },
  {
    id: "elysian-gilded-gown",
    name: "Elysian Chiffon Gown",
    dept: "Dresses",
    badge: "Made to order",
    status: "bespoke",
    price: 9600,
    metals: ["rose-gold"],
    description:
      "Pleated chiffon gown with a sweetheart neckline.",
    category: "dresses",
    image: DRESS_IMG,
    alt: "Elysian Gilded Chiffon Gala Gown",
    dots: [
      { bg: "#f2ca50", title: "Gilded Gold" },
      { bg: "#1c1b1b", title: "Obsidian Silk" },
      { bg: "#c6c6c6", title: "Champagne Frost" },
    ],
  },
  {
    id: "lor-24k-elixir",
    name: "L'Or 24K Face Serum",
    dept: "Beauty",
    badge: "30 ml",
    status: "vault",
    price: 890,
    metals: ["yellow-gold"],
    description:
      "Face serum with 24K gold flakes in a glass bottle.",
    category: "beauty",
    image: BEAUTY_IMG,
    alt: "L'Or 24K Radiant Youth Elixir in faceted crystal flacon",
    dots: [
      { bg: "#f2ca50", title: "24K Gold" },
      { bg: "#e2e2e2", title: "Crystal Pipette" },
      { bg: "#1c1b1b", title: "Dark Amber Oil" },
    ],
  },
  {
    id: "verona-gilded-oxfords",
    name: "Verona Oxford Shoes",
    dept: "Shoes",
    badge: "Limited edition",
    status: "vault",
    price: 5400,
    metals: ["yellow-gold"],
    description:
      "Calfskin Oxford shoes with brogue detailing and gold pinstripes.",
    category: "shoes",
    image: SHOE_IMG,
    alt: "Verona Gilded Oxford Brogues in polished French calfskin with gold pinstriping",
    dots: [
      { bg: "#452d16", title: "Cognac Calf" },
      { bg: "#f2ca50", title: "18K Pinstripe" },
      { bg: "#0e0e0e", title: "Obsidian Sole" },
    ],
  },
  {
    id: "serpentine-gold-mules",
    name: "Serpentine Chain Mules",
    dept: "Shoes",
    badge: "Made to order",
    status: "bespoke",
    price: 3800,
    metals: ["rose-gold"],
    description:
      "Blush leather mules with a rose-gold chain detail.",
    category: "shoes",
    image: SHOE_IMG,
    alt: "Serpentine rose-gold chain evening mules in blush cordovan leather",
    dots: [
      { bg: "#B76E79", title: "Rose Gold Chain" },
      { bg: "#e8cfc4", title: "Blush Cordovan" },
      { bg: "#f2ca50", title: "Gold Buckle" },
    ],
  },
  {
    id: "apple-iphone-13-pro-silver",
    name: "Apple iPhone 13 Pro — Silver",
    dept: "Apple • iPhone 13 Pro",
    badge: "Refurbished • 128 GB",
    status: "vault",
    price: 465.23,
    metals: ["titanium"],
    description: "Silver iPhone 13 Pro. Refurbished 128 GB market estimate; value varies by condition.",
    category: "mobiles",
    image: "/products/pexels-amar-19482384.jpg",
    alt: "Silver Apple iPhone 13 Pro with triple rear cameras",
    dots: [
      { bg: "#c6c6c6", title: "Silver" },
      { bg: "#1c1b1b", title: "Triple-camera system" },
      { bg: "#f2ca50", title: "Apple" },
    ],
  },
  {
    id: "apple-iphone-13-blue",
    name: "Apple iPhone 13 — Blue",
    dept: "Apple • iPhone 13",
    badge: "Refurbished • 128 GB",
    status: "vault",
    price: 311.92,
    metals: ["yellow-gold"],
    description: "Blue iPhone 13. Refurbished 128 GB market estimate; value varies by condition.",
    category: "mobiles",
    image: "/products/pexels-jamie-saw-4619044-12903952.jpg",
    alt: "Blue Apple iPhone with diagonal dual rear cameras",
    dots: [
      { bg: "#1b5da8", title: "Blue" },
      { bg: "#0e0e0e", title: "Dual-camera system" },
      { bg: "#c6c6c6", title: "Apple" },
    ],
  },
  {
    id: "apple-iphone-12-pro-pacific-blue",
    name: "Apple iPhone 12 Pro — Pacific Blue",
    dept: "Apple • iPhone 12 Pro",
    badge: "Refurbished • 128 GB",
    status: "bespoke",
    price: 374.74,
    metals: ["platinum"],
    description: "Pacific Blue iPhone 12 Pro. Refurbished 128 GB market estimate; value varies by condition.",
    category: "mobiles",
    image: "/products/pexels-soulful-pizza-2080276-6753222.jpg",
    alt: "Pacific Blue Apple iPhone with triple rear cameras",
    dots: [
      { bg: "#174a65", title: "Pacific Blue" },
      { bg: "#1c1b1b", title: "Triple-camera system" },
      { bg: "#c6c6c6", title: "Apple" },
    ],
  },
  {
    id: "apple-iphone-11-product-red",
    name: "Apple iPhone 11 — (PRODUCT)RED",
    dept: "Apple • iPhone 11",
    badge: "Refurbished • 128 GB",
    status: "vault",
    price: 193.75,
    description: "Red iPhone 11. Refurbished 128 GB market estimate; value varies by condition.",
    category: "mobiles",
    image: "/products/pexels-votso-sothu-53802751-37467614.jpg",
    alt: "Red Apple iPhone with vertical dual rear cameras",
    dots: [{ bg: "#c92732", title: "(PRODUCT)RED" }, { bg: "#1c1b1b", title: "Dual-camera system" }],
  },
  {
    id: "apple-iphone-13-blue-2",
    name: "Apple iPhone 13 — Blue",
    dept: "Apple • iPhone 13",
    badge: "Refurbished • 128 GB",
    status: "vault",
    price: 311.92,
    description: "Blue iPhone 13. Refurbished 128 GB market estimate; value varies by condition.",
    category: "mobiles",
    image: "/products/pexels-91taf-12741170.jpg",
    alt: "Blue Apple iPhone with diagonal dual rear cameras",
    dots: [{ bg: "#174a65", title: "Blue" }, { bg: "#1c1b1b", title: "Dual-camera system" }],
  },
  {
    id: "apple-iphone-13-pro-silver-2",
    name: "Apple iPhone 13 Pro — Silver",
    dept: "Apple • iPhone 13 Pro",
    badge: "Refurbished • 128 GB",
    status: "vault",
    price: 465.23,
    description: "Silver iPhone 13 Pro. Refurbished 128 GB market estimate; value varies by condition.",
    category: "mobiles",
    image: "/products/pexels-c-iso-329101566-14714826.jpg",
    alt: "Silver Apple iPhone with triple rear cameras",
    dots: [{ bg: "#c6c6c6", title: "Silver" }, { bg: "#1c1b1b", title: "Triple-camera system" }],
  },
  {
    id: "apple-iphone-13-pro-graphite",
    name: "Apple iPhone 13 Pro — Graphite",
    dept: "Apple • iPhone 13 Pro",
    badge: "Refurbished • 128 GB",
    status: "vault",
    price: 465.23,
    description: "Graphite iPhone 13 Pro. Refurbished 128 GB market estimate; value varies by condition.",
    category: "mobiles",
    image: "/products/pexels-bekirdonmeez-9995704.jpg",
    alt: "Graphite Apple iPhone with triple rear cameras",
    dots: [{ bg: "#42484a", title: "Graphite" }, { bg: "#1c1b1b", title: "Triple-camera system" }],
  },
  {
    id: "apple-iphone-13-starlight",
    name: "Apple iPhone 13 — Starlight",
    dept: "Apple • iPhone 13",
    badge: "Refurbished • 128 GB",
    status: "vault",
    price: 311.92,
    description: "Starlight iPhone 13. Refurbished 128 GB market estimate; value varies by condition.",
    category: "mobiles",
    image: "/products/pexels-kaeciine-36329653.jpg",
    alt: "Starlight Apple iPhone with diagonal dual rear cameras",
    dots: [{ bg: "#e9e8e4", title: "Starlight" }, { bg: "#1c1b1b", title: "Dual-camera system" }],
  },
];

export const categoryLabels: Record<Category | "all", string> = {
  all: "All Treasures",
  watches: "Watches",
  shoes: "Designer Shoes",
  dresses: "Couture Dresses",
  beauty: "Prestige Beauty",
  mobiles: "Mobile Phones",
};
