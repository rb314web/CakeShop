import './about.scss';
import Photo1 from '../pasta-gdad9646c0_1280.jpg';
import Photo2 from '../herbs-g96e2f6537_1280.jpg';

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
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque nisi
					voluptate quod deleniti recusandae nesciunt sed exercitationem error.
					Harum laborum reprehenderit eius alias, quis amet quae magni.
					Voluptatibus, corrupti laudantium.
				</p>
                <img src={Photo2}></img>
			</div>
		</div>
	);
};

export default About;
