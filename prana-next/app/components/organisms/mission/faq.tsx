import * as React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/app/components/molecules/accordion'; // Adjust the import path as necessary
import Link from 'next/link';

const faqs = [
    {
        question: 'What is Prana?',
        answer: 'Prana is a web app that showcases biodiversity data and analytics from publically sourced data. It is fast, secure, and gloablly accessable for free. In future versions, Prana wants to create a seamless biodiversity conservation experience, that begins with exploration, and ends with protection. Our vision is to re-imagine how people view their relationship with the natural world, through modern software.',
    },
    {
        question: 'How much does Prana cost?',
        answer: 'Nothing. We believe exploring biodiversity data and statistics should be free and equally accessable for everyone. Donating and contributing to conservation organizations in the future is encouraged, but completely optional.',
    },
    {
        question: 'How can I help right now?',
        answer: (
            <div>
                Any donations to support our time developing
                this platform are greatly appreciated. Right
                now this project is still in the
                hobby-phase. Please consider donating on{' '}
                <Link
                    href="https://github.com/sponsors/prana-bio"
                    className="hover:text-primary underline"
                >
                    GitHub
                </Link>
            </div>
        ),
    },
    {
        question:
            'Where does Prana source biodiversity data?',
        answer: (
            <div>
                <p className="pb-4">
                    Currently Prana relies on some
                    incredible data collection and analysis
                    work from organizations around the
                    world. Here is the full list of data
                    sources:
                </p>
                <ul className="list-disc pl-5">
                    <li>
                        <Link
                            href="https://www.gbif.org/dataset/7ddf754f-d193-4cc9-b351-99906754a03b"
                            className="hover:text-primary"
                        >
                            GBIF Dataset{' '}
                            <span className="underline">
                                gbif.org
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://epi.yale.edu/epi-results/2022/component/bdh"
                            className="hover:text-primary"
                        >
                            {`Environmental Performance Index `}
                            <span className="underline">
                                epi.yale.edu
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://www.iucnredlist.org/statistics"
                            className="hover:text-primary"
                        >
                            {`IUCN Red List `}
                            <span className="underline">
                                iucnredlist.org
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://datacatalog.worldbank.org/search/dataset/0063384/Global-Species-Database"
                            className="hover:text-primary"
                        >
                            {`World Bank Global Species
                            Database `}
                            <span className="underline">
                                datacatalog.worldbank.org
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://www.antwiki.org/wiki/Diversity_by_Country#Genera_and_Species_per_Country"
                            className="hover:text-primary"
                        >
                            {`AntWiki Diversity by Country `}
                            <span className="underline">
                                antwiki.org
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://worldrainforests.com/03-diversity-of-rainforests.html"
                            className="hover:text-primary"
                        >
                            {` World Rainforests Diversity `}
                            <span className="underline">
                                worldrainforests.com
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        ),
    },
];

export default function FAQ() {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <Accordion type="single" collapsible>
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={String(index)}
                        >
                            <AccordionTrigger>
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {typeof faq.answer ===
                                'string' ? (
                                    <p>{faq.answer}</p>
                                ) : (
                                    faq.answer
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
