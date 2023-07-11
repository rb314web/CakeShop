import './footer.scss';
import Cookie from '../assets/cookie.png';

const Footer = () => {
	return (
		<div className='footer'>
			<img className='footer_img' src={Cookie}></img>
			<div className='footer_text'>
				<p>Ciastka.pl</p>
				<p>ul. Kolorowa 41</p>
				<p>65-562 Warszawa</p>
				<p>Telefon: <a href="tel:658-658-652">658-658-652</a></p>
				<p>E-mail: <a href="mailto:biuro@ciastka.pl">biuro@ciastka.pl</a></p>
			</div>
		</div>
	);
};

export default Footer;
