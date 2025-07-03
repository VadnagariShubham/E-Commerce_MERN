import { Link } from "react-router-dom";
import { useState } from "react";
import { LoginFormControls } from "@/config";
import { FunctionSquareIcon } from "lucide-react";
import CommonForm from "@/components/common/form";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
// import { useToast } from "@/hooks/use-toast";
// import toast from "react-hot-toast";

const initialState = {
    
    email:"",
    password:""
};





function AuthLogin() {

    const [formData, setFormData] = useState(initialState);
    
    const dispatch = useDispatch();
    // const {Toast} = useToast();

    function onSubmit(event){
        event.preventDefault();

        dispatch(loginUser(formData)).then((data)=>{
            console.log(data);
            if(data?.Payload?.success){
                // Toast({
                //     title:data?.Payload?.message,
                // })
            }else{
                // Toast({
                //     title:data?.Payload?.message,
                //     variant:"distructive",
                // })

            }

        })
    }

    
    return ( 
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your Account</h1>
                <p className="mt-2 ">Don't have account
                    <Link className="font-medium text-primary hover:underline ml-2" to='/auth/register'>Register</Link>
                </p>
            </div>

            <CommonForm
            formControls={LoginFormControls}
            buttonText={'Sign in'}
            formData = {formData}
            setFormData={setFormData}
            onSubmit = {onSubmit}
            
            />

        </div>
     );
}

export default AuthLogin;