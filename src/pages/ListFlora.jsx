/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom'
import Modal from '../components/Modal';
import { useState } from 'react';

function ListFlora({floras, handleEdit, handleDelete}) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	function handleDetails(id) {
		let data = [...floras]
		let foundData = data.filter(flora => flora.id === id)
		setIsModalOpen(true);
	}

	return (
    <>
		<div className={`flex flex-col h-[calc(100vh-64px)] mt-[64px] p-16 gap-8`}>
			<div className="flex justify-between">
				<p className='text-3xl font-bold text-center'>List Flora 🌱</p>
				<NavLink to="" className='flex gap-2 items-center cursor-pointer px-4 py-2 rounded-lg bg-primary text-white hover:bg-[#E8EEDC] hover:text-primary'>
                    <span className="material-symbols-outlined">add_circle</span>
					Add Flora
                </NavLink>
			</div>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
					<tr>
						<th scope="col" className="px-6 py-3">
						Species
						</th>
						<th scope="col" className="px-6 py-3">
						Latitude
						</th>
						<th scope="col" className="px-6 py-3">
						Longtitude
						</th>
						{/* <th scope="col" className="px-6 py-3">
						Description
						</th> */}
						{/* <th scope="col" className="px-6 py-3">
						Ecology
						</th> */}
						{/* <th scope="col" className="px-6 py-3">
						Habitus
						</th> */}
						{/* <th scope="col" className="px-6 py-3">
						Distirbution
						</th> */}
						{/* <th scope="col" className="px-6 py-3">
						Benefit
						</th> */}
						{/* <th scope="col" className="px-6 py-3">
						Image
						</th> */}
						{/* <th scope="col" className="px-6 py-3">
						Kolektor
						</th> */}
						<th scope="col" className="px-6 py-3 text-center">
						Action
						</th>
					</tr>
					</thead>
					<tbody>
					{floras.map((flora, i) => (
						<tr className="bg-white border-b" key={i}>
							<th
							scope="row"
							className="px-6 py-4 font-medium text-gray-900"
							>
								{flora.properties.Species}
							</th>
							<td className="px-6 py-4">{flora.geometry.coordinates[1]}</td>
							<td className="px-6 py-4">{flora.geometry.coordinates[0]}</td>
							{/* <td className="px-6 py-4">{flora.properties.Description}</td> */}
							{/* <td className="px-6 py-4">{flora.properties.Ecology}</td> */}
							{/* <td className="px-6 py-4">{flora.properties.Habitus}</td> */}
							{/* <td className="px-6 py-4">{flora.properties.Distribution}</td> */}
							{/* <td className="px-6 py-4">{flora.properties.Manfaat}</td> */}
							{/* <td className="px-6 py-4">{flora.properties.Image}</td> */}
							{/* <td className="px-6 py-4">{flora.properties.Kolektor}</td> */}
							<td className="flex flex-wrap px-6 py-4 justify-center items-center gap-2">
                                <button onClick={() => handleEdit(flora.id)}><span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-blue-400 hover:text-white">Edit</span></button>
                                <button onClick={() => handleDelete(flora.id)}><span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-red-400 hover:text-white">Remove</span></button>
                                <button onClick={() => handleDetails(flora.id)}><span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-green-500 hover:text-white">Details</span></button>
                            </td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>

		{/* POPUP MODAL */}
		<div className="App">
			<Modal isOpen={isModalOpen} onClose={closeModal} floras={floras}>
				<p>This is the content of the modal.</p>
			</Modal>
		</div>
    </>
	)
}

export default ListFlora