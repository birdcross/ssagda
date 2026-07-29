import { useState } from 'react';
import PageTitle from '../components/PageTitle.jsx';
import QuantityControl from '../components/QuantityControl.jsx';
import SummaryCard from '../components/SummaryCard.jsx';
import { formatWon } from '../data.js';

export default function CartPage({ navigate, cartItems, updateQuantity, removeCartItem }) {
  const [coupon, setCoupon] = useState('SSAGDA10');
  const [applied, setApplied] = useState(true);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <PageTitle title="장바구니" description="담은 상품과 결제 예정 금액 확인" />
      <div className="cart-layout">
        <section className="cart-panel">
          <div className="cart-header"><label><input type="checkbox" defaultChecked /> 전체 선택 {cartItems.length}개</label></div>
          <div className="cart-list">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className={`cart-thumb tone-${item.tone}`}>{item.code}</div>
                <div className="cart-item__info"><h3>{item.name}</h3><p>{item.option} / 수량 {item.quantity}</p></div>
                <QuantityControl small value={item.quantity} onChange={(quantity) => updateQuantity(item.id, quantity)} />
                <strong>{formatWon(item.price * item.quantity)}</strong>
                <button className="remove-button" type="button" onClick={() => removeCartItem(item.id)} aria-label="상품 삭제">×</button>
              </article>
            ))}
          </div>
          <div className="coupon-input"><span>쿠폰코드 입력</span><input value={coupon} onChange={(event) => setCoupon(event.target.value)} /><button type="button" onClick={() => setApplied(Boolean(coupon.trim()))}>{applied ? '적용됨' : '적용'}</button></div>
        </section>
        <SummaryCard subtotal={subtotal} discount={applied ? 10000 : 0} buttonText="주문하기" onSubmit={() => navigate('/checkout')} />
      </div>
    </>
  );
}
