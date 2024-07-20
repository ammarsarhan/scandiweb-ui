import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import reportWebVitals from './reportWebVitals';

import App from '@/App';
import Navigation from '@/components/Navigation';
import CartDropdown from '@/components/cart/CartDropdown';

import './static/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Navigation/>
    <div className='relative'>
      <CartDropdown isActive={true}/>
      <App/>
    </div>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
