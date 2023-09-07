import { useState, useEffect } from 'react'
import axios from 'axios'
import ListFlora from './ListFlora'
import { uid } from 'uid'

const url = 'http://localhost:3000/features'

function AddFlora() {
  const [floras, setFloras] = useState([])
	const [isUpdate, setIsUpdate] = useState({ id: null, status: false })
  const [formData, setFormData] = useState({
      latitude: '',
      longtitude: '',
      species: "",
      kolektor: "",
      description: "",
      habitus: "",
      ecology: "",
      distribution: "",
      manfaat: "",
      image: ""
    })

	//MENGAMBIL DATA
	useEffect(() => {
    axios.get(url).then((res) => {
      setFloras(res?.data ?? [])
    })
  }, [])

  // MENANGANI PERUBAHAN PADA FORM
  function handleChange(e){
    let data = { ...formData }
    data[e.target.id] = e.target.value
    setFormData(data)
  }

  function handleSubmit(e){
    e.preventDefault() //biar ga reload

    // MEMANGGIL DATA FLORAS
    let data = [...floras]
    console.log(isUpdate.status)
    
    if(isUpdate.status){
      data.forEach((flora) => {
        if(flora.id === isUpdate.id) {
          flora.properties.Species = formData.species
          flora.geometry.coordinates[1] = formData.latitude
          flora.geometry.coordinates[0] = formData.longtitude
          flora.geometry.Image = formData.image
          flora.properties.Description = formData.description
          flora.properties.Ecology = formData.ecology
          flora.properties.Habitus = formData.habitus
          flora.properties.Distribution = formData.distribution
          flora.properties.Manfaat = formData.manfaat
          flora.properties.Kolektor = formData.kolektor
        }
      })

      axios.put(`${url}/${isUpdate.id}`, {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [parseFloat(formData.longtitude), parseFloat(formData.latitude)]
        },
        properties: {
          Species: formData.species,
          Kolektor: formData.kolektor,
          Description: formData.description,
          Habitus: formData.habitus,
          Ecology: formData.ecology,
          Distribution: formData.distribution,
          Manfaat: formData.manfaat,
          Image: formData.image
        }
      }).then(() => {
        alert("Berhasil Terupdate")
      })

        
    } else {
      let newData = {
        id: uid(),
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [parseFloat(formData.longtitude), parseFloat(formData.latitude)]
        },
        properties: {
          Species: formData.species,
          Kolektor: formData.kolektor,
          Description: formData.description,
          Habitus: formData.habitus,
          Ecology: formData.ecology,
          Distribution: formData.distribution,
          Manfaat: formData.manfaat,
          Image: formData.image
        }
      }
      
      //MENAMBAHKAN CONTACT
      data.push(newData)
      
      axios.post(url, newData).then(() => {
          alert('Data Berhasil Disimpan')
        })
    }
        
    setIsUpdate({ id: null, status: false }) 
    setFloras(data)
    setFormData({
      latitude: '',
      longtitude: '',
      species: "",
      kolektor: "",
      description: "",
      habitus: "",
      ecology: "",
      distribution: "",
      manfaat: "",
      image: ""
    })
  }

  function handleEdit(id) {
    let data = [...floras]
    let foundData = data.find(flora => flora.id === id)
    // console.log(id)
    setFormData({ 
      latitude: foundData.geometry.coordinates[1],
      longtitude: foundData.geometry.coordinates[0],
      species: foundData.properties.Species,
      kolektor: foundData.properties.Kolektor,
      description: foundData.properties.Description,
      habitus: foundData.properties.Habitus,
      ecology: foundData.properties.Ecology,
      distribution: foundData.properties.Distribution,
      manfaat: foundData.properties.Manfaat,
      image: foundData.properties.Image
    })
    setIsUpdate({ id: id, status: true })
  }

  function handleDelete(id) {
    let data = [...floras]
    let foundData = data.filter(flora => flora.id !== id)

    axios.delete(`${url}/${id}`).then(() => {
        alert("Data Berhasil Dihapus")
    })

    confirm('Yakin?') ? setFloras(foundData) : '' 
  }

	return (
    <>
		<div className={`flex flex-col py-16 mx-[25%]`}>
      {/* HEADING */}
      <div className="text-2xl font-bold text-center">
        Add Flora
      </div>
      <form onSubmit={handleSubmit} action="" className="flex flex-col justify-center">
        {/* REQUIRED TO FILL */}
        <p className="text-xs text-redFo italic font-semibold">Required to Fill*</p>
        {/* SPECIES */}
        <div className="mb-4">
          <label
            htmlFor="species"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Species
          </label>
          <input
            type="text"
            id="species"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Name of Species"
            required
            onChange={handleChange}
            value={formData.species}
          />
        </div>
        <div className="flex gap-4 mb-4">
          {/* LATITUDE */}
          <div className="basis-1/2">
            <label
              htmlFor="latitude"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="0.0"
              required
              onChange={handleChange}
              value={formData.latitude}
            />
          </div>
          {/* LONGTITUDE */}
          <div className="basis-1/2">
            <label
              htmlFor="longtitude"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Longtitude
            </label>
            <input
              type="number"
              id="longtitude"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="0.0"
              required
              onChange={handleChange}
              value={formData.longtitude}
            />
          </div>
        </div>
        {/* IMAGE LINK */}
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Link of Image Flora
          </label>
          <input
            type="text"
            id="image"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="https://example.com"
            required
            onChange={handleChange}
            value={formData.image}
          />
        </div>

        <hr className="h-px my-4 bg-gray-200 border-0"></hr>

        {/* OPTIONAL */}
        <p className="text-xs text-secondary italic font-semibold">Optional</p>
        {/* DESCRIPTION */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={2}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Description species flora"
            onChange={handleChange}
            value={formData.description}
          />
        </div>
        {/* ECOLOGY */}
        <div className="mb-4">
          <label
            htmlFor="ecology"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Ecology
          </label>
          <textarea
            id="ecology"
            rows={2}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ecology species flora"
            onChange={handleChange}
            value={formData.ecology}
          />
        </div>
        {/* HABITUS */}
        <div className="mb-4">
          <label
            htmlFor="habitus"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Habitus
          </label>
          <textarea
            id="habitus"
            rows={2}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Habitus species flora"
            onChange={handleChange}
            value={formData.habitus}
          />
        </div>
        {/* DISTRIBUTION */}
        <div className="mb-4">
          <label
            htmlFor="distribution"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Distribution
          </label>
          <textarea
            id="distribution"
            rows={2}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Distribution species flora"
            onChange={handleChange}
            value={formData.distribution}
          />
        </div>
        {/* BENEFIT */}
        <div className="mb-4">
          <label
            htmlFor="manfaat"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Benefit
          </label>
          <textarea
            id="manfaat"
            rows={2}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Benefit species flora"
            onChange={handleChange}
            value={formData.manfaat}
          />
        </div>
        {/* COLLECTOR */}
        <div className="mb-6">
          <label
            htmlFor="kolektor"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Collector
          </label>
          <input
            type="text"
            id="kolektor"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Name of Collector"
            onChange={handleChange}
            value={formData.kolektor}
          />
        </div>
        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-32 self-center">Add Flora</button>
      </form>
    </div>
    <ListFlora floras={floras} handleEdit={handleEdit} handleDelete={handleDelete} />
    </>
	)
}

export default AddFlora