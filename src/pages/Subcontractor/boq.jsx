import { X, FileSpreadsheet, Plus } from 'lucide-react'
import React, { useState } from 'react'



const boq = () => {
  const[isModalOpen, setIsModalOpen] = useState(false)
  const boqItems = [
    {
      id:1,
      
      unit:"RM",
      qty:80,
      supplyRate:455,
      installRate:120,

    },
     {
      id:2,
      unit:"RM",
      qty:70,
      supplyRate:1325,
      installRate:400,

    },
     {
      id:3,
      unit:"RM",
      qty:80,
      supplyRate:2140,
      installRate:120,

    },
     {
      id:4,
      unit:"RM",
      qty:80,
      supplyRate:1455,
      installRate:200,

    },

  ]
  return (
  <>
  <div className='p-6 space-y-8 bg-gray-100 min-screen-h font-inter'>
    <div className="bg-white shadow-md rounded-2xl p-6 border">
    <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
      <FileSpreadsheet  className='w-8 h-8 text-blue -700'/>BOQ
    </h1>
    <p className='text-gray-500 text-sm font-semibold'>Project: SUMADHURA PALAIS ROYALE</p>
     <p className='text-gray-500 text-sm font-semibold'>Client: SUMADHURA CONSTRUCTIONS PRIVATE LIMITED</p>
     </div>

     {/* ADD BUTTON */}
     <div className='flex justify-end'>
      <button  onClick={() => setIsModalOpen(true)}className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700'>
        <Plus className='w-5 h-5 '/> Add Items
      </button>
     </div>

     {/* table */}
     <div className='bg-white shadow-xl  rounded-2xl border overflow-auto p-4'>
      <table className='w-full text-sm border-collapse'>
        <thead>
          <tr className='bg-blue-50 border-b  '>
            <th className='p-3 text-left font-semibold text-gray-700'>Unit</th>
            <th className='p-3 text-left font-semibold text-gray-700'>Quantity</th>
            <th className='p-3 text-left font-semibold text-gray-700'>Supply Rate</th>
            <th className='p-3 text-left font-semibold text-gray-700'>Install Rate</th>
            <th className='p-3 text-left font-semibold text-gray-700'>Total Amount</th>


          </tr>
        </thead>
        <tbody className=''>
          {boqItems.map((row) => (
            <tr key={row.id} className='border-b hover:bg-gray-50 transition'>
              <td className='p-3 '>{row.unit}</td>
                <td className='p-3 '>{row.qty}</td>
                  <td className='p-3 '>{row.supplyRate}</td>
                    <td className='p-3 '>{row.installRate}</td>
                    <td className='p-3 font-semibold text-green-700'>{(row.supplyRate + row.installRate) * row.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
     {/* Modal */}

       {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add BOQ Item</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-black"
              >
                <X className="w-6 h-6"/>
              </button>
            </div>

           

            <input
              type="number"
              className="w-full border p-2 rounded mb-3"
              placeholder="Quantity"
            />
            <input type="text" className="w-full border p-2 rounded mb-3" placeholder="Unit" />

            <input type="number" className="w-full border p-2 rounded mb-3" placeholder="Supply Rate" />

            <input type="number" className="w-full border p-2 rounded mb-3" placeholder="Install Rate" />


            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-blue-600 text-white py-2 rounded-xl mt-2"
            >
              Save
            </button>
          </div>
        </div>
      )}
   </div>
  
  </>
  )
}

export default boq