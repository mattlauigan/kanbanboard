import Column from "../components/column";

function App() {
  return (
    <>
      <header>
        <hr />
        <h1>Scope Kanban Board</h1>
        <hr />
      </header>
      <div className="App">
        <Column state="PLANNED" />
        <Column state="ONGOING" />
        <Column state="DONE" />
      </div>
      <footer>
        <p>This Kanban Project was made for my Portfolio</p>
      </footer>
    </>
  );
}

export default App;
