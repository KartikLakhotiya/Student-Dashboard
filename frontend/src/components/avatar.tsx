import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function AvatarDemo() {
    return (
        <Avatar>
            <AvatarImage src="/favicon.png" alt="logo" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}
