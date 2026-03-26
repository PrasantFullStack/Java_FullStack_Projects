 
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
// commit test and push
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Send
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}