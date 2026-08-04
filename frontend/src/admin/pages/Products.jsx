import { useState } from "react";

export default function Products() {
  const [products] = useState([
    {
      id: 1,
      name: "Warden Rank",
      category: "Rank",
      price: "£12.99",
      stock: "Unlimited",
      status: "Active",
    },
    {
      id: 2,
      name: "Relic Crate",
      category: "Crate",
      price: "£4.99",
      stock: "Unlimited",
      status: "Active",
    },
    {
      id: 3,
      name: "Soulbound Bundle",
      category: "Bundle",
      price: "£19.99",
      stock: "Unlimited",
      status: "Hidden",
    },
    {
      id: 4,
      name: "Name Tag Token",
      category: "Cosmetic",
      price: "£2.99",
      stock: "Unlimited",
      status: "Active",
    },
  ]);

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage everything available in your store.</p>
        </div>

        <button className="btn btn-primary">
          + New Product
        </button>
      </div>

      <div className="panel">
        <div className="table-toolbar">
          <input
            type="search"
            placeholder="Search products..."
          />

          <select>
            <option>All Categories</option>
            <option>Rank</option>
            <option>Bundle</option>
            <option>Crate</option>
            <option>Cosmetic</option>
          </select>

          <select>
            <option>All Statuses</option>
            <option>Active</option>
            <option>Hidden</option>
            <option>Disabled</option>
          </select>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th style={{ width: 180 }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.status}</td>

                <td>
                  <button className="btn btn-outline compact">
                    Edit
                  </button>

                  <button className="btn btn-outline compact">
                    Clone
                  </button>

                  <button className="btn btn-danger compact">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}