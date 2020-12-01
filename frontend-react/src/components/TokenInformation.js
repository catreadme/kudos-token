import React from 'react';

export function TokenInformation({ 
  tokenName, 
  tokenSymbol, 
  tokenDecimals, 
  tokenSupply 
}) {
  return (
    <section>
      <h4>Token Information</h4>
      <table>
        <tbody>
          <tr>
            <th>Token Name:</th>
            <td>{tokenName}</td>
          </tr>
          <tr>
            <th>Token Symbol:</th>
            <td>{tokenSymbol}</td>
          </tr>
          <tr>
            <th>Token Decimals:</th>
            <td>{tokenDecimals}</td>
          </tr>
          <tr>
            <th>Token Supply:</th>
            <td>{tokenSupply}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
