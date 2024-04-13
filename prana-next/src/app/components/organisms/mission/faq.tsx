import * as React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/app/components/molecules/accordion'; // Adjust the import path as necessary

const faqs = [
    {
        question: 'Why was Prana created?',
        answer: 'An app to connect people closer to biodiversity and make it easier for them to make a difference.',
    },
    {
        question: 'Is Prana free to use?',
        answer: 'Prana is completely free to use. Exploring biodiveristy data and statistics is free for everyone. Donating and contriubuting to organizations is highly encouraged but completely optional.',
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
                            <AccordionContent>
                                <p>{faq.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
