import { CheckCircle, Clock, CreditCard, FileBarChart2, Icon, Truck } from 'lucide-react'
import React from 'react'
const activities = [
    {
        id:1,
        type:"work Completed",
        des:"Electrical wiring completed at Tower A, Floor 3",
        time:"today, 10:39Am ",
        icon:CheckCircle,
        color:"text-green-500"
    },
     {
        id:2,
        type:"work Completed",
        des:"Electrical wiring completed at Tower A, Floor 3",
        time:"today, 10:39Am ",
        icon:Truck,
        color:"text-blue-500"
    },
     {
        id:3,
        type:"work Completed",
        des:"Electrical wiring completed at Tower A, Floor 3",
        time:"today, 10:39Am ",
        icon:CreditCard,
        color:"text-amber-500"
    },
     {
        id:4,
        type:"work Completed",
        des:"Electrical wiring completed at Tower A, Floor 3",
        time:"today, 10:39Am ",
        icon:FileBarChart2,
        color:"text-purple-500"
    },
     {
        id:5,
        type:"work Completed",
        des:"Electrical wiring completed at Tower A, Floor 3",
        time:"today, 10:39Am ",
        icon:Clock,
        color:"text-gray-500"
    }

]

const Recent = () => {
  return (
   <>
   <div className='p-6 bg-gray-100 min-h-screen'>
    <div className='bg-white rounded-2xl shadow-lg p-6 transition-transform hover:scale-[1.o1]'>
        <h2 className='text-2xl font-bold mb-4  text-indigo-700 border-b pb-2'> Recent Activities</h2>
        <div className='relative pl-6 border-l-4 border-indigo-300 space-y-6'>
            {activities.map((activity, index) =>{
                const Icon = activity.icon;
                return(
                    <div  key={activity.id} className='relative flex itmes-start group'>
                        {/* Dot */}
                    <div className='absolute -left-3 w-6 h-6 bg-white rounded-full border-4 border-indigo-400 flex items-center justify-center'>
                        <Icon className={`w-4 h-4 ${activity.color}`}/>
                    </div>
                    {/* content */}
                    <div className='ml-4 bg-indigo-50 hover:bg-indigo-100 transition-colors rounded-xl p-4 shadow-sm w-full'>
                        <div className='flex justify-between items-center'>
                            <h3 className='font-semibold text-lg text-gray-800'>{activity.type}</h3>
                            <span className='text-xs text-gray-500'>{activity.time}</span>

                        </div>
                        <p className='text-gray-600 text-sm mt-1'>{activity.des}</p >
                    </div>
                    </div>
                )
            })}
        </div>
    </div>
   </div>
   </>
  )
}

export default Recent