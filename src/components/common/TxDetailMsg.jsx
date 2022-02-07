import { Link } from 'react-router-dom';

const TxDetailMsg = ({ transaction }) => (
  <div>
    <h2 className="font-sans md:text-h6">
      {/* {transaction.description} */}
      {transaction.description || 'Transaction Succeed'}
    </h2>
    <a
      rel="noreferrer"
      target="_blank"
      href={`${transaction.etherscan}/tx/${transaction.hash}`}
      className="font-Montserrat text-dark-blue font-semibold md:text-body-md text-body-sm underline"
    >
      View on explorer
    </a>
  </div>
);

export default TxDetailMsg;
