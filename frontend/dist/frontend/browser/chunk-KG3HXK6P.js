import {
  TranslationService
} from "./chunk-NEOTYJOM.js";
import {
  HttpClient,
  environment
} from "./chunk-YSEAUUG4.js";
import {
  Injectable,
  __async,
  __spreadProps,
  __spreadValues,
  catchError,
  computed,
  firstValueFrom,
  inject,
  map,
  of,
  setClassMetadata,
  shareReplay,
  signal,
  throwError,
  timeout,
  ɵɵdefineInjectable
} from "./chunk-WLHV2EEC.js";

// src/app/core/models/product.model.ts
function mapProductCategory(raw) {
  return {
    id: raw.id,
    name_hu: raw.category_hu,
    name_en: raw.category_en,
    name_de: raw.category_de,
    icon: raw.emoji,
    color: raw.color,
    count: 0
  };
}
function enrichProduct(product, current_lang = "hu", gallery_images = []) {
  const price_number = parseFloat(product.price_huf?.replace(",", ".")) || 0;
  const stock_number = parseInt(product.stock) || 0;
  const sale_percentage_number = parseFloat(product.sale_percentage?.replace(",", ".")) || 0;
  const rating_number = parseFloat(product.rating?.replace(",", ".")) || 0;
  const in_stock = stock_number > 0;
  const has_discount = sale_percentage_number > 0;
  const requires_prescription = false;
  const is_featured = product.featured === "1";
  const discounted_price = has_discount ? price_number * (1 - sale_percentage_number / 100) : price_number;
  let name = product.name || "";
  let description = "";
  let packaging = "";
  switch (current_lang) {
    case "hu":
      name = product.name_hu || product.name;
      description = product.description_hu || "";
      packaging = product.packaging_hu || "";
      break;
    case "en":
      name = product.name_en || product.name;
      description = product.description_en || "";
      packaging = product.packaging_en || "";
      break;
    case "de":
      name = product.name_de || product.name;
      description = product.description_de || "";
      packaging = product.packaging_de || "";
      break;
  }
  const image_url = product.thumbnail_url || "";
  const images = gallery_images.length > 0 ? gallery_images.sort((a, b) => parseInt(a.sort_id) - parseInt(b.sort_id)).map((img) => img.image_url) : image_url ? [image_url] : [];
  const resolved_category = product.category_id ?? product.category ?? "";
  return __spreadProps(__spreadValues({}, product), {
    name,
    price_number,
    stock_number,
    sale_percentage_number,
    rating_number,
    in_stock,
    has_discount,
    requires_prescription,
    is_featured,
    price: discounted_price,
    discount_percentage: sale_percentage_number,
    stock_quantity: stock_number,
    review_count: 0,
    category: resolved_category,
    description,
    packaging,
    image_url,
    images,
    dosage: void 0
  });
}

