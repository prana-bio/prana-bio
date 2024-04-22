'use client';
import { useState, useEffect } from 'react';
import type { Species } from '@/app/types/deprecated/Species';

const SpeciesList = ({ speciesData }: Species[] | any) => {
    return (
        <>
            {/* {speciesData.map((species: any, index: any) => (
                <div
                    key={index}
                    className="max-w p-2 sm:p-4 md:p-4 lg:p-4 xl:p-4 bg-black bg-opacity-20 shadow
                             dark:bg-gray-900 dark:bg-opacity-90 dark:border-gray-700 hover:backdrop-blur-sm 
                               hover:border-t-2 hover:border-b-2 hover:border-gray-400 hover:bg-opacity-40"
                >
                    <h1
                        className="mb-1 sm:mb-2 text-sm xs:text-sm sm:text-base md:text-base lg:text-base xl:text-xl
                                       font-bold tracking-tight text-gray-100 dark:text-white
                                       animate-jump-in animate-delay-100 animate-once"
                    >
                        {species.scientificName.toUpperCase()}
                    </h1>
                    <div
                        className="flex flex-col text-sm sm:text-base text-gray-300 dark:text-gray-300 
                                   font-normal"
                    >
                        <h6 className="">
                            <i>canonical name:</i>{' '}
                            <b>
                                {species.canonicalName.toLowerCase()}
                            </b>
                        </h6>
                        <h6 className="">
                            <i>kingdom:</i>{' '}
                            <b>
                                {species.kingdom.toLowerCase()}
                            </b>
                        </h6>
                        <h6 className="">
                            <i>origin:</i>{' '}
                            <b>
                                {species.origin.toLowerCase()}
                            </b>
                        </h6>
                        <h6 className="">
                            <i>taxonomic status:</i>{' '}
                            <b>
                                {species.taxonomicStatus.toLowerCase()}
                            </b>
                        </h6>
                        <h6 className="">
                            <i>last interpreted:</i>{' '}
                            <b>
                                {new Date(
                                    species.lastInterpreted,
                                )
                                    .toLocaleString(
                                        'en-US',
                                        {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            timeZoneName:
                                                'short',
                                        },
                                    )
                                    .toLowerCase()}
                            </b>
                        </h6>
                        <h6 className="">
                            <i>last crawled date:</i>{' '}
                            <b>
                                {new Date(
                                    species.lastCrawled,
                                )
                                    .toLocaleString(
                                        'en-US',
                                        {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            timeZoneName:
                                                'short',
                                        },
                                    )
                                    .toLowerCase()}
                            </b>
                        </h6>
                        <h6 className="">
                            <i>number of descendents:</i>{' '}
                            <b>{species.numDescendants}</b>
                        </h6>
                    </div>
                    <a
                        href="#"
                        className="inline-flex items-center mt-4 mb-2 px-2 py-2 sm:px-4 sm:py-2 font-sm text-center text-xs sm:text-sm
                                 text-white bg-amber-800 rounded-sm dark:bg-amber-500 
                                 hover:bg-amber-700 hover:bg-opacity-50 focus:ring-4 focus:outline-none 
                                 focus:ring-yellow-300 hover:text-opacity-60 dark:hover:bg-purple-400 
                                 dark:focus:ring-blue-800"
                    >
                        Read more
                        <svg
                            aria-hidden="true"
                            className="w-4 h-4 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d={`M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 
                                    0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z`}
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </a>
                </div>
            ))} */}
        </>
    );
};

export default SpeciesList;
