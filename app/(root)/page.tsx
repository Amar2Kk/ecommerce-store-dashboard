"use client";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";

export default function SetupPage() {
    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);

    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    return (
        <div className="h-screen p-4">
            <UserButton afterSignOutUrl="/" />
            <p>This is a protected route.</p>
        </div>
    );
}