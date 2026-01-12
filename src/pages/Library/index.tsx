import { Monitor } from "lucide-react";

import GradientBanner from "@/components/gradient-banner";
import DefaultLayout from "@/layouts/default";
import { ribbon } from "@/assets/index.js";


export default function Library() {
    return (
        <div>
            <DefaultLayout>
                <GradientBanner
                    backgroundImage={ribbon}
                    icon={<Monitor color="#CD1E2F" size={22} />}
                    subtitle="Monitor, configure, and manage all connected digital signage screens"
                    title="Library"
                />
            </DefaultLayout>
        </div>
    );
}