import prismaDB from "@/lib/prismaDB";
import { format } from "date-fns";

import { SizeClient } from "./components/client";
import { SizeColumn } from "./components/columns";

interface SizesPageProps {
    params: { storeId: string };
}

const SizesPage: React.FC<SizesPageProps> = async ({ params }) => {
    const sizes = await prismaDB.size.findMany({
        where: { storeId: params.storeId },
        orderBy: { createdAt: "desc" },
    });

    const formattedSizes: SizeColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMM do, yyyy"),
    }));
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data={formattedSizes} />
            </div>
        </div>
    );
};

export default SizesPage;
