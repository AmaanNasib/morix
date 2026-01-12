import { Button, useDisclosure } from "@heroui/react";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { AlertTriangle, Ban, BellElectric, Mail, Monitor, Plus, UserPlus, Wifi } from "lucide-react";
import { useEffect, useState } from "react";


import CustomTable from "../components/CustomTable/custom-table";

import { CustomCard } from "@/components/CustomeCard";
import { CustomModal } from "@/components/CustomModal";
import CalendarInput from "@/components/InputController/calendar-input";
import CheckboxInput from "@/components/InputController/Checkbox-input";
import FileUpload from "@/components/InputController/file-upload";
import { ReactSelectDropdown } from "@/components/InputController/ReactSelectDropdown";
import { SwitchInput } from "@/components/InputController/Switch-Input";
import TextInput from "@/components/InputController/text-input";
import { userColumns } from "@/data/tableData";
import useTableControls from "@/hooks/useTableControls";
import DefaultLayout from "@/layouts/default";
import { CardData } from "@/components/CustomeCard";



const userData = [
  {
    id: 1,
    firstName: "Aarav Sharma",
    phone: "+91 9876543210",
    email: "aarav.sharma@example.com",
    dob: "1995-04-12",
    loggingBy: "Google",
    createdAt: "2024-08-15",
    status: "Active",
  },
  {
    id: 2,
    firstName: "Priya Verma",
    phone: "+91 9823456789",
    email: "priya.verma@example.com",
    dob: "1998-07-09",
    loggingBy: "Email",
    createdAt: "2024-07-20",
    status: "Inactive",
  },
  {
    id: 3,
    firstName: "Rohan Mehta",
    phone: "+91 9812234567",
    email: "rohan.mehta@example.com",
    dob: "1992-11-03",
    loggingBy: "Facebook",
    createdAt: "2024-05-22",
    status: "Active",
  },
  {
    id: 4,
    firstName: "Neha Kapoor",
    phone: "+91 9898765432",
    email: "neha.kapoor@example.com",
    dob: "1999-01-17",
    loggingBy: "Google",
    createdAt: "2024-09-01",
    status: "Pending",
  },
  {
    id: 5,
    firstName: "Aditya Singh",
    phone: "+91 9754321098",
    email: "aditya.singh@example.com",
    dob: "1994-06-25",
    loggingBy: "Email",
    createdAt: "2024-06-10",
    status: "Active",
  },
  {
    id: 6,
    firstName: "Kavya Nair",
    phone: "+91 9900112233",
    email: "kavya.nair@example.com",
    dob: "1996-03-30",
    loggingBy: "Apple",
    createdAt: "2024-03-05",
    status: "Inactive",
  },
  {
    id: 7,
    firstName: "Sahil Gupta",
    phone: "+91 9845123678",
    email: "sahil.gupta@example.com",
    dob: "1990-12-14",
    loggingBy: "Email",
    createdAt: "2024-04-28",
    status: "Active",
  },
  {
    id: 8,
    firstName: "Isha Patel",
    phone: "+91 9810022334",
    email: "isha.patel@example.com",
    dob: "1997-10-09",
    loggingBy: "Google",
    createdAt: "2024-10-05",
    status: "Active",
  },
  {
    id: 9,
    firstName: "Vikram Reddy",
    phone: "+91 9870011223",
    email: "vikram.reddy@example.com",
    dob: "1991-02-02",
    loggingBy: "Facebook",
    createdAt: "2024-02-11",
    status: "Inactive",
  },
  {
    id: 10,
    firstName: "Tanya Joshi",
    phone: "+91 9822004455",
    email: "tanya.joshi@example.com",
    dob: "1993-09-19",
    loggingBy: "Apple",
    createdAt: "2024-01-29",
    status: "Active",
  },
];

const currencyOptions = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "INR", value: "INR" },
];

const steps = [
  "Step One: Basic Info",
  "Step Two: Address Details",
  "Step Three: Review",
  "Step Four: Complete",
];

const countryData = [
  {
    value: "AF",
    label: "Afghanistan",
  },
  {
    value: "AX",
    label: "Aland Islands",
  },
  {
    value: "AL",
    label: "Albania",
  },
  {
    value: "DZ",
    label: "Algeria",
  },
  {
    value: "AS",
    label: "American Samoa",
  },
  {
    value: "AD",
    label: "Andorra",
  },
  {
    value: "AO",
    label: "Angola",
  },
  {
    value: "AI",
    label: "Anguilla",
  },
  {
    value: "AQ",
    label: "Antarctica",
  },
  {
    value: "AG",
    label: "Antigua and Barbuda",
  },
  {
    value: "AR",
    label: "Argentina",
  },
  {
    value: "AM",
    label: "Armenia",
  },
  {
    value: "AW",
    label: "Aruba",
  },
  {
    value: "AU",
    label: "Australia",
  },
  {
    value: "AT",
    label: "Austria",
  },
  {
    value: "AZ",
    label: "Azerbaijan",
  },
];

