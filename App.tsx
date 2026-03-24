import Toast from "react-native-toast-message";
import Navigation from "./app/navigation";
import { FluxoVendaProvider } from "./provider";

const App = () => {

  return (
    <FluxoVendaProvider>
      <Navigation />
      <Toast />
    </FluxoVendaProvider>
  );
}

export default App;