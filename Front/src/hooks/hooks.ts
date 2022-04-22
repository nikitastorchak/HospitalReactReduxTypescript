import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

type State = { a: any };
type NewDispatch = ThunkDispatch<State, any, AnyAction>;

const Hooks = ({}) => {
  const dispatch: NewDispatch = useDispatch();
};

export default Hooks;
