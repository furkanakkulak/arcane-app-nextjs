import { useContext } from 'react';
import { useRouter } from 'next/router';
import { AppContext } from '@/context/ContextProvider';
import {
  faScaleBalanced,
  faScaleUnbalanced,
  faShop,
  faUser,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Widget from '@/components/Widget';

const Dashboard = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AppContext);

  return (
    <main>
      <h1 className="page-title">Welcome to the Dashboard!</h1>
      <div className="dashboard-cards">
        <Widget
          icon={faUser}
          title="users"
          percentage="20"
          counter="124312"
          url="/users"
          text="See all users"
        />
        <Widget
          icon={faShop}
          title="products"
          percentage="30"
          counter="1234"
          url="/products"
          text="See all products"
        />
        <Widget
          icon={faWallet}
          title="Balance"
          percentage="13"
          url="/balance"
          counter="$124.312.03"
          text="View net earnings"
        />
      </div>
    </main>
  );
};

export default Dashboard;
