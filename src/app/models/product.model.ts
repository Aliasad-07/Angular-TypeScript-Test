/**
 * Product interface representing a single inventory item.
 * Maps to a document in the Firestore 'products' collection.
 */
export interface Product {
  id?: string;           // Firestore document ID (auto-generated)
  productName: string;   // Name of the product (required)
  category: string;      // Product category (required)
  price: number;         // Unit price, must be > 0
  quantity: number;      // Stock quantity, must be >= 0
  supplier: string;      // Supplier name (required)
}
