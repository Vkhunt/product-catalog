
export type ProductStatus = "active" | "draft" | "discontinued";

export type ProductCondition = "new" | "refurbished" | "used";


export type Currency = "USD" | "EUR" | "GBP" | "INR";


export interface ProductVariant {
  id: string;
  label: string;            
  sku: string;            
  price: number;          
  compareAtPrice?: number; 
  stock: number;          
  attributes: Record<string, string>; 
}


export interface Product {
  id: string;
  name: string;
  slug: string;           
  description: string;
  brand: string;
  category: string;
  tags: string[];
  status: ProductStatus;
  condition: ProductCondition;
  variants: ProductVariant[]; 
  imageUrls: string[];
  featured: boolean;      
  createdAt: string;      
  updatedAt: string;      
}


export interface Review {
  id: string;
  productId: string;     
  reviewerName: string;
  rating: number;         
  title: string;
  body: string;
  verified: boolean;     
  createdAt: string;      
}


export interface CatalogFilters {
  status: ProductStatus | "all";         
  category: string;                      
  brand: string;                         
  search: string;                        
  featured: boolean | null;             
  condition: ProductCondition | "all";   
  minPrice: number | null;              
  maxPrice: number | null;              
  wishlistOnly: boolean;                 
}


export interface CatalogStats {
  totalProducts: number;
  activeProducts: number;
  draftProducts: number;
  featuredProducts: number;
  totalVariants: number;
  averagePrice: number;                      
  byCategory: Record<string, number>;        
  topRatedProducts: Product[];               
}
