// import { useState } from "react";
// import Sidebar from "@/components/Sidebar";

// interface Ticket {
//   id: string;
//   customer: string;
//   subject: string;
//   status: "Open" | "Pending" | "Resolved";
//   date: string;
// }

// export default function Support() {
//   const [tickets] = useState<Ticket[]>([
//     {
//       id: "TKT1001",
//       customer: "Rahul Sharma",
//       subject: "Order not delivered",
//       status: "Open",
//       date: "12 Mar 2026",
//     },
//     {
//       id: "TKT1002",
//       customer: "Amit Singh",
//       subject: "Payment issue",
//       status: "Pending",
//       date: "11 Mar 2026",
//     },
//     {
//       id: "TKT1003",
//       customer: "Sohan Kumar",
//       subject: "Wrong product received",
//       status: "Resolved",
//       date: "10 Mar 2026",
//     },
//   ]);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
      
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 p-6">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Support Tickets</h1>

//           <input
//             type="text"
//             placeholder="Search tickets..."
//             className="border px-3 py-2 rounded-lg"
//           />
//         </div>

//         {/* Filters */}
//         <div className="flex gap-3 mb-6">
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//             All Tickets
//           </button>

//           <button className="bg-gray-200 px-4 py-2 rounded-lg">
//             Open
//           </button>

//           <button className="bg-gray-200 px-4 py-2 rounded-lg">
//             Pending
//           </button>

//           <button className="bg-gray-200 px-4 py-2 rounded-lg">
//             Resolved
//           </button>
//         </div>

//         {/* Tickets Table */}
//         <div className="bg-white shadow rounded-xl overflow-hidden">

//           <table className="w-full text-left">

//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3">Ticket ID</th>
//                 <th className="p-3">Customer</th>
//                 <th className="p-3">Subject</th>
//                 <th className="p-3">Date</th>
//                 <th className="p-3">Status</th>
//                 <th className="p-3">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {tickets.map((ticket) => (
//                 <tr key={ticket.id} className="border-t">

//                   <td className="p-3 font-medium">{ticket.id}</td>

//                   <td className="p-3">{ticket.customer}</td>

//                   <td className="p-3">{ticket.subject}</td>

//                   <td className="p-3">{ticket.date}</td>

//                   <td className="p-3">

//                     <span
//                       className={`px-3 py-1 rounded-full text-sm ${
//                         ticket.status === "Resolved"
//                           ? "bg-green-100 text-green-600"
//                           : ticket.status === "Pending"
//                           ? "bg-yellow-100 text-yellow-600"
//                           : "bg-red-100 text-red-600"
//                       }`}
//                     >
//                       {ticket.status}
//                     </span>

//                   </td>

//                   <td className="p-3 flex gap-2">

//                     <button className="bg-blue-600 text-white px-3 py-1 rounded">
//                       View
//                     </button>

//                     <button className="bg-green-600 text-white px-3 py-1 rounded">
//                       Reply
//                     </button>

//                   </td>

//                 </tr>
//               ))}
//             </tbody>

//           </table>

//         </div>

//         {/* Pagination */}
//         <div className="flex justify-end mt-4 gap-2">

//           <button className="px-3 py-1 border rounded">
//             Prev
//           </button>

//           <button className="px-3 py-1 border rounded bg-blue-600 text-white">
//             1
//           </button>

//           <button className="px-3 py-1 border rounded">
//             2
//           </button>

//           <button className="px-3 py-1 border rounded">
//             Next
//           </button>

//         </div>

//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function SupportChat() {
  const [message, setMessage] = useState("");

  const users = [
    { id: 1, name: "Rahul Sharma", issue: "Order not delivered" },
    { id: 2, name: "Amit Singh", issue: "Payment problem" },
    { id: 3, name: "Sohan Kumar", issue: "Wrong product" },
  ];

  const messages = [
    { sender: "user", text: "Hello, my order is not delivered." },
    { sender: "admin", text: "Please share your order ID." },
    { sender: "user", text: "Order ID: ORD1023" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex flex-1">

        {/* Left Ticket List */}
        <div className="w-72 bg-white border-r">

          <div className="p-4 font-bold text-lg border-b">
            Support Tickets
          </div>

          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 border-b hover:bg-gray-100 cursor-pointer"
            >
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.issue}</p>
            </div>
          ))}

        </div>

        {/* Chat Section */}
        <div className="flex flex-col flex-1">

          {/* Chat Header */}
          <div className="p-4 border-b bg-white font-semibold">
            Rahul Sharma
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-xs p-3 rounded-lg ${
                  msg.sender === "admin"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}

          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t flex gap-2">

            <input
              type="text"
              placeholder="Type message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border px-3 py-2 rounded-lg"
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Send
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}