import { Navigate, Route, Routes } from "react-router";
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'
import ProductsPage from './pages/ProductsPage'
import { useAuth } from '@clerk/clerk-react'
import OrdersPage from "./pages/OrdersPage";
import DashboardLayout from "./layouts/DashboardLayout";
import CustomersPage from './pages/CustomersPage'
import PageLoader from "./components/PageLoader";

const App = () => {

  const { isSignedIn, isLoaded } = useAuth()

  if(!isLoaded) return <PageLoader />;

  return (
    <Routes>
      <Route path='/login' element={isSignedIn ? <Navigate to={'/dashboard'} /> :<LoginPage />}/>
      <Route path='/' element={ isSignedIn ? <DashboardLayout /> : <Navigate to={'/login'} /> }>
        <Route index element={<Navigate to={'dashboard'} />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="order" element={<OrdersPage />} />
        <Route path="customers" element={<CustomersPage />} />
      </Route>
    </Routes>
  );
};

export default App;
