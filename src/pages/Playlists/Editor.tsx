// 'use client';

// import { useRef, useState } from 'react';
// import FabricCanvas, { FabricCanvasRef } from './fabricCanvas';

// export default function Editor() {
//   const canvasRef = useRef<FabricCanvasRef>(null);

//   const [mode, setMode] = useState<'vertical' | 'horizontal' | 'custom'>(
//     'vertical'
//   );

//   const [customSize, setCustomSize] = useState({ width: 600, height: 800 });

//   const applyVertical = () => {
//     setMode('vertical');
//     canvasRef.current?.resize(600, 900);
//   };

//   const applyHorizontal = () => {
//     setMode('horizontal');
//     canvasRef.current?.resize(900, 600);
//   };

//   const applyCustom = () => {
//     setMode('custom');
//     canvasRef.current?.resize(customSize.width, customSize.height);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       {/* Top Buttons */}
//       <div style={{ textAlign: 'center', marginBottom: 20 }}>
//         <button onClick={applyVertical}>Vertical</button>
//         <button onClick={applyHorizontal}>Horizontal</button>
//         <button onClick={() => setMode('custom')}>Custom</button>
//       </div>

//       {/* Custom Size Inputs */}
//       {mode === 'custom' && (
//         <div style={{ textAlign: 'center', marginBottom: 20 }}>
//           <input
//             type="number"
//             placeholder="Width"
//             value={customSize.width}
//             onChange={(e) =>
//               setCustomSize({ ...customSize, width: Number(e.target.value) })
//             }
//           />
//           <input
//             type="number"
//             placeholder="Height"
//             value={customSize.height}
//             onChange={(e) =>
//               setCustomSize({ ...customSize, height: Number(e.target.value) })
//             }
//           />
//           <button onClick={applyCustom}>Apply</button>
//         </div>
//       )}

//       {/* Canvas Area */}
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           background: '#f9fafb',
//           padding: 20,
//         }}
//       >
//         <FabricCanvas ref={canvasRef} width={600} height={900} />
//       </div>
//     </div>
//   );
// }
