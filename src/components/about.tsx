import './about.scss';
import Photo1 from '../pasta-gdad9646c0_1280.jpg';
import Photo2 from '../herbs-g96e2f6537_1280.jpg';

const About = () => {
	return (
		<div className='about'>
			<div className='about_about'>
				<div>
                <h2>O nas</h2>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque nisi
					voluptate quod deleniti recusandae nesciunt sed exercitationem error.
					Harum laborum reprehenderit eius alias, quis amet quae magni.
					Voluptatibus, corrupti laudantium.
				</p>
				</div>
                <img src={Photo1}></img>
			</div>
			<div className='about_ingredients'>
            <div>
				<h2>Najwyższej jakości składniki</h2>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque nisi
					voluptate quod deleniti recusandae nesciunt sed exercitationem error.
					Harum laborum reprehenderit eius alias, quis amet quae magni.
					Voluptatibus, corrupti laudantium.
				</p>
                </div>
                <img src={Photo2}></img>
			</div>
		</div>
	);
};

export default About;
