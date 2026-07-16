import { PeoplePanel } from "./components/PeoplePanel";
import { usePeople } from "./hooks/usePeople";

function App() {
  const peopleState = usePeople();

  return (
    <div>
      <h1>Controle de Gastos Residenciais</h1>
      <PeoplePanel
        people={peopleState.people}
        loading={peopleState.loading}
        error={peopleState.error}
        onCreate={(name, age) => peopleState.create({ name, age })}
        onRemove={(id) => peopleState.remove(id)}
      />
    </div>
  );
}

export default App;