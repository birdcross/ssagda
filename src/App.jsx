
import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MyPage from './pages/MyPage.jsx';
import WishlistPage from './pages/WishlistPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import SupportPage from './pages/SupportPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { initialCart } from './data.js';
import { useSimpleRouter } from './router.js';

export default function App() {
  const { pathname, search, navigate } = useSimpleRouter();

  const [wishlist, setWishlist] = useState([
    1, 2, 3, 4, 6, 8,
  ]);

  const [cartItems, setCartItems] = useState(initialCart);

  const cartCount = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),
    [cartItems]
  );

  const toggleWish = (id) => {
    setWishlist((items) =>
      items.includes(id)
        ? items.filter((item) => item !== id)
        : [...items, id]
    );
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  const removeCartItem = (id) => {
    setCartItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  const addToCart = (product) => {
    setCartItems((items) => {
      const existing = items.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + product.quantity,
                option: product.option,
              }
            : item
        );
      }

      return [...items, product];
    });
  };

  let page;

  if (pathname === '/') {
    page = (
      <HomePage
        navigate={navigate}
        wishlist={wishlist}
        toggleWish={toggleWish}
      />
    );
  } else if (pathname === '/category') {
    page = (
      <CategoryPage
        navigate={navigate}
        search={search}
        wishlist={wishlist}
        toggleWish={toggleWish}
      />
    );
  } else if (pathname.startsWith('/product/')) {
    page = (
      <ProductPage
        productId={pathname.split('/')[2]}
        navigate={navigate}
        wishlist={wishlist}
        toggleWish={toggleWish}
        addToCart={addToCart}
      />
    );
  } else if (pathname === '/cart') {
    page = (
      <CartPage
        navigate={navigate}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeCartItem={removeCartItem}
      />
    );
  } else if (pathname === '/checkout') {
    page = (
      <CheckoutPage
        cartItems={cartItems}
        updateQuantity={updateQuantity}
      />
    );
  } else if (pathname === '/login') {
    page = <LoginPage navigate={navigate} />;
  } else if (pathname === '/mypage') {
    page = <MyPage />;
  } else if (pathname === '/wishlist') {
    page = (
      <WishlistPage
        navigate={navigate}
        wishlist={wishlist}
        toggleWish={toggleWish}
      />
    );
  } else if (pathname === '/events') {
    page = <EventsPage />;
  } else if (pathname === '/support') {
    page = <SupportPage />;
  } else {
    page = <NotFoundPage navigate={navigate} />;
  }

  return (
    <div className="app-shell">
      <Header
        pathname={pathname}
        search={search}
        navigate={navigate}
        cartCount={cartCount}
      />

      <main className="page-container">
        {page}
      </main>

      <Footer />
    </div>
  );
}

