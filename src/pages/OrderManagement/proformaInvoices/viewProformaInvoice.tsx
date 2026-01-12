import { Card, CardBody, CardHeader } from "@heroui/react";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/react";
import {
    ArrowLeft,
    Download,
    Pencil,
    Check,
    Building2,
    CalendarDays,
    Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DefaultLayout from "@/layouts/default";

export default function ViewProformaInvoice() {
    const navigate = useNavigate();

    return (
        <DefaultLayout>
            <div className="min-h-screen p-6 flex flex-col gap-6">

                {/* Back Button */}
                <div className="bg-white py-[16px] pl-[24px]">
                    <Button
                        className="max-h-[36px] border-[1px] border-gray-300 rounded-lg"
                        startContent={<ArrowLeft size={18} />}
                        variant="light"
                        onPress={() => navigate('/orders', { replace: true })}
                    >
                        Back to Order Management
                    </Button>
                </div>

                {/* Header Section */}
                <div className="bg-white p-[24px] rounded-xl border border-gray-300">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">Proforma Invoice</h2>
                            <p className="text-sm text-gray-600">Complete details for PI-2024-001</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                className="bg-white border border-gray-300"
                                startContent={<Download size={16} />}
                                variant="flat"
                            >
                                Download PDF
                            </Button>

                            <Button
                                className="bg-white border border-gray-300"
                                color="warning"
                                startContent={<Pencil size={16} />}
                                variant="flat"
                            >
                                Request Revision
                            </Button>

                            <Button
                                color="success"
                                startContent={<Check size={16} />}
                            >
                                Accept Invoice
                            </Button>
                        </div>
                    </div>

                    {/* Badge */}
                    <div className="mt-4 text-sm bg-red-100 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
                        <span>This invoice expires in -279 days</span>
                        <span className="text-blue-600 text-xs px-2 py-1 bg-blue-100 rounded-md">received</span>
                    </div>

                    <h3 className="mt-6 text-lg font-semibold">PI-2024-001</h3>
                    <p className="text-sm text-gray-500">Related to Purchase Request: PR-2024-001</p>
                </div>

                {/* Invoice From + Validity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Invoice From */}
                    <Card className="rounded-xl">
                        <CardHeader>
                            <h3 className="font-semibold text-lg">Invoice From</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                                <div className="bg-primary text-white h-[64px] w-[64px] flex items-center justify-center rounded-xl">
                                    <Building2 size={22} />
                                </div>

                                <div>
                                    <p className="font-semibold">TechVision Distributors Inc.</p>
                                    <p className="text-gray-500 text-sm">Distributor</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Validity Period */}
                    <Card className="rounded-xl">
                        <CardHeader>
                            <h3 className="font-semibold text-lg">Validity Period</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="p-4 bg-gray-50 rounded-lg text-sm flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <CalendarDays className="text-gray-600" size={18} />
                                    <div>
                                        <p className="text-gray-500">Issue Date</p>
                                        <p className="font-medium">December 21, 2024</p>
                                    </div>
                                </div>

                                <Divider />

                                <div className="flex items-center gap-3">
                                    <CalendarDays className="text-gray-600" size={18} />
                                    <div>
                                        <p className="text-gray-500">Valid Until</p>
                                        <p className="font-medium">January 21, 2025</p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Order Summary */}
                <Card className="rounded-xl p-[24px]">
                    <CardHeader>
                        <h3 className="font-semibold text-lg">Order Summary</h3>
                    </CardHeader>
                    <CardBody>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="text-gray-500 border-b">
                                    <tr>
                                        <th className="pb-3 text-left">Item</th>
                                        <th className="pb-3 text-left">Quantity</th>
                                        <th className="pb-3 text-left">Unit Price</th>
                                        <th className="pb-3 text-left">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="py-4">
                                            <p className="font-medium">Professional Digital Signage Display 55&ldquo;</p>
                                            <p className="text-gray-500 text-xs">Digital Signage Device</p>
                                        </td>
                                        <td>10</td>
                                        <td>$1,450</td>
                                        <td>$14,500</td>
                                    </tr>

                                    <tr>
                                        <td className="text-right py-2 font-medium" colSpan={3}>Subtotal</td>
                                        <td>$14,500</td>
                                    </tr>

                                    <tr className="text-red-500 font-medium">
                                        <td className="text-right py-2" colSpan={3}>Tax (15%)</td>
                                        <td>$2,175</td>
                                    </tr>

                                    <tr className="font-bold text-red-600 border-t">
                                        <td className="text-right py-3 text-lg" colSpan={3}>Grand Total</td>
                                        <td className="text-lg">$16,675</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>

                {/* Delivery + Payment Terms */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="rounded-xl">
                        <CardHeader>
                            <h3 className="font-semibold text-lg">Delivery Terms</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="p-4 bg-gray-50 rounded-lg text-sm">
                                15 business days from order confirmation
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="rounded-xl">
                        <CardHeader>
                            <h3 className="font-semibold text-lg">Payment Terms</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="p-4 bg-gray-50 rounded-lg text-sm">
                                Net 30 days
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Additional Notes */}
                <Card className="rounded-xl">
                    <CardHeader>
                        <h3 className="font-semibold text-lg">Additional Notes</h3>
                    </CardHeader>
                    <CardBody>
                        <div className="p-4 bg-blue-50 rounded-lg text-sm">
                            Includes installation and 1-year warranty
                        </div>
                    </CardBody>
                </Card>

                {/* Important Information */}
                <div className="bg-[#A3682A] text-white p-6 rounded-xl text-sm">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Info size={16} /> Important Information
                    </h4>

                    <ul className="list-disc ml-5 flex flex-col gap-2">
                        <li>This is a Proforma Invoice and not a tax invoice</li>
                        <li>Final Invoice will be issued upon order confirmation and payment</li>
                        <li>Prices and availability are subject to change</li>
                        <li>Please accept or request revision before the expiry date</li>
                    </ul>
                </div>
            </div>
        </DefaultLayout>

    );
}
