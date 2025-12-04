  import React, { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";
import { FileSpreadsheet, Download, Printer, Trash2 } from "lucide-react";


export default function dprsheet ({
  initialProject = { id: "PRJ-001", name: "Pranava SLR" }}){
    const [project] = useState({ id: initialProject.id, name: initialProject.name, client: "Pranava Group", location: "11th FLOOR, 15TH FLOOR, BASEMENT WORK, TERRACE AND CP SANITARY" });
  const [timeframe, setTimeframe] = useState("daily");
  const [timelineOffset, setTimelineOffset] = useState(0);
  const [notifications, setNotifications] = useState([
    { id: 1, type: "info", text: "Concrete pour completed for Block A", time: "09:10" },
    { id: 2, type: "critical", text: "Crane maintenance scheduled tomorrow", time: "07:30" },
  ]);
  const [uploadedImages, setUploadedImages] = useState([]);

  //  tasks
  const [tasks, setTasks] = useState([
    { id: "t1", title: "Foundation - Excavation", section: "Structure", percent: 100, completed: true },
    { id: "t2", title: "Foundation - Piling", section: "Structure", percent: 80, completed: false },
    { id: "t3", title: "Superstructure - Columns", section: "Structure", percent: 45, completed: false },
    { id: "t4", title: "Electrical Rough-in", section: "Services", percent: 10, completed: false },
    { id: "t5", title: "Plumbing", section: "Finishing", percent: 0, completed: false },
    { id: "t6", title: "Facade Mockup", section: "Finishing", percent: 60, completed: false },
  ]);


  const analytics = useMemo(() => {
    return {
      daily: [
        { day: "Mon", progress: 12, productivity: 7 },
        { day: "Tue", progress: 18, productivity: 8 },
        { day: "Wed", progress: 25, productivity: 9 },
        { day: "Thu", progress: 30, productivity: 8 },
        { day: "Fri", progress: 40, productivity: 10 },
        { day: "Sat", progress: 50, productivity: 11 },
        { day: "Sun", progress: 60, productivity: 12 },
      ],
      weekly: [
        { week: "W1", progress: 18, productivity: 8 },
        { week: "W2", progress: 35, productivity: 10 },
        { week: "W3", progress: 48, productivity: 9 },
        { week: "W4", progress: 58, productivity: 10 },
      ],
      monthly: [
        { month: "Jan", progress: 8, productivity: 6 },
        { month: "Feb", progress: 22, productivity: 7 },
        { month: "Mar", progress: 35, productivity: 8 },
        { month: "Apr", progress: 67, productivity: 10 },
      ],
    };
  }, []);

   const overallCompletion = useMemo(() => {
    if (!tasks.length) return 0;
    const sum = tasks.reduce((s, t) => s + (t.percent || 0), 0);
    return Math.round(sum / tasks.length);
  }, [tasks]);

   const sections = useMemo(() => {
    const map = {};
    tasks.forEach((t) => {
      if (!map[t.section]) map[t.section] = { sum: 0, count: 0 };
      map[t.section].sum += t.percent;
      map[t.section].count += 1;
    });
    return Object.entries(map).map(([name, v]) => ({ name, percent: Math.round(v.sum / v.count) }));
  }, [tasks]);

  function toggleComplete(taskId) {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed, percent: t.completed ? t.percent : 100 } : t)));
  }

  function handleImageUpload(e) {
    const files = Array.from(e.target.files || []);
    const toAdd = files.map((f, i) => ({ id: Date.now() + i, name: f.name, url: URL.createObjectURL(f) }));
    setUploadedImages((p) => [...toAdd, ...p].slice(0, 12));
  }


  function endOfDaySummary() {
    const completedCount = tasks.filter((t) => t.completed).length;
    const summary = `EOD Summary (${new Date().toLocaleDateString()}): ${completedCount}/${tasks.length} tasks completed. Overall completion ${overallCompletion}%. Critical updates: ${notifications.filter(n => n.type === 'critical').length}`;
    setNotifications((p) => [{ id: Date.now(), type: "info", text: summary, time: new Date().toLocaleTimeString() }, ...p].slice(0, 20));
    return summary;
  }
  
  
  const chartData = timeframe === "daily" ? analytics.daily : timeframe === "weekly" ? analytics.weekly : analytics.monthly;
  // dlr 

   const defaultDLR = [
    { department: "MEP", designation: "Project Manager", qty: 1, name: "Satyajit Nayak", today: "Flat No 1,2,3,4,5,6 Cutting", tomorrow: "Flat No 8,9,9,10,11,12 Cutting" },
    { department: "Fire Fighting", designation: "Site Engineer", qty: 1, name: "Sanjeev Reddy", today: "Flat No 1,2,3,4,5,6 Cutting", tomorrow: "Flat No 8,9,9,10,11,12 Cutting" },
    { department: "Plumbing", designation: "Site Supervisor", qty: 1, name: "Amar Sahu", today: "Flat No 1,2,3,4,5,6 Cutting", tomorrow: "Flat No 8,9,9,10,11,12 Cutting" },
   
  ];
  const [dlrRows, setDlrRows] = useState(defaultDLR);


  function addDLRRow(row) {
    setDlrRows((p) => [...p, row]);
  }
  function deleteDLRRow(index) {
    setDlrRows((p) => p.filter((_, i) => i !== index));
  }
  function updateDLRRow(index, key, value) {
    setDlrRows((p) => p.map((r, i) => (i === index ? { ...r, [key]: value } : r)));
  }

  const [adding, setAdding] = useState(false);
  const [newRow, setNewRow] = useState({ department: "", designation: "", qty: 1, name: "", today: "", tomorrow: "" });

  function resetNewRow() {
    setNewRow({ department: "", designation: "", qty: 1, name: "", today: "", tomorrow: "" });
  }

  return(
    <>

    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="">
          
          <h1 className="text-2xl font-semibold">DPR ( Daily Labour Report)</h1>
        </div>
      </div>

       <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-gray-500">Timeframe</div>
            <div className="flex gap-2">
              <button onClick={() => setTimeframe("daily")} className={`px-3 py-1 rounded ${timeframe==='daily'?'bg-white shadow':'bg-transparent'} text-sm`}>Daily</button>
              <button onClick={() => setTimeframe("weekly")} className={`px-3 py-1 rounded ${timeframe==='weekly'?'bg-white shadow':'bg-transparent'} text-sm`}>Weekly</button>
              <button onClick={() => setTimeframe("monthly")} className={`px-3 py-1 rounded ${timeframe==='monthly'?'bg-white shadow':'bg-transparent'} text-sm`}>Monthly</button>
            </div>
          </div>

          <div className="bg-white shadow p-3 rounded w-44">
            <div className="text-xs text-gray-500">Overall Completion</div>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold">{overallCompletion}%</div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded overflow-hidden">
                  <div style={{ width: `${overallCompletion}%` }} className="h-full bg-gradient-to-r from-green-400 to-blue-500" />
                </div>
                <div className="text-xs text-gray-500 mt-1">Updated just now</div>
              </div>
            </div>
          </div>

          <button  className="px-4 py-2 bg-blue-600 text-white rounded shadow">Export CSV</button>
        </div>
    </header>

      <main className="grid grid-cols-12 gap-6">
        {/* Left: Charts and DLR table */}
        <section className="col-span-8 space-y-6">
          {/* Charts card */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-4 rounded shadow">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium">Progress Trends</h2>
              <div className="text-sm text-gray-500">Offset: {timelineOffset}</div>
            </div>

            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <XAxis dataKey={timeframe === 'daily' ? 'day' : timeframe === 'weekly' ? 'week' : 'month'} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="productivity" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-xs text-gray-500">Avg Productivity</div>
                <div className="text-xl font-semibold">{Math.round(chartData.reduce((s, d) => s + d.productivity, 0) / chartData.length)} pts</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-xs text-gray-500">Progress Growth</div>
                <div className="text-xl font-semibold">{chartData[chartData.length - 1].progress - chartData[0].progress}%</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-xs text-gray-500">Active Tasks</div>
                <div className="text-xl font-semibold">{tasks.filter(t => !t.completed).length}</div>
              </div>
            </div>
          </motion.div>

          {/* DLR Table card */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium">Daily Labour Report</h2>
              <div className="flex items-center gap-2">
                <button  className="px-3 py-1 bg-blue-600 text-white rounded">Export DLR CSV </button>
                <button onClick={() => { setAdding((s) => !s); resetNewRow(); }} className="px-3 py-1 bg-gray-200 rounded">{adding ? "Cancel" : "Add DLP"}</button>
              </div>
            </div>

            {/* Add  form */}
            {adding && (
              <div className="mb-3 grid grid-cols-12 gap-2 items-end">
                <input className="col-span-2 border p-2 rounded" placeholder="Department" value={newRow.department} onChange={(e) => setNewRow(n => ({ ...n, department: e.target.value }))} />
                <input className="col-span-2 border p-2 rounded" placeholder="Designation" value={newRow.designation} onChange={(e) => setNewRow(n => ({ ...n, designation: e.target.value }))} />
                <input type="number" className="col-span-1 border p-2 rounded" placeholder="Qty" value={newRow.qty} onChange={(e) => setNewRow(n => ({ ...n, qty: Number(e.target.value) }))} />
                <input className="col-span-3 border p-2 rounded" placeholder="Name of Worker" value={newRow.name} onChange={(e) => setNewRow(n => ({ ...n, name: e.target.value }))} />
                <input className="col-span-2 border p-2 rounded" placeholder="Today Achieved" value={newRow.today} onChange={(e) => setNewRow(n => ({ ...n, today: e.target.value }))} />
                <input className="col-span-2 border p-2 rounded" placeholder="Tomorrow Planning" value={newRow.tomorrow} onChange={(e) => setNewRow(n => ({ ...n, tomorrow: e.target.value }))} />
                <div className="col-span-12 flex gap-2 mt-2">
                  <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => { addDLRRow(newRow); setAdding(false); resetNewRow(); }}>Save</button>
                  <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => { setAdding(false); resetNewRow(); }}>Cancel</button>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="overflow-auto">
              <table className="w-full text-sm table-auto border-collapse">
                <thead>
                  <tr className="bg-orange-200">
                    <th className="border p-2 text-left">Department</th>
                    <th className="border p-2 text-left">Designation</th>
                    <th className="border p-2 text-center">Quantity</th>
                    <th className="border p-2 text-left">Name of Worker</th>
                    <th className="border p-2 text-left">Today Achieved</th>
                    <th className="border p-2 text-left">Tomorrow Planning</th>
                    <th className="border p-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dlrRows.map((r, idx) => (
                    <tr key={idx} className="odd:bg-white even:bg-gray-50 hover:bg-gray-50 transition">
                      <td className="border p-2">
                        <input className="w-full bg-transparent" value={r.department} onChange={(e) => updateDLRRow(idx, "department", e.target.value)} />
                      </td>
                      <td className="border p-2">
                        <input className="w-full bg-transparent" value={r.designation} onChange={(e) => updateDLRRow(idx, "designation", e.target.value)} />
                      </td>
                      <td className="border p-2 text-center">
                        <input type="number" className="w-16 mx-auto bg-transparent text-center" value={r.qty} onChange={(e) => updateDLRRow(idx, "qty", Number(e.target.value))} />
                      </td>
                      <td className="border p-2">
                        <input className="w-full bg-transparent" value={r.name} onChange={(e) => updateDLRRow(idx, "name", e.target.value)} />
                      </td>
                      <td className="border p-2">
                        <input className="w-full bg-transparent" value={r.today} onChange={(e) => updateDLRRow(idx, "today", e.target.value)} />
                      </td>
                      <td className="border p-2">
                        <input className="w-full bg-transparent" value={r.tomorrow} onChange={(e) => updateDLRRow(idx, "tomorrow", e.target.value)} />
                      </td>
                      <td className="border p-2 text-center">
                        <button onClick={() => deleteDLRRow(idx)} className="px-2 py-1 bg-red-500 text-white rounded text-xs"><Trash2 className="w-4 h-4"/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </section>

        {/* Right: Sidebar*/}
        <aside className="col-span-4 space-y-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-3">Task List</h3>
            <div className="space-y-2 max-h-64 overflow-auto">
              {tasks.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                  <div>
                    <div className="text-sm font-medium">{t.title}</div>
                    <div className="text-xs text-gray-500">{t.section}</div>
                  </div>
                  <div className="w-28 text-right">
                    <div className="text-sm font-semibold">{t.percent}%</div>
                    <div className="text-xs text-gray-400">{t.completed ? 'Done' : 'In progress'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-2">Image Uploads</h3>
            <input onChange={handleImageUpload} type="file" accept="image/*" multiple className="mb-3" />
            <div className="grid grid-cols-3 gap-2">
              {uploadedImages.length ? uploadedImages.map(img => (
                <div key={img.id} className="rounded overflow-hidden border p-1">
                  <img src={img.url} alt={img.name} className="object-cover h-20 w-full" />
                </div>
              )) : (
                <div className="text-sm text-gray-500 col-span-3">No images uploaded</div>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-2">Timeline Adjustment</h3>
            <input type="range" min={-7} max={7} value={timelineOffset} onChange={(e) => setTimelineOffset(Number(e.target.value))} />
            <div className="text-xs text-gray-500 mt-2">Shift timeline by {timelineOffset} days (preview)</div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Notifications</h3>
              <button onClick={() => setNotifications([])} className="text-sm text-gray-500">Clear</button>
            </div>
            <div className="space-y-2 max-h-44 overflow-auto">
              {notifications.map(n => (
                <div key={n.id} className={`p-2 rounded ${n.type==='critical' ? 'bg-red-50 border border-red-100': 'bg-gray-50'}`}>
                  <div className="text-sm">{n.text}</div>
                  <div className="text-xs text-gray-400">{n.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-2">End of Day</h3>
            <button onClick={() => { const s = endOfDaySummary(); alert(s); }} className="w-full px-3 py-2 bg-indigo-600 text-white rounded">Generate EOD Summary</button>
          </div>
        </aside>

        {/* Full width analytics */}
        <section className="col-span-12">
          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium">Analytics Overview</h2>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-500">Download Report</div>
                <button className="px-3 py-1 bg-blue-600 text-white rounded">CSV</button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-xs text-gray-500">Completed This {timeframe}</div>
                <div className="text-xl font-semibold">{tasks.filter(t => t.completed).length}</div>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <div className="text-xs text-gray-500">Avg Completion %</div>
                <div className="text-xl font-semibold">{overallCompletion}%</div>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <div className="text-xs text-gray-500">Critical Alerts</div>
                <div className="text-xl font-semibold">{notifications.filter(n=>n.type==='critical').length}</div>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <div className="text-xs text-gray-500">Images Uploaded</div>
                <div className="text-xl font-semibold">{uploadedImages.length}</div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-2">Section-wise Completion</h3>
              <div className="grid grid-cols-3 gap-4">
                {sections.map(s => (
                  <div key={s.name} className="p-3 bg-white rounded shadow">
                    <div className="text-sm text-gray-500">{s.name}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="text-2xl font-bold">{s.percent}%</div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-200 rounded overflow-hidden">
                          <div style={{ width: `${s.percent}%` }} className="h-full bg-gradient-to-r from-purple-400 to-pink-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

    </div>
    </>
  )

  }