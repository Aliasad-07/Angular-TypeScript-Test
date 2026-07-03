import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private notificationService = inject(NotificationService);

  isEditMode = signal(false);
  productId = signal<string | null>(null);
  isLoading = signal(false);
  isFetching = signal(false);

  categories: string[] = [
    'Electronics', 'Clothing', 'Food & Beverages', 'Furniture',
    'Books', 'Sports & Outdoors', 'Health & Beauty', 'Automotive',
    'Toys & Games', 'Office Supplies', 'Other'
  ];

  productForm: FormGroup = this.fb.group({
    productName: ['', [Validators.required, Validators.minLength(2)]],
    category: ['', [Validators.required]],
    price: [null, [Validators.required, Validators.min(0.01)]],
    quantity: [null, [Validators.required, Validators.min(0)]],
    supplier: ['', [Validators.required, Validators.minLength(2)]]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.productId.set(id);
      this.loadProduct(id);
    }
  }

  private loadProduct(id: string): void {
    this.isFetching.set(true);
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        if (product) {
          this.productForm.patchValue({
            productName: product.productName,
            category: product.category,
            price: product.price,
            quantity: product.quantity,
            supplier: product.supplier
          });
        } else {
          this.notificationService.error('Product not found.');
          this.router.navigate(['/products']);
        }
        this.isFetching.set(false);
      },
      error: (error) => {
        this.notificationService.error(error.message || 'Failed to load product.');
        this.isFetching.set(false);
        this.router.navigate(['/products']);
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const formValue = this.productForm.value as Omit<Product, 'id'>;

    try {
      if (this.isEditMode() && this.productId()) {
        await this.productService.updateProduct(this.productId()!, formValue);
        this.notificationService.success('Product updated successfully!');
      } else {
        await this.productService.addProduct(formValue);
        this.notificationService.success('Product added successfully!');
      }
      this.router.navigate(['/products']);
    } catch (error: any) {
      this.notificationService.error(error.message || 'An error occurred. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
