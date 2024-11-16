import CatalogItems from "./catalog-items";
import Filter from "./catalog-filter";
import { useState, useMemo, useEffect } from "react";

function Catalog({ handleAdd, addWishlist, products }) {
  const [itemsData, setItemsData] = useState([]);

  const allCategory = useMemo(
    () => ["all", ...new Set(products.map((item) => item.category))],
    [products]
  );

  const filterCategory = (category) => {
    if (category === "all") {
      setItemsData(products);
    } else {
      const filterArray = products.filter((item) => item.category === category);
      setItemsData(filterArray);
    }
  };

  useEffect(() => {
    setItemsData(products);
  }, [products]);

  return (
    <div className="catalog">
      <h1 className="catalog-header">Catalog</h1>
      <div className="catalog-body">
        <Filter filterCategory={filterCategory} allCategory={allCategory} />
        <CatalogItems
          itemsData={itemsData}
          handleAdd={handleAdd}
          addWishlist={addWishlist}
        />
      </div>
    </div>
  );
}

export default Catalog;
