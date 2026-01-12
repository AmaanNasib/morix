// import { Input } from "@heroui/input";
// import { Card, CardBody } from "@heroui/react";
// import { File, Image as ImageIcon, Music, Upload, Video } from "lucide-react";
// import { useState } from "react";

// import { SearchNormal1 } from "@/assets/index.js";
// import TextInput from "@/components/InputController/text-input";

// const filters = ["All", "Image", "Video", "Audio", "Document", "Other"];

// interface MediaItem {
//   id: number;
//   name: string;
//   size: string;
//   type: string;
//   url: string;
// }

// const dummyMedia: MediaItem[] = [
//   {
//     id: 1,
//     name: "Office Banner.jpg",
//     size: "1.2 MB",
//     type: "Image",
//     url: "https://placehold.co/600x400",
//   },
//   {
//     id: 6,
//     name: "Office 2",
//     size: "1.2 MB",
//     type: "Image",
//     url: "https://dummyjson.com/image/400x200/282828?fontFamily=pacifico&text=I+am+a+pacifico+font",
//   },
//   {
//     id: 7,
//     name: "Office 3",
//     size: "1.2 MB",
//     type: "Image",
//     url: "https://dummyjson.com/image/400x200/008080/ffffff?text=Hello+Peter!&fontSize=16",
//   },
//   {
//     id: 8,
//     name: "Office 4",
//     size: "1.2 MB",
//     type: "Image",
//     url: "https://dummyjson.com/image/400x200?type=webp&text=I+am+a+webp+image",
//   },
//   {
//     id: 2,
//     name: "Product Reel.mp4",
//     size: "8.4 MB",
//     type: "Video",
//     url: "https://placehold.co/600x400",
//   },
//   {
//     id: 3,
//     name: "Background Music.mp3",
//     size: "3.1 MB",
//     type: "Audio",
//     url: "",
//   },
//   {
//     id: 4,
//     name: "Company Profile.pdf",
//     size: "2.6 MB",
//     type: "Document",
//     url: "",
//   },
//   {
//     id: 5,
//     name: "ZIP Backup.zip",
//     size: "12.0 MB",
//     type: "Other",
//     url: "",
//   },
// ];

// export default function MediaSection() {
//   const [activeFilter, setActiveFilter] = useState("All");
//   // const [mediaList, setMediaList] = useState<MediaItem[]>([]);
//   const [mediaList, setMediaList] = useState<MediaItem[]>(dummyMedia);
//   const [search, setSearch] = useState("");

//   // Handle upload
//   const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     const newMedia = files.map((file, index) => {
//       const type = getFileType(file.type);
//       const url = URL.createObjectURL(file);

//       return {
//         id: mediaList.length + index + 1,
//         name: file.name,
//         size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
//         type,
//         url,
//       };
//     });

//     setMediaList((prev) => [...prev, ...newMedia]);
//   };

//   const uploadMedia = async (file: File) => {
//   const formData = new FormData();
//   formData.append("file", file);

//   const res = await fetch(`${baseUrl}${versionApi}/api/v1/client/media/add-media`, {
//     method: "POST",
//     headers: {
//       "x-access-token": localStorage.getItem("authToken") || "",
//     },
//     body: formData,
//   });

//   const json = await res.json();

//   if (!json.success) {
//     throw new Error("Upload failed");
//   }

//   const item = json.data;

//   return {
//     id: Date.now(),
//     name: item.name,
//     size: (item.size / (1024 * 1024)).toFixed(1) + " MB",
//     type: getFileType(item.mimeType),
//     url: BASE_URL + item.path, // 🔥 IMPORTANT
//   } as MediaItem;
// };

//   // Detect file type
//   const getFileType = (mime: string) => {
//     if (mime.startsWith("image")) return "Image";
//     if (mime.startsWith("video")) return "Video";
//     if (mime.startsWith("audio")) return "Audio";
//     if (
//       mime.includes("pdf") ||
//       mime.includes("msword") ||
//       mime.includes("presentation") ||
//       mime.includes("spreadsheet")
//     )
//       return "Document";

//     return "Other";
//   };

//   // Filter and search
//   const filteredMedia = mediaList.filter((item) => {
//     const matchesFilter = activeFilter === "All" || item.type === activeFilter;
//     const matchesSearch =
//       !search || item.name.toLowerCase().includes(search.toLowerCase());

//     return matchesFilter && matchesSearch;
//   });

//   const getIconByType = (type: string) => {
//     switch (type) {
//       case "Image":
//         return <ImageIcon className="w-5 h-5 text-gray-600" />;
//       case "Video":
//         return <Video className="w-5 h-5 text-gray-600" />;
//       case "Audio":
//         return <Music className="w-5 h-5 text-gray-600" />;
//       case "Document":
//         return <File className="w-5 h-5 text-gray-600" />;
//       default:
//         return <File className="w-5 h-5 text-gray-600" />;
//     }
//   };

