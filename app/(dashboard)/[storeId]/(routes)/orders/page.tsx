import { format } from "date-fns";

import prismaDB from "@/lib/prismaDB";
import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

interface OrderPageProps {
    params: { storeId: string };
}

const OrderPage: React.FC<OrderPageProps> = async ({ params }) => {
    const orders = await prismaDB.order.findMany({
        where: { storeId: params.storeId },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        products: item.orderItems
            .map((orderItem) => orderItem.product.name)
            .join(", "),
        totalPrice: formatter.format(
            item.orderItems.reduce((total, item) => {
                return total + Number(item.product.price);
            }, 0)
        ),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, "MMM do, yyyy"),
    }));
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    );
};

export default OrderPage;
