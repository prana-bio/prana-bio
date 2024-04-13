// /* App.Contribute.Page */
// 'use client';
// import React from 'react';

// const Contribute: React.FC = () => {
//     return <></>;
// };

// export default Contribute;

// import { Metadata } from 'next';
import Image from 'next/image';
import { PlusCircledIcon } from '@radix-ui/react-icons';

import { Button } from '@/app/components/molecules/button';
import {
    ScrollArea,
    ScrollBar,
} from '@/app/components/molecules/scroll-area';
import { Separator } from '@/app/components/molecules/separator';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/app/components/molecules/tabs';

import { AlbumArtwork } from '@/app/components/organisms/contribute/album-artwork';
import { Menu } from '@/app/components/organisms/contribute/menu';
import { PodcastEmptyPlaceholder } from '../components/organisms/contribute/podcast-empty-placeholder';
import { Sidebar } from '@/app/components/organisms/contribute/sidebar';
import {
    listenNowAlbums,
    madeForYouAlbums,
} from '@/app/nucleus/data/albums';
import { playlists } from '@/app/nucleus/data/playlists';

// export const metadata: Metadata = {
//     title: 'Contributions',
//     description:
//         'Directly support organizations fighting for biodiversity.',
// };

export default function ContributePage() {
    return (
        <>
            <p className="hidden xl:block text-muted-foreground text-sm pb-2">
                Identify credible organizations to support,
                and make a contribution today.
            </p>
            <div className="hidden md:block">
                {/* <Menu /> */}
                <div className="">
                    <div className="bg-background">
                        <div className="grid lg:grid-cols-5">
                            <Sidebar
                                playlists={playlists}
                                className="hidden lg:block"
                            />
                            <div className="col-span-3 lg:col-span-4 lg:border-l">
                                <div className="h-full px-4 py-6 lg:px-8">
                                    <Tabs
                                        defaultValue="music"
                                        className="h-full space-y-6"
                                    >
                                        <div className="space-between flex items-center">
                                            <TabsList>
                                                <TabsTrigger
                                                    value="music"
                                                    className="relative"
                                                >
                                                    Organizations
                                                </TabsTrigger>
                                                <TabsTrigger value="podcasts">
                                                    Strategies
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="live"
                                                    disabled
                                                >
                                                    Live
                                                </TabsTrigger>
                                            </TabsList>
                                            <div className="ml-auto mr-4">
                                                <Button>
                                                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                                                    Donate
                                                    Now
                                                </Button>
                                            </div>
                                        </div>
                                        <TabsContent
                                            value="music"
                                            className="border-none p-0 outline-none"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <h2 className="text-2xl font-semibold tracking-tight">
                                                        Suggested
                                                        Organizations
                                                    </h2>
                                                    <p className="text-sm text-muted-foreground">
                                                        Impactful
                                                        organization
                                                        suggestions
                                                        for
                                                        you.
                                                        Updated
                                                        daily.
                                                    </p>
                                                </div>
                                            </div>
                                            <Separator className="my-4" />
                                            <div className="relative">
                                                <ScrollArea>
                                                    <div className="flex space-x-4 pb-4">
                                                        {listenNowAlbums.map(
                                                            (
                                                                album,
                                                            ) => (
                                                                <AlbumArtwork
                                                                    key={
                                                                        album.name
                                                                    }
                                                                    album={
                                                                        album
                                                                    }
                                                                    aspectRatio="portrait"
                                                                    width={
                                                                        250
                                                                    }
                                                                    height={
                                                                        330
                                                                    }
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                    <ScrollBar orientation="horizontal" />
                                                </ScrollArea>
                                            </div>
                                            <div className="mt-6 space-y-1">
                                                <h2 className="text-2xl font-semibold tracking-tight">
                                                    Familiar
                                                    Organizations
                                                </h2>
                                                <p className="text-sm text-muted-foreground">
                                                    Continue
                                                    your
                                                    support.
                                                    Donate
                                                    to
                                                    organizations
                                                    you&apos;ve
                                                    supported
                                                    in the
                                                    past.
                                                </p>
                                            </div>
                                            <Separator className="my-4" />
                                            <div className="relative">
                                                <ScrollArea>
                                                    <div className="flex space-x-4 pb-4">
                                                        {madeForYouAlbums.map(
                                                            (
                                                                album,
                                                            ) => (
                                                                <AlbumArtwork
                                                                    key={
                                                                        album.name
                                                                    }
                                                                    album={
                                                                        album
                                                                    }
                                                                    className="w-[150px]"
                                                                    aspectRatio="square"
                                                                    width={
                                                                        150
                                                                    }
                                                                    height={
                                                                        150
                                                                    }
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                    <ScrollBar orientation="horizontal" />
                                                </ScrollArea>
                                            </div>
                                        </TabsContent>
                                        <TabsContent
                                            value="podcasts"
                                            className="h-full flex-col border-none p-0 data-[state=active]:flex"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <h2 className="text-2xl font-semibold tracking-tight">
                                                        Key
                                                        Strategies
                                                    </h2>
                                                    <p className="text-sm text-muted-foreground">
                                                        The
                                                        most
                                                        donated
                                                        towards
                                                        biodiversity
                                                        conservation
                                                        strategies.
                                                        Updated
                                                        daily.
                                                    </p>
                                                </div>
                                            </div>
                                            <Separator className="my-4" />
                                            {/* <PodcastEmptyPlaceholder /> */}
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
