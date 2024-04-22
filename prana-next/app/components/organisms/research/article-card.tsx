import {
    ChevronDownIcon,
    CircleIcon,
    PlusIcon,
    BookmarkIcon,
} from '@radix-ui/react-icons';

import { Button } from '@/app/components/molecules/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle,
} from '@/app/components/molecules/card';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/app/components/molecules/dropdown-menu';
import { Separator } from '@/app/components/molecules/separator';
import { Article } from '@/app/types/Article';

interface ArticleCardProps {
    article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
    const {
        title,
        description,
        source,
        bookmarks,
        date,
        image,
    } = article;

    return (
        <Card>
            <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                <div className="space-y-1">
                    <CardTitle className="leading-[1.25]">
                        {title}
                    </CardTitle>
                    {/* <CardDescription>
                        {description}
                    </CardDescription> */}
                </div>
                <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
                    <Button
                        variant="secondary"
                        className="px-3 shadow-none"
                    >
                        <BookmarkIcon className="mr-2 h-4 w-4" />
                        Save
                    </Button>
                    <Separator
                        orientation="vertical"
                        className="h-[20px]"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                className="px-2 shadow-none"
                            >
                                <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            alignOffset={-5}
                            className="w-[200px]"
                            forceMount
                        >
                            <DropdownMenuLabel>
                                My Collections
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                                checked
                            >
                                Donate
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Macroecology
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Marine Life
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <PlusIcon className="mr-2 h-4 w-4" />{' '}
                                New Collection
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            {
                /* <CardContent className="flex space-x-4 text-sm text-muted-foreground items-center">
                <CardDescription>
                    {description}
                </CardDescription>
                {image && (
                    <img
                        src={image}
                        alt="Article"
                        className="sm:w-24 lg:w-48 h-auto rounded-lg"
                    />
                )}
            </CardContent> */
                <CardContent className="flex items-start text-sm text-muted-foreground">
                    <div className="flex-shrink-0">
                        {image && (
                            <img
                                src={image}
                                alt="Article"
                                className="w-32 h-auto rounded-lg"
                            />
                        )}
                    </div>
                    <div className="ml-4">
                        <CardDescription>
                            {description}
                        </CardDescription>
                    </div>
                </CardContent>
            }
            <CardFooter>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                        {source}
                    </div>
                    {/* <div className="flex items-center">
                        <BookmarkIcon className="mr-1 h-3 w-3" />
                        {bookmarks}
                    </div> */}
                    <div>{date}</div>
                </div>
            </CardFooter>
            {/* <CardFooter>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                        The Guardian
                    </div>
                    <div className="flex items-center">
                        <BookmarkIcon className="mr-1 h-3 w-3" />
                        10k
                    </div>
                    <div>September 14th 2023</div>
                </div>
            </CardFooter> */}
        </Card>
    );
}
