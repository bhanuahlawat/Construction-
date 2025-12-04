import React, { useState } from 'react'
import { Eye, X } from 'lucide-react';
const workData = [
    {
        id: 1,
        task: "Electric wiring",
        location: "Tower A, Floor 3",
        supervisor: "Amit Mehra",
        startDate: "2025-10-1",
        endDate: "2025-1010",
        status: "Ongoing"
    },
    {
        id: 2,
        task: "Electric wiring",
        location: "Tower A, Floor 3",
        supervisor: "Amit Mehra",
        startDate: "2025-10-1",
        endDate: "2025-1010",
        status: "Pending"
    },
    {
        id: 3,
        task: "Electric wiring",
        location: "Tower A, Floor 3",
        supervisor: "Amit Mehra",
        startDate: "2025-10-1",
        endDate: "2025-10-10",
        status: "Completed"
    }
]

const Work = () => {
    const [work, setWork] = useState(workData);
    const [search, setSearch] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const filtered = work.filter(
        (w) =>
            w.task.toLowerCase().includes(search.toLowerCase()) ||
            w.location.toLowerCase().includes(search.toLowerCase()) ||
            w.supervisor.toLowerCase().includes(search.toLowerCase())
    )

    const openModal = (task = null) => {
        setSelectedTask(task)
        setIsModalOpen(true)
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null)
    }
    const handleDelete = (id) => {
        setWork(work.filter((w) => w.id !== id))
    }
    return (
        <>
            <div className='p-4 sm:p-6  bg-gray-100 min-h-screen'>
                <h1 className='text-2xl font-bold mb-4'>Work Schedule</h1>

                {/* Cards */}
                <div className='grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
                    {filtered.map((item) => (
                        <div key={item.id} className='bg-white p-4 sm:p-6 rounded shadow hover:shadow-2xl transition-shadow'>
                            <div className='flex justify-between items-center mb-2'>
                                <h3 className='text-lg font-semibold'>{item.task}</h3>
                                <span
                                    className={`px-3 py-2 rounded-full text-white text-sm ${item.status === "Ongoing"
                                        ? "bg-green-600"
                                        : item.status === "Pending"
                                            ? "bg-yellow-500"
                                            : "bg-gray-500"
                                        }`}>{item.status}</span>
                            </div>
                            <p><span className='font-semibold'>Supervisor:</span>{item.supervisor}</p>
                            <p><span className='font-semibold'>Location</span>{item.location}</p>
                        </div>
                    ))}
                </div>
                {/* TABLE */}
                <div className='overflow-x-auto bg-white p-3 sm:p-4 rounded shadow'>
                    <table className='min-w-full table-auto'>
                        <thead className='bg-gray-100'>
                            <tr className=''>
                                <th className='px-4 py-2 text-left'>Task</th>
                                <th className='px-4 py-2 text-left'>Supervisor</th>
                                <th className='px-4 py-2 text-left'>Location</th>
                                <th className='px-4 py-2 text-left'>Start Date</th>
                                <th className='px-4 py-2 text-left'>End Date</th>
                                <th className='px-4 py-2 text-left'>Status</th>
                                <th className='px-4 py-2 text-left'>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((item) => (
                                <tr key={item.id} className='hover:bg-gray-50'>
                                    <td className='px-4 py-2'>{item.task}</td>
                                    <td className='px-4 py-2'>{item.supervisor}</td>
                                    <td className='px-4 py-2'>{item.location}</td>
                                    <td className='px-4 py-2'>{item.startDate}</td>
                                    <td className='px-4 py-2'>{item.endDate}</td>
                                    <td className='px-4 py-2'>
                                        <span className={`px-2 py-1 rounded text-white text-sm ${item.status === "ongoing"
                                                ? "bg-green-500"
                                                : "item.status" === "Pending"
                                                    ? "bg-yellow-500"
                                                    : "bg-gray-500"

                                            }`}>{item.status}</span>
                                    </td>
                                    <td className='px-2 py-2 flex gap-2'>
                                        <button onClick={() => openModal(item)}>
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)}
                                            className='text-red-600'>
                                            <X className="w-5 h-5" />

                                        </button>

                                    </td>


                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
                        <div className='bg-white p-4 sm:p-6  rounded-xl w-11/12  max-w-md shadow-lg relative'>
                            <button className='absolute top-3 right-3  text-gray-500 hover:text-gray-700' onClick={closeModal}>
                                < X className="w-5 h-5" />
                            </button>
                            {selectedTask ? (
                                <>
                                    <h2 className='text-xl font-bold mb-4 '>{selectedTask.task}</h2>
                                    <p><b>Supervisor:</b>{selectedTask.supervisor}</p>
                                    <p><b>Location:</b>{selectedTask.location}</p>
                                    <p><b>Start:</b>{selectedTask.startDate}</p>
                                    <p><b>End:</b>{selectedTask.endDate}</p>
                                    <p><b>Status:</b>{selectedTask.status}</p>

                                </>
                            ) : (
                                <h2 className='text-xl font-semibold text-center '>Add New Task For Here</h2>
                            )


                            }
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Work