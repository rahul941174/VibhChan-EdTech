import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';


export const getCatalogPageData=async(categoryId)=>{
  let result=[];
  const toastId=toast.loading("Loading..")
  try{
        const response=await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId});

        if(!response?.data?.success){
            throw new Error("Could not Fetch Catalog category page data")
        }

        result=response?.data;
  }
  catch(err){
        console.log("Catalog Page Data Api Error......");
        toast.error(err.message);
        result=err.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}
