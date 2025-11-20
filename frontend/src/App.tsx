import LoginPage from './loginPagina/login';
import ProductOverview from './productOverview/ProductOverview';
import ProductDetail from './productDetail/ProductDetail';
import CartSummary from './cart/CartSummary';

function App() {
    const sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
        return <LoginPage />;
    }

    const path = window.location.pathname;

    if (path.startsWith('/products/')) {
        const idPart = path.split('/').pop();
        const productId = Number(idPart);
        if (!Number.isNaN(productId)) {
            return (
                <>
                    <CartSummary />
                    <ProductDetail productId={productId} sessionId={sessionId} />
                </>
            );
        }
    }

    if (path === '/products') {
        return (
            <>
                <CartSummary />
                <ProductOverview sessionId={sessionId} />
            </>
        );
    }

    return <LoginPage />;
}

export default App;
