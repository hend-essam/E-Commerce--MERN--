import "./catalog.css";
import { useState } from "react";

const Filter = ({ filterCategory, allCategory }) => {
  const [activeCategory, setActiveCategory] = useState(allCategory[0]);

  const handleFilter = (category) => {
    setActiveCategory(category);
    filterCategory(category);
  };

  return (
    <ul>
      {allCategory.map((category, index) => (
        <li
          key={index}
          onClick={() => handleFilter(category)}
          className={category === activeCategory ? "active" : ""}
        >
          {category.toUpperCase()}
        </li>
      ))}
    </ul>
  );
};

export default Filter;
