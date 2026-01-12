import { useState } from "react";
import { Monitor, Plus, RotateCcw } from "lucide-react";
import { Tabs, Tab } from "@heroui/react";


import PurchaseRequest from "./purchaseRequest/purchase-request.js";
import ProformaInvoices from "./proformaInvoices/proforma-invoices.js";
import OrderStatus from "./orderStatus/order-status.js";
import PaymentStatus from "./paymentStatus/payment-status.js";
import AddPurchaseRequest from "./addPurchaseRequest/addPurchaseRequest.js";

import {  Folder2 } from "@/assets/index.js";
import { ribbon } from "@/assets/index.js";
import { CustomCard } from "@/components/CustomeCard";
import DefaultLayout from "@/layouts/default";
import GradientBanner from "@/components/gradient-banner";
import {ButtonConfig} from "@/components/gradient-banner";
import { CardData } from "@/components/CustomeCard";


// Card Data
const cardDataList: CardData[] = [
    {
        id: 1,
        type: "primary",
        icon: <Folder2 className="w-5 h-5" />,
        primaryText: 835,
        secondaryText: "Total PRs",
        trend: { value: "12.5%", direction: "down" },
        color: "#3B82F6",
    },
    {
        id: 2,
        type: "primary",
        icon: <Monitor className="w-5 h-5" />,
        primaryText: 85,
        secondaryText: "Pending PRs",
        trend: { value: "10.5%", direction: "up" },
        color: "#12B76A",
    },
    {
        id: 3,
        type: "primary",
        icon: <Monitor className="w-5 h-5" />,
        primaryText: 95,
        secondaryText: "Approved PRs",
        trend: { value: "12.5%", direction: "down" },
        color: "#FF9700",
    },
    {
        id: 4,
        type: "primary",
        icon: <Folder2 className="w-5 h-5" />,
        primaryText: 85,
        secondaryText: "Received PIs",
        trend: { value: "12.5%", direction: "up" },
        color: "#00C7BE",
    },
];

export default function OrderManagement() {
    const [activeTab, setActiveTab] = useState<string | number>('purchaseRequests');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Buttons
    const button: ButtonConfig[] = [
        {
            label: "Refresh",
            variant: "transparent",
            icon: <RotateCcw size={18} />
        },
        {
            label: "New Purchase Request",
            variant: "white",
            icon: <Plus size={18} />,
            onClick: () => setIsModalOpen(true),
        }
    ]

    return (
        <div>
            <DefaultLayout>

                {/* Header */}
                <GradientBanner
                    backgroundImage={ribbon}
                    buttons={button}
                    icon={<Monitor color="#CD1E2F" size={22} />}
                    subtitle="Create purchase requests and manage proforma invoices"
                    title="Order Management"
                />

                {/* Card List */}
                <div className="relative z-[2] mt-4 sm:-mt-2 md:-mt-6 lg:-mt-12 px-4 sm:px-6 md:px-8 mx-auto flex flex-wrap justify-center md:justify-between gap-4 md:gap-6">
                    {cardDataList.map((card) => (
                        <div
                            key={card.id}
                            className="w-full sm:w-[48%] lg:w-[23%] flex-shrink-0"
                        >
                            <CustomCard data={card} />
                        </div>
                    ))}
                </div>

                {/* Tab */}
                <div className="flex w-full flex-col px-8 my-6">
                    <Tabs aria-label="Options"
                        classNames={{
                            tabList:
                                "bg-default-100 w-full flex justify-between rounded-full p-1 shadow-sm h-9",
                            tab: "flex-1 rounded-full h-8 data-[hover=true]:bg-white/70 data-[selected=true]:bg-white font-semibold text-gray-800 transition-all",
                            cursor: "hidden",
                        }}
                        radius="lg"
                        selectedKey={activeTab}
                        variant="light"
                        onSelectionChange={(key) => setActiveTab(key)}>
                        <Tab key="purchaseRequests" title="Purchase Requests"><PurchaseRequest /></Tab>
                        <Tab key="proformaInvoices" title="Proforma Invoices"><ProformaInvoices /></Tab>
                        <Tab key="orderStatus" title="Order Status"><OrderStatus /></Tab>
                        <Tab key="paymentStatus" title="Payment Status"><PaymentStatus /></Tab>
                    </Tabs>
                </div>

                {isModalOpen && <AddPurchaseRequest isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}

            </DefaultLayout>
        </div>
    );
}   