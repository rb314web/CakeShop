import { useContext } from 'react';
import './header.scss';
import Arrow from '../Arrow 1.png'

import { UserContext } from './context';

const Header = () => {

    const [userContext, setUserContext] = useContext<any>(UserContext);

	return (
		<div className='header'>
            <div className='header_shadow'></div>
            <h1 className='header_text'>"Słodkie chwile, które rozpieszczają zmysły!"</h1>
            <h1 style={{color: 'white', zIndex: '100'}}>{userContext.providerData ? `Witaj ${userContext.providerData[0].displayName}!` : null }</h1>
            <button className='header_button'>Sprawdź ofertę <img src={Arrow}></img></button>
        </div>
	);
};

export default Header;
