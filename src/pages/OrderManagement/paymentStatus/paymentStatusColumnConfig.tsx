

const renderStatus = (row:any, columnKey:any) => {
    console.log("columnKey");
    const baseStyle =
      "px-3 py-1 rounded-full text-xs font-semibold border transition-all";

    const colorStyles: Record<string, string> = {
      Success: "text-green-600 border-green-300 bg-green-50",
      Paid: "text-green-600 border-green-300 bg-green-50",
      Active: "text-green-600 border-green-300 bg-green-50",
      Approved: "text-green-600 border-green-300 bg-green-50",
      Failed: "text-red-600 border-red-300 bg-red-50",
      Expired: "text-red-600 border-red-300 bg-red-50",
      Cancelled: "text-red-600 border-red-300 bg-red-50",
      Inactive: "text-gray-600 border-gray-300 bg-gray-50",
      "Not Activated": "text-gray-600 border-gray-300 bg-gray-50",
      Warning: "text-yellow-600 border-yellow-300 bg-yellow-50",
      Maintenance: "text-yellow-600 border-yellow-300 bg-yellow-50",
      Pending: "text-yellow-600 border-yellow-300 bg-yellow-50",
    };

    const style = colorStyles[row[columnKey]] || "text-gray-600 border-gray-200 bg-gray-50";

    return (
      <span className={`${baseStyle} ${style}`}>
        {row[columnKey]}
      </span>
    );
  };

const renderPiNumber = (row: any, columnKey: any) => {
    return (
        <p className="text-base font-medium">{row[columnKey]}</p>
    )
}



export const paymentColumns = [
    {
        name: "PI Number",
        uid: "piNumber",
        sortable: true,
        renderOptions: renderPiNumber
    },
    {
        name: "Client",
        uid: "client",
        sortable: true,
    },
    {
        name: "Amount",
        uid: "amount",
        sortable: true,
        renderOptions: renderPiNumber
    },
    {
        name: "Due Date",
        uid: "dueDate",
        sortable: true,
    },
    {
        name: "Payment Date",
        uid: "paymentDate",
        sortable: true,
    },
    {
        name: "Method",
        uid: "method",
        sortable: true,
    },
    {
        name: "Status",
        uid: "status",
        sortable: true,
        renderOptions: renderStatus
    },
    {
        name: "Action",
        uid: "actions",
        sortable: true,
    },
];