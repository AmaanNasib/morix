import { Chip, Button } from "@heroui/react";

import {CircleAlert, Clock4, CheckCircle2, MessageCircle, Eye} from "@/assets/index.js";

const getStatusColor = (status: string) => {
  switch (status) {
    case "open":
      return { bg: "bg-blue-100", text: "text-blue-700" };
    case "in-progress":
      return { bg: "bg-yellow-100", text: "text-yellow-700" };
    case "resolved":
      return { bg: "bg-green-100", text: "text-green-700" };
    case "closed":
      return { bg: "bg-gray-100", text: "text-gray-700" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-700" };
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "open":
      return <CircleAlert className="w-4 h-4" style={{ stroke: "currentColor" }} />;
    case "in-progress":
      return <Clock4 className="w-4 h-4" style={{ stroke: "currentColor" }} />;
    case "resolved":
      return <CheckCircle2 className="w-4 h-4" style={{ stroke: "currentColor" }} />;
    case "closed":
      return <CheckCircle2 className="w-4 h-4" style={{ stroke: "currentColor" }} />;
    default:
      return null;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return { bg: "bg-red-100", text: "text-red-700" };
    case "high":
      return { bg: "bg-orange-100", text: "text-orange-700" };
    case "medium":
      return { bg: "bg-yellow-100", text: "text-yellow-700" };
    case "low":
      return { bg: "bg-green-100", text: "text-green-700" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-700" };
  }
};

const renderStatus = (row: any) => {
    const statusColor = getStatusColor(row.status);

        return (
          <Chip
            className={`${statusColor.bg} ${statusColor.text} border-0 flex items-center gap-1`}
            size="sm"
            startContent={getStatusIcon(row.status)}
            variant="flat"
          >
            {row.status.charAt(0).toUpperCase() + row.status.slice(1).replace("-", " ")}
          </Chip>
        );
}

const renderPriority = (row: any) => {
  const priorityColor = getPriorityColor(row.priority);

        return (
          <Chip
            className={`${priorityColor.bg} ${priorityColor.text} border-0 capitalize`}
            size="sm"
            variant="flat"
          >
            {row.priority}
          </Chip>
        );
}

const renderActions = (row: any) => {
  return (
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="text-gray-600 hover:text-primary"
          >
            <Eye className="w-4 h-4" style={{ stroke: "currentColor" }} />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="text-gray-600 hover:text-primary"
          >
            <MessageCircle className="w-4 h-4" style={{ stroke: "currentColor" }} />
          </Button>
        </div>
      );
}

export const columns = [
    {
      uid: "ticketNumber",
      name: "Ticket #",
      sortable: true,
    },
    {
      uid: "subject",
      name: "Subject",
      sortable: true,
    },
    {
      uid: "status",
      name: "Status",
      sortable: true,
      renderOptions: renderStatus,
    },
    {
      uid: "priority",
      name: "Priority",
      sortable: true,
      renderOptions: renderPriority,
    },
    {
      uid: "category",
      name: "Category",
      sortable: true,
    },
    {
      uid: "createdDate",
      name: "Created",
      sortable: true,
    },
    {
      uid: "lastUpdated",
      name: "Last Updated",
      sortable: true,
    },
    {
      uid: "actions",
      name: "Actions",
      renderOptions: renderActions,
    },
  ];
