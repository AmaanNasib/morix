import React from "react";
import { Monitor } from "lucide-react";

import DefaultLayout from "@/layouts/default";
import GradientBanner from "@/components/gradient-banner";
import { ribbon } from "@/assets/index.js";

export default function ScreenControl() {
    return (
        <div>
            <DefaultLayout>
            <GradientBanner 
            backgroundImage={ribbon}
            icon={<Monitor color="#CD1E2F" size={22} />}
            subtitle="Monitor, configure, and manage all connected digital signage screens"
            title="Screen Control"
            />

            </DefaultLayout>
        </div>
    );
}   