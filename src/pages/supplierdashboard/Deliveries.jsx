import React from 'react'


const deliveries = [
  {
    id: 1,
    customer: "mohit sharma",
    product: "cement 50kg  ",
    date: "02 oct 2025",
    status: "Delivered",
    payment: "paid",
    branch: "delhi Werehouse",
    person: {
      name: "Amit kumar",
      image: "https://i.pinimg.com/1200x/94/63/52/94635221a4a5cf15d053f19c378c0505.jpg"
    }
  },

  {
    id: 2,
    customer: "mohit sharma",
    product: "cement 50kg  ",
    date: "02 oct 2025",
    status: "In Transit",
    payment: "Cod",
    branch: "Noida Branch",
    person: {
      name: "Amit kumar",
      image: "https://i.pinimg.com/1200x/94/63/52/94635221a4a5cf15d053f19c378c0505.jpg"
    }
  },
  {
    id: 3,
    customer: "mohit sharma",
    product: "cement 50kg  ",
    date: "02 oct 2025",
    status: "Pending",
    payment: "Pending",
    branch: "delhi Werehouse",
    person: {
      name: "Amit kumar",
      image: "https://i.pinimg.com/1200x/94/63/52/94635221a4a5cf15d053f19c378c0505.jpg"
    }
  },
]


const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-600";
    case "In Transit":
      return "bg-green-100 text-blue-600";
    case "Pending":
      return "bg-yellow-100 text-yellow-600";
    case "cancelled":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600"

  }
}
const Deliveries = () => {
  return (
    <>
      <div className='p-6'>
        <h2 className='text-2xl font-semibold mb-4 '>
          Deliveries
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {deliveries.map((delivery)  =>   (
          <div key={delivery.id}
            className='bg-white shadow-md rounded-2xl p-4 border'>
            {/* <h3 className='font-semibold text-lg mb-2'>{deliveries.id}</h3> */}
          <p><span className='font-medium'>Customer:</span>{delivery.customer}</p>
          <p><span className='font-medium'>Product:</span>{delivery.product}</p>
          <p><span className='font-medium'>Branch:</span>{delivery.branch}</p>
          <p><span className='font-medium'>Date:</span>{delivery.date}</p>
          


          {/* delivery persons */}
          <div className='flex items-center gap-2  mt-3'>
            <img src={delivery.person.image} alt=""  className='w-8 h-8  rounded-full border' />
            <span className='text-sm font-medium'>{delivery.person.name}</span>
          </div>


            {/* status & payment */}

            <div className='flex justify-between items-center mt-4'>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                delivery.status
              )}`}>{delivery.status}</span>

              <span className='text-sm font-medium'>{delivery.payment}</span>
            </div>
          </div>
))}




        </div>
      </div>



    </>
  )
}

export default Deliveries