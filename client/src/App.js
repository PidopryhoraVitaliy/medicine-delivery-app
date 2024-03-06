import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DrugStoresPage from './components/pages/DrugStoresPage';
import './App.css';
import ShoppingCartPage from './components/pages/ShoppingCartPage';
import ErrorPage from './components/pages/ErrorPage';
import AppHeader from './components/AppHeader';
import { useState } from 'react';

const App = () => {
  const [orderedItems, setOrderedItems] = useState([]);

  const addOrderedItems = (item, count = 1) => {
    const newOrderedItems = [...orderedItems];
    const foundItem = newOrderedItems.find(i => i._id === item._id);
    if (foundItem) {
      foundItem.count += count;
      if (foundItem.count < 1) {
        foundItem.count = 1;
      }
    } else {
      newOrderedItems.push({ ...item, count });
    }
    setOrderedItems(newOrderedItems);
  }

  const removeOrderedItems = (item) => {
    const newOrderedItems = orderedItems.filter(i => i._id !== item._id);
    setOrderedItems(newOrderedItems);
  }

  const setCountOrderedItems = (item, count) => {
    const newCount = (parseInt(count) > 0) ? parseInt(count) : 0;
    const newOrderedItems = [...orderedItems];
    const foundItem = newOrderedItems.find(i => i._id === item._id);
    if (foundItem) {
      foundItem.count = newCount;
    }
    setOrderedItems(newOrderedItems);
  }

  const clearOrderedItems = () => {
    setOrderedItems([]);
  }

  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path='/' element={
              <DrugStoresPage
                addOrderedItems={addOrderedItems}
                removeOrderedItems={removeOrderedItems}
                orderedItems={orderedItems} />
            } />
            <Route path='/cart' element={
              <ShoppingCartPage
                addOrderedItems={addOrderedItems}
                removeOrderedItems={removeOrderedItems}
                orderedItems={orderedItems}
                setCountOrderedItems={setCountOrderedItems}
                clearOrderedItems={clearOrderedItems} />
            } />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;
