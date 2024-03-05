import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DrugStoresPage from './components/pages/DrugStoresPage';
import './App.css';
// import { Suspense } from 'react';
// import Spinner from './components/Spinner';
import ShoppingCartPage from './components/pages/ShoppingCartPage';
import ErrorPage from './components/pages/ErrorPage';
import AppHeader from './components/AppHeader';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader />
        <main>
          {/* <Suspense fallback={<Spinner />}> */}
          <Routes>
            <Route path='/' element={<DrugStoresPage />} />
            <Route path='/cart' element={<ShoppingCartPage />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
          {/* </Suspense> */}
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;