const cardDataList: CardData[] = [
  {
    id: 1,
    type: "primary",
    icon: <BellElectric className="w-5 h-5" />,
    primaryText: 835,
    secondaryText: "Total Devices",
    trend: { value: "12.5%", direction: "down" },
    color: "#12B76A",
  },
  {
    id: 2,
    type: "primary",
    icon: <BellElectric className="w-5 h-5" />,
    primaryText: 85,
    secondaryText: "Online Devices",
    trend: { value: "10.5%", direction: "up" },
    color: "#D12027",
  },
  {
    id: 3,
    type: "primary",
    icon: <AlertTriangle className="w-5 h-5" />,
    primaryText: 95,
    secondaryText: "Offline Devices",
    trend: { value: "12.5%", direction: "down" },
    color: "#FF9700",
  },
  {
    id: 4,
    type: "primary",
    icon: <AlertTriangle className="w-5 h-5" />,
    primaryText: 205,
    secondaryText: "Expiring Devices",
    trend: { value: "12.5%", direction: "up" },
    color: "#FF9700",
  },
  {
    id: 5,
    type: "secondary",
    icon: <Monitor className="w-5 h-5" />,
    primaryText: "2,309",
    secondaryText: "TOTAL USERS",
    bottomTag: "Active 3 groups",
    color: "#3B5DE7",
  },
  {
    id: 6,
    type: "secondary",
    icon: <Wifi className="w-5 h-5" />,
    primaryText: "22",
    secondaryText: "ACTIVE USERS",
    bottomTag: "Online",
    trend: { value: "12.5%", direction: "down" },
    color: "#3CB371",
  },
  {
    id: 7,
    type: "secondary",
    icon: <Ban className="w-5 h-5" />,
    primaryText: "22",
    secondaryText: "ADMIN USERS",
    bottomTag: "Issue require attention",
    trend: { value: "12.5%", direction: "down" },
    color: "#F79009",
  },
  {
    id: 7,
    type: "secondary",
    icon: <Monitor className="w-5 h-5" />,
    primaryText: "22",
    secondaryText: "SECURITY EVENT",
    bottomTag: "Pending",
    trend: { value: "12.5%", direction: "down" },
    color: "#6C63FF",
  },

];

