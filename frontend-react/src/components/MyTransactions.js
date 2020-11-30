export function MyTransactions({ transactions, loadTransactions }) {
  return (
    <section>
      <h4>My Transactions:</h4>
      <button className="button" onClick={loadTransactions}>
        Load Transactions
      </button>
      <br />
      {
        transactions.length > 0 ?
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Symbol</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => 
                <tr key={index}>
                  <td>{transaction.time}</td>
                  <td>{transaction.from}</td>
                  <td>{transaction.to}</td>
                  <td>{transaction.value}</td>
                  <td>{transaction.tokenSymbol}</td>
                </tr>
              )}
            </tbody>
          </table>
        : ''
      }
    </section>
  );
}