//   return (
//     <div className="space-y-5">
//       {/* === Upload Button === */}
//       <div className="flex justify-center">
//         <label
//           className="flex items-center justify-center gap-2 bg-[#CD1E2F] text-white font-medium rounded-lg px-6 py-2 cursor-pointer hover:bg-[#b81a28] transition-all duration-200 w-full shadow-sm"
//           htmlFor="mediaUpload"
//         >
//           <Upload className="w-5 h-5" />
//           Upload Media
//           <Input
//             multiple
//             className="hidden"
//             id="mediaUpload"
//             type="file"
//             onChange={handleUpload}
//           />
//         </label>
//       </div>

//       {/* === Search Bar === */}
//       <TextInput
//         icon={<SearchNormal1 className="w-4 h-4" />}
//         name="search"
//         placeholder="Search media..."
//         type="search"
//         value={search}
//         width="w-full"
//         onChange={(val: string) => setSearch(val)}
//       />

//       {/* === Filter Buttons Styled Like Tabs === */}
//       <div className="bg-gray-100 rounded-sm p-1 flex items-center justify-between shadow-sm h-9 w-full overflow-x-auto scrollbar-hide ">
//         {filters.map((filter) => (
//           <button
//             key={filter}
//             className={`flex-1 h-8 min-w-[90px] whitespace-nowrap rounded-md text-sm font-semibold px-3 transition-all duration-200
//         ${
//           activeFilter === filter
//             ? "bg-[#CD1E2F] text-white shadow-sm"
//             : "bg-transparent text-gray-800 hover:bg-white/70"
//         }`}
//             onClick={() => setActiveFilter(filter)}
//           >
//             {filter}
//           </button>
//         ))}
//       </div>

//       {/* === Media Grid === */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
//         {filteredMedia.length > 0 ? (
//           filteredMedia.map((item) => (
//             <Card
//               key={item.id}
//               className="rounded-xl shadow-sm border cursor-grab active:cursor-grabbing"
//               draggable={item.type === "Image"}
//               onDragStart={(e) => {
//                 if (item.type !== "Image") return;

//                 e.dataTransfer.setData("image-url", item.url);
//                 e.dataTransfer.effectAllowed = "copy";
//               }}
//             >
//               {" "}
//               <div className="h-32 w-full bg-gray-100 overflow-hidden rounded-t-xl">
//                 {item.type === "Image" ? (
//                   <img
//                     alt={item.name}
//                     className="w-full h-full object-cover pointer-events-none"
//                     src={item.url}
//                   />
//                 ) : item.type === "Video" ? (
//                   <video
//                     controls
//                     className="w-full h-full object-cover"
//                     src={item.url}
//                   >
//                     <track
//                       kind="captions"
//                       label="English"
//                       src={item.url + ".vtt"}
//                     />
//                   </video>
//                 ) : (
//                   <div className="flex items-center justify-center h-full">
//                     {getIconByType(item.type)}
//                   </div>
//                 )}
//               </div>
//               <CardBody className="p-3 space-y-1">
//                 <p className="text-sm font-medium truncate">{item.name}</p>
//                 <div className="flex items-center gap-2 text-xs text-gray-500">
//                   {getIconByType(item.type)}
//                   <span>{item.size}</span>
//                 </div>
//               </CardBody>
//             </Card>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center col-span-full py-6">
//             No media uploaded yet
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';

const baseUrl = import.meta.env.VITE_PUBLIC_BASE_URL || '';
const versionApi = import.meta.env.VITE_PUBLIC_VERSION_API_URL || '';
const TOKEN_KEY = import.meta.env.VITE_PUBLIC_TOKEN_KEY || 'token';

interface MediaItem {
  id: number;
  name: string;
  size: string;
  type: 'Image' | 'Video' | 'Audio' | 'Document';
  url: string;
  thumbnail: string;
}

// ✅ Fixed: Using working image URLs from public sources
const dummyMedia: MediaItem[] = [
  {
    id: 1,
    name: 'Banner Image',
    size: '1.2 MB',
    type: 'Image',
    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=150&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Product Video',
    size: '45 MB',
    type: 'Video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1535016066725-85dac976c01f?w=150&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'Background Audio',
    size: '3 MB',
    type: 'Audio',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&h=100&fit=crop',
  },
  {
    id: 4,
    name: 'Document PDF',
    size: '2 MB',
    type: 'Document',
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/pdf1',
    thumbnail: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=150&h=100&fit=crop',
  },
];

