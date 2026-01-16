import { prisma } from "../../shared/prisma";

const createUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "CUSTOMER";
}) => {
  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role ?? "CUSTOMER",
    },
  });

  return user;
};


const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
};

const getSingleUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
};
