import { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import { addProductsFormElements } from "@/config";
import CommonForm from "@/components/common/form"; 
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";

import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/product-slice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";




const initialFormData={
  image:null,
  title:"",
  description:"",
  category:"",
  brand:"",
  price:"",
  salePrice:"",
  totalStock:"",
}

function AdminProducts() {

  const [openCreateProductsDialog,setOpenCreateProductsDialog] = useState(false);

  const [formData,setFormData] = useState(initialFormData);
  const [imageFile,setImageFile] = useState(null);
  const [uploadedImageUrl,setUploadedImageUrl] = useState("");
  const [imageLoadingState,setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const {toast} = useToast();

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shoppingCart);


  const {productList} = useSelector(state=>state.adminProducts);
  
  
  function onSubmit(event){

    event.preventDefault();

    currentEditedId!==null?
    dispatch(editProduct({
      id : currentEditedId,formData
    })).then((data)=>{
      // console.log(data,"edit");
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null);
      }
    }) : dispatch(
      addNewProduct({

        ...formData,
        image:uploadedImageUrl,
      })
    ).then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        setOpenCreateProductsDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast({
          title:"product added successfully"
        });
      }
    });


    

  }

  function handleDelete(getCurrentProductId){
    dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
      }
    })


  }

  function isFormValid(){
    return Object.keys(formData)
    .map((key)=>formData[key] !=="")
    .every((item)=>(item));
  }

  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[dispatch]);

  // console.log(productList,uploadedImageUrl,"productList");
  return(
    <Fragment>
    <div className="mb-5 w-full flex justify-end">
      <Button onClick={()=>setOpenCreateProductsDialog(true)} className="bg-black text-white hover:bg-slate-600 hover:text-white rounded-b">
        Add new product

      </Button>
    </div>

    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      {
        productList && productList.length>0?
        productList.map(productItem=>(
        <AdminProductTile 
        setFormData={setFormData}
        setOpenCreateProductsDialog={setOpenCreateProductsDialog}
        setCurrentEditedId={setCurrentEditedId} product={productItem}
        handleDelete={handleDelete}/>)):null

      }
    </div>
    <Sheet open={openCreateProductsDialog}
    onOpenChange={()=>{
      setOpenCreateProductsDialog(false);
      setCurrentEditedId(null);
      setFormData(initialFormData);
    }}>
      <SheetContent side="right" className="bg-white overflow-auto">
        <SheetHeader>
          <SheetTitle>
            {
              currentEditedId!== null?
              "Edit Product":"Add New Product"

            }
          
          </SheetTitle>
        </SheetHeader>
        <ProductImageUpload 
        imageFile={imageFile} 
        setImageFile={setImageFile} 
        uploadedImageUrl={uploadedImageUrl}
         setUploadedImageUrl={setUploadedImageUrl}
         setImageLoadingState={setImageLoadingState}
         imageLoadingState={imageLoadingState}
         isEditMode={currentEditedId !== null}/>
        <div className="py-6">
          <CommonForm
          onSubmit={onSubmit}
          formData={formData}
          setFormData={setFormData}
          ButtonText = {currentEditedId!==null?"Edit":"Add"}
          formControls = {addProductsFormElements}
          isBtnDisabled ={!isFormValid()}/>

        </div>

      </SheetContent>

    </Sheet>

  </Fragment>


  )

}
  

export default AdminProducts;