import { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";

import { AddAppointsProps, List } from "../../types/appoints";

import Button from "../../common/Button/Button";
import AuthService from "../../services/UserService";

import { setAppointsAction } from "../../store/appoints/appointsActions";
import { fields, doctors } from "../../constants/Constants";
import { useDispatch } from "../../store";

import "./AddAppoints.scss";

const AddAppoints: FC<AddAppointsProps> = ({
  setAppointsFromBaseToStore,
  setIsSortLoading,
}) => {
  const [appointConstructor, setAppointConstructor] = useState<List | any>({
    fio: "",
    doctor: "",
    date: "",
    complaint: "",
  });
  const dispatch = useDispatch();
  const { fio, doctor, date, complaint } = appointConstructor;
  const isAllChecked = fio && doctor && date && complaint;

  const changeAppointHandler = useCallback(
    (value: string, type: string) =>
      setAppointConstructor({ ...appointConstructor, [type]: value }),
    [fio, doctor, date, complaint]
  );

  const setAppointsToStore = async (appoints: List[]) => {
    setIsSortLoading(true);
    await dispatch(setAppointsAction(appoints));
    setIsSortLoading(false);
  };

  const addAppointment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isAllChecked) {
      try {
        const response = await AuthService.post("add", {
          fio,
          doctor,
          date,
          complaint,
        });
        setAppointsToStore(response?.data);
      } catch (e: any) {
        alert(e.message);
      } finally {
        setAppointConstructor({
          fio: "",
          doctor: "",
          date: "",
          complaint: "",
        });
        setAppointsFromBaseToStore();
      }
    } else {
      alert("Заполните все поля!");
    }
  };

  return (
    <div className="add_appoint">
      <div className="add_appoint__content">
        <form className="add_appoint__content_form" onSubmit={addAppointment}>
          {fields.map((item, index) =>
            item.name === "doctor" ? (
              <div key={index} className="add_appoint__content_form_wrap">
                <label
                  className="add_appoint__content_form_label"
                  htmlFor={`select-${index}`}
                >
                  {item.label}
                </label>
                <select
                  className="add_appoint__content_form_select"
                  id={`select-${index}`}
                  value={appointConstructor[item.name]}
                  onChange={(e: ChangeEvent<HTMLSelectElement>): void =>
                    changeAppointHandler(e.target.value, "doctor")
                  }
                >
                  <option />
                  {doctors.map((doctor, index) => (
                    <option key={index} value={doctor.doctor}>
                      {doctor.doctor}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div key={index} className="add_appoint__content_form_wrap">
                <label
                  className="add_appoint__content_form_label"
                  htmlFor={`input-${index}`}
                >
                  {item.label}
                </label>
                <input
                  className="add_appoint__content_form_input"
                  id={`input-${index}`}
                  type={item.name === "date" ? "date" : ""}
                  value={appointConstructor[item.name]}
                  placeholder={item.placeholder}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                    changeAppointHandler(e.target.value, item.name);
                  }}
                />
              </div>
            )
          )}
          <Button type="submit" title="Добавить" />
        </form>
      </div>
    </div>
  );
};

export default AddAppoints;
