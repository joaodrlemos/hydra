import "./filter.scss";
import { BsStar, BsStarFill } from "react-icons/bs";

const Filter = ({ filterOptions, setFilterOptions }) => {
  return (
    <div className="actions">
      <div className="search-bar">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFilterOptions((p) => ({
              ...p,
              searchedName: e.target.children[0].value,
            }));
          }}
        >
          <input type="text" placeholder="search" className="search-input" />
        </form>
      </div>
      <div className="filters">
        <span className="filter-by">Filter by:</span>
        <select
          value={filterOptions.genderOption}
          name="gender"
          id="gender"
          className="filter-input"
          onChange={(e) =>
            setFilterOptions((p) => ({ ...p, genderOption: e.target.value }))
          }
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
          {filterOptions.filterByFavorite ? (
            <BsStarFill
              onClick={() =>
                setFilterOptions((p) => ({
                  ...p,
                  filterByFavorite: !p.filterByFavorite,
                }))
              }
            />
          ) : (
            <BsStar
              onClick={() =>
                setFilterOptions((p) => ({
                  ...p,
                  filterByFavorite: !p.filterByFavorite,
                }))
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
