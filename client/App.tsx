import React from "react";

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>I am a basic React app :)</p>
      <p>
        For more info, check out{" "}
        <a
          href="https://github.com/AidanTilgner/App-Template.git"
          target="_blank"
        >
          this repo
        </a>
        .
      </p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count > 0 ? `I have been clicked ${count} times` : "Click me!"}
      </button>
    </div>
  );
}

export default App;
