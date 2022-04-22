import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

import { ReactComponent as FilterIcon } from "../../images/filter.svg";
import { SortingProps } from "../../types/appoints";

import { setSortedAppointsAction } from "../../store/appoints/appointsActions";
import { sortFields } from "../../constants/Constants";

import "./Sorting.scss";
import { useDispatch, useSelector } from "../../store";
import { getSortedAppoints } from "../../services/appointsHandlers/appointsHandlers";

const Sorting: FC<SortingProps> = ({
  setIsSortLoading,
  filterActive,
  setFilterActive,
}) => {
  const appoints = useSelector((state) => state.appoints.appoints);
  const [sortField, setSortField] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    setAppointsToStore(appoints);
  }, []);

  const setAppointsToStore = async (sortedAppoints: any) => {
    setIsSortLoading(true);
    await dispatch(setSortedAppointsAction(sortedAppoints));
    setIsSortLoading(false);
  };

  const changeSortField = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value);
    const select: any = document.getElementById("sort_way");
    select.value = "";
  };

  const sortingAppoints = useCallback(
    (sortWay: ChangeEvent<HTMLSelectElement>) =>
      setAppointsToStore(getSortedAppoints(sortWay, appoints, sortField)),
    [sortField]
  );

  return (
    <div className="appoints__sort">
      <label htmlFor="sort_type" className="appoints__sort_label">
        Сортировать по:
      </label>
      <select
        className="appoints__sort_select"
        id="sort_type"
        onChange={changeSortField}
      >
        <option />
        {sortFields.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      {sortField && (
        <>
          <label className="appoints__sort_label" htmlFor="sort_way">
            Направление:
          </label>
          <select
            id="sort_way"
            className="appoints__sort_select"
            onChange={sortingAppoints}
          >
            <option />
            <option value="asc">По возрастанию</option>
            <option value="dec">По убыванию</option>
          </select>
        </>
      )}
      {!filterActive && (
        <>
          <label>Добавить фильтр по дате:</label>
          <FilterIcon
            className="filter_icon"
            onClick={() => setFilterActive(!filterActive)}
          />
        </>
      )}
    </div>
  );
};

export default Sorting;
