import TodoList from "./TodoList";
import WebSocketComponent from "./WebSocketComponent";
import WelcomePage from "./WelcomePage";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <>
      <ChakraProvider>
        {/* <TodoList></TodoList> */}
        {/* <WebSocketComponent /> */}
        <WelcomePage></WelcomePage>
      </ChakraProvider>
    </>
  );
}

export default App;
