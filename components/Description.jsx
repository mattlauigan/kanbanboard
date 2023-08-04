import { useStore } from "../store";
import "./Task.css";
import classNames from "classnames";

export default function Description({ description }) {
  const desc = useStore((store) =>
    store.tasks.find((description) => task.description === description)
  );

  const deleteTask = useStore((store) => store.deleteTask);

  return (
    <div className="task">
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
}
