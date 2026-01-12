import { Card, CardBody, CardHeader } from "@heroui/react";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/react";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { ArrowLeft, Download, Clock, CircleCheckBig, Building2, Eye, Clock4 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DefaultLayout from "@/layouts/default";

export default function ViewPurchaseRequest() {
    const navigate = useNavigate();
    const currentStep = 1;
    const steps = ["Submitted", "Processing", "Review", "Completed"];
    const progressPercent = (currentStep / (steps.length - 1)) * 100;

    return (
        <DefaultLayout>
            <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-6">
                {/* Top Section to go back to order management */}
                <div className="bg-white py-[16px] pl-[24px]">
                    <Button className="max-h-[36px] border-[1px] border-gray-300 rounded-lg" startContent={<ArrowLeft size={18} />} variant="light" onPress={() => navigate('/orders', { replace: true })}>Back to Order Management</Button>

                </div>

                {/* Top Bar */}
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-base font-medium">Purchase Request Details</p>
                        <p className="text-sm font-normal text-[#132533BF]">Complete information about PR-2024-001</p>
                    </div>
                    <Button className="bg-white border-[1px] border-gray-300 rounded-lg" color="primary" startContent={<Download size={18} />} variant="flat">Download PDF</Button>
                </div>

                {/* Progress Section */}
                <div className="bg-white p-[24px] border-[1px] border-gray-300 rounded-[14px]">
                    <div className="flex flex-row flex-wrap justify-between items-center">
                        <div>
                            <h2 className="text-base font-semibold">PR-2024-001</h2>
                            <p className="text-gray-500 text-sm">Submitted on December 20, 2024</p>
                        </div>
                        <span className="bg-green-100 text-green-600 text-xs  px-3 py-2 border-[1px] border-gray-300 rounded-lg flex items-center gap-2 text-xs font-medium"><CircleCheckBig size={16} />Approved</span>
                    </div>
                    <div className="w-full mt-4 bg-white">
                        <div className="flex flex-col w-full">
                            <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500 transition-all duration-500"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>

                            {/* Steps */}
                            <div className="flex justify-between text-xs font-normal text-neutral-800 mt-2">
                                {steps.map((label, index) => (
                                    <span
                                        key={label}
                                        className={
                                            index <= currentStep ? "text-green-600" : "text-neutral-500"
                                        }
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Request Details */}
                    <Card className="p-[24px] rounded-xl">
                        <CardHeader>
                            <h3 className="font-semibold text-lg">Request Details</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="bg-[#0F172A0D] p-4 rounded-xl flex flex-col gap-4 text-sm">
                                <Detail label="Device Type" value="Professional Digital Signage Display 55" />
                                <Divider />
                                <Detail label="Quantity Requested" value="10 units" />
                                <Divider />
                                <Detail label="Expected Delivery Date" value="January 15, 2025" />
                                <Divider />
                                <Detail label="Estimated Amount" value={<span className="text-red-600">$15,000</span>} />
                            </div>
                        </CardBody>
                    </Card>

                    {/* Sent To */}
                    <Card className="p-[24px] rounded-xl">
                        <CardHeader>
                            <h3 className="font-semibold text-lg">Sent To</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="p-4 rounded-xl bg-gray-50">
                                <div className="flex flex-row flex-wrap gap-2 items-center">
                                    <div className="bg-primary h-[64px] w-[64px] rounded-[10px] flex items-center justify-center">
                                        <Building2 size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold">TechVision Distributors Inc.</p>
                                        <p className="text-gray-500 text-sm mb-2">Distributor</p>
                                    </div>
                                </div>
                                <Divider className="mt-4 mb-4" />
                                <p className="text-xs text-gray-600 font-normal mb-2">Request Date</p>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock size={16} /> December 20, 2024 at 04:00 PM
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Additional Notes */}
                <Card>
                    <CardHeader>
                        <h3 className="font-semibold text-lg">Additional Notes</h3>
                    </CardHeader>
                    <CardBody>
                        <div className="p-4 bg-blue-50 rounded-xl text-gray-700 text-sm">
                            Need for new retail store locations
                        </div>
                    </CardBody>
                </Card>

                {/* Activity Timeline */}
                <Card className="rounded-xl p-[24px]">
                    <CardHeader>
                        <h3 className="font-semibold text-lg">Activity Timeline</h3>
                    </CardHeader>
                    <CardBody>
                        <ScrollShadow className="flex flex-col gap-6 max-h-[300px] pr-2">
                            <TimelineItem date="December 20, 2024 at 04:00 PM" status="success" title="Purchase Request Created" />
                            <TimelineItem description="Status changed to: In Process" status="warning" title="Request Received by TechVision Distributors Inc." />
                            <TimelineItem description="Request is being reviewed by the team" status="primary" title="Under Review" />
                            <TimelineItem description="Proforma Invoice will be generated shortly" status="success" title="Purchase Request Approved" />
                        </ScrollShadow>
                    </CardBody>
                </Card>
            </div>
        </DefaultLayout>

    );
}

function Detail({ label, value }: { label: any, value: any }) {
    return (
        <div>
            <p className="text-gray-500">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    );
}


type TimelineItemProps = {
    status: "success" | "warning" | "primary" | string;
    title: string;
    date?: string;
    description?: string;
};

export function TimelineItem({  title, date, description }: TimelineItemProps) {

    // Determine icon + color based on title:
    const getIconConfig = () => {
        if (title.includes("Created") || title.includes("Approved")) {
            return { icon: <CircleCheckBig size={18} />, bg: "bg-[#12B76A]" };
        }
        if (title.includes("Received")) {
            return { icon: <Clock4 size={18} />, bg: "bg-[#F79009]" };
        }
        if (title.includes("Review")) {
            return { icon: <Eye size={18} />, bg: "bg-[#2B7FFF]" };
        }

        return { icon: null, bg: "bg-gray-300" };
    };

    const { icon, bg } = getIconConfig();

    return (
        <div className="flex items-start gap-4">
            <div
                className={`${bg} h-[32px] w-[32px] text-white rounded-full flex items-center justify-center`}
            >
                {icon}
            </div>

            <div>
                <p className="font-medium text-sm">{title}</p>

                {date && <p className="text-gray-500 text-xs">{date}</p>}
                {description && <p className="text-gray-600 text-xs">{description}</p>}
            </div>
        </div>
    );
}