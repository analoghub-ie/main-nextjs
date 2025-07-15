import {Skeleton} from "@heroui/skeleton";
import {Button, Card, CardBody, CardHeader} from "@heroui/react";
import Link from "next/link";
import {CloseIcon} from "@heroui/shared-icons";

export default function Loading() {
    // Placeholder array for list items
    const placeholders = Array.from({ length: 6 });

    return (
        <Card className="animate-pulse" shadow="sm">
            {/* Header ------------------------------------------------ */}
            <CardHeader className="flex items-start gap-3">
                {/* Logo placeholder */}
                <Skeleton className="w-[50px] h-[50px] rounded-md" />

                {/* Title + subtitle placeholders */}
                <div className="flex flex-col flex-1 gap-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>

                {/* Disabled close button */}
                <Button
                    isIconOnly
                    as={Link}
                    href="/category"
                    radius="full"
                    size="lg"
                    variant="light"
                    disabled
                    aria-label="Return to category list"
                >
                    <CloseIcon className="w-6 h-6" />
                </Button>
            </CardHeader>

            {/* Body – placeholder list -------------------------------- */}
            <CardBody className="p-0">
                <ul className="p-3 space-y-3">
                    {placeholders.map((_, i) => (
                        <li key={i}>
                            <Skeleton className="h-4 w-full" />
                        </li>
                    ))}
                </ul>
            </CardBody>
        </Card>
    );
}
