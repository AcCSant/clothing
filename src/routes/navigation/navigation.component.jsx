import { Fragment } from 'react';
import {Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.styles.scss';


const Navigation = () => {
    return (
      <Fragment>
        <div className='navigation'>
        <Link className='logo-container'to='/'>
          <CrwnLogo className='logo'/>
          </Link>
          <div className='links-container'>
            <Link className='nav-link' to='/shop'>
                SHOP
            </Link>
            <Link className='nav-link' to='/sign-in'>
                Sign In
            </Link>
          </div>
        </div>
        <Outlet />
      </Fragment>
    );
  };

  export default Navigation;
  //Fragment is for when you dont want to render, but needs a top level component