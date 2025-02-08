import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    // pagination functionality

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPages, setTotalPages]=useState(1)
    const pageSize=5

    function getProduct() {
        let url='http://localhost:4000/products?_sort=id&_order=desc&_page=' + currentPage + '&_limit=' + pageSize
        fetch(url)
            .then(response => {
                if (response.ok) {
                    let totalCount=response.headers.get('X-Total-Count')
                    let pages=Math.ceil(totalCount/pageSize)
                    setTotalPages(pages)
                    return response.json();
                }
                throw new Error();
                
                
            })
            .then(data => {
                console.log("Fetched Products:", data); // Debugging
                setProducts(data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                alert('Unable to fetch data');
            });
    }

    useEffect(() => {
        getProduct();
    }, []);

    function deleteProduct(id){
        fetch("http://localhost:4000/products/" + id,{
            method:"DELETE"
        })
        .then(response=>{
            if(!response.ok){
                throw new Error();
            }
            getProduct()   
        })
        .catch(error=>{
            alert("unable to delete the product")
        })
    }

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Products</h2>

            <div className="row mb-3">
                <div className="col">
                    <Link className="btn btn-primary me-1" to="/admin/products/create" role="button">
                        Create Product
                    </Link>
                    <button type="button" className="btn btn-outline-primary" onClick={getProduct}>
                        Refresh
                    </button>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>CreatedAt</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td>{product.price}$</td>
                                <td>
                                    {product.imageFilename ? (
                                        <img src={`http://localhost:4000/images/${product.imageFilename}`} width="100" alt={product.name} />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td>{product.createdAt ? product.createdAt.slice(0, 10) : "N/A"}</td>
                                <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                    <Link className="btn btn-primary btn-sm me-1" to={`/admin/products/edit/${product.id}`}>
                                        Edit
                                    </Link>
                                    <button type="button" className="btn btn-danger btn-sm" onClick={()=>deleteProduct(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No products available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
