import { ReactComponent as FilterDeleteIcon } from "../../images/filterDelete.svg";
import { useDispatch, useSelector } from "../../store";
import { ChangeEvent, FC, useEffect, useState } from "react";

import { List } from "../../types/appoints";

import { setFilteredAppointsAction } from "../../store/appoints/appointsActions";

import "./Filtering.scss";
import { filterFunction } from "../../services/appointsHandlers/appointsHandlers";

const Filtering: FC<any> = ({
  filterActive,
  setFilterActive,
  setIsSortLoading,
}) => {
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const { sortAppoints, appoints } = useSelector(
    (state: any) => state.appoints
  );
  const dispatch = useDispatch();

  const changeDateFrom = (value: string) => setDateFrom(value);

  const changeDateTo = (value: string) => setDateTo(value);

  useEffect(() => {
    setAppointsToStore(appoints);
  }, []);

  const setAppointsToStore = async (sortedAppoints: List[]) => {
    setIsSortLoading(true);
    await dispatch(setFilteredAppointsAction(sortedAppoints));
    setIsSortLoading(false);
  };

  const filteredArray = sortAppoints;
  const filteringAppoints = (arr: List[]) =>
    filterFunction(
      arr,
      dateTo,
      dateFrom,
      filterActive,
      filteredArray,
      sortAppoints
    );

  return (
    filterActive && (
      <div className="filter">
        <div>
          <label className="filter__label" htmlFor="filterFromDate">
            с:
          </label>
          <input
            className="filter__input"
            id="filterFromDate"
            type={"date"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              changeDateFrom(e.target.value)
            }
          />
        </div>
        <div>
          <label className="filter__label" htmlFor="filterToDate">
            по:
          </label>
          <input
            className="filter__input"
            id="filterToDate"
            type={"date"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              changeDateTo(e.target.value)
            }
          />
        </div>
        <button
          onClick={() => {
            setAppointsToStore(filteringAppoints(filteredArray));
          }}
        >
          Фильтровать
        </button>
        <FilterDeleteIcon
          onClick={() => {
            setAppointsToStore(sortAppoints);
            setFilterActive(false);
          }}
        />
      </div>
    )
  );
};

export default Filtering;
