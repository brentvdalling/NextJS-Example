import Navbar from '../components/Navbar'

export default function About() {

	return (
		<div className="app-container">
			<Navbar/>
			<div className="content">
				<div className="w-full md:w-2/3 mx-auto p-5 my-3 md:my-10 text-gray-600 text-lg ">
                    <span className="text-3xl">About</span>
                    <p className="pt-3">
                        We offer a free image search for pexels. You can find any image through our search free of ads. We offer photographer attribution and downloads. This tool was developed as an example for building apps in <b>NextJS</b>. 
                        NextJS is a React framework with some cool features baked in.
                    </p>

                    <div className="py-3 relative overflow-hidden" style={{height: '500px'}}>
                        <iframe className="w-full h-full" src="https://www.youtube.com/embed/A63UxsQsEbU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>

				</div>
			</div>
		</div>
	)
}
