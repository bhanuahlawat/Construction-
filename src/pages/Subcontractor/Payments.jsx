import { Delete, DeleteIcon, Eye, View } from 'lucide-react';
import React, { useState } from 'react'
const paymentData = [
    {
        id:1,
        contractor:"Abc contruction",
        project:"office buliding",
        invoice:"Inv-101",
        amount:"5,00,000",
        mode:"UPI",
        status:"paid",
        dueDate:"2025-10-15",

    },
     {
        id:2,
        contractor:"Abc contruction",
        project:"office buliding",
        invoice:"Inv-101",
        amount:"5,00,000",
        mode:"UPI",
        status:"partial",
        dueDate:"2025-10-15",
        
    },
     {
        id:3,
        contractor:"Abc contruction",
        project:"office buliding",
        invoice:"Inv-101",
        amount:"5,00,000",
        mode:"Cheque",
        status:"pending",
        dueDate:"2025-10-15",
        
    }
]

const Payments = () => {
    const[payment, setPayment] = useState(paymentData);
    const[search, setSearch] = useState('');
    const[isModelOpen, setIsModelOpen] = useState(false);

    const filtered = payment.filter(
        (p) =>  
            p.contractor.toLowerCase().includes(search.toLowerCase()) || 
        p.project.toLowerCase().includes(search.toLowerCase()) ||
        p.invoice.toLowerCase().includes(search.toLowerCase()) 
    )

    // const openModel = () => setIsModelOpen(true)
    // const closeModal = () =>setIsModelOpen(false)


// delete function
    const handleDelete = (id) => {
setPayment(payment.filter((p) => p.id !== id))
    }
  return (
    <>
    <div className='bg-gray-200 p-6 min-h-screen'>
        <h1 className='text-2xl font-bold mb-4 '>
            Payment
        </h1>
        <div className='flex justify-between mb-4'>
            <input type="text" placeholder='search..'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='border rounded-full px-4 py-2 w-1/2' />
            {/* <button onClick={openModel}>Add Payment</button> */}
        </div>
        <div className='overflow-x-auto'>
            <table className='min-w-full table-auto bg-white border border-gray-200 rounded'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='px-4 py-2 border-b text-left'>Contractor</th>
                     <th className='px-4 py-2 border-b text-left'>Project</th>
                   <th className='px-4 py-2 border-b text-left'>Invoice</th>
                  <th className='px-4 py-2 border-b text-left'>Date</th>
                <th className='px-4 py-2 border-b text-left'>Amount</th>
                 <th className='px-4 py-2 border-b text-left'>Mode</th>
                  <th className='px-4 py-2 border-b text-left'>Status</th>
                   <th className='px-4 py-2 border-b text-left'>Due Date</th>
                 <th className='px-4 py-2 border-b text-left'>Action</th>
    
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((p)  =>
                    (
                        <tr key={p.id} className='hover:bg-gray-50'>
                            <td className='px-4 py-2  border-b'>{p.contractor}</td>
                            <td className='px-4 py-2  border-b'>{p.project}</td>
                            <td className='px-4 py-2  border-b'>{p.invoice}</td>
                            <td className='px-4 py-2  border-b'>{p.dueDate}</td>
                            <td className='px-4 py-2  border-b'>{p.amount}</td>
                            <td className='px-4 py-2  border-b'>{p.mode}</td>
                            <td className='px-4 py-2  border-b'><span className={`
                                px-2 py-1 rounded text-white text-sm ${
                                    p.status === "paid"
                                    ? "bg-green-500"
                                :p.status === "pending" 
                            ? "bg-yellow-500"
                        :"bg-blue-500"}`}>{p.status}</span></td>
                        <td className='px-4 py-2 border-b '>{p.dueDate}</td>
                        <td className='px-x py-2 border-b flex gap-2'>
                            <button className='px-2 py-1  text-black rounded '><Eye/></button>
                             <button onClick={() => handleDelete(p.id)} className='px-2 py-1  text-red-600 rounded'><DeleteIcon/></button>
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

export default Payments