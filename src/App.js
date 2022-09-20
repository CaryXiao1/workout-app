import './App.css';
import Container from './components/layouts/Container';
import Title from './components/layouts/Title';

import { useState } from 'react';

function App() {
  // used by LoadButtons to change from title to main application
  const [showTitle, setShowTitle] = useState(true)

  // get/set JSON for all data
  const [data, setData] = useState({})
  return (
    <div className="App">
      <script src="https://kit.fontawesome.com/b81b9feca9.js" crossOrigin="anonymous"></script>
      {showTitle && <Title setShowTitle={setShowTitle} setData={setData} />}
      {!showTitle && <Container data={data} setData={setData} /> }
    </div>
  );
}

export default App;
