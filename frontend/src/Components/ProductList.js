import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

const ProductList = () => {

        const [productList,setProductList]=useState([]);

        useEffect(()=>{
            getProducts();
           

        },[])
        const getProducts=async()=>{
            let result=await fetch('http://localhost:5000/products',{
                headers:{
                    authorization:`bear ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result =await result.json();
            setProductList(result);
        }
        const deletitem=async (id)=>{
            let result=await fetch(`http://localhost:5000/product/${id}`,{
                method:'Delete',
                headers:{
                    authorization:`bear ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result =await result.json();
            if(result)
            getProducts();
        }
        const searchhandle=async(event)=>{
            console.warn(event.target.value);
            let key=event.target.value;
            if(!key)//if anything is there in the seacrh box we should get all the value
            getProducts();
            let result=await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bear ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result=await result.json();
            if(result)
            setProductList(result);

        }


  return (
    <div className='ProductList'>
        <h1>Product List</h1>
        <input type='text' className='search' placeholder='Search Product' onChange={searchhandle}/>
        <ul >
            <li>SI NO</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Company</li>
            <li>Operation</li>
        </ul>
        {
           productList.length>0? productList.map((item,index)=>
            <ul className='products'>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
                <button onClick={()=>deletitem(item._id)}>Delete</button>
                <Link to={`/update/${item._id}`}>Update</Link>
            </li>
            
        </ul>

            ):
            <h1>No Result Found</h1>
        }
    </div>
  )
}

export default ProductList