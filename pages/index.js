import Navbar from '../components/Navbar'
import {useState} from 'react'


const getPhotos = async (query) => {
	const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&orientation=landscape&size=large&color=red`, { 
		method: "get",
		headers: {
			Authorization: `563492ad6f91700001000001e0199175504048a48b5dd61b13dcc1a6`
		}
	}).then(resp => resp.json());

	return response.photos;
};

export async function getServerSideProps(context)
{
    return {
        props: {
			images: await getPhotos('utah')
        }
    }
}

export default function Home({images}) {

	const [photos, setPhotos] = useState(images);
	const [modalImage, setModalImage] = useState(null);

	const handleFormSubmit =  async (event) => {
		event.preventDefault();

		const query = document.getElementsByName('filter[query]')[0].value;
		
		setPhotos(await getPhotos(query));
	}

	return (
		<div className="app-container">
			
			<Navbar/>
			
			<div className="content">
				<div className="w-full md:w-2/3 mx-auto flex flex-row flex-wrap content-center px-5 mb-20 my-3 md:my-10">
					
					<form className="w-full m-2 p-0 relative" onSubmit={handleFormSubmit}>
						<input type="text" className="w-full p-3 bg-white rounded border text-gray-700" name="filter[query]" placeholder="Utah"/>
						<button type="submit" className="absolute right-0 mr-5 text-lg p-3 text-gray-500 hover:text-gray-700 cursor-pointer">Search</button>
					</form>
					
					{photos.map((photo) => {
						return (
							<button onClick={() => setModalImage(photo)} key={photo.id} className="w-full md:w-1/3 p-2">
								<img className="w-full zoom rounded" src={photo.src.medium}/>
							</button>
						)
					})}

					{photos.length == 0 ? (<div className="w-full text-lg text-gray-500 m-2 pl-1">No Results</div>) : ''}
				</div>
			</div>

			{modalImage != null ? (
				<div class="fixed w-screen h-screen z-40 overflow-auto bg-smoke-darker flex" onClick={() => setModalImage(null)}>
					<div class="relative p-2 md:w-2/3 w-full m-auto flex-col flex rounded z-50" onClick={(event) => event.stopPropagation()}>
						<button className="absolute top-0 right-0 mr-2 md:-mr-8 text-3xl -mt-10 text-white" onClick={() => setModalImage(null)}><i className="fa fa-close"/></button>
						<a href={modalImage.photographer_url} target="_blank" className="absolute bottom-0 left-0 ml-2 -mb-5 text-gray-200">{modalImage.photographer}</a>
						<img className="rounded w-full" src={modalImage.src.large2x} />
					</div>
				</div>
			):null}
		</div>
	)
}
