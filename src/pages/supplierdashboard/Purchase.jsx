import React, { useState } from 'react'
const purschaseOrders=[
  {
    id:1,
    item:"Excavaltor  Retntal",
    quantity:"10",
    price:"1,20,200",
    supplier:"abc tech",
    status:"Pending",
  },
   {
    id:2,
    item:"Excavaltor  Retntal",
    quantity:"10",
    price:"1,20,200",
    supplier:"abc tech",
    status:"Pending",
  },
   {
    id:3,
    item:"Excavaltor  Retntal",
    quantity:"10",
    price:"1,20,200",
    supplier:"abc tech",
    status:"Approved",
  },
  {
    id:1,
    item:"Excavaltor  Retntal",
    quantity:"10",
    price:"1,20,200",
    supplier:"abc tech",
    status:"Pending",
  },
  
]

const Purchase = () => {


  const  [search, setSearch]  = useState("");
    const [filter, setFilter] =useState ("");
     

    const filteredOrders = purschaseOrders .filter((order) =>{
      const matchesSearch = 
      String(order.id).toLowerCase().includes(search.toLowerCase()) ||
      String(order.item).toLowerCase().includes(search.toLowerCase()) ||
      String(order.supplier).toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter ? order.status === filter: true;
      return matchesSearch && matchesFilter;

    })


  
  return (
   <>
   <div className='p-6  space-x-3'>
    <div className='flex flex-col md:flex-row justify-between items-center items-start md:items-center mb-6'>
    <h2 className='text-2xl font-bold text-gray-800 md:mb-0'>Purchase Orders</h2>
    <div className='flex space-x-4'>
      <div className='bg-blue-50 text-blue-600 px-3 py-2 rouded-lg font-semibold'>
        Total orders:{purschaseOrders.length}

      </div>
      <div className='bg-yellow-50  text-yellow-600 px-3 py-3 rounded-lg font-semibold'>
        pendding: {purschaseOrders.filter(order => order.status === "pending").length}
      </div>

      <div className='bg-green-50  text-green-600 px-3 py-3 rounded-lg font-semibold'>
        pendding: {purschaseOrders.filter(order => order.status === "Delivered").length}
      </div>
    </div>



   </div>
   {/* search & filter */}


   <div className='flex flex-wrap items-center mb-6 space-x-4'>
    <input type="text" 
    placeholder='search'
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className='px-4 py-2 rounded-lg border w-full sm:w-1/2'/>


    <select className='px-4 py-2 rounded-lg border'
      value={filter} 
      onChange={(e) => setFilter(e.target.value)}>
        <option value="">All Status</option>
        <option value="">Pending</option>
        <option value="">Approved</option>
    </select>
<div className='grid grid-cols-1 sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
  {filteredOrders.map((order) => (
    <div 
    key={order.id} className='bg-white p-7 rounded-xl shadow-md border hover:shadow-lg transition'>
      <div className='flex justify-between items-center mb-4 '>
        <h3 className='text-sm font-semibold  text-gray-800'> {order.item}</h3>
        <span className={`px-3 py-1 text-sm rounded-full font-medium ${
          order.status === "Approved"
          ? "bg-green-100 text-green-600"
          :"bg-yellow-100 text-yellow-600"
        }`}>{order.status}
        </span>
      </div>
      {/* <p className='text-sm text-gray-500   '>Po number: {order.id}</p> */}
       <p className='text-sm text-gray-500'>Supplier: {order.supplier}</p>
        <p className='text-sm text-gray-500'>Qunatity: {order.quantity}</p>
         <p className='text-sm text-gray-500'>price: {order.price}</p>
    </div>
  ))}
</div>
   </div>


   </div>
   
   
   </>
  )
}

export default Purchase

























