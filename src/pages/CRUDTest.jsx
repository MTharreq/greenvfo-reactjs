import axios from 'axios'
import { useState, useEffect } from 'react'
import { uid } from 'uid'

const url = 'http://localhost:3000/contacts'

export default function CRUDTets() {  

    const [contacts, setContacts] = useState([])

    const [isUpdate, setIsUpdate] = useState({ id: null, status: false })

    const [formData, setFormData] = useState({
        email: "",
        telp: ""
    })

    useEffect(() => {

        //MENGAMBIL DATA
        axios.get(url).then((res) => {
            console.log(res.data)
            setContacts(res?.data ?? [])
        })
    }, [])

    function handleChange(e){
        let data = { ...formData }
        data[e.target.id] = e.target.value
        setFormData(data)
    }

    function handleSubmit(e){
        e.preventDefault() //biar ga reload

        // MEMANGGIL DATA CONTACTS
        let data = [...contacts]
        
        if(isUpdate.status){
            data.forEach((contact) => {
                if(contact.id === isUpdate.id) {
                    contact.email = formData.email
                    contact.telp = formData.telp
                }
            })

            axios.put(`${url}/${isUpdate.id}`, {
                email: formData.email,
                telp: formData.telp
            }).then(() => {
                alert("Berhasil Terupdate")
            })

            
        } else {
            let newData = {id: uid(), email: formData.email, telp: formData.telp}
            
            //MENAMBAHKAN CONTACT
            data.push(newData)
            
            axios.post(url, newData).then(() => {
                    alert('Data Berhasil Disimpan')
                })
            }
            
            setIsUpdate({ id: null, status: false }) 
            setContacts(data)
            setFormData({ email: "", telp: "" })
    }

    function handleEdit(id) {
        let data = [...contacts]
        let foundData = data.find(contact => contact.id === id)
        setFormData({ email: foundData.email, telp: foundData.telp })
        setIsUpdate({ id: id, status: true })
    }

    function handleDelete(id) {
        let data = [...contacts]
        let foundData = data.filter(contact => contact.id !== id)

        axios.delete(`${url}/${id}`).then(() => {
            alert("Data Berhasil Dihapus")
        })

        confirm('Yakin?') ? setContacts(foundData) : ''
    }


	return (
    <>
		<div className={`flex flex-col h-[calc(100vh-64px)] mt-[64px] p-16 text-center bg-gray-50`}>
            <p className="font-bold text-xl">CRUD TESTING 🎯</p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="mx-[35%] px-4 py-6 my-6 rounded-lg shadow-md bg-white">
                <div className="mb-6">
                    <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    >
                    Your email
                    </label>
                    <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="name@flowbite.com"
                    required
                    onChange={handleChange}
                    value={formData.email}
                    />
                </div>
                <div className="mb-6">
                    <label
                    htmlFor="telp"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    >
                    No. Telp
                    </label>
                    <input
                    type="number"
                    id="telp"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                    onChange={handleChange}
                    value={formData.telp}
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    Submit
                </button>
            </form>

            {/* TABLE */}
            <div className="relative overflow-x-auto rounded-lg shadow-md mx-[25%]">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                        Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                        No. Telp
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                        Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {contacts.map(contact => (
						<tr className="bg-white border-b" key={contact.id}>
                            <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                            {contact.email}
                            </th>
                            <td className="px-6 py-4">{contact.telp}</td>
                            <td className="px-6 py-4 text-center">
                                <button onClick={() => handleEdit(contact.id)}><span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-blue-400 hover:text-white">Edit</span></button>
                                <button onClick={() => handleDelete(contact.id)}><span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-red-400 hover:text-white">Remove</span></button>
                            </td>
                        </tr>
					))}
                    </tbody>
                </table>
            </div>

		</div>
    </>
	)
}