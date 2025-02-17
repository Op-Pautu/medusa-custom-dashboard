import { HttpTypes } from "@medusajs/types";
import { Container, Heading, StatusBadge } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { useState } from "react";

type OrderStatusSectionProps = {
  order: HttpTypes.AdminOrder;
};

export const OrderStatusSection = ({ order }: OrderStatusSectionProps) => {
  console.log("status: ", order.status);
  const [status, setStatus] = useState(order.status);

  const updateOrderStatus = async (newStatus: string) => {
    try {
      const apiUrl = `${import.meta.env.VITE_MEDUSA_ADMIN_BACKEND_URL}/admin/order-status`;

      const payload = {
        orderId: order.id,
        status: newStatus,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setStatus(newStatus);
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  return (
    <Container className="divide-y divide-dashed p-0">
      <Header
        order={{ ...order, status }}
        updateOrderStatus={updateOrderStatus}
      />
    </Container>
  );
};

const Header = ({
  order,
  updateOrderStatus,
}: {
  order: HttpTypes.AdminOrder;
  updateOrderStatus: (status: string) => void;
}) => {
  const { t } = useTranslation();

  const orderStatus =
    order.status === "canceled"
      ? "Canceled"
      : order.status === "completed"
        ? "Completed"
        : "Pending";

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <Heading level="h2">{t("orders.payment.title")}</Heading>
      <StatusBadge className="text-nowrap">{orderStatus}</StatusBadge>

      <select
        onChange={(e) => updateOrderStatus(e.target.value)}
        value={order.status}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="canceled">Canceled</option>
      </select>
    </div>
  );
};
