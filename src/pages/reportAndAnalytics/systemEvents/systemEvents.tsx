import { useState, useEffect } from "react";
import { Spinner, Card, CardBody,  Button } from "@heroui/react";

type ButtonColor = | "default" | "danger" | "warning" | "success" | "primary" | "secondary";
type EventType = "error" | "warning" | "success" | "info";

export interface SystemEventData {
  id: string;
  type: "error" | "warning" | "success" | "info";
  title: string;
  source: string;
  screen: string;
  description: string;
  timestamp: string;
}

// Default/Mock data - Replace with API call
const defaultSystemEventsData: SystemEventData[] = [
  {
    id: "1",
    type: "error",
    title: "Connection Lost",
    source: "Network",
    screen: "SCR-004",
    description: "Network connection timeout after 3 retry attempts",
    timestamp: "12/23/2024, 5:15:00 PM",
  },
  {
    id: "2",
    type: "warning",
    title: "High CPU Usage",
    source: "System",
    screen: "SCR-002",
    description: "CPU usage exceeded 85% threshold for 5 minutes",
    timestamp: "12/23/2024, 5:00:00 PM",
  },
  {
    id: "3",
    type: "success",
    title: "Update Completed",
    source: "Content",
    screen: "SCR-001",
    description: "Successfully deployed new holiday playlist",
    timestamp: "12/23/2024, 4:45:00 PM",
  },
  {
    id: "4",
    type: "info",
    title: "Scheduled Restart",
    source: "Scheduler",
    screen: "SCR-003",
    description: "Daily maintenance restart completed successfully",
    timestamp: "12/23/2024, 4:30:00 PM",
  },
];

// API Functions - Replace these with actual API calls
const fetchSystemEvents = async (): Promise<SystemEventData[]> => {
  // TODO: Replace with actual API call
  // Example: const response = await fetch('/api/system-events');
  // return await response.json();
  
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(defaultSystemEventsData), 500);
  });
};

const badgeColor: Record<EventType, ButtonColor> = {
  error: "danger",
  warning: "warning",
  success: "success",
  info: "primary",
};

export default function SystemEventsPage() {
  const [eventsData, setEventsData] = useState<SystemEventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load system events data on mount
  useEffect(() => {
    const loadSystemEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchSystemEvents();

        setEventsData(data);
      } catch (err) {
        console.error("Failed to load system events:", err);
        setError("Failed to load system events data. Please try again later.");
        // Keep default data on error
        setEventsData(defaultSystemEventsData);
      } finally {
        setIsLoading(false);
      }
    };

    loadSystemEvents();
  }, []);


  if (isLoading && eventsData.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Spinner color="danger" size="lg" />
            <p className="text-sm text-gray-600">Loading system events...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="mb-2">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
            System Events & Activity Log
          </h2>
          <p className="text-sm text-gray-600">
            Track system activities, errors, and important events across various screens.
          </p>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm mt-4">
            {error}
          </div>
        )}
      </div>

      {/* Events List */}
      {eventsData.length === 0 ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-2">No system events available</p>
            <p className="text-gray-400 text-sm">System events will appear here once available.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {eventsData.map((event) => (
            <Card key={event.id} className="shadow-none bg-gray-50 border border-gray-200">
              <CardBody className="p-4 sm:p-5 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <Button className="cursor-default border-[1px]" color={`${badgeColor[event.type]}`} variant="bordered">{event.type}</Button>
                    <span className="text-base sm:text-lg font-semibold text-gray-900">
                      {event.title}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                    {event.timestamp}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-600">
                  <span>Source: <span className="font-medium">{event.source}</span></span>
                  <span>Screen: <span className="font-medium">{event.screen}</span></span>
                </div>

                <div className="bg-white rounded-md border border-gray-200 p-3 sm:p-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
