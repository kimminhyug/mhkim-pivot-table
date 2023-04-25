import React from "react";
import "./App.css";
import { Pivot } from "./lib/pivot/index";

function App() {
  return (
    <div className="main">
      <Pivot
        // onChangeSelectedColumns={onChangeSelectedColumns}
        // onChangeGroupColumns={onChangeGroupColumns}
        theme={"dark"}
        defaultSelectedColumns={["category", "name", "brand", "price"]}
        showConfig={true}
        pivotItem={[
          {
            category: "치킨",
            brand: "굽네",
            name: "굽네치킨 1호점",
            price: "12000",
          },
          {
            category: "치킨",
            brand: "굽네",
            name: "굽네치킨 2호점",
            price: "12500",
          },
          {
            category: "치킨",
            brand: "교촌",
            name: "교촌치킨 1호점",
            price: "22000",
          },
          {
            category: "치킨",
            brand: "교촌",
            name: "교촌치킨 2호점",
            price: "22000",
          },
        ]}
        defaultGroupKeys={["category", "brand"]}
        groupKeys={["category", "brand", "name"]}
        colDefs={[
          { key: "category", text: "카테고리" },
          { key: "brand", text: "브랜드" },
          { key: "name", text: "명칭" },
          { key: "price", text: "가격" },
        ]}
        maxGroupCount={4}
      />
    </div>
  );
}

export default App;
