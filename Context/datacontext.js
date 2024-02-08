import React, { createContext, useState, useEffect, useContext } from 'react';
import * as api from '../API';
const DataContext = createContext({});
import {toast} from 'react-hot-toast';
import { useRouter } from 'next/router';
import {products as productDatas} from "../Utils/product1.js";


export const DataProvider = ({children}) => {
    const router = useRouter();
    const [Error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [customer, setCustomer] = useState({});
    //const [productDatas, setProductDatas] = useState([]);
    const [bannerDatas, setBannerDatas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const[totalQuantities, setTotalQuantities] = useState(0);
    const[qty, setQty] = useState(1);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [user, setUser] = useState({});

//FETCH PRODUCTS FROM BACKEND API
   /* useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true);
                const { data } = await api.fetchPosts();
                setProductDatas(data[0]);
                setBannerDatas(data[1]);
            }catch(err){
                console.log(err);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    }, []);
*/
    //GET DATAS FROM LOCALSTORAGE AFTER EVERY REFRESH
    useEffect(() => {
        const quantity = localStorage.getItem('totalQuantities');
        const price = localStorage.getItem('totalPrice');
        const cart = JSON.parse(localStorage.getItem('cart'));
        const product = JSON.parse(localStorage.getItem('product'));

        if(quantity !== null) {
            setTotalQuantities(parseInt(quantity))
        }
        if(price !== null) {
            setTotalPrice(parseInt(price))
        }
        if(cart !== null) {
            setCartItems(cart);
        }
        if(product !== null) {
          setProduct(product);
        }

       
    }, [])
    
//VALIDATE USER INPUT PASSWORD FOR SECURITY REASONS
 const validatePassword = (psw) => 
{
switch (true) {
  case  (psw.length < 8 || psw.length > 13):
   setError(true);
   setErrorMessage("bad password length")
    break
    case (psw == psw.toLowerCase()) || (psw == psw.toUpperCase()):
        setError(true);
        setErrorMessage("password must contain upper and lowercase letters");
    break
  case  (!(/[0-9]/.test(psw))):
    setError(true);
   setErrorMessage("password must contain numbers");
    break
    default: 
    setError(false);
    setErrorMessage("");
}
}
//VALIDATE USER EMAIL INPUT WITH REGEX
 const validateEmail = (email) => {
    let result = 
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
      ;
      switch(true){
        case (result === false): 
        setError(true);
        setErrorMessage("Invalid Email Address");
        break;
        case (result === true): 
        setError(false);
        setErrorMessage("");
      }
  };

  //FUNCTION FOR INCREASING AND DECREASING CART QUANTITY
    const incQty = () => {
        setQty((prevqty) => prevqty + 1);
    }
    const decQty = () => {
        setQty((prevqty) => {
            if(prevqty - 1 < 1) return 1

            return prevqty - 1;
        });

    }

    //FUNCTION TO BE TRIGGERED WHEN A USER ADDS A NEW PRODUCT TO THEIR CART
    let foundProduct;
    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);
         if(value === 'inc'){
        setCartItems([{...foundProduct, quantity: foundProduct?.quantity + 1}, ...newCartItems])
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct?.price);
            setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + 1)
         }else if(value === 'desc'){
        if(foundProduct?.quantity > 1){ 
                setCartItems([{...foundProduct, quantity: foundProduct?.quantity - 1}, ...newCartItems])
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct?.price);
            setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - 1)
         }
    }
    }

    //FUNCTION TO BE TRIGGERED WHEN A USER REMOVES AN ITEM FROM THE CART
    const onRemove = (item) => {
        const newCartItems = cartItems.filter((ite) => ite._id !== item._id);
        setTotalQuantities((prevQuantity)=> prevQuantity - item.quantity);
        localStorage.setItem("totalQuantities",totalQuantities - item.quantity);
        setTotalPrice((prevPrice) => prevPrice - item.price * item.quantity);
        localStorage.setItem("totalPrice", totalPrice -  item.price * item.quantity)
        localStorage.setItem("cart", JSON.stringify(newCartItems));
        setCartItems([...newCartItems]);
    }
    //FUNCTION WHEN A USER ADDS AN ITEM TO THE CART
    const onAdd =  (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        localStorage.setItem("totalPrice", totalPrice +  product.price * quantity);
        setTotalQuantities ((prevTotalQuantities) => prevTotalQuantities + quantity);
        localStorage.setItem("totalQuantities",totalQuantities + quantity);
        if(checkProductInCart){
            const updateCartItems = cartItems.map((item) => {
                if(item._id === product._id)return {
                    ...item, quantity: item.quantity + quantity
                }
            })
            localStorage.setItem("cart", JSON.stringify(updateCartItems));
            setCartItems(updateCartItems);
        }else{
            product.quantity = quantity;

            setCartItems([...cartItems, {...product}]);
            localStorage.setItem("cart", JSON.stringify([...cartItems, {...product}]));
        }
        toast.success(`${qty} ${product.name} added to the cart`)
    }

   const [paymentDetail , setPaymentDetail] = useState({
   })
   const [successPayment, setSuccessPayment] = useState(false);
    const [product, setProduct] = useState({});
    //FILTERING PRODUCTS FOR PRODUCT DETAILS PAGE
    const filterProducts = async (id) => {
        let returnProducts = await productDatas.filter(product => product._id === id);
        if(returnProducts){
           await  setProduct(returnProducts[0]);
           localStorage.setItem("product", JSON.stringify(returnProducts[0]));
         }
         router.push(`/product/${id}`);
    }
    const sendBannerProduct = async(product) => {
        await setProduct(product);
        localStorage.setItem("product", JSON.stringify(product));
        router.push(`/product/${product._id}`);
    }
    

//LOGOUT FUNCTION, IF A USER WANTS TO LOGOUT
const logout = () => {
    localStorage.removeItem("profile");
    setUser({});
}

//FUNCTION FOR WHEN AN ADMIN DELETES PRODUCTS FROM THE CART
const deleteItem = async (id) => {
const filteredProducts = productDatas.filter(product => product._id !== id);
setProductDatas(filteredProducts);
await api.deletePost(`/products/${id}`);
}
const [theme, setTheme] = useState(false);
    return <DataContext.Provider value={{ loading, productDatas, bannerDatas, setBannerDatas, setLoading, showCart, cartItems, totalPrice, totalQuantities, qty, setCartItems, setShowCart, setTotalPrice, setTotalQuantities, setQty, incQty, decQty, onAdd, customer, setCustomer, toggleCartItemQuantity, onRemove, setPaymentDetail, paymentDetail, product, setProduct, filterProducts, sendBannerProduct,Error, setError, setErrorMessage, errorMessage, validateEmail, validatePassword,userLoggedIn, setUserLoggedIn, user, setUser,logout, successPayment, setSuccessPayment, theme, setTheme, deleteItem}}>
        {children}
    </DataContext.Provider>
}

export const useStateContext = () => useContext(DataContext);