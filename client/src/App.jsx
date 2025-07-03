import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import Admindashboard from "./pages/admin-view/dashboard";
import AdminFeatures from "./pages/admin-view/features";
import Adminorders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import ShoppingLayout from "./components/shopping-view/layout";
import Notfound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import CheakAuth from "./components/common/cheak-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cheakAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";


function App() {

  

  const{ user,isAuthenticated,isLoading} = useSelector(state=>state.auth);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(cheakAuth())
  },[dispatch]);

  if(isLoading) return <div><Skeleton className="w-[800] bg-black h-[600px]" />
</div>;





  return (
    <div className="flex flex-col overflow-hidden bg-white">
      

      {/* ✅ Only use <Routes> here, since BrowserRouter is in index.js */}
      <Routes>

        <Route
        path="/"
        element={
          <CheakAuth isAuthenticated={isAuthenticated} user={user}>
     
            </CheakAuth>}
        />
      

        <Route path="/auth" element={
          <CheakAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheakAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>


        <Route path="/admin" element={
          <CheakAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheakAuth>
        }>

         <Route path="dashboard" element={<Admindashboard/>}/>
         <Route path="features" element={<AdminFeatures/>}/>
         <Route path="orders" element={<Adminorders/>}/>
         <Route path="products" element={<AdminProducts/>}/>

        </Route>

        <Route path="/shop" element={
          <CheakAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheakAuth>
        }>

        <Route  path="home" element={<ShoppingHome/>}/>
        <Route path="listing" element={<ShoppingListing/>} />
        <Route path="account" element={<ShoppingAccount/>} />
        <Route path="checkout" element={<ShoppingCheckout/>} />
        <Route path="paypal-return" element={<PaypalReturnPage/>} />
        <Route path="payment-success" element={<PaymentSuccessPage/>} />
        <Route path="search" element={<SearchProducts/>} />

        </Route>

       <Route path="*" element={<Notfound/>}/>
       <Route path="/unauth-page" element={<UnauthPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
