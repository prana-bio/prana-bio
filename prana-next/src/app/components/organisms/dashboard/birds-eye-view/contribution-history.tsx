import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/app/components/molecules/avatar';

export function ContributionHistory() {
    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    {/* <AvatarImage
                        src="/avatars/01.png"
                        alt="Avatar"
                    /> */}
                    <AvatarFallback>FA</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Fundación ProAves
                    </p>
                    <p className="text-sm text-muted-foreground">
                        https://proaves.org/en/
                    </p>
                </div>
                <div className="ml-auto font-medium">
                    +$49.00
                </div>
            </div>
            <div className="flex items-center">
                <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    {/* <AvatarImage
                        src="/avatars/02.png"
                        alt="Avatar"
                    /> */}
                    <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        A Rocha Kenya
                    </p>
                    <p className="text-sm text-muted-foreground">
                        https://www.arocha.or.ke/
                    </p>
                </div>
                <div className="ml-auto font-medium">
                    +$39.00
                </div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    {/* <AvatarImage
                        src="/avatars/03.png"
                        alt="Avatar"
                    /> */}
                    <AvatarFallback>FH</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Fundación Hábitat y Desarrollo
                    </p>
                    <p className="text-sm text-muted-foreground">
                        habitatydesarrollo.org
                    </p>
                </div>
                <div className="ml-auto font-medium">
                    +$299.00
                </div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    {/* <AvatarImage
                        src="/avatars/04.png"
                        alt="Avatar"
                    /> */}
                    <AvatarFallback>PM</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Planet Madagascar Association
                    </p>
                    <p className="text-sm text-muted-foreground">
                        planetmadagascar.org
                    </p>
                </div>
                <div className="ml-auto font-medium">
                    +$29.00
                </div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    {/* <AvatarImage
                        src="/avatars/05.png"
                        alt="Avatar"
                    /> */}
                    <AvatarFallback>H</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Hutan
                    </p>
                    <p className="text-sm text-muted-foreground">
                        hutan.org.my
                    </p>
                </div>
                <div className="ml-auto font-medium">
                    +$39.00
                </div>
            </div>
        </div>
    );
}
