import "./filter.scss";
import { BsStar, BsStarFill } from "react-icons/bs";

const Filter = ({
  genderOption,
  setGenderOption,
  filterByFavorite,
  setFilterByFavorite,
}) => {
  return (
    <div className="actions">
      <div className="search-bar">
        <input type="text" placeholder="search" className="search-input" />
      </div>
      <div className="filters">
        <span className="filter-by">Filter by:</span>
        <select
          value={genderOption}
          name="gender"
          id="gender"
          className="filter-input"
          onChange={(e) => setGenderOption(e.target.value)}
        >
          <option value="all" name="all">
            all
          </option>
          <option value="male" name="male">
            male
          </option>
          <option value="female" name="female">
            female
          </option>
        </select>
        <div className="filter-favorite">
          {filterByFavorite ? (
            <BsStarFill
              onClick={() => setFilterByFavorite(!filterByFavorite)}
            />
          ) : (
            <BsStar onClick={() => setFilterByFavorite(!filterByFavorite)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
