import { prisma } from "../../shared/prisma";

interface OrderItemPayload {
  productId: string;
  quantity: number;
  price: number;
}

interface CreateOrderPayload {
  userId: string;
  items: OrderItemPayload[];
  totalAmount: number;
  status?: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";
}

const createOrder = async (payload: CreateOrderPayload) => {
  const order = await prisma.order.create({
    data: {
      userId: payload.userId,
      totalAmount: payload.totalAmount,
      status: payload.status ?? "PENDING",
      items: {
        create: payload.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: { items: true },
  });

  return order;
};

const getAllOrders = async () => {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: false } }, user: false },
  });
};

const getSingleOrder = async (id: string) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } }, user: true },
  });

  if (!order) throw new Error("Order not found");

  return order;
};

const updateOrderStatus = async (
  id: string,
  status: CreateOrderPayload["status"]
) => {
  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });

  return order;
};

const deleteOrder = async (id: string) => {
  const order = await prisma.order.delete({
    where: { id },
  });

  return order;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
};