export default function MediaSection() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const apiMedia = await fetchMediaList();
        setMediaList([...dummyMedia, ...apiMedia]);
      } catch {
        setMediaList(dummyMedia);
      }
    })();
  }, []);

  const fetchMediaList = async (): Promise<MediaItem[]> => {
    const token = localStorage.getItem(TOKEN_KEY) || '';

    const res = await fetch(`${baseUrl}${versionApi}/client/media/media-list`, {
      headers: { 'x-access-token': token },
    });

    const json = await res.json();
    if (!json.success) throw new Error('Failed to fetch media');

    return json.data.map((item: any) => {
      const type: MediaItem['type'] = item.mimeType.startsWith('image')
        ? 'Image'
        : item.mimeType.startsWith('video')
          ? 'Video'
          : item.mimeType.startsWith('audio')
            ? 'Audio'
            : 'Document';

      return {
        id: item._id,
        name: item.name,
        size: (item.size / (1024 * 1024)).toFixed(1) + ' MB',
        type,
        url: baseUrl + item.path,
        thumbnail: baseUrl + item.path,
      };
    });
  };

  const uploadMedia = async (file: File): Promise<MediaItem | null> => {
    try {
      const token = localStorage.getItem(TOKEN_KEY) || '';
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${baseUrl}${versionApi}/client/media/add-media`, {
        method: 'POST',
        headers: { 'x-access-token': token },
        body: formData,
      });

      const json = await res.json();
      const item = json.data;

      const type: MediaItem['type'] = item.mimeType.startsWith('image')
        ? 'Image'
        : item.mimeType.startsWith('video')
          ? 'Video'
          : item.mimeType.startsWith('audio')
            ? 'Audio'
            : 'Document';

      return {
        id: Date.now(),
        name: item.name,
        size: (item.size / (1024 * 1024)).toFixed(1) + ' MB',
        type,
        url: baseUrl + item.path,
        thumbnail: baseUrl + item.path,
      };
    } catch (err) {
      console.error('Upload error:', err);
      return null;
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    for (const file of files) {
      const uploaded = await uploadMedia(file);
      if (uploaded) {
        setMediaList((p) => [uploaded, ...p]);
      }
    }
    e.target.value = '';
  };

  const filteredMedia = mediaList.filter((item) => {
    const matchFilter = activeFilter === 'All' || item.type === activeFilter;
    const matchSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  const getIconSVG = (type: string) => {
    if (type === 'Audio') {
      return (
        <svg style={{ width: '32px', height: '32px', color: '#9ca3af' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v9.28c-.47-.35-1.05-.55-1.67-.55-1.66 0-3 1.34-3 3s1.34 3 3 3c.62 0 1.2-.2 1.67-.55V21h4V3m0 16c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
        </svg>
      );
    }
    if (type === 'Document') {
      return (
        <svg style={{ width: '32px', height: '32px', color: '#9ca3af' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        width: '360px',
        background: 'white',
        borderLeft: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '-2px 0 4px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Header */}
      <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
        Media Library
      </div>

      {/* Upload Button */}
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          width: 'calc(100% - 24px)',
          padding: '10px',
          margin: '12px',
          marginTop: '8px',
          background: '#CD1E2F',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLLabelElement).style.background = '#b81728';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLLabelElement).style.background = '#CD1E2F';
        }}
      >
        Upload Media
        <input
          type="file"
          style={{ display: 'none' }}
          multiple
          accept="image/*,video/*,audio/*,.pdf"
          onChange={handleUpload}
        />
      </label>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0', padding: '8px 12px', borderBottom: '1px solid #e5e7eb', overflowX: 'auto', background: '#f9fafb' }}>
        {['All', 'Image', 'Video', 'Audio', 'Document'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            style={{
              padding: '8px 10px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: activeFilter === filter ? '600' : '500',
              color: activeFilter === filter ? '#CD1E2F' : '#6b7280',
              borderBottom: activeFilter === filter ? '2px solid #CD1E2F' : '2px solid transparent',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
        <input
          type="text"
          placeholder="Search media..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '12px',
            background: 'white',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Grid */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
        }}
      >
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer!.effectAllowed = 'copy';
              e.dataTransfer!.setData('media-payload', JSON.stringify({
                type: item.type.toLowerCase(),
                url: item.url,
                thumbnail: item.thumbnail,
                name: item.name,
              }));
            }}
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              overflow: 'hidden',
              cursor: 'grab',
              transition: 'all 0.2s ease',
              background: 'white',
              display: 'flex',
              flexDirection: 'column',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              (e.currentTarget as HTMLDivElement).style.borderColor = '#cd1e2f';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLDivElement).style.borderColor = '#d1d5db';
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                width: '100%',
                height: '100px',
                background: '#f9fafb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              {item.type === 'Image' || item.type === 'Video' ? (
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                getIconSVG(item.type)
              )}
            </div>

            {/* Info */}
            <div
              style={{
                padding: '8px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#1f2937',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.name}
              </div>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                {item.size}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
