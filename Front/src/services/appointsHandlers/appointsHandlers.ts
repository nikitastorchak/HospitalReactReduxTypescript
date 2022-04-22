import { ChangeEvent } from "react";
import { List } from "../../types/appoints";
import _ from "lodash";
import moment from "moment";

export const getSortedAppoints = (
  sortWay: ChangeEvent<HTMLSelectElement>,
  appoints: List[],
  sortField: string
) => {
  if (appoints.length > 0) {
    const sortedAppoints = appoints.sort(
      (a: List | any, b: List | any): any => {
        if (!sortField) {
          return 0;
        }
        if (sortWay.target.value === "asc") {
          if (sortField) {
            if (a[sortField] === b[sortField]) return 0;
            return a[sortField] > b[sortField] ? 1 : -1;
          }
        } else {
          if (a[sortField] === b[sortField]) return 0;
          return a[sortField] > b[sortField] ? -1 : 1;
        }
      }
    );
    return sortedAppoints;
  }
};

export const filterFunction = (
  arr: List[],
  dateTo: string,
  dateFrom: string,
  filterActive: boolean,
  filteredArray: List[],
  sortAppoints: List[]
) => {
  if (filterActive) {
    if (dateTo && dateFrom) {
      arr = _.filter(filteredArray, (item) =>
        moment(item.date).isBetween(dateFrom, dateTo, "date", "[]")
      );
    } else if (dateFrom) {
      arr = _.filter(filteredArray, (item) =>
        moment(item.date).isAfter(dateFrom)
      );
    } else if (dateTo) {
      arr = _.filter(filteredArray, (item) =>
        moment(item.date).isBefore(dateTo)
      );
    }
    return arr;
  } else {
    arr = sortAppoints;
  }
  return arr;
};
