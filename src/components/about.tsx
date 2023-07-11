import './about.scss';
import Photo1 from '../assets/pasta-gdad9646c0_1280.jpg';
import Photo2 from '../assets/herbs-g96e2f6537_1280.jpg';

const About = () => {
	return (
		<div className='about'>
			<div className='about_item'>
                <h2>O nas</h2>
				<p>
				Nasz sklep z ciastami to owoc wieloletniej tradycji cukierniczej. Przez lata pielęgnowaliśmy tajemnicze przepisy i doskonaliliśmy sztukę wypieku. Każde ciasto to ukoronowanie naszej pasji i oddania. Przyjdź i skosztuj smaku historii, którą starannie wpleśliśmy w każdy kęs. Zapraszamy do odkrywania naszych słodkich korzeni!
				</p>

                <img src={Photo1}></img>
			</div>
			<div className='about_item'>

				<h2>Najwyższej jakości składniki</h2>
				<p>
				Odkryj niezwykły świat smaków w naszej cukierni! Nasze wyjątkowe składniki są tajemnicą naszych przepisów na doskonałe wypieki. Każdy składnik został starannie wybrany, aby zapewnić Ci niezapomniane doznania kulinarne.
				</p>
                <img src={Photo2}></img>
			</div>
		</div>
	);
};

export default About;