import React,{useState} from "react";
import { useNavigate } from "react-router-dom";


const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [company, setComapany] = useState("");
    const [category, setCategory] = useState("");
const [err,seterr]=useState(false)
const navigate=useNavigate("");
    const sumit=async()=>{
        console.log(name,price,company,category);
        const userid=JSON.parse(localStorage.getItem('user'))._id;
        if(!name||!price||!category||!company)
        {
            seterr(true);
            return false;
        }
      
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, company,userid,category }),
            headers: {
              "Content-Type": "application/json",
              authorization:`bear ${JSON.parse(localStorage.getItem('token'))}`
            },
          });
          result = await result.json();
          if (result) {
           alert("Added Successfully");
           navigate("/");
          }
    }

  return (
    <div>
      
      <div className="form">
      <h1>Add Product</h1>
       
        <input
          className="box"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter the Name"
         
        />
        {!name&&err&&<span className="invalid-input">Enter the valid Name</span>}
        
        <input
          className="box"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter the Price"
        />
        {!price&&err&&<span className="invalid-input">Enter the Price</span>}
       
        <input
          className="box"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter the Category"
        />
        {!category&&err&&<span className="invalid-input">Enter the Category</span>}
        
        <input
          className="box"
          type="text"
          value={company}
          onChange={(e) => setComapany(e.target.value)}
          placeholder="Enter the Company"
        />
        {!company&&err&&<span className="invalid-input">Enter the Company Name</span>}
        <button className="button" onClick={sumit} type="button">
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
