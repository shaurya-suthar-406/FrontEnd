import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./redux/counterSlice";

const Counter3 = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())} style={{ marginLeft: "10px" }}>
        -
      </button>
    </div>
  );
};

export default Counter3;
