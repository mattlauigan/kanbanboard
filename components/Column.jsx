import "./column.css";
import Task from "./Task";
import { useStore } from "../store";
import { useState } from "react";
import classNames from "classnames";

export default function Column({ state }) {
  const [text, setText] = useState("");
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [remind, setRemind] = useState(false);
  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );

  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const moveTask = useStore((store) => store.moveTask);
  const draggedTask = useStore((store) => store.draggedTask);

  return (
    <div
      className={classNames("column", { drop: drop })}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDrop={(e) => {
        moveTask(draggedTask, state);
        setDraggedTask(null);
        setDrop(false);
      }}
      onDragLeave={(e) => {
        setDrop(false);
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>+</button>
      </div>
      {tasks.map((task) => (
        <Task
          title={task.title}
          key={task.title}
          Description={task.description}
        />
      ))}

      {open && (
        <div className="Modal">
          <div className="modalContent">
            <div>
              <input
                type="text"
                placeholder="Title"
                onChange={(e) => {
                  e.target.value !== "" ? setRemind(false) : setRemind(true);
                  setText(e.target.value);
                }}
                value={text}
              />
              <textarea
                placeholder="Description"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                value={desc}
                rows={10}
              />
              {remind && (
                <label className="modalReminder" htmlFor="modalContent">
                  * Kindly input Title
                </label>
              )}

              <button
                onClick={() => {
                  if (text !== "") {
                    addTask(text, state, desc);
                    setText("");
                    setDesc("");
                    setOpen(false);
                    setRemind(false);
                  } else {
                    setRemind(true);
                  }
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
