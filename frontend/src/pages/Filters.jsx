import "./Dashboard.css";

const Filters = ({ category, tag, onCategoryChange, onTagChange }) => {
  return (
    <div className="filters">
      <div className="filter">
        <h2>Filters</h2>
      </div>

      <div className="filter-section">
        <p>Category</p>

        {["all", "fullstack", "frontend", "backend"].map(c => (
          <label key={c}>
            <input
              type="radio"
              name="category"
              value={c}
              checked={category === c}
              onChange={() => onCategoryChange(c)}
            />
            {c === "all" ? "All" : c}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <p>Tags</p>

        {["all", "react", "spring boot", "mysql", "mongodb","html","css","javascript",
        "java","sql","hibernate","data jpa","angular","vue.js"].map(t => (
          <label key={t}>
            <input
              type="radio"
              name="tag"
              value={t}
              checked={tag === t}
              onChange={() => onTagChange(t)}
            />
            {t === "all" ? "All" : t}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filters;
