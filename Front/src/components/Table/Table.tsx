import { FC, useState } from "react";
import moment from "moment";

import { ReactComponent as DeleteIcon } from "../../images/del.svg";
import { ReactComponent as EditIcon } from "../../images/edit.svg";
import { List, TableProps } from "../../types/appoints";
import Modal from "../Modal/Modal";

import "./Table.scss";
import AuthService from "../../services/UserService";
import { doctors } from "../../constants/Constants";
import { useSelector } from "../../store";

const Table: FC<TableProps> = ({ setAppointsFromBaseToStore }) => {
  const [modalEditActive, setModalEditActive] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | any>();
  const [modalDeleteActive, setModalDeleteActive] = useState<boolean>(false);
  const [appointConstructor, setAppointConstructor] = useState<List>({
    fio: "",
    doctor: "",
    date: "",
    complaint: "",
  });
  const { filterAppoints } = useSelector((state) => state.appoints);

  const deleteAppoint = async (id: string) => {
    await AuthService.del("delete", id);
    setAppointsFromBaseToStore();
  };

  const editAppoint = async (appoint: List) => {
    const { fio, doctor, date, complaint } = appoint;
    await AuthService.patch("update", {
      fio,
      doctor,
      date,
      complaint,
    });
    setAppointsFromBaseToStore();
  };

  const changeAppointHandler = (value: string, type: string) =>
    setAppointConstructor({ ...appointConstructor, [type]: value });

  return (
    <>
      <div className="appoints">
        {filterAppoints?.length > 0 ? (
          <table className="appoints__table">
            <thead>
              <tr>
                <td className="tableHead">Имя</td>
                <td className="tableHead">Врач</td>
                <td className="tableHead">Дата</td>
                <td className="tableHead">Жалобы</td>
                <td className="tableHead" />
              </tr>
            </thead>
            <tbody>
              {filterAppoints.map((item: List, index: number) => (
                <tr className="tableBodyWrap" key={index}>
                  <td className="tableBody fio">{item.fio}</td>
                  <td className="tableBody doctor">{item.doctor}</td>
                  <td className="tableBody date">
                    {moment(item.date).format("L").split("/").join(".")}
                  </td>
                  <td className="tableBody complaint">{item.complaint}</td>
                  <td className="tableBody svgs">
                    <div className="svgWrap">
                      <EditIcon
                        onClick={() => {
                          setAppointConstructor(item);
                          setModalEditActive(true);
                        }}
                      />
                      <DeleteIcon
                        onClick={async () => {
                          setDeleteId(item._id);
                          setModalDeleteActive(true);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading ...</p>
        )}
      </div>

      <Modal
        modalTitle={"Редактирование приема"}
        data={appointConstructor}
        modalActive={modalEditActive}
        modalFunction={editAppoint}
        setModalActive={setModalEditActive}
      >
        <label>Имя:</label>
        <input
          type="text"
          value={appointConstructor.fio}
          onChange={(e) => changeAppointHandler(e.target.value, "fio")}
        />
        <label>Врач:</label>
        <select
          value={appointConstructor.doctor}
          onChange={(e) => changeAppointHandler(e.target.value, "doctor")}
        >
          <option />
          {doctors.map((doctor, index) => (
            <option key={index} value={doctor.doctor}>
              {doctor.doctor}
            </option>
          ))}
        </select>
        <label>Дата:</label>

        <input
          type="date"
          value={appointConstructor.date?.slice(0, 10)}
          onChange={(e) => changeAppointHandler(e.target.value, "date")}
        />
        <label>Жалобы:</label>
        <textarea
          value={appointConstructor.complaint}
          onChange={(e) => changeAppointHandler(e.target.value, "complaint")}
        />
      </Modal>

      <Modal
        modalTitle={"Удаление приема"}
        modalActive={modalDeleteActive}
        modalFunction={deleteAppoint}
        data={deleteId}
        setModalActive={setModalDeleteActive}
      >
        Вы действительно хотите удалить прием?
      </Modal>
    </>
  );
};

export default Table;
