import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
} from '@radix-ui/react-icons';

export const labels = [
    {
        value: 'heart',
        label: '❤️',
    },
];
export const iucnCategories = [
    {
        value: 'criticallyEndangered',
        label: 'Critically Endangered',
        //   icon: QuestionMarkCircledIcon,
    },
    {
        value: 'dataDeficient',
        label: 'Data Deficient',
        //   icon: CircleIcon,
    },
    {
        value: 'engdangered',
        label: 'Endangered',
        //   icon: StopwatchIcon,
    },
    {
        value: 'extinctInTheWild',
        label: 'Extinct In The Wild',
        //   icon: CheckCircledIcon,
    },
    {
        value: 'extinct',
        label: 'Extinct',
        //   icon: CrossCircledIcon,
    },
    {
        value: 'leastConcern',
        label: 'Least Concern',
        //   icon: CrossCircledIcon,
    },
    {
        value: 'nearThreatened',
        label: 'Near Threatened',
        //   icon: CrossCircledIcon,
    },
    {
        value: 'notEvaluated',
        label: 'Not Evaluated',
        //   icon: CrossCircledIcon,
    },
    {
        value: 'vulnerable',
        label: 'Vulnerable',
        //   icon: CrossCircledIcon,
    },
];
export const kingdoms = [
    {
        value: 'animalia',
        label: 'Animalia',
        icon: QuestionMarkCircledIcon,
    },
    {
        value: 'plantae',
        label: 'Plantae',
        icon: CircleIcon,
    },
    {
        value: 'fungi',
        label: 'Fungi',
        icon: StopwatchIcon,
    },
    {
        value: 'protista',
        label: 'Protista',
        icon: CheckCircledIcon,
    },
    {
        value: 'eubacteria',
        label: 'Eubacteria',
        icon: CrossCircledIcon,
    },
    {
        value: 'archaebacteria',
        label: 'Archaebacteria',
        icon: CrossCircledIcon,
    },
];

export const statuses = [
    {
        label: 'Not Evaluated',
        value: 'not-evalulated',
        icon: ArrowDownIcon,
    },
    {
        label: 'Data Deficient',
        value: 'medium',
        icon: ArrowRightIcon,
    },
    {
        label: 'Least Concern',
        value: 'least-concern',
        icon: ArrowUpIcon,
    },
    {
        label: 'Near Threatened',
        value: 'near-threatened',
        icon: ArrowDownIcon,
    },
    {
        label: 'Vulnerable',
        value: 'vulnerable',
        icon: ArrowRightIcon,
    },
    {
        label: 'Endangered',
        value: 'endangered',
        icon: ArrowUpIcon,
    },
    {
        label: 'Critically Endangered',
        value: 'critically-endangered',
        icon: ArrowDownIcon,
    },
    {
        label: 'Extinct in the Wild',
        value: 'extinct-in-the-wild',
        icon: ArrowRightIcon,
    },
    {
        label: 'Extinct',
        value: 'extinct',
        icon: ArrowUpIcon,
    },
];
