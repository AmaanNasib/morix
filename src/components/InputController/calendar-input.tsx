import {
  Button,
  Card,
  CardBody,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type ViewMode = "day" | "month" | "year";

const COLORS = {
  selectedBg: "#FCE4E4",
  selectedText: "#EB5757",
};

const UI = {
  surface: "bg-white dark:bg-neutral-900",
  border: "border-gray-200 dark:border-neutral-700",
  textDefault: "text-gray-900 dark:text-gray-100",
  textMuted: "text-gray-500 dark:text-gray-400",
  textDisabled: "text-gray-400 dark:text-gray-500",
  hoverBg: "hover:bg-gray-100 dark:hover:bg-neutral-800",
};

const STYLES = {
  wrapperWidth: "w-full max-w-[300px]",
  daySize: "h-10 w-10 text-[15px]",
  monthBtn: "py-3 px-4 rounded-lg text-sm bg-gray-50",
  yearBtn: "py-3 px-4 rounded-lg text-sm bg-gray-50",
};

interface CalendarInputProps {
  onChange: (date: string | Date, name: string) => void;
  name: string;
  value: string | Date;
  min?: string;
  max?: string;
  placeholder?: string;
  label?: string;
};

export default function CalendarInput({
  onChange,
  name,
  value,
  min,
  max,
  placeholder = "Select date",
  label = "Label",
}: CalendarInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const [current, setCurrent] = useState<Date>(
    value ? new Date(value) : new Date()
  );
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<ViewMode>("day");

  const month = current.getMonth();
  const year = current.getFullYear();
  const daysShort = ["M", "T", "W", "T", "F", "S", "S"];

  const firstDay = new Date(year, month, 1).getDay();
  const firstDayIndex = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const formatDate = (d: Date) =>
    d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  useEffect(() => {
    if (value) {
      const newDate = new Date(value);

      setSelectedDate(newDate);
      setCurrent(newDate);
    }
  }, [value]);

  const isDisabled = (d: Date) => {
    if (min && d.getTime() < new Date(min).getTime()) return true;
    if (max && d.getTime() > new Date(max).setHours(23, 59, 59, 999)) return true;

    return false;
  };

  const selectDate = (d: Date) => {
    if (isDisabled(d)) return;
    setSelectedDate(d);
    onChange?.(d, name);
    setOpen(false);
  };

  const buildDayGrid = () => {
    const cells: { date: Date; inCurrentMonth: boolean }[] = [];
    const prevLast = new Date(year, month, 0).getDate();

    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevLast - i);

      cells.push({ date: d, inCurrentMonth: false });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(year, month, d), inCurrentMonth: true });
    }

    const total = 35;
    const remaining = total - cells.length;

    for (let i = 1; i <= remaining; i++) {
      cells.push({ date: new Date(year, month + 1, i), inCurrentMonth: false });
    }

    return cells;
  };

  const dayGridCells = buildDayGrid();

  const isSameDay = (a: Date | null, b: Date) =>
    !!a &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const dayClass = (date: Date, inCurrent: boolean) => {
    const active = isSameDay(selectedDate, date);
    const disabled = isDisabled(date);

    return [
      "rounded-md flex items-center justify-center select-none",
      STYLES.daySize,
      disabled
        ? "opacity-40 cursor-not-allowed"
        : `cursor-pointer ${UI.hoverBg}`,
      inCurrent ? UI.textDefault : UI.textDisabled,
      active ? `bg-[${COLORS.selectedBg}] text-[${COLORS.selectedText}]` : "",
    ].join(" ");
  };

  return (
    <div className={`${STYLES.wrapperWidth}`}>
      <Popover
        isOpen={open}
        motionProps={{
          variants: {
            enter: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
          },
          transition: { duration: 0.15 },
        }}
        placement="bottom-start"
        onOpenChange={setOpen}
      >
        <PopoverTrigger>
          <div>
            <Input
              readOnly
              className="cursor-pointer"
              endContent={<Calendar className="text-default-400" size={18} />}
              label={label}
              labelPlacement="outside"
              placeholder={placeholder}
              value={selectedDate ? formatDate(selectedDate) : ""}
            />
          </div>
        </PopoverTrigger>

        <PopoverContent
          className={`p-0 shadow-lg ${UI.border} rounded-xl z-[9999]`}
        >
          <Card className={`${UI.surface}`} radius="md" shadow="none">
            <CardBody className="p-6 space-y-6">
              {/* HEADER */}
              <div className="flex items-center justify-between">
                <Button
                  isIconOnly
                  className={`${UI.hoverBg} rounded-md`}
                  size="sm"
                  variant="light"
                  onPress={() => setCurrent(new Date(year, month - 1, 1))}
                >
                  <ChevronLeft size={18} />
                </Button>

                {view === "day" && (
                  <button
                    className={`${UI.textDefault} text-base font-medium`}
                    onClick={() => setView("month")}
                  >
                    {current.toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </button>
                )}

                {view === "month" && (
                  <button
                    className={`${UI.textDefault} text-base font-medium`}
                    onClick={() => setView("year")}
                  >
                    {year}
                  </button>
                )}

                {view === "year" && (
                  <div className={`${UI.textDefault} text-base font-medium`}>
                    {year - 6} - {year + 5}
                  </div>
                )}

                <Button
                  isIconOnly
                  className={`${UI.hoverBg} rounded-md`}
                  size="sm"
                  variant="light"
                  onPress={() => setCurrent(new Date(year, month + 1, 1))}
                >
                  <ChevronRight size={18} />
                </Button>
              </div>

              {/* DAY VIEW */}
              {view === "day" && (
                <>
                  <div
                    className={`grid grid-cols-7 text-center ${UI.textMuted} text-xs`}
                  >
                    {daysShort.map((d) => (
                      <div key={d}>{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center">
                    {dayGridCells.map(({ date, inCurrentMonth }, idx) => (
                      <button
                        key={idx}
                        className={dayClass(date, inCurrentMonth)}
                        type="button"
                        onClick={() => selectDate(date)}
                      // optional: if you want "disabled" days not clickable
                      // disabled={!inCurrentMonth}
                      >
                        {date.getDate()}
                      </button>
                    ))}
                  </div>

                </>
              )}

              {/* MONTH VIEW */}
              {view === "month" && (
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const active =
                      selectedDate && i === selectedDate.getMonth();

                    return (
                      <button
                        key={i}
                        className={[
                          STYLES.monthBtn,
                          UI.border,
                          UI.textDefault,
                          "w-full",
                          active
                            ? `bg-[${COLORS.selectedBg}] text-[${COLORS.selectedText}] border-transparent`
                            : UI.hoverBg,
                        ].join(" ")}
                        onClick={() => {
                          setCurrent(new Date(year, i, 1));
                          setView("day");
                        }}
                      >
                        {new Date(2000, i).toLocaleString("en-US", {
                          month: "short",
                        })}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* YEAR VIEW */}
              {view === "year" && (
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const y = year - 6 + i;
                    const active =
                      selectedDate && y === selectedDate.getFullYear();

                    return (
                      <button
                        key={y}
                        className={[
                          STYLES.yearBtn,
                          UI.border,
                          UI.textDefault,
                          "w-full",
                          active
                            ? `bg-[${COLORS.selectedBg}] text-[${COLORS.selectedText}] border-transparent`
                            : UI.hoverBg,
                        ].join(" ")}
                        onClick={() => {
                          setCurrent(new Date(y, month, 1));
                          setView("month");
                        }}
                      >
                        {y}
                      </button>
                    );
                  })}
                </div>
              )}
            </CardBody>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}
