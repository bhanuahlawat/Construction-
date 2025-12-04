import React from 'react'
import { Boxes, Truck, FileBarChart2, User, } from 'lucide-react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    PieChart, Pie, Cell,
} from "recharts";







const stats = [


    { icon: Boxes, label: "Inventory", value: 12340, color: "green" },
    { icon: FileBarChart2, label: "Projects", value: 245, color: "blue" },
    { icon: User, label: "Employee", value: 56, color: "yellow" },
    { icon: FileBarChart2, label: "Reports", value: 14, color: "pink" },



];



const colorMap = {
    green: { bg: "bg-green-100", text: "text-green-800" },
    blue: { bg: "bg-blue-100", text: "text-blue-800" },
    yellow: { bg: "bg-yellow-100", text: "text-yellow-800" },
    pink: { bg: "bg-pink-100", text: "text-pink-800" },
}





const piedata = [
    { name: "inventory", value: 45, color: "#3b82f6" },
    { name: "Projects", value: 30, color: "#8b5cf6" },
    { name: "Employee", value: 15, color: "#10b981" },
    { name: "Finance", value: 20, color: "#f5928c" },
    { name: "Vendors", value: 11, color: "#f59e0b" },
    { name: "Reports", value: 35, color: "#8b5c" },

];


const Dashboard = () => {



    const data = [
        { month: "Jan", revenue: 45000, expenses: 32000 },
        { month: "Feb", revenue: 52000, expenses: 38000 },
        { month: "Mar", revenue: 48000, expenses: 35000 },
        { month: "Apr", revenue: 61000, expenses: 42000 },
        { month: "May", revenue: 55000, expenses: 40000 },
        { month: "June", revenue: 67000, expenses: 45000 },
        { month: "July", revenue: 72000, expenses: 48000 },
        { month: "aug", revenue: 69000, expenses: 46000 },
        { month: "sept", revenue: 78000, expenses: 52000 },
        { month: "Oct", revenue: 74000, expenses: 50000 },
        { month: "Nov", revenue: 82000, expenses: 55000 },
        { month: "Dec", revenue: 89000, expenses: 50000 },

    ]



    return (
        <>
        
            <div className='p-6 space-y-6'>
                <h1 className='text-3xl font-bold '>Dashboard</h1>


                {/* stats cards */}
                <div className='flex flex-wrap gap-4'>
                    {stats.map((item, index) => {
                        const Icon = item.icon;
                        const colors = colorMap[item.color];
                        return (
                            <div
                                key={index}
                                className={`${colors.bg} flex items-center space-x-3  p-8 rounded-lg shadow flex-1 min-w-[220px]  `}>
                                <div className=' relative -top-3  left-3  p-1 rounded-lg shadow  '>
                                    <Icon className={`${colors.text} w-6 h-6 mb-2`} />
                                </div>
                                <div className='flex flex-col justify-center items-center ml-4'>
                                    <span className='text-2xl font-bold'>{item.label}</span>
                                    <span className='text-sm font-bold mt-1'>{item.value}</span>
                                </div>
                            </div>
                        )

                    })}
                    {/*  Graph */}
                    <div className='w-full h-96 bg-white rounded-2xl shadow-lg p-6'>
                        <h2 className='text-2xl font-bold mb-4 text-gray-800 '>stats overview</h2>
                        <div className='h-80 '>
                            {" "}
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={data}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray='3 3'
                                        stroke="#e2e8f0"
                                        opacity={0.3} />
                                    <XAxis
                                        dataKey="month"
                                        stroke='#64748b'
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}

                                    />
                                    <YAxis
                                        stroke='#64748b'
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value / 100}k`}
                                    />

                                    <Tooltip contentStyle={{
                                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                                        border: "none",
                                        borderRadius: "12px",
                                        boxShadow: "0 10px 40px rgba(0, 0 , 0, 0.1)"

                                    }} formatter={(value) => [`$${value.toLocaleString()}`, ""]} />

                                    <defs>
                                        <filter id="shadow" x="20%" y="-20%" width="140%" height="140%">
                                            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#888" floodOpacity="0.2" />
                                        </filter>

                                    </defs>


                                    <Bar dataKey="revenue" fill="#a7fd" radius={[8, 8, 0, 0]} filter='url(#shadow)' />
                                    <Bar dataKey="expenses" fill="#c7d2fe" radius={[8, 8, 0, 0]} filter='url(#shadow)' />
                                </BarChart>

                            </ResponsiveContainer>
                        </div>


                    </div>
                </div>
                <div className=' bg-white w-50% rounded-xl p-6 border-slate-200'>
                    <div className='mb-6'>
                        <h3 className='text-lg font-bold text-slate '>Sales by category </h3>
                        <p className='text-sm text-slate-500 dark:text-slate-400'>Production Distribution</p>
                        <div className='h-72 w-full'>

                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart className=''>
                                    <Pie
                                        data={piedata}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {piedata.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={{
                                        backgroundColor: "rgba(255,255,255, 0.95)",
                                        border: "none",
                                        borderRadius: "12px",
                                        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                                    }} />




                                </PieChart>



                            </ResponsiveContainer>


                        </div>
                     <div className='space-y-2 mt-4 w-full md:w-1/2'>
  {piedata.map((item, index) => (
    <div className='flex items-center justify-between w-full' key={index}>
      <div className='flex items-center space-x-2'>
        <div className='w-4 h-4 rounded-full' style={{ backgroundColor: item.color }}></div>
        <span className='text-sm text-slate-600'>{item.name}</span>
      <div className='text-sm font-semibold text-slate-800'>{item.value}%</div>
      </div>
    </div>
  ))}
</div>


                    </div>


                </div>






            </div>

        </>
    )
}

export default Dashboard