export default function IndexPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [userData1, setUserData1] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState<Date | string>("");
  const [file, setFile] = useState<File[]>([]);
  const [email, setEmail] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");

  const [dropState, setDropState] = useState("");

  const [dropdownData, setDropdownData] = useState<{ [key: string]: any }>({
    data: countryData,
  });

  const [switchState, setSwitchState] = useState(false);
  const [checkBoxState, setCheckBoxState] = useState(false);


  const getActions = (row: any) => [
    {
      label: "View",
      key: "view",
      onClick: () => {
        console.log(row);
      },
    },
    {
      label: "Edit",
      key: "edit",
      onClick: () => {
        console.log(row);
      },
    },
  ];

  const {
    page,
    pages,
    setPage,
    rowsPerPage,
    onRowsPerPageChange,
    totalItems,
    onSearchChange,
    selectedRowItem,
    isCustomFormModalOpen,
    setIsConfirmModalOpen,
    filterValue,
  } = useTableControls(userData1, userData1.length);

  useEffect(() => {
    if (filterValue) {
      const filteredData = userData.filter((item: any) =>
        item.firstName.toLowerCase().includes(filterValue.toLowerCase())
      );

      setUserData1(filteredData);
    } else {
      setUserData1(userData);
    }
  }, [filterValue]);


  const fetchDropdownData = async (
    type: string,
    value: string | number,
    searchValue = "",
    pageValue = "1",
  ) => {
    let typeValue = type;

    try {
      // if (dropdownData[type]?.length) return; // Prevent refetch

      let result = null;
      const limit = "50"; // you can customize
      const page = pageValue;
      const search = searchValue;

      console.log(limit, page, search);

      switch (type) {
        case "traders":
        case "supplierId":
          // result = await traderList({ page, limit, search });
          result = { data: [], totalPages: 1 };
          typeValue = "traders";
          break;
        default:
          result = { data: [], totalPages: 1 };
      }

      if (result && result.data && Array.isArray(result.data)) {
        const dropdownValuesCustom = result.data.map((item: { id?: number, value: string, name?: string, lastName?: string, email?: string, label?: string, level?: string }) => ({
          value: item.id !== undefined ? item.id : item.value,
          label:
            item.name && item.lastName
              ? `${item.name} ${item.lastName} - ${item.email}`
              : item.name || item.level || item.label,
          data: item,
        }));

        // Combine and deduplicate by `value`
        setDropdownData((prev) => {
          const existing = prev[typeValue] || [];
          const combined = [...existing, ...dropdownValuesCustom];

          const unique = Array.from(
            new Map(combined.map((item) => [item.value, item])).values(),
          );

          return {
            ...prev,
            [typeValue]: unique,
          };
        });
      }

      return result;
    } catch (error) {
      console.error(`Failed to fetch ${typeValue} options:`, error);
    } finally {
    }
  };

  const handleSearchChangeDropdown = (searchValue: string, type: string) => {
    if (typeof searchValue !== "string" || !searchValue) {
      console.error("Search value is not a string:", searchValue);

      return;
    }
    // Await the fetchDropdownData call inside useEffect
    fetchDropdownData(type, "", searchValue);
  };

  const modalBody = (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Create a new user account and configure their role and permissions.
      </p>
      <input
        className="w-full border border-gray-300 rounded-md p-2"
        placeholder="Full Name"
      />
      <input
        className="w-full border border-gray-300 rounded-md p-2"
        placeholder="Email Address"
      />
    </div>
  )

  const modalFooter = (
    <>
      <Button variant="flat" onPress={() => onOpenChange()}>
        Cancel
      </Button>
      <Button
        className="bg-primary text-white h-9"
        color="danger"
        size="md"
        startContent={<Plus className="w-5 h-5" />}
        onPress={() => alert("Add User")}
      >
        Add User
      </Button>
    </>
  )

  const modalHeader = (
    <div className="flex items-center gap-2 pb-2">
      <div className="flex items-center justify-center w-7 h-7 rounded-md bg-red-600 text-white">
        <Plus size={16} />
      </div>
      <h2 className="text-lg font-semibold">Add New Team Member</h2>
    </div>
  )



  return (
    <DefaultLayout>
      <div className="p-6 space-y-4">
        <p>Custom Table:</p>
        {userData1 && (
          <CustomTable
            columns={userColumns}
            filterValue={filterValue}
            isCustomFormModalOpen={isCustomFormModalOpen}
            isSelectable={true}
            page={page}
            pages={pages}
            rowActions={getActions}
            rowsPerPage={rowsPerPage}
            selectedRowItem={selectedRowItem}
            setIsConfirmModalOpen={setIsConfirmModalOpen}
            setPage={setPage}
            tableData={userData1}
            totalItems={totalItems}
            onRowsPerPageChange={onRowsPerPageChange}
            onSearchChange={onSearchChange}
          />
        )}

        <br />
        <CalendarInput
          name="datePicker"
          value={selectedDate}
          onChange={(value) => setSelectedDate(value)}
        />
        <br />
        <br />
        <FileUpload
          accept=".pdf, .jpg,.mp4, .png"
          maxSize="15MB"
          value={file}
          onChange={setFile}
          onError={(msg) => {
            console.log(msg);
          }}
        />

        <TextInput
          icon={<Mail size={18} />}
          label="Email"
          placeholder="john@example.com"
          validate={(val) => {
            if (!val.includes("@")) return "Invalid email address";

            return null;
          }}
          value={email}
          width="w-sm"
          onChange={setEmail}
        />

        <TextInput
          dropdownOptions={currencyOptions}
          dropdownValue={currency}
          isDropdown={true}
          label="Amount"
          min="0"
          placeholder="0.00"
          step="0.01"
          type="number"
          value={amount}
          width="w-sm"
          onChange={setAmount}
          onDropdownChange={setCurrency}
        />

        <TextInput
          inputGroupText="https://"
          label="Website"
          placeholder="mywebsite.com"
          validate={(val) => {
            if (!val.includes(".")) return "Invalid website";

            return null;
          }}
          width="w-sm"
        />

        <TextInput
          icon={<UserPlus size={18} />}
          label="User"
          placeholder="John Doe"
          width="w-sm"
        />

        <TextInput
          label="password"
          placeholder="John Doe"
          type="password"
          width="w-sm"
        />

        <div className="mt-6">
          <Stepper alternativeLabel activeStep={4}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel className="text-sm">{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        <div className="w-1/6">
          <ReactSelectDropdown
            data={dropdownData.data}
            error=""
            field={{ name: "filed" }}
            fieldName="fieldName"
            handleSearchChange={handleSearchChangeDropdown}
            handleSelectChange={(selectedOption: { value: string }) =>
              setDropState(selectedOption.value)
            }
            placeholder="Dropdown"
            value={dropState}
            onMenuOpen={() => fetchDropdownData("filed", "")}
          />
        </div>

        <div >
          <SwitchInput label="Switch" value={switchState} onChange={setSwitchState} />
        </div>
        <div >
          <CheckboxInput label="Checkbox" value={checkBoxState} onChange={setCheckBoxState} />
        </div>

        <p>Secondary</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {cardDataList.map((card) => (
            <CustomCard key={card.id} data={card} />
          ))}
        </div>

        <div>
          <Button className="text-white" color="primary" startContent={<Plus />} onPress={onOpen}>
            Add New Member
          </Button>
          <CustomModal
            body={modalBody}
            footer={modalFooter}
            header={modalHeader}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        </div>
      </div>
    </DefaultLayout>
  );
}
