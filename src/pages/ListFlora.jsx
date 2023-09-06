import floras from '../data/floras.json'

function ListFlora() {
	return (
    <>
		<div className={`flex flex-col h-[calc(100vh-64px)] mt-[64px] p-16`}>
			<div className="text-2xl font-bold text-center">
				List Flora
			</div>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
						<th scope="col" className="px-6 py-3">
						Description
						</th>
						<th scope="col" className="px-6 py-3">
						Ecology
						</th>
						<th scope="col" className="px-6 py-3">
						Habitus
						</th>
						<th scope="col" className="px-6 py-3">
						Distirbution
						</th>
						<th scope="col" className="px-6 py-3">
						Benefit
						</th>
						<th scope="col" className="px-6 py-3">
						Image
						</th>
						<th scope="col" className="px-6 py-3">
						Kolektor
						</th>
					</tr>
					</thead>
					<tbody>
					{floras.features.map((flora, i) => (
						<tr className="bg-white border-b" key={i}>
							<th
							scope="row"
							className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
							>
								{flora.properties.Species}
							</th>
							<td className="px-6 py-4">{flora.geometry.coordinates[1]}</td>
							<td className="px-6 py-4">{flora.geometry.coordinates[0]}</td>
							<td className="px-6 py-4 line-clamp-4">{flora.properties.Description}</td>
							<td className="px-6 py-4">{flora.properties.Ecology}</td>
							<td className="px-6 py-4">{flora.properties.Habitus}</td>
							<td className="px-6 py-4 line-clamp-4 hover:line-clamp-none">{flora.properties.Distribution}</td>
							<td className="px-6 py-4">{flora.properties.Manfaat}</td>
							<td className="px-6 py-4 line-clamp-4 hover:line-clamp-none">{flora.properties.Image}</td>
							<td className="px-6 py-4">{flora.properties.Kolektor}</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>

		</div>
    </>
	)
}

export default ListFlora