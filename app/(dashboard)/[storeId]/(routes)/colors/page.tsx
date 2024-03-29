import prismaDB from "@/lib/prismaDB";
import { format } from "date-fns";

import { ColorClient } from "./components/client";
import { ColorColumn } from "./components/columns";

interface ColorsPageProps {
    params: { storeId: string };
}

const ColorsPage: React.FC<ColorsPageProps> = async ({ params }) => {
    const colors = await prismaDB.color.findMany({
        where: { storeId: params.storeId },
        orderBy: { createdAt: "desc" },
    });

    const formattedColors: ColorColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMM do, yyyy"),
    }));
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorClient data={formattedColors} />
            </div>
        </div>
    );
};

export default ColorsPage;
