import React from "react";
import "./App.css";
import { Pivot } from "./lib/pivot";

function App() {
  return (
    <div className="main">
      <Pivot
        theme={"dark"}
        defaultSelectedColumns={["category", "name", "brand", "price"]}
        showConfig={true}
        pivotItem={[
          {
            category: "Burger",
            brand: "KFC",
            name: "KFC New York",
            price: "12000",
          },
          {
            category: "Burger",
            brand: "KFC",
            name: "KFC La",
            price: "12500",
          },
          {
            category: "Burger",
            brand: "Mcdonald",
            name: "Mcdonald New York",
            price: "22000",
          },
          {
            category: "Burger",
            brand: "Mcdonald",
            name: "Mcdonald La",
            price: "22000",
          },
          {
            category: "Pizza",
            brand: "Papa johns",
            name: "Papa johns New York",
            price: "27000",
          },
          {
            category: "Pizza",
            brand: "Papa johns",
            name: "Papa johns La",
            price: "25000",
          },
          {
            category: "Pizza",
            brand: "Domino",
            name: "Domino New York",
            price: "22000",
          },
          {
            category: "Pizza",
            brand: "Domino",
            name: "Domino La",
            price: "18000",
          },
        ]}
        defaultGroupKeys={["category", "brand"]}
        groupKeys={["category", "brand", "name"]}
        colDefs={[
          { key: "category", text: "Category" },
          { key: "brand", text: "Brand" },
          { key: "name", text: "Name", style: { maxWidth: 160, width: 160 } },
          {
            key: "price",
            text: "Price",
            showTotal: true,
            style: { maxWidth: 120, width: 120 },
          },
        ]}
        maxGroupCount={4}
      />
    </div>
  );
}

export default App;
