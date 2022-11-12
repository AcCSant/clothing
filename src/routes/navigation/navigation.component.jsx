import { Fragment, useContext } from 'react';
import {Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../contexts/user.context';
import {signOutUser} from '../../utils/firebase/firebase.utils';


const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  // //This method is just to show the user that is sighned out - this was removed because there is a way to show it better
  // const signOutHandler = async () => {
  //    await signOutUser();
  //   setCurrentUser(null);
  // }
  // console.log(currentUser);
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
            {
              currentUser ? (
                <span className='nav-link' onClick={signOutUser}>
                {' '} Sign Out  {' '}</span> )
                : (<Link className='nav-link' to='/auth'>
                {' '}
                Sign In  {' '}
            </Link>) 
             
            }
            
          </div>
        </div>
        <Outlet />
      </Fragment>
    );
  };

  export default Navigation;
  //Fragment is for when you dont want to render, but needs a top level component

  //Line 22 When there is a currentUser, render the sign out link otherwise it will be sign in