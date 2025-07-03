import Address from "@/components/shopping-view/address";
import img from "../../assets/acc.webp";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { toast } = useToast();

  // console.log(currentSelectedAddress, "cartItems");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

      function handleInitiatePaypalPayment() {
        console.log("Paypal button clicked");  // This confirms the button click
      
        if (!cartItems?.items || cartItems.items.length === 0) {
          console.log("No items in the cart");
          return;
        }
      
        if (currentSelectedAddress === null) {
          console.log("No address selected,Tap on address box");
          return;
        }
      
        // Debugging the cartItems directly
        console.log("Cart Items before orderData creation: ", cartItems.items);
      
        const orderData = {
          userId: user?.id,
          cartId: cartItems?._id,
          cartItems: cartItems.items.map((singleCartItem) => ({
            productId: singleCartItem.productId,
            title: singleCartItem.title,
            image: singleCartItem.image,
            price: singleCartItem.salePrice > 0 ? singleCartItem.salePrice : singleCartItem.price,
            quantity: singleCartItem.quantity,
          })),
          addressInfo: {
            addressId: currentSelectedAddress?._id,
            address: currentSelectedAddress?.address,
            city: currentSelectedAddress?.city,
            pincode: currentSelectedAddress?.pincode,
            phone: currentSelectedAddress?.phone,
            notes: currentSelectedAddress?.notes,
          },
          orderStatus: "pending",
          paymentMethod: "paypal",
          paymentStatus: "pending",
          totalAmount: totalCartAmount,
          orderDate: new Date(),
          orderUpdateDate: new Date(),
          paymentId: "",
          payerId: "",
        };
      
        console.log("Order Data: ", orderData);  // Ensure this is logged
      
        dispatch(createNewOrder(orderData)).then((data) => {
          console.log("Dispatch Response: ", data);  // Log dispatch response for further insight
          if (data?.payload?.success) {
            setIsPaymemntStart(true);
          } else {
            setIsPaymemntStart(false);
          }
        });
      }

      
      


  useEffect(() => {
    if (approvalURL) {
      window.location.href = approvalURL;
    }
  }, [approvalURL]);
  
 

useEffect(() => {
  if (user?.id) {
    dispatch(fetchCartItems(user.id));
  }
}, [user, dispatch]);

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>

          <div className="mt-4 w-full">
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => navigate("/shop/paypal-return")}
            >
              Go to Paypal Return Page
            </Button>
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => navigate("/shop/payment-success")}
            >
              Go to Payment Success Page
            </Button>
          </div>


        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;