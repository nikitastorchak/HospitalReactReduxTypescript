import Button from "../../common/Button/Button";
import { FC } from "react";
import { List } from "../../types/appoints";
import "./Modal.scss";

interface ModalProps {
  data: any;
  modalTitle: string;
  modalActive: boolean;
  setModalActive: (a: boolean) => void;
  modalFunction: (a?: any) => void;
}

const Modal: FC<ModalProps> = ({
  children,
  data,
  modalTitle,
  modalActive,
  setModalActive,
  modalFunction,
}) => (
  <div
    className={modalActive ? "modalWrap active" : "modalWrap"}
    onClick={() => setModalActive(false)}
  >
    <div
      className={modalActive ? "modal active" : "modal"}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modalHeader">
        <p>{modalTitle}</p>
      </div>
      <div className="modalEditBody">{children}</div>
      <div className="modalFooter">
        {modalActive && (
          <Button title={"Подтвердить"} onClick={() => modalFunction(data)} />
        )}

        <Button
          title="Отмена"
          onClick={() => {
            setModalActive(false);
          }}
        />
      </div>
    </div>
  </div>
);

export default Modal;
