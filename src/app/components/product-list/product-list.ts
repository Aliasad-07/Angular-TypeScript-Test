import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import { Product } from '../../models/product.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink, FormsModule, ConfirmDialogComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private notificationService = inject(NotificationService);

  private subscription: Subscription | null = null;

  // Signal state
  products = signal<Product[]>([]);
  isLoading = signal(true);
  searchQuery = signal('');
  selectedCategory = signal('');
  
  // Dialog state
  showDeleteDialog = signal(false);
  productToDelete = signal<Product | null>(null);

  // List of unique categories for filtering
  categories = computed(() => {
    const list = this.products().map(p => p.category);
    return Array.from(new Set(list)).sort();
  });

  // Filtered and searched products
  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    
    return this.products().filter(p => {
      const matchesSearch = 
        p.productName.toLowerCase().includes(query) ||
        p.supplier.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);
        
      const matchesCategory = !cat || p.category === cat;
      
      return matchesSearch && matchesCategory;
    });
  });

  ngOnInit(): void {
    this.subscription = this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.notificationService.error(error.message || 'Error loading inventory.');
        this.isLoading.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /** Trigger deletion flow */
  confirmDelete(product: Product): void {
    this.productToDelete.set(product);
    this.showDeleteDialog.set(true);
  }

  /** Handle dialog selection */
  async onDeleteConfirm(confirmed: boolean): Promise<void> {
    const product = this.productToDelete();
    this.showDeleteDialog.set(false);
    this.productToDelete.set(null);

    if (confirmed && product?.id) {
      this.isLoading.set(true);
      try {
        await this.productService.deleteProduct(product.id);
        this.notificationService.success(`Product "${product.productName}" deleted successfully.`);
      } catch (error: any) {
        this.notificationService.error(error.message || 'Failed to delete product.');
      } finally {
        this.isLoading.set(false);
      }
    }
  }
}
