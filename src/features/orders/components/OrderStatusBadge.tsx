import { Badge } from "@/components/ui/badge";

import {
  orderStatusLabels,
  orderStatusVariants,
} from "../constants/order.constants";
import type { OrderStatus } from "../types/order.types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <Badge variant={orderStatusVariants[status]}>
      {orderStatusLabels[status]}
    </Badge>
  );
}
