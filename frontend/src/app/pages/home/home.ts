import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { Slide } from '../../shared/components/slide/slide';
import { Featured } from '../../shared/components/featured/featured';
import { FeaturedProductCard } from '../../shared/components/featured-product-card/featured-product-card';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ICONS, IMAGES } from '../../core/constants/visuals';
import { ProductWithHelpers, enrichProduct, Product } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    Slide,
    Featured,
    FeaturedProductCard,
    ScrollRevealDirective,
    TranslateModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private router = inject(Router);
  private translateService = inject(TranslateService);

  IMAGES = IMAGES;
  ICONS = ICONS;

  private mockProducts: Product[] = [
    {
      id: '1',
      name_de: 'Algopyrin 500mg Tabletten',
      name_hu: 'Algopyrin 500mg Tabletta',
      name_en: 'Algopyrin 500mg Tablets',
      description_de:
        'Schmerzlinderung und Fiebersenkung für Kopfschmerzen, Muskelschmerzen und Fieber.',
      description_hu:
        'Fájdalomcsillapító és lázcsillapító tabletta fejfájás, izomfájdalom és láz esetén.',
      description_en: 'Pain relief and fever reducing tablets for headache, muscle pain and fever.',
      description_preview_de: 'Schmerzlinderung und Fiebersenkung',
      description_preview_hu: 'Fájdalomcsillapító és lázcsillapító',
      description_preview_en: 'Pain relief and fever reducing',
      price_huf: '2490',
      price_usd: '7',
      price_eur: '6',
      times_ordered: '0',
      stock: '45',
      sale_percentage: '15',
      category: 'pain-relief',
      manufacturer: 'Bayer',
      brand: 'Algopyrin',
      rating: '4.5',
      sku: 'ALG-500-20',
      active_ingredients: 'Acetylsalicylic acid',
      packaging: '20 tabletta',
      created_at: '2024-01-15',
      updated_at: '2024-02-10',
      name: 'Algopyrin 500mg',
    },
    {
      id: '2',
      name_de: 'Aspirin Plus C Brausetabletten',
      name_hu: 'Aspirin Plus C Pezsgőtabletta',
      name_en: 'Aspirin Plus C Effervescent',
      description_de: 'Schnelle Linderung bei Erkältung und Grippe mit Vitamin C.',
      description_hu: 'Gyors megkönnyebbülés megfázás és influenza esetén C-vitaminnal.',
      description_en: 'Fast relief for cold and flu with Vitamin C.',
      description_preview_de: 'Erkältungs- und Grippemittel',
      description_preview_hu: 'Megfázás és influenza elleni szer',
      description_preview_en: 'Cold and flu relief',
      price_huf: '3490',
      price_usd: '10',
      price_eur: '9',
      times_ordered: '0',
      stock: '30',
      sale_percentage: '10',
      category: 'cold-flu',
      manufacturer: 'Bayer',
      brand: 'Aspirin',
      rating: '4.7',
      sku: 'ASP-C-10',
      active_ingredients: 'Acetylsalicylic acid, Ascorbic acid',
      packaging: '10 pezsgőtabletta',
      created_at: '2024-01-20',
      updated_at: '2024-02-15',
      name: 'Aspirin Plus C',
    },
    {
      id: '3',
      name_de: 'Bepanthen Wund- und Heilsalbe',
      name_hu: 'Bepanthen Sebgyógyító Krém',
      name_en: 'Bepanthen Wound Healing Ointment',
      description_de: 'Unterstützt die Wundheilung und Regeneration der Haut.',
      description_hu: 'Támogatja a sebgyógyulást és a bőr regenerálódását.',
      description_en: 'Supports wound healing and skin regeneration.',
      description_preview_de: 'Wundheilung und Hautregeneration',
      description_preview_hu: 'Sebgyógyulás és bőr regeneráció',
      description_preview_en: 'Wound healing and skin regeneration',
      price_huf: '2890',
      price_usd: '8',
      price_eur: '7',
      times_ordered: '0',
      stock: '50',
      sale_percentage: '0',
      category: 'skin-care',
      manufacturer: 'Bayer',
      brand: 'Bepanthen',
      rating: '4.8',
      sku: 'BEP-50G',
      active_ingredients: 'Dexpanthenol',
      packaging: '50g krém',
      created_at: '2024-01-25',
      updated_at: '2024-02-20',
      name: 'Bepanthen',
    },
    {
      id: '4',
      name_de: 'Voltaren Schmerzgel',
      name_hu: 'Voltaren Fájdalomcsillapító Gél',
      name_en: 'Voltaren Pain Relief Gel',
      description_de: 'Entzündungshemmendes Gel für Muskel- und Gelenkschmerzen.',
      description_hu: 'Gyulladáscsökkentő gél izom- és ízületi fájdalmakra.',
      description_en: 'Anti-inflammatory gel for muscle and joint pain.',
      description_preview_de: 'Gegen Muskel- und Gelenkschmerzen',
      description_preview_hu: 'Izom- és ízületi fájdalmak ellen',
      description_preview_en: 'For muscle and joint pain',
      price_huf: '4290',
      price_usd: '12',
      price_eur: '11',
      times_ordered: '0',
      stock: '25',
      sale_percentage: '20',
      category: 'pain-relief',
      manufacturer: 'Novartis',
      brand: 'Voltaren',
      rating: '4.6',
      sku: 'VOL-100G',
      active_ingredients: 'Diclofenac',
      packaging: '100g gél',
      created_at: '2024-02-01',
      updated_at: '2024-02-25',
      name: 'Voltaren',
    },
  ];

  products = computed<ProductWithHelpers[]>(() => {
    const currentLang = this.translateService.currentLang as 'hu' | 'en' | 'de';
    return this.mockProducts.map((p) => enrichProduct(p, currentLang));
  });

  onProductClick(productId: string): void {
    console.log(`Termék ${productId} kattintva`);
    // TODO: Navigáció a termék részletekhez
    // this.router.navigate(['/products', productId]);
  }
}
