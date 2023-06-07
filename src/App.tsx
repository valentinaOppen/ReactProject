import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import ProductsForm from './pages/products-form';
import ProductsList from './pages/products-list';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className='container'>
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="nuevo-producto" element={<ProductsForm />} />
          <Route path="editar-producto" element={<ProductsForm />} />
          <Route path="eliminar-producto" element={<ProductsForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
