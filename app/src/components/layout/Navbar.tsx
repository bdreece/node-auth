import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelf } from 'components/providers/SelfProvider';

import styles from 'styles/Navbar.module.scss';

const Navbar: FC = () => {
  const user = useSelf();

  return (
    <nav className={styles.navbar}>
      <h1>App</h1>
      <div className={styles.spacer} />
      {user ? (
        <>
          <p>{`${user.firstName} ${user.lastName}`}</p>
          <Link to='/logout'>Logout</Link>
        </>
      ) : (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
