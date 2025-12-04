import React, { useState, useMemo } from 'react'
import {
  FaSearch,
  FaUserPlus,
  FaFileAlt,
  FaChartBar,
  FaCogs,
  FaUpload,
  FaChartPie,
  FaGavel,
  FaTimes,
  FaPlus,
} from 'react-icons/fa'



export default function Bidding() {

  const initialTenders = [
    {
      id: 1,
      title: 'Foundation Work - Tower A',
      start: '2025-10-01',
      end: '2025-11-05',
      status: 'Open',
      location: 'Plot 12',
      estimatedCost: 500000,
      description: 'Foundation & reinforcement works for Tower A',
    },
    {
      id: 2,
      title: 'Plumbing - Block B',
      start: '2025-09-15',
      end: '2025-10-20',
      status: 'Closed',
      location: 'Site 3',
      estimatedCost: 120000,
      description: 'Internal plumbing and drainage',
    },
  ]

  const initialBids = [
    { id: 101, tenderId: 1, vendor: 'ABC Subcontractors', amount: 250000, timelineDays: 30, status: 'Submitted', submittedOn: '2025-10-28' },
    { id: 102, tenderId: 1, vendor: 'XYZ Works', amount: 245000, timelineDays: 28, status: 'Under Review', submittedOn: '2025-10-29' },
  ]

  const templates = [
    { id: 't1', name: 'BOQ - Basic', description: 'Simple BOQ template with material & labour rows' },
    { id: 't2', name: 'RFP - Standard', description: 'RFP template with scope & terms sections' },
  ]

  // --- states ---
  const [tenders, setTenders] = useState(initialTenders)
  const [bids, setBids] = useState(initialBids)
  const [activeTab, setActiveTab] = useState('tenders') 
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedTender, setSelectedTender] = useState(null)
  const [showVendorModal, setShowVendorModal] = useState(false)
  const [vendorProfile, setVendorProfile] = useState({ company: '', contact: '', gst: '', pan: '', docs: [] })

  // Bid form
  const [showBidModal, setShowBidModal] = useState(false)
  const [bidForm, setBidForm] = useState({ amount: '', timelineDays: '', notes: '', files: [] })
  const [uploadedFiles, setUploadedFiles] = useState([])

  // Automated bidding config (UI only)
  const [weightTechnical, setWeightTechnical] = useState(60)
  const [weightFinancial, setWeightFinancial] = useState(40)

  // Cost & markup
  const [costItems, setCostItems] = useState([
    { id: 1, name: 'Cement', qty: 100, rate: 350, subtotal: 35000, markupPercent: 10 },
    { id: 2, name: 'Steel', qty: 500, rate: 70, subtotal: 35000, markupPercent: 8 },
  ])

  // --- derived & helper ---
  const filteredTenders = useMemo(() => {
    return tenders.filter(t => {
      const matchesQuery = t.title.toLowerCase().includes(query.toLowerCase()) || t.location.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = statusFilter === 'All' || t.status === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [tenders, query, statusFilter])

  function onVendorFileChange(e) {
    const files = Array.from(e.target.files)
    setVendorProfile(prev => ({ ...prev, docs: [...prev.docs, ...files] }))
  }

  function registerVendor() {
    
    setShowVendorModal(false)
    setVendorProfile({ company: '', contact: '', gst: '', pan: '', docs: [] })
    alert('Vendor registration simulated (connect to API).')
  }

  function onBidFilesChange(e) {
    const files = Array.from(e.target.files)
    setUploadedFiles(prev => [...prev, ...files])
  }

  function submitBid() {
    if (!selectedTender) return alert('Select a tender')
    const newBid = {
      id: Date.now(),
      tenderId: selectedTender.id,
      vendor: vendorProfile.company || 'You',
      amount: Number(bidForm.amount) || 0,
      timelineDays: bidForm.timelineDays || '-',
      status: 'Submitted',
      submittedOn: new Date().toISOString().slice(0,10),
      files: uploadedFiles.map(f => f.name),
      notes: bidForm.notes,
    }
    setBids(prev => [newBid, ...prev])
    setShowBidModal(false)
    setBidForm({ amount: '', timelineDays: '', notes: '', files: [] })
    setUploadedFiles([])
  }

  function withdrawBid(bidId) {
    setBids(prev => prev.map(b => b.id === bidId ? { ...b, status: 'Withdrawn' } : b))
  }

  // Automated scoring 
  function computeScoresForTender(tenderId) {
    const tenderBids = bids.filter(b => b.tenderId === tenderId)
    if (tenderBids.length === 0) return []

    // financial score: lower amount 
    const amounts = tenderBids.map(b => b.amount || 0)
    const min = Math.min(...amounts)
    const max = Math.max(...amounts)

    return tenderBids.map(b => {
      const financialScore = max === min ? 100 : Math.round((max - b.amount) / (max - min) * 100)
      // technical score placeholder: random or based on compliance
      const technicalScore = 80 // in real app compute from documents/criteria
      const finalScore = Math.round((technicalScore * (weightTechnical/100)) + (financialScore * (weightFinancial/100)))
      return { ...b, financialScore, technicalScore, finalScore }
    }).sort((a,b) => b.finalScore - a.finalScore)
  }

  // Cost calculations
  const totalEstimated = costItems.reduce((s,i)=> s + (i.qty * i.rate), 0)
  const totalMarkupAmount = costItems.reduce((s,i)=> s + ((i.qty * i.rate) * (i.markupPercent/100)), 0)
  const totalFinal = totalEstimated + totalMarkupAmount

  // --- UI components ---
  const Sidebar = () => (
    <div className="bg-white rounded-2xl p-4 shadow">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">B</div>
        <div>
          <div className="font-semibold">biding</div>

        </div>
      </div>

      <div className="mt-4 space-y-2">
        <button className={`w-full text-left p-2 rounded ${activeTab==='tenders'?'bg-blue-50':''}`} onClick={()=>setActiveTab('tenders')}>Tenders</button>
        <button className={`w-full text-left p-2 rounded ${activeTab==='mybids'?'bg-blue-50':''}`} onClick={()=>setActiveTab('mybids')}>My Bids</button>
        <button className={`w-full text-left p-2 rounded ${activeTab==='automated'?'bg-blue-50':''}`} onClick={()=>setActiveTab('automated')}>Automated Bidding</button>
        <button className={`w-full text-left p-2 rounded ${activeTab==='comparison'?'bg-blue-50':''}`} onClick={()=>setActiveTab('comparison')}>Comparison Matrix</button>
        <button className={`w-full text-left p-2 rounded ${activeTab==='cost'?'bg-blue-50':''}`} onClick={()=>setActiveTab('cost')}>Cost & Markup</button>
        <button className={`w-full text-left p-2 rounded ${activeTab==='templates'?'bg-blue-50':''}`} onClick={()=>setActiveTab('templates')}>Templates</button>
        <button className={`w-full text-left p-2 rounded ${activeTab==='analytics'?'bg-blue-50':''}`} onClick={()=>setActiveTab('analytics')}>Analytics</button>

        <div className="mt-4 border-t pt-3">
          <button onClick={()=>setShowVendorModal(true)} className="w-full bg-green-600 text-white px-3 py-2 rounded flex items-center justify-center gap-2"><FaUserPlus/> Register Vendor</button>
        </div>
      </div>
    </div>
  )

  // Main render
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-[1200px] mx-auto">

        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-3"><FaGavel className="text-blue-600"/> Bidding Suite</h1>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center border rounded-lg px-3 py-1 bg-white">
              <FaSearch className="text-gray-400 mr-2"/>
              <input placeholder="Search tenders or vendors" className="outline-none" value={query} onChange={e=>setQuery(e.target.value)} />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Help</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 w-full">
            <Sidebar/>
          </aside>

          <main className="lg:col-span-3">
            {/* Top stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-4 shadow">
                <div className="text-sm text-gray-500">Active Tenders</div>
                <div className="text-2xl font-bold">{tenders.filter(t=>t.status==='Open').length}</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow">
                <div className="text-sm text-gray-500">My Submissions</div>
                <div className="text-2xl font-bold">{bids.length}</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow">
                <div className="text-sm text-gray-500">Templates</div>
                <div className="text-2xl font-bold">{templates.length}</div>
              </div>
            </div>

            {/* Tabs Content */}
            <div className="bg-white rounded-2xl p-4 shadow-none  lg:shadow">
              {activeTab === 'tenders' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Available Tenders</h2>
                    <div className="flex items-center gap-3">
                      <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="border rounded px-2 py-1">
                        <option>All</option>
                        <option>Open</option>
                        <option>Closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredTenders.map(t => (
                      <div key={t.id} className="border rounded p-4 flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{t.title}</div>
                          <div className="text-sm text-gray-500">{t.location} • {t.start} → {t.end}</div>
                          <div className="text-sm text-gray-600 mt-2">{t.description}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`px-3 py-1 rounded-full text-sm ${t.status==='Open' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{t.status}</div>
                          <button onClick={()=>{ setSelectedTender(t); setShowBidModal(true) }} className="bg-blue-600 text-white px-3 py-2 rounded">Submit Bid</button>
                          <button onClick={()=>setSelectedTender(t)} className="border px-3 py-2 rounded">Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'mybids' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">My Bids</h2>
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-600">
                        <th className="py-2">Tender</th>
                        <th className="py-2">Vendor</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">Submitted On</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bids.map(b => (
                        <tr key={b.id} className="border-t">
                          <td className="py-2">{tenders.find(t=>t.id===b.tenderId)?.title || '—'}</td>
                          <td className="py-2">{b.vendor}</td>
                          <td className="py-2">₹{Number(b.amount).toLocaleString()}</td>
                          <td className="py-2">{b.submittedOn}</td>
                          <td className="py-2">{b.status}</td>
                          <td className="py-2">
                            <div className="flex gap-2">
                              {b.status === 'Submitted' && <button onClick={()=>withdrawBid(b.id)} className="text-sm border px-2 rounded">Withdraw</button>}
                              <button className="text-sm border px-2 rounded">View</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'automated' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Automated Bidding / Evaluation</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded">
                      <div className="font-semibold mb-2">Weightage (Set scoring weight)</div>
                      <div className="text-sm text-gray-600">Technical: {weightTechnical}%</div>
                      <input type="range" min={0} max={100} value={weightTechnical} onChange={e=>setWeightTechnical(Number(e.target.value))} />
                      <div className="text-sm text-gray-600 mt-2">Financial: {weightFinancial}%</div>
                      <input type="range" min={0} max={100} value={weightFinancial} onChange={e=>setWeightFinancial(Number(e.target.value))} />
                    </div>

                    <div className="p-4 border rounded">
                      <div className="font-semibold mb-2">Evaluation Summary</div>
                      <div className="text-sm text-gray-600">Choose a tender to see auto-evaluation scores (example uses price-normalized scoring).</div>
                      <div className="mt-3">
                        <select onChange={e=> setSelectedTender(tenders.find(t=>t.id===Number(e.target.value)) || null)} className="border px-2 py-1 rounded">
                          <option value="">Select tender</option>
                          {tenders.map(t=> <option key={t.id} value={t.id}>{t.title}</option>)}
                        </select>

                        {selectedTender && (
                          <div className="mt-3">
                            {computeScoresForTender(selectedTender.id).length === 0 ? (
                              <div className="text-sm text-gray-600">No bids yet</div>
                            ) : (
                              <table className="min-w-full text-sm mt-2">
                                <thead>
                                  <tr className="text-left text-gray-600"><th>Vendor</th><th>Amount</th><th>Fin.Score</th><th>Tech.Score</th><th>Final</th></tr>
                                </thead>
                                <tbody>
                                  {computeScoresForTender(selectedTender.id).map(r=> (
                                    <tr key={r.id} className="border-t">
                                      <td className="py-1">{r.vendor}</td>
                                      <td className="py-1">₹{Number(r.amount).toLocaleString()}</td>
                                      <td className="py-1">{r.financialScore}</td>
                                      <td className="py-1">{r.technicalScore}</td>
                                      <td className="py-1 font-semibold">{r.finalScore}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'comparison' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Bid Comparison Matrix</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-2 px-3">Vendor</th>
                          <th className="py-2 px-3">Amount</th>
                          <th className="py-2 px-3">Timeline</th>
                          <th className="py-2 px-3">Compliance</th>
                          <th className="py-2 px-3">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bids.map(b=> (
                          <tr key={b.id} className="border-t">
                            <td className="py-2 px-3">{b.vendor}</td>
                            <td className="py-2 px-3">₹{Number(b.amount).toLocaleString()}</td>
                            <td className="py-2 px-3">{b.timelineDays} days</td>
                            <td className="py-2 px-3">Compliant</td>
                            <td className="py-2 px-3">—</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'cost' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Cost Breakdown & Markup Management</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded">
                      <div className="font-semibold mb-2">Items</div>
                      <div className="space-y-2">
                        {costItems.map(item=> (
                          <div key={item.id} className="flex items-center justify-between border rounded px-3 py-2">
                            <div>
                              <div className="font-semibold">{item.name}</div>
                              <div className="text-sm text-gray-500">Qty: {item.qty} • Rate: ₹{item.rate}</div>
                            </div>
                            <div className="text-right">
                              <div>₹{(item.qty*item.rate).toLocaleString()}</div>
                              <div className="text-sm text-gray-500">Markup: {item.markupPercent}%</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 border rounded">
                      <div className="font-semibold">Summary</div>
                      <div className="mt-3 text-sm text-gray-600">Estimated Cost: ₹{totalEstimated.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Markup: ₹{totalMarkupAmount.toLocaleString()}</div>
                      <div className="text-lg font-bold mt-2">Final Price: ₹{totalFinal.toLocaleString()}</div>
                      <div className="mt-4">
                        <label className="text-sm text-gray-600">Add Cost Item</label>
                        <AddCostItem onAdd={(it)=> setCostItems(prev=>[...prev, {...it, id:Date.now()}])} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'templates' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-semibold">Templates</h2>
                    <button className="bg-green-600 text-white px-3 py-2 rounded flex items-center gap-2"><FaPlus/> New Template</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {templates.map(t=> (
                      <div key={t.id} className="border rounded p-3">
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-sm text-gray-500">{t.description}</div>
                        <div className="mt-3 flex gap-2">
                          <button className="border px-2 py-1 rounded">Use Template</button>
                          <button className="border px-2 py-1 rounded">Preview</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Analytics & Profitability</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded">
                      <div className="font-semibold">Bid Trend</div>
                      <div className="h-40 bg-gray-50 rounded mt-3 flex items-center justify-center">Chart placeholder</div>
                    </div>
                    <div className="p-4 border rounded">
                      <div className="font-semibold">Profitability</div>
                      <div className="h-40 bg-gray-50 rounded mt-3 flex items-center justify-center">Chart placeholder</div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </main>
        </div>
      </div>

      {/* Vendor Registration Modal */}
      {showVendorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <button onClick={()=>setShowVendorModal(false)} className="absolute top-4 right-4 text-gray-500"><FaTimes/></button>
            <h3 className="text-lg font-semibold mb-2">Vendor Registration</h3>
            <div className="space-y-3">
              <input placeholder="Company name" value={vendorProfile.company} onChange={e=>setVendorProfile(prev=>({...prev, company: e.target.value}))} className="w-full border rounded px-3 py-2" />
              <input placeholder="Contact person & phone" value={vendorProfile.contact} onChange={e=>setVendorProfile(prev=>({...prev, contact: e.target.value}))} className="w-full border rounded px-3 py-2" />
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="GST" value={vendorProfile.gst} onChange={e=>setVendorProfile(prev=>({...prev, gst: e.target.value}))} className="w-full border rounded px-3 py-2" />
                <input placeholder="PAN" value={vendorProfile.pan} onChange={e=>setVendorProfile(prev=>({...prev, pan: e.target.value}))} className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label className="flex items-center gap-2 border rounded px-3 py-2 cursor-pointer">
                  <FaUpload/>
                  <span>Upload KYC & Certifications</span>
                  <input type="file" onChange={onVendorFileChange} multiple className="hidden" />
                </label>
                <div className="mt-2 text-sm text-gray-600">{vendorProfile.docs.length} files selected</div>
              </div>

              <div className="flex justify-end gap-2">
                <button onClick={()=>setShowVendorModal(false)} className="border px-4 py-2 rounded">Cancel</button>
                <button onClick={registerVendor} className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bid Submission Modal */}
      {showBidModal && selectedTender && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button onClick={()=>{ setShowBidModal(false); setUploadedFiles([]) }} className="absolute top-4 right-4 text-gray-500"><FaTimes/></button>
            <h3 className="text-lg font-semibold mb-2">Submit Bid — {selectedTender.title}</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Bid Amount (INR)</label>
                <input value={bidForm.amount} onChange={e=>setBidForm(prev=>({...prev, amount: e.target.value}))} className="w-full border rounded px-3 py-2" placeholder="e.g. 250000" />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Proposed Timeline (days)</label>
                <input value={bidForm.timelineDays} onChange={e=>setBidForm(prev=>({...prev, timelineDays: e.target.value}))} className="w-full border rounded px-3 py-2" placeholder="e.g. 30" />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Notes / Remarks</label>
                <textarea value={bidForm.notes} onChange={e=>setBidForm(prev=>({...prev, notes: e.target.value}))} className="w-full border rounded px-3 py-2" rows={3} />
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">Attach Documents (Technical / Financial)</div>
                <label className="flex items-center gap-2 border rounded px-3 py-2 cursor-pointer">
                  <FaUpload/>
                  <span>Choose files</span>
                  <input type="file" onChange={onBidFilesChange} multiple className="hidden" />
                </label>
                <div className="mt-2 space-y-1">
                  {uploadedFiles.map((f,i)=> (
                    <div key={i} className="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
                      <div className="text-sm">{f.name}</div>
                      <div className="text-xs text-gray-500">{(f.size/1024).toFixed(1)} KB</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button onClick={()=>{ setShowBidModal(false); setUploadedFiles([]) }} className="border px-4 py-2 rounded">Cancel</button>
                <button onClick={submitBid} className="bg-blue-600 text-white px-4 py-2 rounded">Submit Bid</button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

// Small helper component for adding cost items
function AddCostItem({ onAdd }){
  const [item, setItem] = useState({ name:'', qty:0, rate:0, markupPercent:0 })
  return (
    <div className="space-y-2">
      <input placeholder="Item name" value={item.name} onChange={e=>setItem({...item, name: e.target.value})} className="w-full border rounded px-2 py-1" />
      <div className="grid grid-cols-3 gap-2">
        <input placeholder="Qty" type="number" value={item.qty} onChange={e=>setItem({...item, qty: Number(e.target.value)})} className="w-full border rounded px-2 py-1" />
        <input placeholder="Rate" type="number" value={item.rate} onChange={e=>setItem({...item, rate: Number(e.target.value)})} className="w-full border rounded px-2 py-1" />
        <input placeholder="Markup %" type="number" value={item.markupPercent} onChange={e=>setItem({...item, markupPercent: Number(e.target.value)})} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="flex gap-2">
        <button onClick={()=>{ onAdd(item); setItem({ name:'', qty:0, rate:0, markupPercent:0 }) }} className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
      </div>
    </div>
  )
}
