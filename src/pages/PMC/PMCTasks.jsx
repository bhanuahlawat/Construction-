import { useEffect, useState, useMemo } from "react"
import { BarChart2, Filter, LayoutGrid, Plus, Search, List, Edit, Trash2, Clock, Users, X } from "lucide-react";
import { motion, AnimatePresence} from "framer-motion";

export default function PMCTasks() {
  const Color = {
    primary: "bg-blue-600",
    primaryHover: "bg-blue-800",
    accentText: "text-white",
    cardbg: "bg-white/60 backdrop-blue-sm",
    panelbg: "bg-gray-800"
  }

  const initialTasks = [
    {
      id: 1,
      name: "cement laying - block A",
      category: "Civil",
      assignedTo: "amit verma",
      status: "In Progress",
      deadline: "2025-11-20",
      progress: 65,
      priority: "High",
      remarks: "complete at morning shift"
    },
    {
      id: 2,
      name: "Main Electrical Trunking",
      category: "Electrical",
      site: "Greenfield Mall",
      assignedTo: "Rahul Singh",
      status: "Pending",
      deadline: "2025-11-25",
      progress: 10,
      priority: "Medium",
      remarks: "Waiting for material delivery",
    },
    {
      id: 3,
      name: "Plumbing - Level 2",
      category: "Plumbing",
      site: "Riverside Apartments",
      assignedTo: "Seema Patel",
      status: "Completed",
      deadline: "2025-10-30",
      progress: 100,
      priority: "Low",
      remarks: "Inspected and signed off",
    },
  ]
  const [tasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState("dashboard")
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [query, setQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortby] = useState("deadline")

  // form state

  const emptyForm = {
    name: "",
    category: "",
    site: "",
    assignedTo: "",
    status: "Pending",
    deadline: "",
    progress: 0,
    priority: "Medium",
    remarks: "",
  };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!showModal) {
      setEditingTask(null);
      setForm(emptyForm)
    }
  }, [showModal]);

  function openAddModal() {
    setEditingTask(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEditModal(task) {
    setEditingTask(task);
    setForm({ ...task });
    setShowModal(true);
  }


  function saveTask() {

    if (!form.name.trim()) return alert("Task name required");
    if (!form.deadline) return alert("Deadline required");


    if (editingTask) {
      setTasks((prev) => prev.map((t) => (t.id === editingTask.id ? { ...form, id: t.id } : t)));
    } else {
      setTasks((prev) => [{ ...form, id: Date.now() }, ...prev]);
    }
    setShowModal(false);
  }

  function deleteTask(id) {
    if (!confirm("Delete this task?")) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  // Derived data
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    const pending = tasks.filter((t) => t.status === "Pending").length;
    const avgProgress = total ? Math.round(tasks.reduce((s, t) => s + (t.progress || 0), 0) / total) : 0;
    return { total, completed, inProgress, pending, avgProgress };
  }, [tasks]);


  const categories = useMemo(() => Array.from(new Set(tasks.map((t) => t.category))), [tasks]);

  const filtered = useMemo(() => {
    return tasks
      .filter((t) => (filterStatus === "All" ? true : t.status === filterStatus))
      .filter((t) => (filterCategory === "All" ? true : t.category === filterCategory))
      .filter((t) =>
        [t.name, t.assignedTo, t.site, t.category, t.remarks].join(" ").toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "deadline") return new Date(a.deadline) - new Date(b.deadline);
        if (sortBy === "progress") return b.progress - a.progress;
        return a.id - b.id;
      });
  }, [tasks, filterStatus, filterCategory, query, sortBy]);

  return (
    <>
      <div className="min-h-screen p-6 bg-gradient-to-b from-gray-100 to-gray-50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <span className="inline-block rounded-full p-2 bg-blue-600 text-white">
                <BarChart2 size={18} />
              </span>
              Task
            </h1>
            <p className="text-sm text-gray-600 mt-1">mange site work, tearms & progress</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:flex items-center bg-white rounded-full shadow px-3 py-1 gap-2">
              <Search size={16} className="text-gray-400" />
              <input type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Task" className="outline-none text-sm w-44 md:w-64 bg-transparent" />
              <Filter size={16} className="text-gray-400" />


            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setView("dashboard")} className={`p-2 rounded-md ${view === "dashboard" ? "bg-blue-600 text-white" : "bg-white shadow"}`} title="dashboard">

                <LayoutGrid size={16} />
              </button>
              <button onClick={() => setView("card")} className={`p-2  rounded-md ${view === "card" ? "bg-blue-600 text-white" : "bg-white shadow"}`} title="Card View">
                <List size={16} />

              </button>

              <button onClick={openAddModal} className="flex items-center gap-2 bg-blue-600 hover:blue-800 text-white px-4 py-2 rounded-md">
                <Plus size={16} />
                Add Task

              </button>
            </div>
          </div>
        </div>

        {/* main */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* left: stats & filter */}
          <aside className="lg:col-span-1">
            <motion.div initail={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`p-4 rounded-2xl shadow ${Color.cardbg} border border-gray-200`}>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                OverView
              </h3>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <div className="">
                    <p className="text-xs text-gray-500">Total Task</p>
                    <p className="text-lg font-bold text-gray-900">{stats.total}</p>

                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Avg Progress</p>
                    <p className="font-semibold text-gray-900">{stats.avgProgress}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 p-3 rounded-lg bg-white/80 shadow-md">
                    <p className="text-xs text-gray-500">Completed</p>
                    <p className="font-bold text-green-600">{stats.completed}</p>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-white/80 shadow-sm">
                    <p className="text-xs text-gray-500">In Progress</p>
                    <p className="font-bold text-yellow-600">{stats.inProgress}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Filters</p>
                  <div className="grid gap-2">
                    <select className="p-2 rounded-md border" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                      {["All", "Pending", "In Progress", "Completed"].map(s => <option key={s}>{s}</option>)}
                    </select>
                    <select className="p-2 rounded-md border" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                      <option >All</option>
                      {categories.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>

                    <select className="p-2 rounded-md border" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      <option value="deadline">Sort: Deadline</option>
                      <option value="progress">Sort: Progress</option>
                      <option value="id">Sort: Newest</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`mt-6 p-4 rounded-2xl shadow ${Color.cardbg} border border-gray-200`}>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Action</h3>
              <div className="flex flex-col gap-2">
                <button onClick={() => {
                  setFilterStatus("All"); setFilterCategory("All");
                  setQuery("")
                }} className="p-2 rounded-md bg-white/90 hover:bg-white">Reset Filters</button>
                <button onClick={() => { setTasks((p) => [...p].sort((a, b) => new Date(a.deadline) - new Date(b.deadline))); setSortBy('deadline'); }} className="p-2 rounded-md bg-white/90 hover:bg-white">Sort by Deadline</button>

              </div>

            </motion.div>

          </aside>
          {/* right content */}
          <section className="lg:col-span-3">
            {view === "dashboard" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* large progress card */}
                <motion.div initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`p-5 rounded-2xl shadow ${Color.cardbg} border border-gray-200`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Overall Progress</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.avgProgress}%</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>{stats.completed} Completed</p>
                      <p>{stats.inProgress} In Progress</p>
                      <p>{stats.pending} Pending</p>
                    </div>
                  </div>


                  <div className="mt-4 w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div className="h-3 rounded-full bg-yellow-600" style={{ width: `${stats.avgProgress}%` }} />
                  </div>
                </motion.div>
                <motion.div initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`p-5 rounded-2xl shadow ${Color.cardbg} border border-gray-200`}>
                  <p className="text-sm text-gray-600">Upcoming Deadlines</p>
                  <ul className="mt-3 space-y-2">
                    {tasks
                      .slice()
                      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                      .slice(0, 4)
                      .map((t) => (
                        <li key={t.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-800">{t.name}</p>
                            <p className="text-xs text-gray-500">{t.assignedTo} — {t.site}</p>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <p>{t.deadline}</p>
                            <p className="text-xs">{t.progress}%</p>
                          </div>
                        </li>
                      ))}
                  </ul>
                </motion.div>
              </div>
            )}
            {/* card */}
            {view === 'card' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((task) => (
                  <motion.article key={task.id} whileHover={{ y: -6 }} className={`p-4 rounded-2xl shadow ${Color.cardbg} border border-gray-200`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>
                        <p className="text-sm text-gray-500">{task.site} • {task.category}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${task.status === 'Completed' ? 'bg-green-100 text-green-700' : task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{task.status}</span>
                        <div className="flex gap-2">
                          <button onClick={() => openEditModal(task)} className="p-2 bg-white rounded-md shadow-sm" title="Edit"><Edit size={16} /></button>
                          <button onClick={() => deleteTask(task.id)} className="p-2 bg-white rounded-md shadow-sm" title="Delete"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </div>


                    <div className="mt-4">
                      <div className="text-sm text-gray-600">Assigned: <span className="font-medium text-gray-800">{task.assignedTo}</span></div>
                      <div className="mt-2 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="h-2 rounded-full bg-yellow-600" style={{ width: `${task.progress}%` }} />
                      </div>
                      <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
                        <div className="flex items-center gap-2"><Clock size={14} /> <span>{task.deadline}</span></div>
                        <div className="flex items-center gap-2"><Users size={14} /> <span>{task.priority}</span></div>
                      </div>


                      <p className="mt-3 text-sm text-gray-600">{task.remarks}</p>
                    </div>
                  </motion.article>


                ))}
              </div>
            )}

            {/* TABLE */}
            {view === 'table' && (
              <div className={`overflow-x-auto p-4 rounded-2xl shadow${Color.cardbg} border border-gray-200`}>
                <table className="w-full text-sm text-gray-700">
                  <thead>
                    <tr className="text-left">
                      <th className="p-3">Task</th>
                      <th className="p-3">Site</th>
                      <th className="p-3">Assigned</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Deadline</th>
                      <th className="p-3">Progress</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((t) => (
                      <tr key={t.id} className="border-t">
                        <td className="p-3">
                          <div className="font-medium">{t.name}</div>
                          <div className="text-xs text-gray-500">{t.remarks}</div>
                        </td>
                        <td className="p-3">{t.site}</td>
                        <td className="p-3">{t.assignedTo}</td>
                        <td className="p-3">{t.category}</td>
                        <td className="p-3">{t.deadline}</td>
                        <td className="p-3">
                          <div className="w-40 bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div className="h-2 rounded-full bg-yellow-600" style={{ width: `${t.progress}%` }} />
                          </div>
                          <div className="text-xs mt-1">{t.progress}%</div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button onClick={() => openEditModal(t)} className="px-3 py-1 rounded-md bg-white shadow-sm flex items-center gap-2"><Edit size={14} /> Edit</button>
                            <button onClick={() => deleteTask(t.id)} className="px-3 py-1 rounded-md bg-white shadow-sm flex items-center gap-2"><Trash2 size={14} /> Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!['dashboard', "card", "table"].includes(view) && (
              <div className="p-4 bg-white rounded-lg shadow">no view selected</div>
            )}
          </section>
        </div>

{/* Modal  */}

        <AnimatePresence>
          {showModal && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
                    <button onClick={() => setShowModal(false)} className="p-2 rounded-md bg-gray-100"><X size={16} /></button>
                  </div>


                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input className="p-3 border rounded-md" placeholder="Task name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <input className="p-3 border rounded-md" placeholder="Site name" value={form.site} onChange={(e) => setForm({ ...form, site: e.target.value })} />


                    <select className="p-3 border rounded-md" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      <option value="">Category (Civil / Electrical / Plumbing)</option>
                      <option value="Civil">Civil</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Finishing">Finishing</option>
                      <option value="Other">Other</option>
                    </select>


                    <input className="p-3 border rounded-md" placeholder="Assigned To" value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })} />


                    <select className="p-3 border rounded-md" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>


                    <input type="date" className="p-3 border rounded-md" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />


                    <input type="number" min={0} max={100} className="p-3 border rounded-md" placeholder="Progress (%)" value={form.progress} onChange={(e) => setForm({ ...form, progress: Math.max(0, Math.min(100, Number(e.target.value))) })} />


                    <select className="p-3 border rounded-md" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>


                    <textarea className="p-3 border rounded-md col-span-1 md:col-span-2" placeholder="Remarks" value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} />
                  </div>


                  <div className="mt-4 flex items-center justify-end gap-3">
                    <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-md bg-gray-100">Cancel</button>
                    <button onClick={saveTask} className="px-4 py-2 rounded-md text-white bg-yellow-600 hover:bg-yellow-700">Save Task</button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )

}