'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export interface CanvasObject {
  id: number;
  image: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  type: string;
  src?: string;

  opacity?: number;     
  volume?: number;      
  autoplay?: boolean;   
  loop?: boolean;       
  muted?: boolean;
}

export interface FabricCanvasRef {
  setResolution: (w: number, h: number) => void;
  clear: () => void;
}

interface Props {
  width: number;
  height: number;
  showGrid: boolean;
  objects: CanvasObject[];
  onObjectsChange: (objects: CanvasObject[]) => void;
  onSelectionChange?: (objId: number | null) => void;
}

const FabricCanvas = forwardRef<FabricCanvasRef, Props>(
  ({ width, height, showGrid, objects, onObjectsChange, onSelectionChange }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const selectedRef = useRef<CanvasObject | null>(null);
    const draggingRef = useRef<any>(null);

    useEffect(() => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      contextRef.current = ctx;
      canvas.width = width;
      canvas.height = height;
      draw();
    }, [width, height]);

    useEffect(() => {
      draw();
    }, [objects, showGrid]);

    const draw = () => {
      const canvas = canvasRef.current;
      const ctx = contextRef.current;

      if (!canvas || !ctx) return;

      // Clear
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      if (showGrid) {
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        const gridSize = 50;

        for (let x = 0; x <= canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y <= canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }

      // Draw objects
      objects.forEach((obj) => {
        ctx.save();
        ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
        ctx.rotate((obj.rotation * Math.PI) / 180);

        // ✅ Draw image if it exists (Image/Video)
        if (obj.image && obj.image.complete && obj.image.naturalWidth > 0) {
          ctx.drawImage(obj.image, -obj.width / 2, -obj.height / 2, obj.width, obj.height);
        } else if (obj.type === 'audio') {
          // ✅ For audio: draw placeholder background + icon
          ctx.fillStyle = '#9ca3af';
          ctx.fillRect(-obj.width / 2, -obj.height / 2, obj.width, obj.height);

          ctx.fillStyle = 'white';
          ctx.font = 'bold 20px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('🎵', 0, 0);
        }

        // Selection border and handles
        if (selectedRef.current === obj) {
          ctx.strokeStyle = '#CD1E2F';
          ctx.lineWidth = 2;
          ctx.strokeRect(-obj.width / 2, -obj.height / 2, obj.width, obj.height);

          // Draw handles
          const handles = [
            [-obj.width / 2, -obj.height / 2],
            [obj.width / 2, -obj.height / 2],
            [-obj.width / 2, obj.height / 2],
            [obj.width / 2, obj.height / 2],
            [0, -obj.height / 2],
            [0, obj.height / 2],
            [-obj.width / 2, 0],
            [obj.width / 2, 0],
          ];

          ctx.fillStyle = '#CD1E2F';
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          handles.forEach(([hx, hy]) => {
            ctx.fillRect(hx - 4, hy - 4, 8, 8);
            ctx.strokeRect(hx - 4, hy - 4, 8, 8);
          });
        }
        ctx.restore();
      });

      // Border
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    };

    const getHandleAtPos = (obj: CanvasObject, x: number, y: number): string | null => {
      const handles: Record<string, [number, number]> = {
        nw: [obj.x, obj.y],
        ne: [obj.x + obj.width, obj.y],
        sw: [obj.x, obj.y + obj.height],
        se: [obj.x + obj.width, obj.y + obj.height],
        n: [obj.x + obj.width / 2, obj.y],
        s: [obj.x + obj.width / 2, obj.y + obj.height],
        w: [obj.x, obj.y + obj.height / 2],
        e: [obj.x + obj.width, obj.y + obj.height / 2],
      };

      for (const [handle, [hx, hy]] of Object.entries(handles)) {
        if (Math.abs(x - hx) < 8 && Math.abs(y - hy) < 8) return handle;
      }

      return null;
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      console.log('Mouse down at:', x, y);

      // Check handles first
      for (let i = objects.length - 1; i >= 0; i--) {
        const obj = objects[i];
        const handle = getHandleAtPos(obj, x, y);

        if (handle) {
          selectedRef.current = obj;
          console.log('Handle selected:', handle, 'Object ID:', obj.id);
          draggingRef.current = { obj, startX: x, startY: y, mode: handle, startObj: { ...obj } };
          onSelectionChange?.(obj.id);
          draw();

          return;
        }
      }

      // Check object click
      for (let i = objects.length - 1; i >= 0; i--) {
        const obj = objects[i];

        if (x > obj.x && x < obj.x + obj.width && y > obj.y && y < obj.y + obj.height) {
          selectedRef.current = obj;
          console.log('Object selected. ID:', obj.id);
          draggingRef.current = { obj, startX: x, startY: y, mode: 'move', startObj: { ...obj } };
          onSelectionChange?.(obj.id);
          draw();

          return;
        }
      }

      selectedRef.current = null;
      draggingRef.current = null;
      console.log('Selection cleared');
      onSelectionChange?.(null);
      draw();
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (!draggingRef.current) {
        // Update cursor on hover
        for (let i = objects.length - 1; i >= 0; i--) {
          const obj = objects[i];
          const handle = getHandleAtPos(obj, x, y);

          if (handle) {
            const cursorMap: Record<string, string> = {
              nw: 'nw-resize',
              ne: 'ne-resize',
              sw: 'sw-resize',
              se: 'se-resize',
              n: 'n-resize',
              s: 's-resize',
              w: 'w-resize',
              e: 'e-resize',
            };

            canvas.style.cursor = cursorMap[handle];

            return;
          }

          if (x > obj.x && x < obj.x + obj.width && y > obj.y && y < obj.y + obj.height) {
            canvas.style.cursor = 'grab';

            return;
          }
        }
        canvas.style.cursor = 'default';

        return;
      }

      const dx = x - draggingRef.current.startX;
      const dy = y - draggingRef.current.startY;
      const obj = draggingRef.current.obj;
      const startObj = draggingRef.current.startObj;
      const mode = draggingRef.current.mode;

      if (mode === 'move') {
        obj.x = Math.max(0, Math.min(startObj.x + dx, canvas.width - obj.width));
        obj.y = Math.max(0, Math.min(startObj.y + dy, canvas.height - obj.height));
        canvas.style.cursor = 'grabbing';
      } else {
        // Resize
        if (mode.includes('e')) obj.width = Math.max(40, startObj.width + dx);
        if (mode.includes('w')) {
          obj.width = Math.max(40, startObj.width - dx);
          obj.x = Math.max(0, startObj.x + dx);
        }
        if (mode.includes('s')) obj.height = Math.max(40, startObj.height + dy);
        if (mode.includes('n')) {
          obj.height = Math.max(40, startObj.height - dy);
          obj.y = Math.max(0, startObj.y + dy);
        }
      }

      onObjectsChange([...objects]);
      draw();
    };

    const handleMouseUp = () => {
      draggingRef.current = null;
      const canvas = canvasRef.current;

      if (canvas) canvas.style.cursor = 'default';
    };

    // ✅ Create placeholder image for fallback
    const createPlaceholder = (type: string, width: number = 150, height: number = 100): HTMLImageElement => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        const colorMap: Record<string, string> = {
          video: '#f97316',
          audio: '#8b5cf6',
          image: '#3b82f6',
          document: '#6b7280',
        };

        ctx.fillStyle = colorMap[type] || '#9ca3af';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = 'white';
        ctx.font = `bold ${Math.floor(width / 3)}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const emojiMap: Record<string, string> = {
          video: '🎬',
          audio: '🎵',
          image: '🖼️',
          document: '📄',
        };

        ctx.fillText(emojiMap[type] || '?', width / 2, height / 2);
      }

      const img = new Image();
      img.src = canvas.toDataURL();
      return img;
    };

    // ✅ FIXED: Proper media handling with error handling
    const handleDrop = (e: React.DragEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = canvasRef.current;

      if (!canvas) return;

      const data = e.dataTransfer.getData('media-payload');

      if (!data) return;

      try {
        const payload = JSON.parse(data);
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left - 75;
        const y = e.clientY - rect.top - 50;

        console.log('✅ Drop payload received:', payload);

        // ✅ For Image ONLY: load the actual image
        if (payload.type === 'image') {
          const img = new Image();
          img.crossOrigin = 'anonymous';

          img.onload = () => {
            const newObj: CanvasObject = {
              id: Date.now(),
              image: img,
              x: Math.max(0, Math.min(x, canvas.width - 100)),
              y: Math.max(0, Math.min(y, canvas.height - 100)),
              width: 150,
              height: 100,
              rotation: 0,
              type: 'image',
              src: payload.url,
            };

            console.log('✅ Image object dropped. ID:', newObj.id);
            onObjectsChange([...objects, newObj]);
            selectedRef.current = newObj;
            onSelectionChange?.(newObj.id);
            draw();
          };

          img.onerror = () => {
            console.warn('⚠️  Image failed to load, using placeholder');
            // Use placeholder on error
            const newObj: CanvasObject = {
              id: Date.now(),
              image: createPlaceholder('image'),
              x: Math.max(0, Math.min(x, canvas.width - 100)),
              y: Math.max(0, Math.min(y, canvas.height - 100)),
              width: 150,
              height: 100,
              rotation: 0,
              type: 'image',
              src: payload.url,
            };

            onObjectsChange([...objects, newObj]);
            selectedRef.current = newObj;
            onSelectionChange?.(newObj.id);
            draw();
          };

          img.src = payload.url;
        } 
        // ✅ For Video: use thumbnail or placeholder
        else if (payload.type === 'video') {
          const img = new Image();
          img.crossOrigin = 'anonymous';

          img.onload = () => {
            const newObj: CanvasObject = {
              id: Date.now(),
              image: img,
              x: Math.max(0, Math.min(x, canvas.width - 100)),
              y: Math.max(0, Math.min(y, canvas.height - 100)),
              width: 150,
              height: 100,
              rotation: 0,
              type: 'video',
              src: payload.url,
            };

            console.log('✅ Video object dropped. ID:', newObj.id);
            onObjectsChange([...objects, newObj]);
            selectedRef.current = newObj;
            onSelectionChange?.(newObj.id);
            draw();
          };

          img.onerror = () => {
            console.warn('⚠️  Video thumbnail failed, using placeholder');
            const newObj: CanvasObject = {
              id: Date.now(),
              image: createPlaceholder('video'),
              x: Math.max(0, Math.min(x, canvas.width - 100)),
              y: Math.max(0, Math.min(y, canvas.height - 100)),
              width: 150,
              height: 100,
              rotation: 0,
              type: 'video',
              src: payload.url,
            };

            onObjectsChange([...objects, newObj]);
            selectedRef.current = newObj;
            onSelectionChange?.(newObj.id);
            draw();
          };

          // Load thumbnail (not the video URL)
          img.src = payload.thumbnail || payload.url;
        } 
        // ✅ For Audio: always use placeholder
        else if (payload.type === 'audio') {
          const newObj: CanvasObject = {
            id: Date.now(),
            image: createPlaceholder('audio'),
            x: Math.max(0, Math.min(x, canvas.width - 100)),
            y: Math.max(0, Math.min(y, canvas.height - 100)),
            width: 150,
            height: 100,
            rotation: 0,
            type: 'audio',
            src: payload.url,
          };

          console.log('✅ Audio object dropped. ID:', newObj.id);
          onObjectsChange([...objects, newObj]);
          selectedRef.current = newObj;
          onSelectionChange?.(newObj.id);
          draw();
        }
        // ✅ For Document: use placeholder
        else if (payload.type === 'document') {
          const newObj: CanvasObject = {
            id: Date.now(),
            image: createPlaceholder('document'),
            x: Math.max(0, Math.min(x, canvas.width - 100)),
            y: Math.max(0, Math.min(y, canvas.height - 100)),
            width: 150,
            height: 100,
            rotation: 0,
            type: 'document',
            src: payload.url,
          };

          console.log('✅ Document object dropped. ID:', newObj.id);
          onObjectsChange([...objects, newObj]);
          selectedRef.current = newObj;
          onSelectionChange?.(newObj.id);
          draw();
        }
      } catch (err) {
        console.error('❌ Error parsing drop data:', err);
      }
    };

    useImperativeHandle(ref, () => ({
      setResolution(w, h) {
        if (canvasRef.current) {
          canvasRef.current.width = w;
          canvasRef.current.height = h;
          draw();
        }
      },
      clear() {
        onObjectsChange([]);
        selectedRef.current = null;
        onSelectionChange?.(null);
        draw();
      },
    }));

    return (
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          background: 'white',
          cursor: 'default',
          display: 'block',
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    );
  }
);

FabricCanvas.displayName = 'FabricCanvas';
export default FabricCanvas;
