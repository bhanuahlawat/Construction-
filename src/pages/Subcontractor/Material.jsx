import { X } from 'lucide-react';
import React, { useState } from 'react'
const delivariesData = [
  {
    id:1,
    meterail:"Electrical wiring",
    location:"Tower A, floor 3",
    supervisor:"Amit Mehra",
    startDate:"2025-10-01",
    endDate:"2025-10-15",
    status:"Ongoing",
    budget:"12,90,000"
  },
  {
    id:1,
    meterail:"Electrical wiring",
    location:"Tower A, floor 3",
    supervisor:"Amit Mehra",
    startDate:"2025-9-25",
    endDate:"2025-10-05",
    status:"Pending",
    budget:"12,90,000"
  },
  {
    id:1,
    meterail:"Tile Fitting",
    location:"Tower A, floor 3",
    supervisor:"Rohit Mehra",
    startDate:"2025-10-05",
    endDate:"2025-10-20",
    status:"Completed",
    budget:"12,90,000"
  }
]

const Material = () => {
  const [delivaries, setDeliveries] = useState(delivariesData);
  const [search, setSearch] = useState("");
    const[isModelOpen, setIsModelOpen] = useState(false)

    const filtered = delivaries.filter(d =>
      d.meterail.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase()) ||
      d.supervisor.toLowerCase().includes(search.toLowerCase())
    );
    const openModel = () => setIsModelOpen(true)
    const closeModal = () => setIsModelOpen(false)
  return (
   <>
   <div className='p-6 bg-gray-200 min-h-screen'>
    <h1 className='text-black text-2xl font-bold '>Material Delivaries</h1>
    <div className='flex justify-between mb-6'>
      <input type="text"
      placeholder='search '
      value={search}
      onChange={e => setSearch(e.target.value)}
      className='border rounded-full px-4 py-2 w-1/2' />
      <button onClick={openModel}className='
      items-center flex gap-2 bg-blue-500 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Add Material</button>
    </div>


    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {filtered.map((item) => (
        <div  key={item.id}className='bg-white p-6 rounded shadow hover:shadow-2xl transition-shadow'>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex justify-between items-center mb-2 '>
              <h3 className='text-lg font-semibold'>{item.meterail}</h3>

              </div>
                    <span className={`px-3 py-2 rounded-full text-white text-sm ${
                item.status === "Ongoing" 
                ? "bg-green-500"
                : item.status === "Pending"
                ? "bg-yellow-500"
                :"bg-gray-500"
              }`}>{item.status}</span>
          </div>
              {/* content */}
                <div className='text-gray-700 space-y-1'>
                  <p><span className='font-semibold'>Location:</span>{item.location}</p>
                  <p><span className='font-semibold'>Supervisor:</span>{item.supervisor}</p>
                  <p><span className='font-semibold'>Start:</span>{item.startDate}</p>
                  <p><span className='font-semibold'>End:</span>{item.endDate}</p>
                  <p><span className='font-semibold'>Location:</span>{item.budget}</p>

                </div>
          
        </div>
      ))}
    </div>
    {/* Modal */}
    {isModelOpen && (
      <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 '>
        <div className='bg-white p-6 rounded-xl w-full  max-w-md shadow-lg relative'>
          <button className='absolute top-3  right-3 text-gray-500 hover:text-gray-700' onClick={closeModal}><X className='W-5 h-5'/></button>
          <h2 className='text-xl font-bold mb-2'>Add Meterial</h2>
          <form  className='flex flex-col gap-3'>
            <input type="text" placeholder='Meterial Name' className='border px-2 py-2 rounded w-full' />
             <input type="text" placeholder='Location' className='border px-2 py-2 rounded w-full' />
              <input type="text" placeholder='Supervisor' className='border px-2 py-2 rounded w-full' />
               <input type="date"  className='border px-2 py-2 rounded w-full' />
                 <input type="date"  className='border px-2 py-2 rounded w-full' />
                 <select className='border px-2 py-1 rounded-full'>
                  <option >Ongoing</option>
                  <option >Pending</option>
                  <option >Completed</option>
                 </select>
                 <input type="text" placeholder='Budget' className='border px-2 py-1 rounded w-full' />
                 <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Save</button>
          </form>
        </div>
      </div>
    )}
   
   </div>
   </>
  )
}

export default Material