// src/app/pages/products/product.mock.ts
var MOCK_MODE = false;
var MOCK_RAW_CATEGORIES = [
  {
    id: "1",
    category_hu: "Gy\xF3gyszerek",
    category_en: "Medicines",
    category_de: "Medikamente",
    emoji: "\u{1F48A}",
    color: "#e74c3c",
    number_of_products: "3"
  },
  {
    id: "2",
    category_hu: "Term\xE9szetes szerek",
    category_en: "Natural Remedies",
    category_de: "Naturheilmittel",
    emoji: "\u{1F33F}",
    color: "#27ae60",
    number_of_products: "2"
  },
  {
    id: "3",
    category_hu: "Baba & Mama",
    category_en: "Baby & Mother",
    category_de: "Baby & Mutter",
    emoji: "\u{1F37C}",
    color: "#3498db",
    number_of_products: "1"
  },
  {
    id: "4",
    category_hu: "Eg\xE9szs\xE9ges \xE9letm\xF3d",
    category_en: "Healthy Lifestyle",
    category_de: "Gesunder Lifestyle",
    emoji: "\u{1F3C3}",
    color: "#f39c12",
    number_of_products: "2"
  },
  {
    id: "5",
    category_hu: "Szezon\xE1lis eg\xE9szs\xE9g",
    category_en: "Seasonal Health",
    category_de: "Saisongesundheit",
    emoji: "\u{1F321}\uFE0F",
    color: "#9b59b6",
    number_of_products: "1"
  }
];
var MOCK_RAW_PRODUCTS = [
  {
    id: "1",
    name: "Algoflex Forte 400mg",
    name_hu: "Algoflex Forte 400mg",
    name_en: "Algoflex Forte 400mg",
    name_de: "Algoflex Forte 400mg",
    description_hu: "F\xE1jdalomcsillap\xEDt\xF3 \xE9s gyullad\xE1scs\xF6kkent\u0151 hat\xE1s\xFA ibuprof\xE9n tartalm\xFA filmtabletta. Fejf\xE1j\xE1s, fogf\xE1j\xE1s, h\xE1tf\xE1j\xE1s, \xEDz\xFCleti f\xE1jdalmak eset\xE9n alkalmazhat\xF3.",
    description_en: "Ibuprofen-based film-coated tablet with analgesic and anti-inflammatory effect. For headache, toothache, back pain and joint pain.",
    description_de: "Ibuprofen-haltige Filmtablette mit schmerzstillender und entz\xFCndungshemmender Wirkung.",
    description_preview_hu: "Hat\xE9kony f\xE1jdalomcsillap\xEDt\xE1s ibuprof\xE9nnel.",
    description_preview_en: "Effective pain relief with ibuprofen.",
    description_preview_de: "Effektive Schmerzlinderung mit Ibuprofen.",
    price_huf: "2490",
    price_usd: "6.99",
    price_eur: "6.49",
    sale_percentage: "0",
    stock: "142",
    times_ordered: "541",
    category_id: "1",
    category: "1",
    manufacturer: "TEVA Gy\xF3gyszergy\xE1r Zrt.",
    brand: "Algoflex",
    rating: "4.6",
    sku: "ALG-400-24",
    active_ingredients: "Ibuprofenum 400mg",
    packaging_hu: "24 filmtabletta",
    packaging_en: "24 film-coated tablets",
    packaging_de: "24 Filmtabletten",
    thumbnail_url: "assets/products/1/1.webp",
    featured: "1",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2025-01-15T10:00:00Z"
  },
  {
    id: "2",
    name: "Nurofen Express 200mg",
    name_hu: "Nurofen Express 200mg",
    name_en: "Nurofen Express 200mg",
    name_de: "Nurofen Express 200mg",
    description_hu: "Gyorsan hat\xF3 ibuprofen kapszula. Szabad szemmel nem l\xE1that\xF3 ibuprofen-n\xE1trium hat\xF3anyag gyorsabb felsz\xEDv\xF3d\xE1st biztos\xEDt.",
    description_en: "Fast-acting ibuprofen capsule. Ibuprofen sodium provides faster absorption.",
    description_de: "Schnell wirkendes Ibuprofen-Kapsel mit Ibuprofen-Natrium f\xFCr schnellere Aufnahme.",
    description_preview_hu: "Gyorsabb hat\xE1s ibuprofen-n\xE1triummal.",
    description_preview_en: "Faster effect with ibuprofen sodium.",
    description_preview_de: "Schnellere Wirkung mit Ibuprofen-Natrium.",
    price_huf: "1890",
    price_usd: "5.29",
    price_eur: "4.89",
    sale_percentage: "15",
    stock: "7",
    times_ordered: "312",
    category_id: "1",
    category: "1",
    manufacturer: "Reckitt Benckiser",
    brand: "Nurofen",
    rating: "4.3",
    sku: "NUR-200-12",
    active_ingredients: "Ibuprofen-natrium 342mg (= Ibuprofen 200mg)",
    packaging_hu: "12 kapszula",
    packaging_en: "12 capsules",
    packaging_de: "12 Kapseln",
    thumbnail_url: "assets/products/2/1.webp",
    featured: "0",
    created_at: "2024-02-01T10:00:00Z",
    updated_at: "2025-02-01T10:00:00Z"
  },
  {
    id: "3",
    name: "B\xE9res C-vitamin 1000mg",
    name_hu: "B\xE9res C-vitamin 1000mg",
    name_en: "B\xE9res Vitamin C 1000mg",
    name_de: "B\xE9res Vitamin C 1000mg",
    description_hu: "Magas d\xF3zis\xFA C-vitamin pezsg\u0151tabletta. Er\u0151s antioxid\xE1ns hat\xE1ssal t\xE1mogatja az immunrendszert \xE9s cs\xF6kkenti a f\xE1radts\xE1g \xE9rzet\xE9t.",
    description_en: "High-dose vitamin C effervescent tablet. Strong antioxidant effect supports the immune system and reduces fatigue.",
    description_de: "Hochdosierte Vitamin C Brausetablette. Starke antioxidative Wirkung unterst\xFCtzt das Immunsystem.",
    description_preview_hu: "Immuner\u0151s\xEDt\u0151, antioxid\xE1ns C-vitamin.",
    description_preview_en: "Immune-boosting, antioxidant vitamin C.",
    description_preview_de: "Immunst\xE4rkendes, antioxidatives Vitamin C.",
    price_huf: "3490",
    price_usd: "9.79",
    price_eur: "9.09",
    sale_percentage: "0",
    stock: "88",
    times_ordered: "267",
    category_id: "2",
    category: "2",
    manufacturer: "B\xE9res Pharmaceuticals",
    brand: "B\xE9res",
    rating: "4.8",
    sku: "BER-CVT-60",
    active_ingredients: "Acidum ascorbicum 1000mg",
    packaging_hu: "20 pezsg\u0151tabletta",
    packaging_en: "20 effervescent tablets",
    packaging_de: "20 Brausetablette",
    thumbnail_url: "assets/products/3/1.webp",
    featured: "1",
    created_at: "2024-03-01T10:00:00Z",
    updated_at: "2025-03-01T10:00:00Z"
  },
  {
    id: "4",
    name: "Pampers Active Baby 3-as",
    name_hu: "Pampers Active Baby 3-as m\xE9ret",
    name_en: "Pampers Active Baby Size 3",
    name_de: "Pampers Active Baby Gr\xF6\xDFe 3",
    description_hu: "Puha, l\xE9g\xE1tereszt\u0151 pelenka 6-10 kg-os bab\xE1knak. Ak\xE1r 12 \xF3r\xE1n \xE1t tart\xF3 sz\xE1razs\xE1got biztos\xEDt.",
    description_en: "Soft, breathable diaper for babies 6-10 kg. Provides dryness for up to 12 hours.",
    description_de: "Weiches, atmungsaktives Windel f\xFCr Babys 6-10 kg. Bietet bis zu 12 Stunden Trockenheit.",
    description_preview_hu: "12 \xF3ra sz\xE1razs\xE1g, 6-10 kg-os bab\xE1knak.",
    description_preview_en: "12 hours dryness, for babies 6-10 kg.",
    description_preview_de: "12 Stunden Trockenheit, f\xFCr Babys 6-10 kg.",
    price_huf: "8990",
    price_usd: "25.29",
    price_eur: "23.49",
    sale_percentage: "0",
    stock: "0",
    times_ordered: "189",
    category_id: "3",
    category: "3",
    manufacturer: "Procter & Gamble",
    brand: "Pampers",
    rating: "4.7",
    sku: "PAM-ACT-3-90",
    active_ingredients: "\u2014",
    packaging_hu: "90 darab",
    packaging_en: "90 pieces",
    packaging_de: "90 St\xFCck",
    thumbnail_url: "assets/products/4/1.webp",
    featured: "0",
    created_at: "2024-04-01T10:00:00Z",
    updated_at: "2025-04-01T10:00:00Z"
  },
  {
    id: "5",
    name: "Voltaren Emulgel 1%",
    name_hu: "Voltaren Emulgel 1%",
    name_en: "Voltaren Emulgel 1%",
    name_de: "Voltaren Emulgel 1%",
    description_hu: "Diklofen\xE1k-dietilamint tartalmaz\xF3 g\xE9l izom- \xE9s \xEDz\xFCleti f\xE1jdalmakra. M\xE9lyen behatol a sz\xF6vetekbe.",
    description_en: "Diclofenac diethylamine gel for muscle and joint pain. Penetrates deeply into tissues.",
    description_de: "Diclofenac-Diethylamin-Gel bei Muskel- und Gelenkschmerzen. Dringt tief ins Gewebe ein.",
    description_preview_hu: "M\xE9lyen hat\xF3 \xEDz\xFCleti \xE9s izomf\xE1jdalom g\xE9l.",
    description_preview_en: "Deep-acting joint and muscle pain gel.",
    description_preview_de: "Tiefwirkendes Gelenk- und Muskelschmerzgel.",
    price_huf: "4290",
    price_usd: "12.09",
    price_eur: "11.19",
    sale_percentage: "20",
    stock: "34",
    times_ordered: "204",
    category_id: "1",
    category: "1",
    manufacturer: "GlaxoSmithKline",
    brand: "Voltaren",
    rating: "4.5",
    sku: "VOL-EMU-100G",
    active_ingredients: "Diclofenacum diethylaminum 11,6mg/g",
    packaging_hu: "100g g\xE9l",
    packaging_en: "100g gel",
    packaging_de: "100g Gel",
    thumbnail_url: "assets/products/5/1.webp",
    featured: "1",
    created_at: "2024-05-01T10:00:00Z",
    updated_at: "2025-05-01T10:00:00Z"
  },
  {
    id: "6",
    name: "Multi-vitamin komplex",
    name_hu: "Multi-vitamin komplex",
    name_en: "Multi-vitamin complex",
    name_de: "Multi-Vitamin-Komplex",
    description_hu: "23 vitamint \xE9s \xE1sv\xE1nyi anyagot tartalmaz\xF3 komplex formula a napi t\xE1panyagbevitel fedez\xE9s\xE9hez.",
    description_en: "Complex formula containing 23 vitamins and minerals to cover daily nutrient intake.",
    description_de: "Komplexformel mit 23 Vitaminen und Mineralstoffen zur Deckung des t\xE4glichen N\xE4hrstoffbedarfs.",
    description_preview_hu: "23 vitamin \xE9s \xE1sv\xE1nyi anyag egyben.",
    description_preview_en: "23 vitamins and minerals in one.",
    description_preview_de: "23 Vitamine und Mineralstoffe in einem.",
    price_huf: "5490",
    price_usd: "15.49",
    price_eur: "14.39",
    sale_percentage: "0",
    stock: "5",
    times_ordered: "143",
    category_id: "4",
    category: "4",
    manufacturer: "B\xE9res Pharmaceuticals",
    brand: "B\xE9res",
    rating: "4.2",
    sku: "MUL-VIT-100",
    active_ingredients: "Vitamin A, B1, B2, B3, B5, B6, B7, B9, B12, C, D3, E, K1, Ca, Mg, Zn, Fe, Cu, Mn, Cr, Mo, Se, I",
    packaging_hu: "100 tabletta",
    packaging_en: "100 tablets",
    packaging_de: "100 Tabletten",
    thumbnail_url: "assets/products/6/1.webp",
    featured: "0",
    created_at: "2024-06-01T10:00:00Z",
    updated_at: "2025-06-01T10:00:00Z"
  },
  {
    id: "7",
    name: "Strepsils Citrom & M\xE9z",
    name_hu: "Strepsils Citrom & M\xE9z szopogat\xF3 tabletta",
    name_en: "Strepsils Lemon & Honey lozenges",
    name_de: "Strepsils Zitrone & Honig Lutschtabletten",
    description_hu: "Antibakteri\xE1lis hat\xE1s\xFA szopogat\xF3 tabletta torokf\xE1j\xE1sra. Citrom \xE9s m\xE9z \xEDz\u0171, kellemes \xEDze van.",
    description_en: "Antibacterial lozenge for sore throat. Pleasant lemon and honey flavour.",
    description_de: "Antibakteriell wirkende Lutschtablette bei Halsschmerzen. Angenehmer Zitronen-Honig-Geschmack.",
    description_preview_hu: "Antibakteri\xE1lis toroker\u0151s\xEDt\u0151 szopogat\xF3.",
    description_preview_en: "Antibacterial throat-soothing lozenge.",
    description_preview_de: "Antibakteriell lindernde Lutschtablette.",
    price_huf: "1290",
    price_usd: "3.59",
    price_eur: "3.29",
    sale_percentage: "0",
    stock: "210",
    times_ordered: "780",
    category_id: "5",
    category: "5",
    manufacturer: "Reckitt Benckiser",
    brand: "Strepsils",
    rating: "4.4",
    sku: "STR-CIT-36",
    active_ingredients: "Amylmetacresol 0.6mg, 2,4-Dichlorobenzyl alcohol 1.2mg",
    packaging_hu: "36 szopogat\xF3 tabletta",
    packaging_en: "36 Sucking Tablet",
    packaging_de: "36 Tabletten zum Aufsaugen",
    thumbnail_url: "assets/products/7/1.webp",
    featured: "1",
    created_at: "2024-07-01T10:00:00Z",
    updated_at: "2025-07-01T10:00:00Z"
  },
  {
    id: "8",
    name: "Omega-3 halolaj 1000mg",
    name_hu: "Omega-3 halolaj 1000mg",
    name_en: "Omega-3 Fish Oil 1000mg",
    name_de: "Omega-3 Fisch\xF6l 1000mg",
    description_hu: "Magas EPA \xE9s DHA tartalm\xFA halolaj kapszula. Sz\xEDv- \xE9s \xE9rrendszeri eg\xE9szs\xE9ghez, agym\u0171k\xF6d\xE9s \xE9s l\xE1t\xE1s t\xE1mogat\xE1s\xE1hoz.",
    description_en: "High EPA and DHA fish oil capsule. For cardiovascular health, brain function and vision support.",
    description_de: "Hochdosierte EPA- und DHA-Fisch\xF6lkapsel f\xFCr Herz-Kreislauf-Gesundheit, Gehirnfunktion und Sehverm\xF6gen.",
    description_preview_hu: "Sz\xEDv, agy \xE9s l\xE1t\xE1s: EPA + DHA komplex.",
    description_preview_en: "Heart, brain and vision: EPA + DHA complex.",
    description_preview_de: "Herz, Gehirn und Sehen: EPA + DHA Komplex.",
    price_huf: "4290",
    price_usd: "12.09",
    price_eur: "11.19",
    sale_percentage: "0",
    stock: "67",
    times_ordered: "298",
    category_id: "4",
    category: "4",
    manufacturer: "Now Foods",
    brand: "Roy's Natural",
    rating: "4.6",
    sku: "OM3-90",
    active_ingredients: "EPA 360mg, DHA 240mg per kapszula",
    packaging_hu: "90 kapszula",
    packaging_en: "90 capsules",
    packaging_de: "90 Kapseln",
    thumbnail_url: "assets/products/8/1.webp",
    featured: "0",
    created_at: "2024-08-01T10:00:00Z",
    updated_at: "2025-08-01T10:00:00Z"
  },
  {
    id: "9",
    name: "Kamilla tea bio",
    name_hu: "Kamilla tea bio",
    name_en: "Organic chamomile tea",
    name_de: "Bio Kamillentee",
    description_hu: "Pr\xE9mium bio kamilla vir\xE1gzat tea. Term\xE9szetes nyugtat\xF3, gyullad\xE1scs\xF6kkent\u0151 \xE9s em\xE9szt\xE9st seg\xEDt\u0151 hat\xE1ssal.",
    description_en: "Premium organic chamomile flower tea. Natural calming, anti-inflammatory and digestive aid.",
    description_de: "Hochwertiger Bio-Kamillenbl\xFCtentee. Nat\xFCrlich beruhigend, entz\xFCndungshemmend und verdauungsf\xF6rdernd.",
    description_preview_hu: "Bio kamilla, term\xE9szetes nyugtat\xF3 \xE9s em\xE9szt\xE9sseg\xEDt\u0151.",
    description_preview_en: "Organic chamomile, natural calming and digestive aid.",
    description_preview_de: "Bio-Kamille, nat\xFCrlich beruhigend und verdauungsf\xF6rdernd.",
    price_huf: "1490",
    price_usd: "4.19",
    price_eur: "3.89",
    sale_percentage: "0",
    stock: "180",
    times_ordered: "156",
    category_id: "2",
    category: "2",
    manufacturer: "HerbalLife Kft.",
    brand: "Roy's Herbs",
    rating: "4.3",
    sku: "TEA-CAM-20",
    active_ingredients: "Matricaria chamomilla flos 100%",
    packaging_hu: "20 filter",
    packaging_en: "20 filter",
    packaging_de: "20 Filter",
    thumbnail_url: "assets/products/9/1.webp",
    featured: "0",
    created_at: "2024-09-01T10:00:00Z",
    updated_at: "2025-09-01T10:00:00Z"
  },
  {
    id: "10",
    name: "D3 + K2 vitamin 2000 IU",
    name_hu: "D3 + K2 vitamin 2000 IU",
    name_en: "Vitamin D3 + K2 2000 IU",
    name_de: "Vitamin D3 + K2 2000 IE",
    description_hu: "D3 \xE9s K2 vitamin kombin\xE1ci\xF3ja. A D3 kalcium felsz\xEDv\xF3d\xE1st seg\xEDt, a K2 gondoskodik a helyes elhelyezked\xE9s\xE9r\u0151l a csontokban.",
    description_en: "Combination of D3 and K2 vitamins. D3 supports calcium absorption, K2 ensures it goes to the bones.",
    description_de: "Kombination aus D3- und K2-Vitamin. D3 unterst\xFCtzt die Kalziumaufnahme, K2 sorgt f\xFCr die richtige Einlagerung in den Knochen.",
    description_preview_hu: "D3 + K2: kalcium a csontoknak, immuner\u0151.",
    description_preview_en: "D3 + K2: calcium for bones, immune strength.",
    description_preview_de: "D3 + K2: Kalzium f\xFCr Knochen, Immunst\xE4rke.",
    price_huf: "3990",
    price_usd: "11.19",
    price_eur: "10.39",
    sale_percentage: "10",
    stock: "52",
    times_ordered: "211",
    category_id: "2",
    category: "2",
    manufacturer: "Vitabalans Oy",
    brand: "Roy's Premium",
    rating: "4.7",
    sku: "D3K2-60",
    active_ingredients: "Kolekalciferol 50mcg (2000IU), Menachinon-7 75mcg",
    packaging_hu: "60 kapszula",
    packaging_en: "60 capsules",
    packaging_de: "60 Kapseln",
    thumbnail_url: "assets/products/10/1.webp",
    featured: "1",
    created_at: "2024-10-01T10:00:00Z",
    updated_at: "2025-10-01T10:00:00Z"
  }
];

