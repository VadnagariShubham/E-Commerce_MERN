import { Link, useNavigate } from "react-router-dom";
import { House, Logs, ShoppingCart, UserRound, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { logOutUser } from "@/store/auth-slice";
import UserCartItemsContent from "./cart-items-content";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import {  useLocation, useSearchParams } from "react-router-dom";


function MenuItems() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
  
    function handleNavigate(getCurrentMenuItem) {
      sessionStorage.removeItem("filters");
  
      const currentFilter =
        getCurrentMenuItem.id !== "home" &&
        getCurrentMenuItem.id !== "products" &&
        getCurrentMenuItem.id !== "search"
          ? { category: [getCurrentMenuItem.id] }
          : null;
  
      if (currentFilter) {
        sessionStorage.setItem("filters", JSON.stringify(currentFilter));
      }
  
      if (location.pathname.includes("listing") && currentFilter !== null) {
        setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`));
      } else {
        navigate(getCurrentMenuItem.path);
      }
    }
  
    return (
      <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
          <span
            key={menuItem.id}
            onClick={() => handleNavigate(menuItem)}
            className="text-sm font-medium cursor-pointer"
          >
            {menuItem.label}
          </span>
        ))}
      </nav>
    );
  }
  

function HeaderRightContent() {

    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shoppingCart);
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logOutUser());
    }
    useEffect(() => {

        dispatch(fetchCartItems(user?.id));

    }, [dispatch, user?.id]);

    console.log(cartItems);


    return (<div className="flex lg:items-centers lg:flex-row flex-col gap-4">
        <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>

            <Button onClick={() => setOpenCartSheet(true)} variant="outline" size="icon">
                <ShoppingCart className="h-6 w-6" />
                <span className="right-0 top-0 text-sm">{cartItems?.items?.length || 0}</span>
                <span className="sr-only">User Cart</span>

            </Button>
            <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />



        </Sheet>



        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="bg-black flex px-1 justify-center items-center">
                    <AvatarFallback className=" bg-black  text-white font-extrabold">
                        {user?.userName[0].toUpperCase()}

                    </AvatarFallback>

                </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className=" bg-white shadow-lg w-56 ">
                <DropdownMenuLabel >Logged In as {user?.userName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/shop/account")}>
                    <UserRound className="mr-2 h-4 w-4 " />
                    Account


                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>

                    <LogOut className="mr-2 h-4 w-4" />
                    <span>LogOut</span>

                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>



    </div>

    )
}

function ShoppingHeader() {


    const { isAuthenticated, user } = useSelector((state) => state.auth);


    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/shop/home" className="flex items-center gap-2">
                    <House className="h-6 w-6" />
                    <span className="font-bold">E-commerce</span>

                </Link>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <Logs className="h-6 w-6" />
                            <span className="sr-only">Toggle Header Menu</span>
                        </Button>

                    </SheetTrigger>
                    <SheetContent side="left" className="w-full bg-white max-w-xs">
                        <MenuItems />
                        <HeaderRightContent />

                    </SheetContent>
                </Sheet>

                <div className="hidden lg:block">
                    <MenuItems />

                </div>
                <div className="hidden lg:block">
                    <HeaderRightContent />
                </div>


            </div>

        </header>
    );
}

export default ShoppingHeader;