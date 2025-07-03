import { Fragment } from "react";
import { UserCog, LayoutDashboard, ShoppingCart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import * as Dialog from "@radix-ui/react-dialog"; // Import Dialog from Radix

export const adminSidebarMenuItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboard />,
    },
    {
        id: "products",
        label: "Products",
        path: "/admin/products",
        icon: <ShoppingCart />,
    },
    {
        id: "orders",
        label: "Orders",
        path: "/admin/orders",
        icon: <ShoppingBag />,
    }
];

function MenuItems({setOpen}) {
    const navigate = useNavigate();
    return (
        <nav className="mt-8 flex-col flex gap-2">
            {adminSidebarMenuItems.map((menuItem) => (
                <div
                    key={menuItem.id}
                    onClick={() =>{
                        navigate(menuItem.path);
                        if(setOpen) setOpen(false);//this is for close toggle after click
                       
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-gray-200 hover:text-foreground"
                >
                    {menuItem.icon}
                    <span>{menuItem.label}</span>
                </div>
            ))}
        </nav>
    );
}

function AdminSidebar({ open, setOpen }) {
    const navigate = useNavigate();

    return (
        <Fragment>
            {/* Wrap Sheet in Dialog.Root */}
            <Dialog.Root>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetContent side="left" className="bg-white w-64">
                        <div className="flex bg-white flex-col h-full">
                            <SheetHeader className="border-b">
                                <SheetTitle className="flex gap-2 text-2xl">
                                    <UserCog size={30} />
                                    <span>Admin Panel</span> 
                                </SheetTitle>
                                {/* <Dialog.Description>This is the admin panel sidebar.</Dialog.Description> */}
                            </SheetHeader>

                            <MenuItems setOpen={setOpen}/>
                        </div>
                    </SheetContent>
                </Sheet>
            </Dialog.Root>

            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div onClick={() => navigate("/admin/dashboard")} className="flex cursor-pointer items-center gap-2">
                    <UserCog size={30} />
                    <h1 className="text-xl font-extrabold">Admin Panel</h1>
                </div>
                <MenuItems setOpen={setOpen} />
            </aside>
        </Fragment>
    );
}

export default AdminSidebar;
