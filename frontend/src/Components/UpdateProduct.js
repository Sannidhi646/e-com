import React,{useEffect, useState} from "react";
import { useParams } from "react-router-dom";
const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setComapany] = useState("");
  const [category, setCategory] = useState("");
    const param=useParams();
    useEffect(()=>{
       getProduct();
    },[])
    const getProduct=async()=>{
        let result=await fetch(`http://localhost:5000/product/${param.id}`,{
          headers:{
            authorization:`bear ${JSON.parse(localStorage.getItem('token'))}`
        }
        });
        result=await result.json();
      setName(result.name);
      setPrice(result.price);
      setComapany(result.company);
      setCategory(result.category);
    }
  const update=async()=>{
    let result=await fetch(`http://localhost:5000/product/${param.id}`,{
        method: "put",
        body: JSON.stringify({ name, price, company,category }),
        headers: {
          "Content-Type": "application/json",
          authorization:`bear ${JSON.parse(localStorage.getItem('token'))}`
        },
      });
      result = await result.json();
      if(result)
      alert("Updated");
    
  }

  return (
    <div>
      <div className="form">
        <h1>Update Product</h1>
      
        <input
          className="box"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter the Name"
        />
       

        <input
          className="box"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter the Price"
        />
        
        <input
          className="box"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter the Category"
        />
       
        <input
          className="box"
          type="text"
          value={company}
          onChange={(e) => setComapany(e.target.value)}
          placeholder="Enter the Company"
        />
        
        <button className="button" onClick={update} type="button">
          Update 
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
