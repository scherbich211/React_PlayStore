import React from "react";

function Products() {
  function getValueAtIndex(index: number) {
    const str = window.location.href;
    return str.replace(/^\/+/g, "").split("/")[index];
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <h1>Products {getValueAtIndex(4)}</h1>
    </div>
  );
}

export default Products;
