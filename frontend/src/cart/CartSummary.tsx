import { useCart } from './CartContext';
import styles from './cartSummary.module.css';

export default function CartSummary() {
    const { items } = useCart();
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <button
            className={styles.cartButton}
            type="button"
            onClick={() => alert(JSON.stringify(items, null, 2))}
        >
            Winkelmand ({items.length}) – € {total.toFixed(2)}
        </button>
    );
}
