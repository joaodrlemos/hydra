import "./app.scss";
import Navbar from "./components/navbar/Navbar";
import Container from "./components/container/Container";

const App = () => {
  return (
    <main className="main">
      <Navbar />
      <Container />
    </main>
  );
};

export default App;
