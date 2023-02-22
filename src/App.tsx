import { useEffect, useState } from "react";
import "./App.css";
import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";
// `@chakra-ui/theme` is a part of the base install with `@chakra-ui/react`
import chakraTheme from "@chakra-ui/theme";

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});

function App() {
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    //
  }, []);
  return (
    <ChakraBaseProvider theme={theme}>
      <div className="App">
        <h1>Users matches</h1>
      </div>
    </ChakraBaseProvider>
  );
}

export default App;
