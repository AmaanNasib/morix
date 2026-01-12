import { useState, useMemo } from "react";
// @ts-ignore
import { 
  ElementPlus, 
  SearchNormal, 
  Ticket, 
  Clock4, 
  CheckCircle2, 
  CircleAlert, 
  OctagonAlert,
  ChevronDown,
  Eye,
  MessageCircle
} from "@/assets/index.js";
import { Chip, Button } from "@heroui/react";

import TextInput from "@/components/InputController/text-input";
import { ReactSelectDropdown } from "@/components/InputController/ReactSelectDropdown";
import CustomTable from "@/components/CustomTable/custom-table";
import useTableControls from "@/hooks/useTableControls";
import { columns } from "./supportTicketsColumnConfig";

interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  createdDate: string;
  lastUpdated: string;
  assignedTo?: string;
}

const tickets: SupportTicket[] = [
  {
    id: "1",
    ticketNumber: "TKT-2024-001",
    subject: "Device connection issues after update",
    status: "open",
    priority: "high",
    category: "Technical",
    createdDate: "2024-12-20",
    lastUpdated: "2024-12-20",
    assignedTo: "Support Team A",
  },
  {
    id: "2",
    ticketNumber: "TKT-2024-002",
    subject: "License renewal inquiry",
    status: "in-progress",
    priority: "medium",
    category: "Billing",
    createdDate: "2024-12-19",
    lastUpdated: "2024-12-21",
    assignedTo: "Support Team B",
  },
  {
    id: "3",
    ticketNumber: "TKT-2024-003",
    subject: "Content upload not working",
    status: "resolved",
    priority: "medium",
    category: "Technical",
    createdDate: "2024-12-18",
    lastUpdated: "2024-12-19",
    assignedTo: "Support Team A",
  },
  {
    id: "4",
    ticketNumber: "TKT-2024-004",
    subject: "Account access problem",
    status: "closed",
    priority: "low",
    category: "Account",
    createdDate: "2024-12-15",
    lastUpdated: "2024-12-17",
    assignedTo: "Support Team C",
  },
  {
    id: "5",
    ticketNumber: "TKT-2024-005",
    subject: "Playlist scheduling error",
    status: "open",
    priority: "urgent",
    category: "Technical",
    createdDate: "2024-12-21",
    lastUpdated: "2024-12-21",
    assignedTo: "Support Team A",
  },
];

export default function SupportTicketsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const {
    page,
    pages,
    setPage,
    rowsPerPage,
    onRowsPerPageChange,
    totalItems,
    onSearchChange,
    filterValue,
    onClear,
  } = useTableControls(tickets, tickets.length);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch = 
        ticket.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
      const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [search, statusFilter, priorityFilter, categoryFilter]);

  const paginatedTickets = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredTickets.slice(start, end);
  }, [filteredTickets, page, rowsPerPage]);


  const rowActions = (item: SupportTicket) => [
    {
      label: "View Details",
      key: "view",
      icon: <Eye className="w-4 h-4" style={{ stroke: "currentColor" }} />,
      onClick: () => console.log("View", item),
    },
    {
      label: "Add Comment",
      key: "comment",
      icon: <MessageCircle className="w-4 h-4" style={{ stroke: "currentColor" }} />,
      onClick: () => console.log("Comment", item),
    },
  ];

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Header with Create Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Support Tickets</h2>
          <p className="text-sm text-gray-600 mt-1">Manage and track your support requests</p>
        </div>
        <Button
          className="bg-primary text-white hover:bg-primary-600"
          startContent={<ElementPlus className="w-4 h-4" style={{ stroke: "currentColor" }} />}
        >
          Create Ticket
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TextInput
          icon={<SearchNormal className="w-4 h-4 text-gray-400" style={{ stroke: "currentColor" }} />}
          name="search"
          placeholder="Search tickets..."
          type="search"
          value={search}
          onChange={setSearch}
        />
        <ReactSelectDropdown
          data={[
            { value: "all", label: "All Status" },
            { value: "open", label: "Open" },
            { value: "in-progress", label: "In Progress" },
            { value: "resolved", label: "Resolved" },
            { value: "closed", label: "Closed" },
          ]}
          error=""
          fetchDropdownData={async () => ({ data: [], totalPages: 0 })}
          field={{ name: "status" }}
          fieldName="status"
          handleSearchChange={() => {}}
          handleSelectChange={(selectedOption: any) => {
            if (selectedOption && selectedOption.value) {
              setStatusFilter(selectedOption.value);
            }
          }}
          placeholder="All Status"
          value={statusFilter}
        />
        <ReactSelectDropdown
          data={[
            { value: "all", label: "All Priority" },
            { value: "urgent", label: "Urgent" },
            { value: "high", label: "High" },
            { value: "medium", label: "Medium" },
            { value: "low", label: "Low" },
          ]}
          error=""
          fetchDropdownData={async () => ({ data: [], totalPages: 0 })}
          field={{ name: "priority" }}
          fieldName="priority"
          handleSearchChange={() => {}}
          handleSelectChange={(selectedOption: any) => {
            if (selectedOption && selectedOption.value) {
              setPriorityFilter(selectedOption.value);
            }
          }}
          placeholder="All Priority"
          value={priorityFilter}
        />
        <ReactSelectDropdown
          data={[
            { value: "all", label: "All Categories" },
            { value: "Technical", label: "Technical" },
            { value: "Billing", label: "Billing" },
            { value: "Account", label: "Account" },
            { value: "Feature Request", label: "Feature Request" },
          ]}
          error=""
          fetchDropdownData={async () => ({ data: [], totalPages: 0 })}
          field={{ name: "category" }}
          fieldName="category"
          handleSearchChange={() => {}}
          handleSelectChange={(selectedOption: any) => {
            if (selectedOption && selectedOption.value) {
              setCategoryFilter(selectedOption.value);
            }
          }}
          placeholder="All Categories"
          value={categoryFilter}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CircleAlert className="w-5 h-5 text-blue-600" style={{ stroke: "currentColor" }} />
            <span className="text-sm font-medium text-blue-900">Open</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">
            {filteredTickets.filter((t) => t.status === "open").length}
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock4 className="w-5 h-5 text-yellow-600" style={{ stroke: "currentColor" }} />
            <span className="text-sm font-medium text-yellow-900">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-yellow-900">
            {filteredTickets.filter((t) => t.status === "in-progress").length}
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" style={{ stroke: "currentColor" }} />
            <span className="text-sm font-medium text-green-900">Resolved</span>
          </div>
          <p className="text-2xl font-bold text-green-900">
            {filteredTickets.filter((t) => t.status === "resolved").length}
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Ticket className="w-5 h-5 text-gray-600" style={{ stroke: "currentColor" }} />
            <span className="text-sm font-medium text-gray-900">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{filteredTickets.length}</p>
        </div>
      </div>

      {/* Table */}
      <CustomTable
        page={page}
        pages={Math.ceil(filteredTickets.length / rowsPerPage)}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        totalItems={filteredTickets.length}
        onSearchChange={onSearchChange}
        filterValue={filterValue}
        onClear={onClear}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        visibleColumns={[]}
        setVisibleColumns={() => {}}
        headerFields={[]}
        rowActions={rowActions}
        columns={columns}
        tableData={paginatedTickets}
        isSearchable={false}
      />
    </div>
  );
}
