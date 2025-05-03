import { lazy, Suspense } from 'react';
import bpLogo from './assets/bp_icon.svg';
import './App.css';
import Loading from './components/Loading';
import ErrorMessage from './components/Error';
import { AccountType } from './types';
import { useAccounts } from './queries/useAccounts';
import { UseTransactions } from './queries/useTransactions';

const Account = lazy(() => import('./components/Account'));
const Transactions = lazy(() => import('./components/Transactions'));

export const apiUrl = 'https://api.dev.backpackpay.com/api/v1/mocks';

function App(): React.ReactElement {
  const { data: accounts, isError: accountsIsError } = useAccounts();
  const { data: transactions, isError: transactionsIsError } = UseTransactions();

  const activeAccounts = accounts?.filter(account => account.status === "ACTIVE");

  const accountCards = activeAccounts?.map((account: AccountType): React.JSX.Element => {
    return (
      <Account
        name={account.name}
        id={account.id}
        accountNumber={account.account_number}
        routingNumber={account.routing_number}
        key={account.id}
      />
    );
  });

  return (
    <>
      <header className='p-4 border-gray-400 border-b border-solid'>
        <div className='m-auto'>
          <img src={bpLogo} alt={'Backpack logo and title'} width='170' height='35' />
        </div>
      </header>
      <main className='p-4'>
        <h1 className='m-auto mb-2 text-bpBlue'>Accounts & Transactions</h1>
        <Suspense fallback={<Loading />}>
          <div className='xl:flex lg:gap-3 m-auto'>
            <section className='min-w-1/4'>
              {accountsIsError ? <ErrorMessage errorData='accounts' /> : accountCards}
            </section>
            <section className='flex-4/5 bg-lightGray mt-4 lg:mt-4 xl:mt-0 rounded-lg'>
              {transactionsIsError ? <ErrorMessage errorData='transactions' /> : <Transactions transactions={transactions} />}
            </section>
          </div>
        </Suspense>
      </main>
    </>
  );
};

export default App;
