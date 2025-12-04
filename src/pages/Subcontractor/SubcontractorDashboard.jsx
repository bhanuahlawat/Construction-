import React, { useEffect, useState } from 'react'
import { User, Bell,  ShoppingBag, DollarSign, CheckCircle, AlertTriangle, } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, Tooltip, CartesianGrid, XAxis, YAxis, Bar, Pie, Cell, Legend, PieChart, BarChart } from "recharts";



const cardData = [
    { title: " Total orders", value: 245, progress: 70, icons: <ShoppingBag />, gradient: " bg-gradient-to-br from-blue-500 to-indigo-600" },
    { title: " Total Users", value: 150, progress: 30, icons: <User />, gradient: "bg-gradient-to-br from-green-500 to-emerald-600" },
    { title: " Total Revenue", value: 190, progress: 50, icons: <DollarSign />, gradient: "bg-gradient-to-br from-orange-500 to-amber-600" },

];
const lineData = [
    { name: "Jan", value: 30 },
    { name: "Feb", value: 40 },
    { name: "Mar", value: 80 },
    { name: "Apr", value: 60 },
    { name: "May", value: 10 },
    { name: "Jun", value: 50 },

];
const Transactions = [
    {
        id: 1,
        name: "Abc Pvt Ltd",
        status: "Completed",
        amount: "12,000",
        date: "oct 6, 2025"
    },
    {
        id: 2,
        name: "Abc Pvt Ltd",
        status: "Pending",
        amount: "15,000",
        date: "oct 7, 2025"
    },
    {
        id: 3,
        name: "Abc Pvt Ltd",
        status: "Completed",
        amount: "15,700",
        date: "oct 6, 2025"
    },
    {
        id: 3,
        name: "Abc Pvt Ltd",
        status: "Pending",
        amount: "15,700",
        date: "oct 6, 2025"
    },
    {
        id: 3,
        name: "Abc Pvt Ltd",
        status: "Completed",
        amount: "15,700",
        date: "oct 6, 2025"
    }

]
const PieData = [
    { name: "Product A", value: 40 },
    { name: "Product B", value: 10 },
    { name: "Product C", value: 20 },


];
const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const barData = [
    { name: "Mon", sales: 30, color: ["#4f46e5", "#3b82f6"] },
    { name: "Tue", sales: 70, color: ["#f43f5e", "#fbbf24"] },
    { name: "Wed", sales: 18, color: ["#10b981", "#06b6d4"] },
    { name: "Thu", sales: 67, color: ["#8b5cf6", "#3b82f6"] },
    { name: "Fri", sales: 90, color: ["#8b5c", "#3b82f6"] },
    { name: "Sat", sales: 78, color: ["#f97316", "#ec4899"] },
    { name: "Sun", sales: 23, color: ["#8b5cf6", "#a78bfa"] },


]
const activityData = [
    {
        id:1,
        type:"order",
        icon:<CheckCircle  className='text-green-600'/>,
        message:"Order #1025 Completed successfully",
        time:"2min ago"
    },
     {
        id:1,
        type:"payment",
        icon:<DollarSign  className='text-blue-600'/>,
        message:"Payment of 12,000 completed successfully",
        time:"2min ago"
    },
     {
        id:3,
        type:"Warning",
        icon:<AlertTriangle  className='text-yellow-600'/>,
        message:"project #304 delayed due to material shortage",
        time:"1 hour ago"
    },

]

