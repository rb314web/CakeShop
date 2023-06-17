import './header.scss';
import Arrow from '../Arrow 1.png'

const Header = () => {
	return (
		<div className='header'>
            <div className='header_shadow'></div>
            <h1 className='header_text'>"Słodkie chwile, które rozpieszczają zmysły!"</h1>
            <button className='header_button'>Sprawdź ofertę <img src={Arrow}></img></button>
        </div>
	);
};

export default Header;
