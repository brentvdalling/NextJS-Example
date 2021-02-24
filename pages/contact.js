import Navbar from '../components/Navbar'

export default function Contact() {

	return (
		<div className="app-container">
			<Navbar/>
			<div className="content">
				<div className="w-full md:w-2/3 mx-auto p-5 my-3 md:my-10 text-gray-600 text-lg ">
                    <span className="text-3xl">Contact</span>
                    <p className="pt-3">
                        Please contact us regarding any legal issues pertaining to our content at <b>support@timelydevs.com</b>. We get our images through the pexels API and attribute every photographer. Each image has a easy to find link which takes users directly 
                        to their photographer profile page on pexels.
                    </p>
				</div>
			</div>
		</div>
	)
}
