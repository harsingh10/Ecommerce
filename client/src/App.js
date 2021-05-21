import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import AppRouter from "./routes/AppRouter";


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <section className={"container"}>
          <AppRouter />
        </section>
      </Provider>
    </div>
  );
}
export default App;
