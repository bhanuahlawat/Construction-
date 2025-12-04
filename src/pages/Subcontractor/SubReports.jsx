import React from 'react'
import { useReactToPrint } from 'react-to-print'
import { useRef } from 'react';
import { ResponsiveContainer, Tooltip, XAxis, YAxis,Legend, Line, LineChart } from 'recharts';


const SubReports = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content:() => componentRef.content,
    documentTitle:"Reports",
  })

  const Summry = [
    {title:"total Projects", value:12, color:"bg-blue-500"},
    {title:"Matrial Used", value:"320units", color:"bg-green-500"},
    {title:"Payment Recevied", value:"12,00,000", color:"bg-yellow-500"},
    {title:"Pending task", value:"8", color:"bg-red-500"},
  ];
  // chart
  const ProgressData = [
    {month:"Jan", progress:40},
    {month:"feb", progress:55},
    {month:"mar", progress:98},
    {month:"apr", progress:90},
    {month:"may", progress:67},
    {month:"Jun", progress:94},
  ];
  const statusData = [
    {name:"Completed", value:12, color:"#22c55e"},
    {name:"Ongoing", value:5, color:"#3b82f6"},
    {name:"Pending", value:4, color:"#f97316"},
    {name:"Delay", value:12, color:"#ef4444"},
  ];
  const paymentData = [
    {name:"Received", value:245000},
    {name:"pending", value:55000 }
  ]
  const tableData = [
    {
      id:1,
      project:"tower wiring",
      work:"Electrical",
      start:"2025-09-01",
      end:"2025-09-25",
      status:"completed",
      amount:"20,000"

    },
    {
      id:2,
      project:"tower wiring",
      work:"Electrical",
      start:"2025-09-01",
      end:"2025-09-25",
      status:"Ongoing",
       amount:"20,000"

    },
    {
      id:3,
      project:"tower wiring",
      work:"Electrical",
      start:"2025-09-01",
      end:"2025-09-25",
      status:"completed",
       amount:"20,000"

    }
  ]
  return (
    <>
    <div className='p-6  min-h-screen '>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='font-bold text-2xl text-gray-800'>Reports</h1>
        <button onClick={handlePrint} className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2  rounded-lg shadow-md'>Print/pdf</button>
      </div>


{/* sumary Cards */}
<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
  {Summry.map((item, index) => (
    <div
    key={index} className={`${item.color} text-white p-4 rounded-2xl shadow-lg flex flex-col justify-center items-center`}>
      <h2 className='text-lg font-semibold'>{item.title}</h2>
      <p className='text-2xl font-semibold mt-2'>{item.value}</p>
    </div>
  ))}
</div>
{/* chart Section */}
<div ref={componentRef}>
  <div className='grid grid-cols-1 lg-grid-cols-3 gap-6 mb-8'>
    <div className='bg-white rounded-2xl shaow-lg p-4'>
      <h2 className='text-lg font-semibold mb-2'>Monthly work Progress</h2>
      <ResponsiveContainer width="100%"   height={250}>
        <LineChart  data={ProgressData}>
          <XAxis dataKey="month"/>
          <YAxis/>
<Tooltip/>
<Legend/>
<Line 
type="monotone"
dataKey="progress"
stroke="#2563eb"
strokeWidth={3}
/>
        </LineChart>

      </ResponsiveContainer>
    </div>
  </div>
  {/* table Section */}
  <div className='bg-white rounded-2xl shadow-lg p-4 overflow-x-auto '>
    <h2 className='text-lg font-semibold mb-3  '>Detailed Work Report</h2>
    <table className='w-full border-collapse'>
      <thead>
        <tr className='bg-blue-100 text-gray-800'>
          <th className='p-3 border'>#</th>
           <th className='p-3 border'>Projects</th>
            <th className='p-3 border'>Work Type</th>
             <th className='p-3 border'>Start</th>
              <th className='p-3 border'>End</th>
               <th className='p-3 border'>Status</th>
                <th className='p-3 border'>Amount</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, i ) => (
          <tr key={row.id} className='odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors'>
            <td className='p-3 border'>{i + 1}</td>
            <td className='p-3 border font-semibold'>{row.project}</td>
            <td className='p-3 border'>{row.work}</td>
            <td className='p-3 border'>{row.start}</td>
            <td className='p-3 border'>{row.end}</td>
            <td className={`p-3 border font-bold ${row.status === "completed" 
              ? "text-green-600"
              : row.status === "Ongoing"
              ? "text-blue-600"
              : "text-orange-500"
            }`}>{row.status}</td>
            <td className='p-3 border'>{row.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </div>
    
    
    
    </>
  )
}

export default SubReports;
