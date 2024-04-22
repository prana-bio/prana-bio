import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/app/components/molecules/avatar';
import { BadgePopup } from '@/app/components/molecules/badge-popup';

interface BadgeData {
    id: number;
    initials: string;
    svg: string; // SVG data for the badge
}

const badgesData: BadgeData[] = [
    {
        id: 1,
        initials: 'FA',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50">
    <rect width="80" height="80" stroke="black" stroke-width="3" fill="blue" />
  </svg>`,
    },
    {
        id: 2,
        initials: 'RK',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  </svg>`,
    },
    {
        id: 3,
        initials: 'PM',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50">
    <polygon points="50,10 90,90 10,90" stroke="black" stroke-width="3" fill="green" />
  </svg>`,
    },
];

export function MyBadges() {
    return (
        <>
            <div className="flex space-x-8">
                {badgesData.map((badge) => (
                    <div
                        key={badge.id}
                        className="flex items-center"
                    >
                        <BadgePopup badgeSVG={badge.svg} />
                        {/* <Avatar className="h-9 w-9">
                            <AvatarFallback>
                                {badge.initials}
                            </AvatarFallback>
                        </Avatar> */}
                    </div>
                ))}
            </div>
            {/* <div className="flex space-x-8">
                <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>FA</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex items-center">
                    <BadgePopup />
                    <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                        <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>FH</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>PM</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>H</AvatarFallback>
                    </Avatar>
                </div>
            </div> */}
        </>
    );
}
