import { AlignJustify,LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logOutUser } from "@/store/auth-slice";

function AdminHeader({setOpen}) {

    const dispatch = useDispatch();

    function handleLogout (){
        dispatch(logOutUser());

    }
    return ( 
        <header className="flex items-center justify-between px-4 py-3 bg-background border-b ">
            <Button onClick={()=>setOpen(true)} className="lg:hidden sm:block">
            <AlignJustify />
            <span className="sr-only">Toggle Menu</span>
            </Button>

            <div className="flex flex-1 justify-end ">
                <Button
                onClick={handleLogout} className="inline-flex hover:bg-gray-200 gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
                <LogOut />
                    LogOut</Button>
            </div>
        </header>

          
     );
}

export default AdminHeader;