// src/app/core/services/product.service.ts
var ProductService = class _ProductService {
  API_URL = environment.baseURL;
  http = inject(HttpClient);
  translationService = inject(TranslationService);
  allProductsSignal = signal([], ...ngDevMode ? [{ debugName: "allProductsSignal" }] : []);
  rawProducts = signal([], ...ngDevMode ? [{ debugName: "rawProducts" }] : []);
  featuredSignal = signal([], ...ngDevMode ? [{ debugName: "featuredSignal" }] : []);
  categoriesSignal = signal([], ...ngDevMode ? [{ debugName: "categoriesSignal" }] : []);
  loadingSignal = signal(false, ...ngDevMode ? [{ debugName: "loadingSignal" }] : []);
  errorSignal = signal(null, ...ngDevMode ? [{ debugName: "errorSignal" }] : []);
  filtersSignal = signal({
    categories: [],
    price_range: null,
    in_stock_only: false,
    sort_by: "popularity"
  }, ...ngDevMode ? [{ debugName: "filtersSignal" }] : []);
  current_pageSignal = signal(1, ...ngDevMode ? [{ debugName: "current_pageSignal" }] : []);
  items_per_pageSignal = signal(30, ...ngDevMode ? [{ debugName: "items_per_pageSignal" }] : []);
  allProductImagesCache$ = null;
  // --- Public readonly signals ---
  products = computed(() => this.allProductsSignal(), ...ngDevMode ? [{ debugName: "products" }] : []);
  featuredProducts = computed(() => this.featuredSignal(), ...ngDevMode ? [{ debugName: "featuredProducts" }] : []);
  categories = computed(() => this.categoriesSignal(), ...ngDevMode ? [{ debugName: "categories" }] : []);
  currentFilters = computed(() => this.filtersSignal(), ...ngDevMode ? [{ debugName: "currentFilters" }] : []);
  isLoading = computed(() => this.loadingSignal(), ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  error = computed(() => this.errorSignal(), ...ngDevMode ? [{ debugName: "error" }] : []);
  filteredProducts = computed(() => {
    let products = this.allProductsSignal();
    const filters = this.filtersSignal();
    if (filters.categories && filters.categories.length > 0) {
      products = products.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.price_range) {
      const { min, max } = filters.price_range;
      products = products.filter((p) => p.price >= min && p.price <= max);
    }
    if (filters.in_stock_only) {
      products = products.filter((p) => p.in_stock);
    }
    if (filters.sort_by) {
      products = this.sortProducts(products, filters.sort_by);
    }
    if (filters.search_query?.trim()) {
      const term = filters.search_query.toLowerCase();
      products = products.filter((p) => p.name.toLowerCase().includes(term) || p.manufacturer?.toLowerCase().includes(term) || p.description?.toLowerCase().includes(term));
    }
    return products;
  }, ...ngDevMode ? [{ debugName: "filteredProducts" }] : []);
  paginationState = computed(() => {
    const total_items = this.filteredProducts().length;
    const items_per_page = this.items_per_pageSignal();
    const current_page = this.current_pageSignal();
    const total_pages = Math.ceil(total_items / items_per_page);
    return { current_page, items_per_page, total_items, total_pages };
  }, ...ngDevMode ? [{ debugName: "paginationState" }] : []);
  paginatedProducts = computed(() => {
    const filtered = this.filteredProducts();
    const page = this.current_pageSignal();
    const perPage = this.items_per_pageSignal();
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, ...ngDevMode ? [{ debugName: "paginatedProducts" }] : []);
  // --- Load methods ---
  loadProducts() {
    return __async(this, null, function* () {
      if (MOCK_MODE) {
        const currentLang = this.translationService.getCurrentLanguage();
        const enriched = MOCK_RAW_PRODUCTS.map((p) => enrichProduct(p, currentLang));
        this.rawProducts.set(MOCK_RAW_PRODUCTS);
        this.allProductsSignal.set(enriched);
        this.updateCategoryCounts();
        return;
      }
      this.loadingSignal.set(true);
      this.errorSignal.set(null);
      try {
        const products = yield firstValueFrom(this.getAllProducts());
        const currentLang = this.translationService.getCurrentLanguage();
        const categoryIdMap = this.buildCategoryIdMap();
        const normalized = products.map((p) => this.normalizeCategoryId(p, categoryIdMap));
        const enriched = normalized.map((p) => enrichProduct(p, currentLang));
        this.rawProducts.set(normalized);
        this.allProductsSignal.set(enriched);
        this.updateCategoryCounts();
      } catch (err) {
        console.error("Failed to load products from backend:", err);
        this.errorSignal.set("products.error.load_failed");
        this.allProductsSignal.set([]);
        this.rawProducts.set([]);
      } finally {
        this.loadingSignal.set(false);
      }
    });
  }
  loadFeaturedProducts() {
    return __async(this, null, function* () {
      if (MOCK_MODE) {
        const currentLang = this.translationService.getCurrentLanguage();
        const enriched = MOCK_RAW_PRODUCTS.filter((p) => p.featured === "1").map((p) => enrichProduct(p, currentLang));
        this.featuredSignal.set(enriched);
        return;
      }
      try {
        const products = yield firstValueFrom(this.getFeaturedFromApi());
        const currentLang = this.translationService.getCurrentLanguage();
        const categoryIdMap = this.buildCategoryIdMap();
        const normalized = products.map((p) => this.normalizeCategoryId(p, categoryIdMap));
        const enriched = normalized.map((p) => enrichProduct(p, currentLang));
        this.featuredSignal.set(enriched);
      } catch (err) {
        const fallback = this.allProductsSignal().filter((p) => p.is_featured);
        this.featuredSignal.set(fallback);
        console.warn("Featured products endpoint unavailable, using loaded products as fallback:", err);
      }
    });
  }
  loadCategories() {
    return __async(this, null, function* () {
      if (MOCK_MODE) {
        const mapped = MOCK_RAW_CATEGORIES.map(mapProductCategory);
        this.categoriesSignal.set(mapped);
        this.updateCategoryCounts();
        return;
      }
      try {
        const raw = yield firstValueFrom(this.getAllCategories());
        const mapped = raw.map(mapProductCategory);
        this.categoriesSignal.set(mapped);
        this.updateCategoryCounts();
      } catch (err) {
        console.error("Failed to load categories from backend:", err);
        this.categoriesSignal.set([]);
      }
    });
  }
  // --- Filter / Pagination controls ---
  setFilters(filters) {
    this.filtersSignal.update((current) => __spreadValues(__spreadValues({}, current), filters));
    this.current_pageSignal.set(1);
  }
  clearFilters() {
    this.filtersSignal.set({
      categories: [],
      price_range: null,
      in_stock_only: false,
      sort_by: "popularity",
      search_query: ""
    });
    this.current_pageSignal.set(1);
  }
  setPage(page) {
    const total_pages = this.paginationState().total_pages;
    if (page >= 1 && page <= total_pages)
      this.current_pageSignal.set(page);
  }
  setItemsPerPage(count) {
    this.items_per_pageSignal.set(count);
    this.current_pageSignal.set(1);
  }
  // --- API calls ---
  getAllProducts() {
    return this.http.get(`${this.API_URL}/api/get_all_products`).pipe(timeout(5e3), map((r) => {
      if (r.statuscode !== "200")
        throw new Error(`API Error: ${r.status}`);
      if (!Array.isArray(r.products))
        throw new Error("Invalid products response");
      return r.products;
    }), catchError(this.handleError));
  }
  getAllCategories() {
    return this.http.get(`${this.API_URL}/api/get_all_product_categories`).pipe(timeout(5e3), map((r) => {
      if (r.statuscode !== "200")
        throw new Error(`API Error: ${r.status}`);
      if (!Array.isArray(r.product_categories))
        throw new Error("Invalid categories response");
      return r.product_categories;
    }), catchError(this.handleError));
  }
  getFeaturedFromApi() {
    return this.http.get(`${this.API_URL}/api/get_all_featured_products`).pipe(timeout(5e3), map((r) => {
      if (r.statuscode !== "200")
        throw new Error(`API Error: ${r.status}`);
      if (!Array.isArray(r.products))
        throw new Error("Invalid featured response");
      return r.products;
    }), catchError(this.handleError));
  }
  getAllProductImages() {
    if (!this.allProductImagesCache$) {
      this.allProductImagesCache$ = this.http.get(`${this.API_URL}/api/get_all_product_image`).pipe(timeout(5e3), map((r) => {
        if (String(r.statuscode) !== "200")
          throw new Error(`API Error: ${r.status}`);
        if (!Array.isArray(r.images))
          return [];
        return r.images;
      }), catchError((err) => {
        console.warn("ProductService: Failed to load all product images", err);
        this.allProductImagesCache$ = null;
        return of([]);
      }), shareReplay({ bufferSize: 1, refCount: false, windowTime: 6e4 }));
    }
    return this.allProductImagesCache$;
  }
  getProductImages(productId) {
    return this.getAllProductImages().pipe(map((groups) => {
      const group = groups.find((g) => g.name === productId);
      if (!group)
        return [];
      return group.files.map((url, i) => ({
        id: `${productId}-${i + 1}`,
        product_id: productId,
        image_url: url,
        alt_text_hu: "",
        alt_text_en: "",
        alt_text_de: "",
        sort_id: `${i + 1}`
      }));
    }), catchError((err) => {
      console.warn("ProductService: Failed to load product images, falling back to thumbnail", err);
      return of([]);
    }));
  }
  invalidateImageCache() {
    this.allProductImagesCache$ = null;
  }
  uploadProductImageAdmin(auth, productId, fileName, isTransparent) {
    const body = __spreadProps(__spreadValues({}, auth), {
      product_id: btoa(productId),
      image: btoa(fileName),
      is_transparent: isTransparent ? 1 : 0
    });
    return this.http.post(`${this.API_URL}/api/upload_product_image_admin`, body).pipe(catchError(this.handleError));
  }
  getProductById(id) {
    return this.getAllProducts().pipe(map((products) => products.find((p) => p.id === id)), catchError(() => of(void 0)));
  }
  getProductsByCategory(categoryId) {
    return this.getAllProducts().pipe(map((products) => products.filter((p) => (p.category ?? p.category_id) === categoryId)), catchError(() => of([])));
  }
  getInStockProducts() {
    return this.getAllProducts().pipe(map((products) => products.filter((p) => parseInt(p.stock) > 0)), catchError(() => of([])));
  }
  searchProducts(query) {
    const q = query.toLowerCase();
    return this.getAllProducts().pipe(map((products) => products.filter((p) => p.name_en.toLowerCase().includes(q) || p.name_hu.toLowerCase().includes(q) || p.name_de.toLowerCase().includes(q))), catchError(() => of([])));
  }
  getSaleProducts() {
    return this.getAllProducts().pipe(map((p) => p.filter((x) => parseFloat(x.sale_percentage) > 0)), catchError(() => of([])));
  }
  deleteProductAdmin(auth, productId) {
    const body = __spreadProps(__spreadValues({}, auth), { product_id: btoa(productId) });
    return this.http.post(`${this.API_URL}/api/delete_product_admin`, body);
  }
  saveProductAdmin(body, isEdit) {
    const endpoint = isEdit ? `${this.API_URL}/api/update_product_admin` : `${this.API_URL}/api/create_product_admin`;
    return this.http.post(endpoint, body);
  }
  // --- Private helpers ---
  buildCategoryIdMap() {
    const map2 = /* @__PURE__ */ new Map();
    this.categoriesSignal().forEach((cat) => {
      map2.set(cat.id, cat.id);
    });
    return map2;
  }
  updateCategoryCounts() {
    const products = this.allProductsSignal();
    const categories = this.categoriesSignal();
    if (categories.length === 0)
      return;
    const countMap = /* @__PURE__ */ new Map();
    products.forEach((p) => {
      const catId = p.category_id ?? p.category ?? "";
      if (catId) {
        countMap.set(catId, (countMap.get(catId) ?? 0) + 1);
      }
    });
    const updated = categories.map((cat) => __spreadProps(__spreadValues({}, cat), {
      count: countMap.get(cat.id) ?? 0
    }));
    this.categoriesSignal.set(updated);
  }
  getCategoryById(id) {
    return this.categoriesSignal().find((cat) => cat.id === id);
  }
  normalizeCategoryId(product, _idMap) {
    const resolved = product.category ?? product.category_id ?? "";
    return __spreadProps(__spreadValues({}, product), { category: resolved });
  }
  sortProducts(products, sort_by) {
    const sorted = [...products];
    switch (sort_by) {
      case "popularity":
        return sorted.sort((a, b) => parseFloat(b.times_ordered) - parseFloat(a.times_ordered));
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "rating":
      case "rating-desc":
        return sorted.sort((a, b) => b.rating_number - a.rating_number);
      case "newest":
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      default:
        return sorted;
    }
  }
  handleError(error) {
    let msg = "An unknown error occurred";
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      const codes = {
        400: "Bad request",
        404: "Not found",
        500: "Server error"
      };
      msg = codes[error.status] ?? `Error ${error.status}: ${error.message}`;
    }
    console.error("ProductService Error:", msg);
    return throwError(() => new Error(msg));
  }
  static \u0275fac = function ProductService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProductService, factory: _ProductService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  enrichProduct,
  ProductService
};
//# sourceMappingURL=chunk-KG3HXK6P.js.map
