import './index.css'
import './App.css'
import { runSimulation } from './simulationService';
import { useState } from 'react';
import STATUS from './models/status';
import {
  Users,
  Ticket,
  Clock,
  Activity,
  Play,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const inventoryData = [
  { time: 0, inventory: 100 },
  { time: 1, inventory: 85 },
  { time: 2, inventory: 60 },
  { time: 3, inventory: 35 },
  { time: 4, inventory: 12 },
  { time: 5, inventory: 0 },
];

const successData = [
  { name: "Success", value: 100 },
  { name: "Failed", value: 400 },
];

const COLORS = ["#22c55e", "#ef4444"];

function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [users, setUsers] = useState(500);
  const [tickets, setTickets] = useState(100);
  const [threads, setThreads] = useState(20);
  const [strategy, setStrategy] = useState(STATUS.NO_LOCK);

  const handleSimulation = async () => {
    try {
      const response = await runSimulation({
        users: users,
        tickets: tickets,
        threads: threads,
        strategy: strategy
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }

  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            🎟 Ticket Drop Simulator
          </h1>

          <p className="text-slate-400 mt-2">
            Visualize Java Concurrency, Thread Pools and Streams
          </p>
        </div>

        {/* CONFIG */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">
            Simulation Controls
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <p>Users</p>
              <input
                type="number"
                defaultValue={users}
                className="bg-slate-800 rounded-lg p-3"
                placeholder="Users"
                onChange={(e) => setUsers(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <p>Tickets</p>
              <input
                type="number"
                defaultValue={tickets}
                className="bg-slate-800 rounded-lg p-3"
                placeholder="Tickets"
                onChange={(e) => setTickets(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <p>Threads</p>
              <input
                type="number"
                defaultValue={threads}
                className="bg-slate-800 rounded-lg p-3"
                placeholder="Threads"
                onChange={(e) => setThreads(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <p>Strategy</p>
              <select className="bg-slate-800 rounded-lg p-3" onChange={(e) => setStrategy(e.target.value)}>
                <option value={STATUS.NO_LOCK}>No Lock</option>
                <option value={STATUS.SYNCHRONIZED}>synchronized</option>
                <option value={STATUS.REENTRACT_LOCK}>ReentrantLock</option>
                <option value={STATUS.ATOMIC_INTEGER}>AtomicInteger</option>
              </select>
            </div>
          </div>

          <button className="mt-5 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl" onClick={handleSimulation}>
            <Play size={18} />
            Run Simulation
          </button>
        </Card>

        {/* METRICS */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <Users className="mb-2 text-blue-400" />
            <p className="text-slate-400">Users</p>
            <h3 className="text-3xl font-bold">500</h3>
          </Card>

          <Card>
            <Ticket className="mb-2 text-green-400" />
            <p className="text-slate-400">Success</p>
            <h3 className="text-3xl font-bold">100</h3>
          </Card>

          <Card>
            <Activity className="mb-2 text-red-400" />
            <p className="text-slate-400">Failed</p>
            <h3 className="text-3xl font-bold">400</h3>
          </Card>

          <Card>
            <Clock className="mb-2 text-yellow-400" />
            <p className="text-slate-400">Duration</p>
            <h3 className="text-3xl font-bold">42ms</h3>
          </Card>
        </div>

        {/* CHARTS */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="font-semibold text-lg mb-4 text-white">
              Inventory Over Time
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={inventoryData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="inventory"
                    stroke="#3b82f6"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h2 className="font-semibold text-lg mb-4">
              Success vs Failure
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={successData}
                    dataKey="value"
                    outerRadius={120}
                  >
                    {successData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* QUEUE */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">
            Queue Visualizer
          </h2>

          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="bg-slate-800 px-3 py-2 rounded-lg text-sm"
              >
                U{i + 1}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
              <div
                className="bg-blue-500 h-full"
                style={{ width: "70%" }}
              />
            </div>
          </div>
        </Card>

        {/* THREADS */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">
            Thread Pool Activity
          </h2>

          <div className="space-y-4">
            {[
              {
                name: "Thread-1",
                width: "90%",
              },
              {
                name: "Thread-2",
                width: "75%",
              },
              {
                name: "Thread-3",
                width: "55%",
              },
              {
                name: "Thread-4",
                width: "20%",
              },
            ].map((thread) => (
              <div key={thread.name}>
                <div className="flex justify-between mb-1">
                  <span>{thread.name}</span>
                  <span className="text-slate-400">
                    Processing Request
                  </span>
                </div>

                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: thread.width,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* STREAMS */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">
            Java Streams Analysis
          </h2>

          <div className="space-y-3 text-slate-300">
            <div>
              Raw Results:
              <span className="text-blue-400 ml-2">
                [S,S,F,S,F,S,S,F]
              </span>
            </div>

            <div>↓ filter(success)</div>

            <div>
              <span className="text-green-400">
                [S,S,S,S,S]
              </span>
            </div>

            <div>↓ count()</div>

            <div className="text-2xl font-bold text-white">
              100 Successful Purchases
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
