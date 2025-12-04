// import React, { useState } from "react";
// import { Upload, FileText, Trash2, Eye, Download, Search } from "lucide-react";

// const Document = () => {
//   const [documents, setDocuments] = useState([
//     { id: 1, name: "GST Certificate", type: "PDF", date: "01 Oct 2025", status: "Verified" },
//     { id: 2, name: "PAN Card", type: "Image", date: "15 Sept 2025", status: "Pending" },
//   ]);

//   const [selectedFile, setSelectedFile] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (selectedFile) {
//       const newDoc = {
//         id: documents.length + 1,
//         name: selectedFile.name,
//         type: selectedFile.type.split("/")[1]?.toUpperCase() || "File",
//         date: new Date().toLocaleDateString(),
//         status: "Pending",
//       };
//       setDocuments([...documents, newDoc]);
//       setSelectedFile(null);
//     }
//   };

//   const handleDelete = (id) => {
//     setDocuments(documents.filter((doc) => doc.id !== id));
//   };

//   const filteredDocs = documents.filter((doc) =>
//     doc.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-8 min-h-screen bg-white">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
//           <h1 className="text-3xl font-bold text-gray-800 tracking-wide"> Document Center</h1>
//           <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-md">
//             <Search className="w-4 h-4 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search document..."
//               className="outline-none bg-transparent text-sm w-40"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Upload Section */}
//         <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between border border-gray-200">
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
//               file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700
//               hover:file:bg-blue-200 text-gray-600"
//           />
//           <button
//             onClick={handleUpload}
//             className="mt-4 sm:mt-0 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full flex items-center gap-2 hover:shadow-md hover:scale-105 transition"
//           >
//             <Upload className="w-5 h-5" /> Upload
//           </button>
//         </div>

//         {/* Documents Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//           {filteredDocs.map((doc) => (
//             <div
//               key={doc.id}
//               className="bg-white border border-gray-100 shadow-md hover:shadow-xl transition rounded-2xl p-5 flex justify-between items-start group"
//             >
//               <div className="flex items-start gap-4">
//                 <div className="bg-gradient-to-br from-blue-100 to-indigo-200 p-3 rounded-full">
//                   <FileText className="w-6 h-6 text-blue-700" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-800 group-hover:text-blue-700 transition">
//                     {doc.name}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {doc.type} • {doc.date}
//                   </p>
//                   <span
//                     className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
//                       doc.status === "Verified"
//                         ? "bg-green-100 text-green-600"
//                         : "bg-yellow-100 text-yellow-600"
//                     }`}
//                   >
//                     {doc.status}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex flex-col items-center gap-3">
//                 <button
//                   className="text-blue-600 hover:text-blue-800 transition"
//                   title="View"
//                 >
//                   <Eye className="w-5 h-5" />
//                 </button>
//                 <button
//                   className="text-green-600 hover:text-green-800 transition"
//                   title="Download"
//                 >
//                   <Download className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(doc.id)}
//                   className="text-red-600 hover:text-red-800 transition"
//                   title="Delete"
//                 >
//                   <Trash2 className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredDocs.length === 0 && (
//           <div className="text-center py-10 text-gray-500">
//             <FileText className="w-10 h-10 mx-auto mb-2 text-gray-400" />
//             <p>No matching documents found.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Document;
