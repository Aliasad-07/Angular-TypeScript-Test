import { Injectable, inject } from '@angular/core';
import {
  Database,
  ref,
  listVal,
  objectVal,
  push,
  set,
  update,
  remove
} from '@angular/fire/database';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../models/product.model';

/**
 * ProductService handles all Firebase Realtime Database CRUD operations
 * for the 'products' node. Components should use this
 * service exclusively — no direct database calls in components.
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private db = inject(Database);

  /**
   * Get all products as a real-time observable stream.
   * Uses listVal with keyField to automatically map keys to the 'id' property.
   */
  getProducts(): Observable<Product[]> {
    const productsRef = ref(this.db, 'products');
    return (listVal(productsRef, { keyField: 'id' }) as Observable<Product[]>).pipe(
      catchError(error => {
        console.error('Error fetching products:', error);
        return throwError(() => new Error('Failed to fetch products. Please check your connection.'));
      })
    );
  }

  /**
   * Get a single product by its database key.
   * Returns a real-time observable that emits the product data.
   */
  getProductById(id: string): Observable<Product | undefined> {
    const productRef = ref(this.db, `products/${id}`);
    return (objectVal(productRef, { keyField: 'id' }) as Observable<Product | undefined>).pipe(
      catchError(error => {
        console.error(`Error fetching product ${id}:`, error);
        return throwError(() => new Error('Failed to fetch product details.'));
      })
    );
  }

  /**
   * Add a new product to the database.
   * Generates a unique push key.
   */
  async addProduct(product: Omit<Product, 'id'>): Promise<string> {
    try {
      const productsRef = ref(this.db, 'products');
      const newProductRef = push(productsRef);
      await set(newProductRef, product);
      return newProductRef.key || '';
    } catch (error) {
      console.error('Error adding product:', error);
      throw new Error('Failed to add product. Please try again.');
    }
  }

  /**
   * Update an existing product in the database.
   * Only the provided fields will be updated (partial update).
   */
  async updateProduct(id: string, product: Partial<Product>): Promise<void> {
    try {
      const productRef = ref(this.db, `products/${id}`);
      // Remove the id field from the update payload to avoid storing it in the database fields
      const { id: _, ...updateData } = product as Product;
      await update(productRef, updateData);
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw new Error('Failed to update product. Please try again.');
    }
  }

  /**
   * Delete a product from the database by its key.
   */
  async deleteProduct(id: string): Promise<void> {
    try {
      const productRef = ref(this.db, `products/${id}`);
      await remove(productRef);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw new Error('Failed to delete product. Please try again.');
    }
  }
}
