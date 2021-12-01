import React from 'react';
import { Routes, Route } from 'react-router';
import logo from './logo.svg';
import './App.scss';
import { useValidatedMask } from './hooks';
import { Link } from 'react-router-dom';
import { Box, MaxHeightContainer } from './components';
import { PokemonRoute } from './routes';
import { TodoRoute } from './routes/TodoRoute';

const Home = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Typescript demo
    </p>
    <a
      className="App-link"
      href="https://www.typescriptlang.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Docs
    </a>
  </header>
)

const HookExample = () => {
  const [zip, setZip, isValidZip] = useValidatedMask({
    initialState: '',
    validationMask: 'zip-code',
  })

  const [custom, setCustom, isValidCustom] = useValidatedMask({
    initialState: '',
    validation: /^[a-zA-Z]/,
    mask: (val: string) => val.replace(/[^a-zA-Z]/, '').toLowerCase(),
  })

  return (
    <div className="HookExample">
      <Box kind="flex" flexDirection="column" gap="m">
      <h1>Hooks</h1>
      <label>
        Zip code{' '}
        <input value={zip} onChange={(e) => setZip(e.target.value)} />
        {!isValidZip ? <span>!!!</span> : null}
      </label>
      <label>
        Letters Only{' '}
        <input value={custom} onChange={(e) => setCustom(e.target.value)} />
        {!isValidCustom ? <span>!!!</span> : null}
      </label>
      </Box>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <MaxHeightContainer
        fullHeight
        header={
          <nav>
            <Link to="/">Home</Link>
            <Link to="/hooks">Hooks</Link>
            <Link to="/todos">Todos</Link>
            <Link to="/pokemon">Pokemon API</Link>
          </nav>
        }
        footer={
          <footer>this is the footer</footer>
        }
      >
        <div className="App__content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hooks" element={<HookExample />} />
            <Route path="/todos" element={<TodoRoute />} />
            <Route path="/pokemon" element={<PokemonRoute />} />
          </Routes>
        </div>
      </MaxHeightContainer>
    </div>
  );
}

export default App;
