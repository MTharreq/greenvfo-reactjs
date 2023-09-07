import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import { divIcon, point } from 'leaflet';
import "leaflet/dist/leaflet.css"
// import MarkerClusterGroup from 'react-leaflet-cluster';
// import floras from '../data/floras.json'
import axios from 'axios'

const url = 'http://localhost:3000/features'

function Home() {

	const [floras, setFloras] = useState([])

	//MENGAMBIL DATA
	useEffect(() => {
		axios.get(url).then((res) => {
			setFloras(res?.data ?? [])
		})
	}, [])
	
	// // CREATE CUSTOM ICON (add Icon from leaflet)
	// const customIcon = new Icon({
	// iconUrl: markerIcon,
	// iconSize: [38, 38] // size of the icon
	// });

	// // CREATE GROUP OF CLUSTER MARKER
	// const createCustomClusterIcon = (cluster) => {
	// 	return new divIcon({
	// 		html: `<div>${cluster.getChildCount()}</div>`,
	// 		className: "flex bg-white justify-center items-center rounded-full border-2 border-gray-500 text-lg font-bold",
	// 		iconSize: point(33, 33, true)
	// 	})
	// }

	// DOM INFO BUTTON
	const [activeButton, setActiveButton] = useState(0)

	const buttons = [
		{ text: 'Description' },
		{ text: 'Ecology' },
		{ text: 'Benefit' },
		{ text: 'Collector' },
	];
	
	const handleButtonClick = (index) => {
		setActiveButton(index);
	};

	// DOM INFOBAR
	const [infoContent, setInfoContent] = useState([
		{ text: '' },
		{ text: '' },
		{ text: '' },
		{ text: '' },
		{ 
			Image: '',
			Species: 'Species',
			Habitus: 'Habitat',
			Distribution: 'Distribusi',
		},
	]);
	
	const handleSpecies = ({ Species, Kolektor, Description, Habitus, Ecology, Distribution, Manfaat, Image }) => {
		// Update the infoContent array with new values
		setInfoContent([
			{ text: Description },
			{ text: Ecology },
			{ text: Manfaat },
			{ text: Kolektor },
			{ Image, Species, Habitus, Distribution },
		]);
		setInfoDiv('flex')
	};

	// INFOBAR ACTIVE OR INACTIVE
	const [infoDiv, setInfoDiv] = useState('hidden')
	const handleInfoDivClick = () => {
		setInfoDiv('hidden');
	};

    return (
    <>
	{/* INFO FLORA */}
	<div className={`${infoDiv} absolute z-20 bg-white bottom-8 right-8 w-[28%] rounded-md shadow-md px-4 pb-6 pt-2 flex flex-col h-[85%] gap-2`}>
		<button onClick={() => handleInfoDivClick()} className='w-fit px-1 py-0 rounded-lg self-end hover:bg-gray-200 text-xl'>&times;</button>
		<div className="overflow-y-auto">
			<div className=" flex flex-col gap-2">
				<img src={`${infoContent[4].Image}`} alt="" className='w-fill border-2 border-black rounded-md'/>
				<h1 className='text-2xl font-bold'>{infoContent[4].Species}</h1>
				<h2 className='text-secondary text-sm'>{`${infoContent[4].Habitus} | ${infoContent[4].Distribution}`}</h2>
				<div className="flex gap-2">
					{buttons.map((button, index) => (
						<button
							type='button'
							key={index} 
							className={`px-3 py-2 rounded-lg font-semibold text-sm border-[1px] border-primary ${
								index === activeButton ? 'bg-primary text-white' : 'bg-white text-primary'}`}
							onClick={() => handleButtonClick(index)}>
								{button.text}
						</button>
					))}
				</div>
				{infoContent.map((info, index) => (
					<p key={index} className={`${index === activeButton ? '' : 'hidden'}`}>
						{info.text}
					</p>
				))}
			</div>
		</div>
	</div>

    {/* MAP CONTAINER */}
    <MapContainer center={[1.2, 116]} zoom={8} className={`h-[calc(100vh-64px)] z-0`}>
		<TileLayer
			attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>
		{/* <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon} > */}
			{floras.map((flora, i) => (
				<Marker position={flora.geometry.coordinates.toReversed()} key={i} eventHandlers={{click: () => handleSpecies(flora.properties)}}>
					<Popup>{flora.properties.Species}</Popup>
				</Marker>
			))}
		{/* </MarkerClusterGroup> */}
    </MapContainer>
    </>
	)
}

export default Home