const Dashboard = () => {
    const [activities, setActivities] = useState(activityData);
    useEffect(() => {
        const interval = setInterval(() => {
            const newActivity = {
                id: Date.now(),
                type:"system",
                icon:<CheckCircle className='text-green-500'/>,
                message:"system auto-check completed successfully",
                time:"just now"
            };
            setActivities((prev) => [newActivity, ...prev.slice(0, 5)]);

        }, 20000);
        return () =>clearInterval(interval);

    },[])


    return (
        <div className='flex flex-col h-screen  '>
            <h1 className='text-2xl font-bold'>SubContractor Dashboard</h1>
            
             
            <div className='p-6 flex-1 flex flex-col gap-6'>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    {cardData.map((card, idx) => (
                        <div key={idx} className={`${card.gradient}text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transfrom hover:-translate-y-1 flex flex-col justify-center `}>



                            <div className='flex flex-col items-center justify-between gap-3'>
                                <div className='bg-white/40 rounded-full p-3 flex items-center justify-center text-white shadow-inner'>{card.icons}</div>
                                <h2 className='text-white/90 font-semibold text-lg'>{card.title} </h2>
                                <p className='text-3xl font-semibold drop-shadow-md'>{card.value}</p>

                                {/* progress Baar */}
                                <div className='w-full mt-3'>
                                    <div className='w-full bg-white/30 rounded-full h-3'>
                                        <div className='bg-white h-3 rounded-full transition-all ese-in-out'
                                            style={{ width: `${card.progress}%` }}></div>
                                    </div>
                                </div>
                                <p className='text-sm text-white/80 mt-1 text-center'>{card.progress}%</p>
                            </div>
                        </div>

                    ))}
                </div>

                {/* Charts */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='bg-white p-6 rounded-2xl shadow-xl'>
                        <h2 className='font-semibold text-xl mb-4 text-xl'>Monthly Reports</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={lineData}>
                                <Line type="monotone" dataKey="value" stroke='#8884d8' strokeWidth={3} />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }} itemStyle={{ color: '#4b5563' }} />
                                <CartesianGrid stroke='#e5e7eb' strokeDasharray="5 5" />
                                <XAxis dataKey="name" stroke='#4b5563' />
                                <YAxis stroke='#4b5563' />
                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                    <div className='bg-white p-6 rounded-2xl shadow-xl'>
                        <h2 className='font-semibold text-xl mb-4 text-gray-800'>Weely Sales Overview </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3 " stroke='#e5e7eb' />
                                <XAxis dataKey="name" stroke='#4b5563' />
                                <YAxis stroke='#4b5563' />
                                <Tooltip contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    borderRadius: '8px',
                                    border: "none",
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                    color: "#4bb563"
                                }} />
                                <Legend />
                                <Bar dataKey="sales" fill='#82ca9d' radius={[10, 10, 0, 0,]} isAnimationActive={true}>
                                    {barData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`url(#color${index})`} />
                                    ))}
                                </Bar>
                                {barData.map((entry, index) => (
                                    <defs key={`def-${index}`}>
                                        <linearGradient id={`color${index}`} x1="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor={entry.color[0]} stopOpacity={0.8} />
                                            <stop offset="100%" stopColor={entry.color[1]} stopOpacity={0.8} />

                                        </linearGradient>

                                    </defs>
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='bg-white p-6 rounded-2xl shadow-xl'>
                        <h2 className='font-semibold text-xl mb-4 text-gray-800'>Sales Distribution</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={PieData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                    fill='#8884d8' label>
                                    {PieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                    <Tooltip contentStyle={{
                                        backgroundColor: "0 2px 8px rgba(255, 255, 255, 0.9)",
                                        borderRadius: "8px",
                                        border: "none",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                                    }} />
                                </Pie>
                                <Legend />
                            </PieChart>

                        </ResponsiveContainer>
                    </div>

                    {/*Recent Transaction Table  */}
                    <div className='bg-white p-6 rounded-2xl shadow-xl mt-4'>
                        <h2 className='font-semibold text-xl mb-4 text-gray-800'>
                            Recent Transactions
                        </h2>
                        <div className='overflow-x-auto'>
                        <table className='w-full text-sm lext-left border overflow-x-auto'>
                            <thead className='bg-indigo-100 text-gray-800'>
                                <tr>
                                    <th className='px-4 py-2'>Company</th>
                                    <th className='px-4 py-2'>Amount</th>
                                    <th className='px-4 py-2'>Status</th>
                                    <th className='px-4 py-2'>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Transactions.map((tx) => (
                                    <tr
                                        key={tx.id} className='border-t hover:bg-gray-50 transition-all items-center justify-between'>
                                        <td className='px-2 py-2 '>{tx.name}</td>
                                        <td className='px-4 py-2'>{tx.amount}</td>
                                        <td className={`px-4 py-2 font-medium ${tx.status === "Completed"
                                                ? "text-green-600"
                                                : "text-yellow-600"
                                            }`}>{tx.status}</td>
                                        <td className='px-4 py-2'>{tx.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
                    <div className='bg-white p-6 rounded-2xl shadow-xl h-[350px] '>
                        <h2 className='font-semibold text-xl mb-4 text-gray-800'>Recent Activity</h2>
                        <ul className='space-y-4'>
                            {activities.map((activity) => (
                                <li 
                                key={activity.id}
                                className='flex items-start gap-3 border-b pb-3 hover:bg-gray-50 transition-all rounded-lg px-2'>
                                    <div className='mt-1'>{activity.icon}</div>
                                    <div className='flex-1'>
                                        <p className='text-gray-800 text-sm font-medium'>
                                            {activity.message}
                                        </p>
                                        <span className='text-gray-500 text-xs'>{activity.time}</span>
                                    </div>


                                </li>
                            ))}
                        </ul>
                    </div>
        </div>
    )
}

export default Dashboard