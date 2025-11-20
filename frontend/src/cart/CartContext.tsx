import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image_url?: string | null;
    quantity: number;
}

interface CartContextValue {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        const stored = localStorage.getItem('cart_items');
        return stored ? (JSON.parse(stored) as CartItem[]) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart_items', JSON.stringify(items));
    }, [items]);

    const addItem = (item: Omit<CartItem, 'quantity'>) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const clearCart = () => setItems([]);

    return (
        <CartContext.Provider value={{ items, addItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return ctx;
}
