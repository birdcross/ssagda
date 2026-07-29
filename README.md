# SSAGDA React UI

업로드된 `SSAGDA Web UI Sample Screens Editable V2`의 10개 웹 화면을 React와 CSS로 재구성한 수정 가능한 프로토타입입니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 기본적으로 `http://localhost:5173`이 열립니다.

## 포함된 화면

| 경로 | 화면 |
|---|---|
| `/` | 메인 페이지 |
| `/category` | 전체 상품 목록 |
| `/product/1` | 상품 상세 |
| `/cart` | 장바구니 |
| `/checkout` | 주문서 작성 |
| `/login` | 로그인 |
| `/mypage` | 마이페이지 |
| `/wishlist` | 찜한 상품 |
| `/events` | 쿠폰/이벤트 |
| `/support` | 고객센터 |

## 주요 파일

- `src/App.jsx`: 화면 라우팅과 장바구니/찜 상태
- `src/data.js`: 상품, 카테고리, FAQ 샘플 데이터
- `src/components`: 공통 헤더, 상품 카드, 수량 조절, 결제 요약
- `src/pages`: 화면별 React 컴포넌트
- `src/styles.css`: 전체 웹 디자인과 반응형 CSS

## 참고

- 별도의 이미지 파일 없이 CSS 도형과 텍스트로 상품 이미지를 표현했습니다.
- 결제, 로그인, 상담 기능은 UI 프로토타입이며 실제 서버와 연결되어 있지 않습니다.
- 배포 서버에서 직접 URL로 접근할 때는 SPA fallback 설정이 필요할 수 있습니다.
