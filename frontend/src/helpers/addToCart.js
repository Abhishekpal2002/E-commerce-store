import SummaryApi from "../common/index"
import { toast } from 'react-toastify'

const addToCart = async(e,id) =>{
    e?.stopPropagation()
    e?.preventDefault()
 console.log("id",id)
    const response = await fetch(SummaryApi.addToCartProduct.url,{
        method : SummaryApi.addToCartProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            { productId : id }
        )
    })
    console.log(response)
    // const getp = await fetch(SummaryApi.getProductDetails.url,{
    //     method : SummaryApi.getProductDetails.method,
    //     credentials : 'include',
    //     headers : {
    //         "content-type" : 'application/json'
    //     },
    //     body : JSON.stringify(
    //         { productId : id }
    //     )
    // })
    // const dataResponse = await getp.json()
    // console.log("data",dataResponse)


    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData.message)
    }

    if(responseData.error){
        toast.error(responseData.message)
    }


    return responseData

}


export default addToCart