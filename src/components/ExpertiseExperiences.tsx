import React, { useState, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  Terminal,
  RotateCcw,
  Plus,
  Play
} from 'lucide-react';
import {
  initialRegressionPoints,
  calculateLinearRegression,
  type RegressionPoint
} from '../data/regressionData';

interface ExpertiseExperiencesProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

export const ExpertiseExperiences: React.FC<ExpertiseExperiencesProps> = ({
  activeTab,
  onTabChange
}) => {
  // ---- 1. DATA SCIENCE: Real Regression Model State ----
  const [points, setPoints] = useState<RegressionPoint[]>(initialRegressionPoints);
  const [draggedPointId, setDraggedPointId] = useState<number | null>(null);
  const wasDraggingRef = useRef(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const metrics = calculateLinearRegression(points);

  // SVG coordinate mapping (SVG box: 0-100 x 0-100, mapped to height with inverted Y)
  const svgWidth = 360;
  const svgHeight = 220;

  const toSvgX = (x: number) => (x / 100) * (svgWidth - 60) + 35;
  const toSvgY = (y: number) => svgHeight - 30 - (y / 100) * (svgHeight - 60);

  const fromSvgX = (svgX: number) =>
    Math.min(100, Math.max(0, ((svgX - 35) / (svgWidth - 60)) * 100));
  const fromSvgY = (svgY: number) =>
    Math.min(100, Math.max(0, ((svgHeight - 30 - svgY) / (svgHeight - 60)) * 100));

  const handlePointerDown = (id: number) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDraggedPointId(id);
    wasDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggedPointId === null || !svgRef.current) return;
    wasDraggingRef.current = true;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseSvgX = ((e.clientX - rect.left) / rect.width) * svgWidth;
    const mouseSvgY = ((e.clientY - rect.top) / rect.height) * svgHeight;

    const newX = Math.round(fromSvgX(mouseSvgX));
    const newY = Math.round(fromSvgY(mouseSvgY));

    setPoints((prev) =>
      prev.map((pt) => (pt.id === draggedPointId ? { ...pt, x: newX, y: newY } : pt))
    );
  };

  const handlePointerUp = () => {
    setDraggedPointId(null);
    setTimeout(() => {
      wasDraggingRef.current = false;
    }, 50);
  };

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (wasDraggingRef.current || draggedPointId !== null || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseSvgX = ((e.clientX - rect.left) / rect.width) * svgWidth;
    const mouseSvgY = ((e.clientY - rect.top) / rect.height) * svgHeight;

    const clickX = Math.round(fromSvgX(mouseSvgX));
    const clickY = Math.round(fromSvgY(mouseSvgY));

    if (clickX >= 5 && clickX <= 95 && clickY >= 5 && clickY <= 95) {
      setPoints((prev) => [
        ...prev,
        { id: Date.now(), x: clickX, y: clickY, label: `Sensor ${prev.length + 1}` }
      ]);
    }
  };

  const resetPoints = () => {
    setPoints(initialRegressionPoints);
  };

  const addRandomPoint = () => {
    const newId = Date.now();
    const rx = Math.floor(20 + Math.random() * 65);
    const ry = Math.min(
      95,
      Math.max(
        10,
        Math.floor(metrics.slope * rx + metrics.intercept + (Math.random() - 0.5) * 20)
      )
    );
    setPoints((prev) => [
      ...prev,
      { id: newId, x: rx, y: ry, label: `Sensor ${prev.length + 1}` }
    ]);
  };

  // Regression line coordinates
  const lineX1 = 0;
  const lineY1 = Math.max(0, Math.min(100, metrics.slope * lineX1 + metrics.intercept));
  const lineX2 = 100;
  const lineY2 = Math.max(0, Math.min(100, metrics.slope * lineX2 + metrics.intercept));

  // ---- 2. WEB ENGINEERING: Code Editor & MERN Queue Simulator ----
  const [activeCodeFile, setActiveCodeFile] = useState<'controller' | 'schema' | 'hook'>('controller');
  const [queueStatus, setQueueStatus] = useState<string>('Idle (Listening on :5000)');
  const [processedCount, setProcessedCount] = useState<number>(42);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const simulateRequest = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setQueueStatus('Enqueuing order payload...');
    setTimeout(() => {
      setQueueStatus('Atomic MongoDB transaction executed');
      setTimeout(() => {
        setQueueStatus('Dispatched WebSocket notification to client');
        setProcessedCount((p) => p + 1);
        setIsProcessing(false);
      }, 700);
    }, 600);
  };

  const codeSnippets = {
    controller: `// QueueBite Controller (Express + MERN)
export const dispatchOrder = async (req: Request, res: Response) => {
  const { tableId, items, customer } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  const ticket = await OrderQueue.create([{
    tableId, items, status: 'PREPARING',
    timestamp: new Date()
  }], { session });

  await session.commitTransaction();
  io.to(tableId).emit('ORDER_ACK', ticket);
  return res.status(201).json({ success: true, ticket });
};`,
    schema: `// Mongoose Schema with Compound Indexes
const OrderQueueSchema = new Schema({
  tableId: { type: String, required: true, index: true },
  items: [{ itemId: String, quantity: Number, notes: String }],
  status: { 
    type: String, 
    enum: ['QUEUED', 'PREPARING', 'READY', 'SERVED'],
    default: 'QUEUED' 
  },
  estimatedPrepMins: { type: Number, default: 12 }
}, { timestamps: true });`,
    hook: `// Real-Time Socket Connection Hook
export const useOrderSubscription = (tableId: string) => {
  const [orderState, setOrderState] = useState<OrderTicket | null>(null);

  useEffect(() => {
    const socket = io(API_GATEWAY_URL, { transports: ['websocket'] });
    socket.emit('JOIN_TABLE', { tableId });
    socket.on('ORDER_ACK', (data) => setOrderState(data));

    return () => { socket.disconnect(); };
  }, [tableId]);

  return { orderState };
};`
  };

  // Gradient ID for regression area
  const gradientId = useId();

  return (
    <div className="w-full">
      {/* Two Discipline Tabs Header */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 p-1.5 rounded-2xl glass-panel border border-white/10 mb-6 select-none">
        {/* Tab 1: Data Science */}
        <button
          onClick={() => onTabChange(0)}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 0
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/20'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Database className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Data Science (Analytics)</span>
        </button>

        {/* Tab 2: Web Engineering */}
        <button
          onClick={() => onTabChange(1)}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 1
              ? 'bg-purple-600/25 text-purple-200 border border-purple-500/40 shadow-lg shadow-purple-600/20'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Terminal className="w-4 h-4 text-purple-400 shrink-0" />
          <span>Web Engineering (Full-Stack)</span>
        </button>
      </div>

      {/* Active Tab Experience Container */}
      <AnimatePresence mode="wait">
        {/* ==================== 1. DATA SCIENCE EXPERIENCE ==================== */}
        {activeTab === 0 && (
          <motion.div
            key="data-science-exp"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="p-5 sm:p-6 rounded-2xl glass-panel border border-cyan-500/30 relative overflow-hidden"
          >
            {/* Top Bar with Title, Real Model Badge & Control Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <h4 className="font-space text-base sm:text-lg font-bold text-white">
                  Air Quality Linear Regression
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  Closed-Form OLS
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={addRandomPoint}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-xs font-mono-code text-cyan-300 hover:text-white transition-all cursor-pointer"
                  title="Add sample data point"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Point</span>
                </button>
                <button
                  onClick={resetPoints}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
                  title="Reset points"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-zinc-400 mb-4 font-sans">
              <span className="text-cyan-400 font-semibold">Interactive Model:</span> Drag any glowing data point to observe the real ordinary least-squares regression line, coefficient of determination ($R^2$), and Mean Squared Error recalculate live in your browser.
            </p>

            {/* Live Interactive SVG Scatter & Fit Line */}
            <div className="relative w-full rounded-xl bg-black/40 border border-cyan-500/20 p-2 overflow-hidden">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto select-none touch-none cursor-crosshair"
                onClick={handleSvgClick}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              >
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[0.25, 0.5, 0.75].map((val) => (
                  <g key={val}>
                    <line
                      x1="35"
                      y1={toSvgY(val * 100)}
                      x2={svgWidth - 25}
                      y2={toSvgY(val * 100)}
                      stroke="rgba(255,255,255,0.06)"
                      strokeDasharray="3 3"
                    />
                    <line
                      x1={toSvgX(val * 100)}
                      y1="20"
                      x2={toSvgX(val * 100)}
                      y2={svgHeight - 30}
                      stroke="rgba(255,255,255,0.06)"
                      strokeDasharray="3 3"
                    />
                  </g>
                ))}

                {/* Axes */}
                <line
                  x1="35"
                  y1={svgHeight - 30}
                  x2={svgWidth - 25}
                  y2={svgHeight - 30}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1.5"
                />
                <line
                  x1="35"
                  y1="20"
                  x2="35"
                  y2={svgHeight - 30}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1.5"
                />

                {/* Axis Labels */}
                <text
                  x={svgWidth - 25}
                  y={svgHeight - 12}
                  fill="#94a3b8"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  PM2.5 Sensor Voltage (mV) →
                </text>
                <text
                  x="12"
                  y="24"
                  fill="#94a3b8"
                  fontSize="9"
                  fontFamily="monospace"
                  transform="rotate(-90 12,24)"
                >
                  Calculated AQI →
                </text>

                {/* Residual Lines (Distance to line) */}
                {points.map((pt) => {
                  const yPred = metrics.slope * pt.x + metrics.intercept;
                  return (
                    <line
                      key={`res-${pt.id}`}
                      x1={toSvgX(pt.x)}
                      y1={toSvgY(pt.y)}
                      x2={toSvgX(pt.x)}
                      y2={toSvgY(Math.max(0, Math.min(100, yPred)))}
                      stroke="rgba(6, 182, 212, 0.4)"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  );
                })}

                {/* Fitted OLS Regression Line */}
                <line
                  x1={toSvgX(lineX1)}
                  y1={toSvgY(lineY1)}
                  x2={toSvgX(lineX2)}
                  y2={toSvgY(lineY2)}
                  stroke={`url(#${gradientId})`}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Draggable Sensor Data Points */}
                {points.map((pt) => {
                  const isBeingDragged = draggedPointId === pt.id;
                  return (
                    <g
                      key={pt.id}
                      transform={`translate(${toSvgX(pt.x)}, ${toSvgY(pt.y)})`}
                      onPointerDown={handlePointerDown(pt.id)}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      {/* Pulse aura when dragged */}
                      {isBeingDragged && (
                        <circle r="14" fill="#06b6d4" fillOpacity="0.25" className="animate-ping" />
                      )}
                      <circle
                        r={isBeingDragged ? '8' : '6'}
                        fill="#06b6d4"
                        stroke="#ffffff"
                        strokeWidth="1.8"
                        filter="drop-shadow(0 0 6px #06b6d4)"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Live Model Performance Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-cyan-500/20 text-center">
                <span className="text-[10px] font-mono-code text-zinc-400 block uppercase">
                  R² Score
                </span>
                <span className="font-space text-lg sm:text-xl font-bold text-cyan-300">
                  {(metrics.r2 * 100).toFixed(1)}%
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-cyan-500/20 text-center">
                <span className="text-[10px] font-mono-code text-zinc-400 block uppercase">
                  Mean Sq. Error
                </span>
                <span className="font-space text-lg sm:text-xl font-bold text-cyan-300">
                  {metrics.mse.toFixed(2)}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-cyan-500/20 text-center">
                <span className="text-[10px] font-mono-code text-zinc-400 block uppercase">
                  Equation
                </span>
                <span className="font-mono-code text-xs sm:text-sm font-bold text-white truncate block mt-1">
                  y = {metrics.slope.toFixed(2)}x {metrics.intercept >= 0 ? '+' : ''} {metrics.intercept.toFixed(1)}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-cyan-500/20 text-center">
                <span className="text-[10px] font-mono-code text-zinc-400 block uppercase">
                  Pearson r
                </span>
                <span className="font-space text-lg sm:text-xl font-bold text-cyan-300">
                  {metrics.correlation.toFixed(3)}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== 2. WEB ENGINEERING EXPERIENCE ==================== */}
        {activeTab === 1 && (
          <motion.div
            key="web-dev-exp"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="p-5 sm:p-6 rounded-2xl glass-panel border border-purple-500/30 relative overflow-hidden"
          >
            {/* Top Bar with Virtual File Tabs & Simulated Endpoint Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-purple-500/20">
              <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setActiveCodeFile('controller')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-colors cursor-pointer ${
                    activeCodeFile === 'controller'
                      ? 'bg-purple-600/40 text-purple-200 border border-purple-500/30'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  OrderController.ts
                </button>
                <button
                  onClick={() => setActiveCodeFile('schema')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-colors cursor-pointer ${
                    activeCodeFile === 'schema'
                      ? 'bg-purple-600/40 text-purple-200 border border-purple-500/30'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  OrderQueue.model.ts
                </button>
                <button
                  onClick={() => setActiveCodeFile('hook')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-colors cursor-pointer ${
                    activeCodeFile === 'hook'
                      ? 'bg-purple-600/40 text-purple-200 border border-purple-500/30'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  useOrderSocket.ts
                </button>
              </div>

              {/* Action Button: Simulate Queue Event */}
              <button
                onClick={simulateRequest}
                disabled={isProcessing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/25 hover:bg-purple-600/40 border border-purple-500/40 text-xs font-mono-code text-purple-200 transition-all cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate Socket Event</span>
              </button>
            </div>

            {/* Code Editor Window */}
            <div className="relative rounded-xl overflow-hidden bg-[#0a0715] border border-white/10 p-4 font-mono-code text-xs text-zinc-300 leading-relaxed max-h-56 overflow-y-auto">
              <div className="flex items-center gap-1.5 pb-2 mb-3 border-b border-white/5 text-[10px] text-zinc-500">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-2 text-zinc-400">QueueBite Backend Architecture</span>
              </div>
              <pre className="overflow-x-auto text-purple-200/90 selection:bg-purple-500/30">
                <code>{codeSnippets[activeCodeFile]}</code>
              </pre>
            </div>

            {/* Live Queue Worker State */}
            <div className="mt-4 p-3 rounded-xl bg-black/40 border border-purple-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isProcessing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
                  }`}
                />
                <span className="text-zinc-400">Worker Status:</span>
                <span className="text-white font-semibold">{queueStatus}</span>
              </div>
              <div className="text-zinc-400">
                Total Dispatched Orders: <span className="text-cyan-400 font-bold">{processedCount}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
