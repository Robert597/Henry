import React, {useState} from 'react';
import { useRouter } from 'next/router';
import { useStateContext } from '../../Context/datacontext';
import Product from '../../Components/Product';

 
const ProductDetails = () => {
    const router = useRouter();  
    const {productDatas, setPaymentDetail, qty, onAdd, product, user} = useStateContext();
    const [index, setIndex] = useState(0);
  
  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                   <img src={product?.image[index]} alt="product image"
                   className='product-detail-image'/>
                </div>
               { <div className='small-images-container'>
                    {
                        product?.image.map((item, i) => (
                            <img key={i} src={item}
                            alt="small images"
                            className={i === index ? 'small-image selected-image': 'small-image'}
                            onMouseEnter={() => {
                                setIndex(i);
                            }}
                           />
                        ))
                    }
                </div>}
            </div>
            <div className='product-detail-desc'>
                <h1>{product.name}</h1>
               
                <h4>Details: </h4>
                <p>{product.details}</p>
                <p className='price'>
                &#36;{product.price}
                </p>
                
                <div className='buttons'>
                    <button type='button' className='add-to-cart'
                    onClick={() => onAdd(product, qty)}>Add to cart</button>
                    <button type='button' className='buy-now'
                    onClick={() =>{
                        if(!user?.result){
                            alert("Login to pay for products")
                            router.push("/auth");
                          }else{
                          setPaymentDetail(product);
                          router.push("/StripeContainer");
                        }
                    }}>Subscribe Now</button>
                </div>
            </div>

            
        </div>
        
            <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee'>
                    <div className='track'>
                    <div className='maylike-products-container'>
                    {productDatas.map((item, i) => (
                        <Product key={i} product={item}/>
                    ))}
                    </div>
                    </div>
                </div>
            </div>


    </div>
  )
}

export default ProductDetails