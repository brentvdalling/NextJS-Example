import Navbar from '../components/Navbar'
import {useState} from 'react'

/**
 * This is performed server side before rendering the page. Anything put in here is safe
 * from inspection discovery. You will do any sensitive actions here like API keys or
 * encryption/decryption. Next automatically pulls this from the compiled source code
 * and runs it only on the node server.
 * 
 * @param {Next/Context} context 
 */
export async function getServerSideProps(context)
{
    return {
        props: {
			images: await getPhotos(getRandomWord(), null, 'large', 15, 'landscape')
        }
    }
}

/**
 * Query the pexels API to get all of the images for the site.
 * This API is pretty safe. Which is why the response is not checked before passing to the application
 * in this demo. In a production environment you WOULD perform checks here to ensure your app
 * does not crash on unexpected responses. Such as when the API return something not JSON encoded.
 * 
 * @param {string} query 
 * @param {string} color 
 * @param {string} size 
 * @param {int} results 
 * @param {string} orientation 
 */
const getPhotos = async (query, color, size, results, orientation) => {

	return await fetch(`https://api.pexels.com/v1/search?query=${query ? query : ''}&orientation=${orientation}&size=${size}&color=${color}&per_page=${results ? results : 15}`, { 
		method: "get",
		headers: {
			Authorization: `563492ad6f91700001000001e0199175504048a48b5dd61b13dcc1a6`
		}
	}).then(resp => resp.json());
};

/**
 * used to get a random word to query
 * the pexels API with. This simulates 
 * random pages on load without a query.
 */
const getRandomWord = () => {
	const words = [
		"utah",
		"texas",
		"california",
		"oregon",
		"taco",
		"taco",
		"lake"
	];

	// This essentially creates a random number between 0-<words-array> length.
	return words[Math.floor(Math.random() * (words.length - 1) + 1) - 1];
}



