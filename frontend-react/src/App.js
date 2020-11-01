import { MyAccount } from './components/MyAccount';
import { MyTransactions } from './components/MyTransactions';
import { TokenInformation } from './components/TokenInformation';

export function App() {
  return (
    <div>
      <TokenInformation />
      <MyAccount />
      <MyTransactions />
    </div>
  );
}
