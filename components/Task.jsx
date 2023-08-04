import { useStore } from "../store";
import "./Task.css";
import classNames from "classnames";
import trash from "../src/assets/trash.svg";

export default function Task({ title, description }) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );

  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);

  return (
    <div
      className="task"
      draggable
      onDragStart={(e) => setDraggedTask(task.title)}
    >
      <div>{task.title}</div>
      <div className={classNames("description", task.description)}>
        {task.description}
      </div>
      <div className="bottomWrapper">
        <div>
          <img src={trash} alt="delete" onClick={() => deleteTask(title)} />
        </div>

        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
}
