import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from '@angular/fire/firestore';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../models/product.model';

/**
 * ProductService handles all Firebase Firestore CRUD operations
 * for the 'products' collection. Components should use this
 * service exclusively — no direct database calls in components.
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private firestore = inject(Firestore);

  /**
   * Get all products as a real-time observable stream.
   */
  getProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'products');
    return new Observable<Product[]>(observer => {
      const unsubscribe = onSnapshot(productsRef, (snapshot) => {
        const products = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        observer.next(products);
      }, (error) => {
        console.error('Error fetching products:', error);
        observer.error(new Error('Failed to fetch products. Please check your connection.'));
      });
      return unsubscribe;
    });
  }

  /**
   * Get a single product by its document ID.
   * Returns a real-time observable that emits the product data.
   */
  getProductById(id: string): Observable<Product | undefined> {
    const productRef = doc(this.firestore, `products/${id}`);
    return new Observable<Product | undefined>(observer => {
      const unsubscribe = onSnapshot(productRef, (snapshot) => {
        if (snapshot.exists()) {
          observer.next({ id: snapshot.id, ...snapshot.data() } as Product);
        } else {
          observer.next(undefined);
        }
      }, (error) => {
        console.error(`Error fetching product ${id}:`, error);
        observer.error(new Error('Failed to fetch product details.'));
      });
      return unsubscribe;
    });
  }

  /**
   * Add a new product to the database.
   * Generates a unique document ID.
   */
  async addProduct(product: Omit<Product, 'id'>): Promise<string> {
    try {
      const productsRef = collection(this.firestore, 'products');
      const docRef = await addDoc(productsRef, product);
      return docRef.id;
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
      const productRef = doc(this.firestore, `products/${id}`);
      // Remove the id field from the update payload to avoid storing it in the database fields
      const { id: _, ...updateData } = product as Product;
      await updateDoc(productRef, updateData);
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw new Error('Failed to update product. Please try again.');
    }
  }

  /**
   * Delete a product from the database by its document ID.
   */
  async deleteProduct(id: string): Promise<void> {
    try {
      const productRef = doc(this.firestore, `products/${id}`);
      await deleteDoc(productRef);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw new Error('Failed to delete product. Please try again.');
    }
  }
}
