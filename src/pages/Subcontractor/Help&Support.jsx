import { MessageSquare,  Clock, PlusCircle, Send } from 'lucide-react';
import React, { useState } from 'react'


const Help = () => {
  const [tickets, setTickets] = useState([
    {id:1, title:"Material Delay", category:"Matrial", date:"2025-10-01", status:"open"},
    {id:2, title:"Payment not Recevied", category:"Payment", date:"2025-10-01", status:"In progress"},
    {id:3, title:"Site Access issue", category:"work", date:"2025-10-01", status:"Resolved"},
    
  ]);
  const [newTicket, setNewTicket] = useState({ title: "", category:"", des:""});

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newTicket.title &&  newTicket.category && newTicket.des){
      const ticket = {
        id: tickets.length + 1, 
        ...newTicket,
        date: new Date().toISOString().split("T")[0],
        status:"Open"

      }
      setTickets([...ticket, ticket]);
      setNewTicket({title:"",   category:"",  des:""  });
      alert("Ticket Submitted Successfully");

    } else{
      alert("Please Fill in all fields")
    }
 };
 const getStatusColor = (status) => {
  switch (status) {
    case "open":
      return "text-blue-500 bg-blue-100";
      case "In progress":
      return "text-yellow-500 bg-yellow-100"
      case "Resolved":
        return "text-green-500 bg-green-100"
        case "Closed":
          return "text-gray-500 bg-reay-100"

      
      
  
    default:
    return "text-gray-700 bg-gray-100"
  }
 }
  return (
   <>
   <div className='p-6 bg-gray-200 min-h-screen gap-6'>
    <h1 className='text-3xl font-bold text-gray-800 flex items-center gap-4'>
      <MessageSquare className='text-blue-600'/> Help & Support
    </h1>
    {/* content */}
    <div className='grid grid-cols-1 lg-grid-cols-2 gap-6'>
      {/* Tickets List */}
      <div className='bg-white rounded-2xl shadow-lg p-5 border border-gray-200'>
        <h2 className='text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2'>
          <Clock className="text-blue-500"/> My Tickets
        </h2>
        <div className='overflow-y-auto max-h-[550px] space-y-4'>
          {tickets.map((ticket) =>(
            <div key={ticket.id} className='p-4 rounded-xl border border-gray-200 hover:shadow-md transition bg-gray-50 '>
              <div className='flex justify-between items-center mb-1'>
                <h3 className='font-semibold text-lg text-gray-800'>{ticket.title}</h3>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(ticket.status)}`}>{ticket.status}</span>
              </div>
              <p className='text-gray-500 text-sm mb-1'>
                <strong>Category:</strong>{ticket.category}
              </p>
            <p className='text-gray-400 text-xs'>Created on:{ticket.date}</p>
            </div>

          ))}
        </div>
      </div>
      {/* New Ticket Form */}
      <div className='bg-white rounded-2xl shadow-lg p-6 border-gray-200'>
        <h2 className='text-xl font-semibold mb-4  text-gray-800 flex items-center gap-2'>
          <PlusCircle className='text-green-500'/> Raise New Ticket
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className=''>
            <label  className='block text-gray-700 font-medium mb-1'>Issue Title</label>
            <input type="text"
            value={newTicket.title}
            onChange={(e) => setNewTicket({...newTicket, title:e.target.value})}
            placeholder='Enter issue Title'
            className='w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' />
          </div>
          <div>
            <label className='block text-gray-700 font-medium mb-1'>Category</label>
            <select value={newTicket.category}
            onChange={(e) => setNewTicket({...newTicket, category:e.target.value})} className='w-full p-2.5 border rounded-lg focus:outline-none focus:ring-blue-400'>
              <option >Select Category</option>
              <option value="Material">Meterial</option>
              <option value="Payment">Payment</option>
              <option value="Work">Work</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          <div>
            <label className='blaock text-gray-700 font-medium mb-1'>Description</label>
            <textarea 
            rows="4"
            value={newTicket.des}
            onChange={(e) => setNewTicket({...newTicket, des:e.target.value})}
            placeholder='Describe your Issue'
            className='w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none'>
            
           
            </textarea>
            
          </div>
          <button type="submit" className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 text-white py-2.5  rounded-lg hover:opacity-90 transition-font font-semibold'>
            <Send className='w-5 h-5 '/> Submit Ticket
          </button>
        </form>
      </div>
    </div>
   </div>
   </>
  )
}

export default Help