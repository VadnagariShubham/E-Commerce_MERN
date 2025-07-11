import { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import{Input} from "../ui/input";
import { Button } from "@/components/ui/button";
import { UploadCloudIcon, XIcon,FileIcon } from "lucide-react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({imageFile,setImageFile,
    imageLoadingState,uploadedImageUrl, isEditMode,setUploadedImageUrl,setImageLoadingState}) {

    const InputRef = useRef(null);
    function handleImageFileChange (event){
        console.log(event.target.files);
        const selectedFile = event.target.files?.[0];
        if(selectedFile) setImageFile(selectedFile);

    }

    function handleDragOver(event){
        event.preventDefault();

    }
    function handleDrop(event){
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if(droppedFile) setImageFile(droppedFile);


    }

    function handleRemoveImage(){
        setImageFile(null);
        if(InputRef.current){
            InputRef.current.value = "";
        }

    }


    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        const data = new FormData();
        data.append("my_file",imageFile)
        const response = await axios.post("http://localhost:5000/api/admin/products/upload-image",data);
        console.log(response,"response")
        if(response?.data?.success ){ 
            
            setUploadedImageUrl(response.data.result.url);
            setImageLoadingState(false);}
        
    }

    useEffect(()=>{
        if(imageFile !==null) uploadImageToCloudinary()
    },[imageFile]);
    return ( 
        <div className="w-full max-w-md mx-auto mt-4">
            <Label className="text-lg font-semibold mb-2 block">Upload image</Label>
            <div onDragOver={handleDragOver}
             onDrop={handleDrop}
              className={` ${isEditMode?"opacity-50":""}border-2 border-dashed rounded-lg p-4`} >
                <Input id="image-upload"
                className="hidden" type="file" ref={InputRef} onChange={handleImageFileChange}
                disabled={ isEditMode}/>
                {
                    !imageFile?(
                    <Label htmlFor="image-upload"
                     className={`${isEditMode?"cursor-not-allowed":""}
                     flex flex-col items-center justify-center h-32 cursor-pointer`}>
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
                        <span>Drag & drop or Click to upload</span>

                    </Label>
                     ) :( 
                     imageLoadingState?
                     <Skeleton className="h-10 bg-gray-100"/>:
                     <div className="flex items-center justify-between ">
                        <div className="flex items-center">
                            <FileIcon className="w-7 h-7 text-primary mr-2"/>
                        </div>
                        <p className="text-sm font-medium">{imageFile.name}</p>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                            <XIcon className="w-4 h-4"/>    
                            <span className="sr-only">Remove file</span>
                        </Button>
                     </div>
                  )}
            </div>
        </div>
     );
}

export default ProductImageUpload;