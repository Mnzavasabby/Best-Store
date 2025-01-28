import { Link } from "react-router-dom";

export default function ProductList(){
    return(
        <div className="container my-4">
            <h2 className="text-center mb-4">products</h2>

            <div className="row mb-3">
                <div className="col">
                    <Link className="btn btn-primary me-1" href="admin/products/create" role="button">create product</Link>
                    <button type="button" className="btn btn-outline-primary">Refresh</button>
                </div>
                <div className="col">
                    
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
            </table>
        </div>
    )
}