export default function Home({images}) {

	/**
	 * this sets our default states using the built in 
	 * useState manager with react.
	 */
	const [photos, setPhotos] = useState(images);
	const [modalImage, setModalImage] = useState(null);

	// Perform query based on form values.
	//
	const handleFormSubmit =  async (event) => {
		event.preventDefault();

		let query = document.getElementById('filter[query]').value;
		const color = document.getElementById('filter[color]').value;
		const size = document.getElementById('filter[size]').value;
		const results = document.getElementById('filter[results]').value;
		const orientation = document.getElementById('filter[orientation]').value;

		// Do any validation here for the form.
		//
		query = query ? query : getRandomWord();
		
		setPhotos(await getPhotos(query, color, size, results, orientation));
	}

	// get the next or previous page returned
	// by the API query. This allows a user
	// To traverse the results.
	//
	const getPage = async (page) => {

		// Make sure we have a page value to call.
		if(page != undefined && page != null) {
		
			// Set the results.
			setPhotos(await fetch(page, { 
				method: "get",
				headers: {
					Authorization: `563492ad6f91700001000001e0199175504048a48b5dd61b13dcc1a6`
				}
			}).then(resp => resp.json()));
		}
	};

	/**
	 * return the JSX Page.
	 */
	return (
		<div className="app-container">
			
			<Navbar/>
			
			<div className="content">
				<div className="w-full md:w-2/3 mx-auto flex flex-row flex-wrap content-center px-5 mb-20 my-3 md:my-10">
					
					<form className="w-full m-2 p-0 relative flex flex-row flex-wrap" onSubmit={handleFormSubmit}>
						<div className="w-full">
							<input type="text" className="w-full p-3 bg-white rounded border text-gray-700" id="filter[query]" placeholder="Search Pexels"/>
							<button type="submit" className="absolute right-0 mr-5 text-lg p-3 text-gray-500 hover:text-gray-700 cursor-pointer">Search</button>
						</div>

						<div className="w-full py-3 text-xl text-gray-500">
							Filters
						</div>

						<div className="w-1/2 md:w-auto my-1 md:my-0 md:mr-3 p-1">
							<select className="w-full p-1 bg-white rounded text-gray-400" id="filter[color]" defaultValue="">
								<option>Any Color</option>
								<option value="red">Red</option>
								<option value="orange">Orange</option>
								<option value="green">green</option>
								<option value="turquoise">Turquoise</option>
								<option value="blue">Blue</option>
								<option value="violet">Violet</option>
								<option value="pink">Pink</option>
								<option value="brown">Brown</option>
								<option value="black">Black</option>
								<option value="gray">Gray</option>
								<option value="white">White</option>
							</select>
						</div>

						<div className="w-1/2 md:w-auto my-1 md:my-0 md:mx-3 p-1">
							<select className="w-full p-1 bg-white rounded text-gray-400" id="filter[size]" defaultValue="large">
								<option>Any Size</option>
								<option value="large">Large (24MP)</option>
								<option value="medium">Medium (12MP)</option>
								<option value="small">Small (4MP)</option>
							</select>
						</div>

						<div className="w-1/2 md:w-auto my-1 md:my-0 md:mx-3 p-1">
							<select className="w-full p-1 bg-white rounded text-gray-400" id="filter[results]" defaultValue="15">
								<option value="15">15 Results</option>
								<option value="30">30 Results</option>
								<option value="50">50 Results</option>
								<option value="80">80 Results</option>
							</select>
						</div>

						<div className="w-1/2 md:w-auto my-1 md:my-0 md:mx-3 p-1">
							<select className="w-full p-1 bg-white rounded text-gray-400" id="filter[orientation]" defaultValue="landscape">
								<option>Any Orientation</option>
								<option value="landscape">Landscape</option>
								<option value="portrait">Portrait</option>
							</select>
						</div>
					</form>

					<div className="w-full text-gray-400 text-right md:-mt-7 mr-2 p-2">
							{Math.round(photos.total_results / photos.per_page)} Pages & {photos.total_results} Results.
						</div>
					
					{photos.photos.map((photo) => {
						return (
							<button onClick={() => setModalImage(photo)} key={photo.id} className="w-full md:w-1/3 p-2">
								<img className="w-full zoom rounded" src={photo.src.medium}/>
							</button>
						)
					})}

					{photos.photos.length == 0 ? (<div className="w-full text-lg text-center text-gray-400 m-2 p-10">No Results</div>) : ''}

					<div className="w-full flex flex-row flex-wrap">
						<div className="w-1/2">
							{photos.prev_page ? (<div onClick={() => getPage(photos.prev_page)} className="text-lg hover:text-gray-600 text-gray-500 p-3 cursor-pointer">Prev Page</div>) : ''}
						</div>

						<div className="w-1/2 text-right">
							{photos.next_page ? (<div onClick={() => getPage(photos.next_page)} className="text-lg hover:text-gray-600 text-gray-500 p-3 cursor-pointer">Next Page</div>) : ''}
						</div>
					</div>
				</div>
			</div>

			{modalImage != null ? (
				<div class="fixed w-screen h-screen z-40 overflow-scroll bg-smoke-darker flex" onClick={() => setModalImage(null)}>
					<div class="p-2 md:w-2/3 w-full m-auto flex-col flex rounded z-50 items-center" onClick={(event) => event.stopPropagation()} >
						<div className="relative">
							<button className="absolute top-0 right-0 mr-2 md:-mr-8 text-3xl -mt-10 text-white" onClick={() => setModalImage(null)}><i className="fa fa-close"/></button>
							<a href={modalImage.photographer_url} target="_blank" className="absolute bottom-0 left-0 ml-2 -mb-8 text-gray-200">{modalImage.photographer}</a>
							<img className="rounded" src={modalImage.src.large2x} style={{maxHeight: '80vh'}} />
						</div>
					</div>
				</div>
			):null}
		</div>
	)
}
