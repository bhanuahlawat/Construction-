import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
//import Purchase from './Purchase';
import {BarChart, Legend, ResponsiveContainer, XAxis, YAxis,Bar, Tooltip, Pie, PieChart, Cell} from "recharts"






const Reports = () => {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: ()  => componentRef.current,
        documentTitle: "Reports",

    })

    const reportData = [
        
        {id:1, type:"purchase", ref:"P0-101", branch:"delhi", date:"01-oct-2025", amount:25000, status:"completed"},
        {id:2, type:"delivery", ref:"P0-101", branch:"delhi", date:"01-oct-2025", amount:25000, status:"In Progress"},
        {id:3, type:"invoice", ref:"P0-101", branch:"delhi", date:"01-oct-2025", amount:25000, status:"Pending"},
        {id:3, type:"payment", ref:"P0-101", branch:"delhi", date:"01-oct-2025", amount:25000, status:"Faild"},


    ];
    const bardata = [
        {month:"sep", Purchase:2025, Delivery:13000, Invoice: 41000, payment:18000},
        {month:"oct", Purchase:2025, Delivery:18000, Invoice: 32000, payment:15000},
        {month:"Nov", Purchase:2025, Delivery:15000, Invoice: 30000, payment:12000},
        {month:"Dec", Purchase:2025, Delivery:25000, Invoice: 32000, payment:20000}
    ]

    const pieData = [
        {name: "completed", value: reportData.filter(r => r.status === "completed").length,   Color:"#22c55e"},
        {name: "In progress", value: reportData.filter(r => r.status === "In progress").length, Color:"#facc15"},
        {name: "Pending", value: reportData.filter(r => r.status === "Pending").length, Color:"#ef4444"},
         {name: "Failed", value: reportData.filter(r => r.status === "Failed").length, Color:"#3b82f6"},
        
    ]
  return (
    <div className='p-7 min-h-screen bg-gray-100'>
        <h1 className='text-2xl font-bold mb-6'>Reports</h1>
        <div className='mb-4'>
            <button onClick={handlePrint} className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>print/pdf</button>
        </div>
        <div  ref={componentRef}   className=''>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
                {/* bar chart */}
                <div className='bg-white p-4 rounded shadow'>
                    <h1 className='font-semibold mb-2 '>Monthly Report</h1>
                    <ResponsiveContainer width="100%" height={250}>
                   
                    <BarChart data={bardata} >
                        <XAxis dataKey="month"/>
                        <YAxis />
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="Purchase" fill="#3b82f6"/>
                        <Bar dataKey="Delivery" fill="#10b981"/>
                        <Bar dataKey="Invoice" fill="#f59e0b"/>
                        <Bar dataKey="payment" fill="#ef4444"/>

                    </BarChart>

                    </ResponsiveContainer>


                </div>

                <div className='bg-white rounded shadow'>
                    <h1 className='font-semibold'>Status Distribution</h1>
                    <ResponsiveContainer>
                    <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.Color}/>
                            ))}


                        </Pie>
                        <Tooltip/>
                    </PieChart>

                    </ResponsiveContainer>
                </div>
                </div>

        {/* table  */}
        <div className='bg-white p-6 rounded  shadow  overflow-x-auto'>
            <table className='w-full border-collapse' >
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='border px-3 py-2'>#</th>
                         <th className='border px-3 py-2'>Type</th>
                          <th className='border px-3 py-2'>Ref No</th>
                           <th className='border px-3 py-2'>Branch</th>
                            <th className='border px-3 py-2'>Date</th>
                             <th className='border px-3 py-2'>Amount</th>
                              <th className='border px-3 py-2'>Status</th>
                        

                        

                    </tr>
                </thead>
                <tbody>
                    {reportData.map((r, index) => (
                        <tr key={r.id} className='odd bg-white even:bg-gray-100'>
                            <td className='border px-3 py-2'>{index +1}</td>
                            <td className='border px-3 py-2'>{r.type}</td>
                            <td className='border px-3 py-2'>{r.ref}</td>
                            <td className='border px-3 py-2'>{r.branch}</td>
                             <td className='border px-3 py-2'>{r.date}</td>
                            <td className='border px-3 py-2'>{r.amount}</td>
                            
                            <td className={`border px-3 py-2 font-semibold ${r.status.toLowerCase() === "paid"?"text-green-600" : r.status.toLowerCase()=== "pendding" ?"text-yellow-600":"text-red-600"   }`}>{r.status}</td>

                            
                        </tr>
                    ))}
                </tbody>
            </table>
                    </div>
        </div>

    </div>
  )
}

export default Reports