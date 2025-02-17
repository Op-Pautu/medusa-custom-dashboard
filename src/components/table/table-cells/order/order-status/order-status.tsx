import { HttpTypes } from "@medusajs/types";
import { useTranslation } from "react-i18next";
import { getOrderStatus } from "../../../../../lib/order-helpers";
import { StatusCell } from "../../common/status-cell";

type OrderStatusCellProps = {
  status: HttpTypes.AdminOrder["status"];
};

export const OrderStatusCell = ({ status }: OrderStatusCellProps) => {
  const { t } = useTranslation();

  const { label, color } = getOrderStatus(t, status);

  return <StatusCell color={color}>{label}</StatusCell>;
};

export const OrderStatusHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full items-center">
      <span className="truncate">{t("fields.status")}</span>
    </div>
  );
};
