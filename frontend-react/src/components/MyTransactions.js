export function MyTransactions({ transactions, fetchTransactions }) {
  return (
    <section>
      <h4>My Transactions:</h4>
      <button class="button" onClick={fetchTransactions}>Load Transactions</button>
      <br />
      <table>
        <tbody>
          {transactions.map((transaction, index) => {
            <tr key={index}>
              <td>
                <pre>
                  {JSON.stringify(transaction)}
                </pre>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </section>
  );
}