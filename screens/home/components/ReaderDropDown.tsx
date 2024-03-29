import { useState } from "react";
import { storage } from "@/utils";
import { Select } from "@/components/Select";

const data = [
  { label: " مشاري العفاسي", value: "ar.alafasy" },
  { label: "ماهر المعيقلي", value: "ar.mahermuaiqly" },
  { label: "الحصري", value: "ar.husary" },
  { label: "محمد صديق المنشاوي", value: "ar.minshawimujawwad" },
  { label: "عبد الباسط عبد الصمد", value: "ar.abdulsamad" },
  { label: "عبد الرحمن السديس", value: "ar.abdurrahmaansudais" },
  { label: "أيمن سويد", value: "ar.aymanswoaid" },
];
export const ReaderDropDown = () => {
  const [reader, setReader] = useState(
    storage.getString("reader") || "ar.alafasy"
  );

  return (
    <Select
      label="صوت القارئ"
      data={data}
      onChange={(value) => {
        storage.set("reader", value.value);
        setReader(value.value);
      }}
      value={reader}
    />
  );
};
