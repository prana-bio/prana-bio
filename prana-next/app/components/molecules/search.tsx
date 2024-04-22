import { Input } from '@/app/components/atoms/input';

export function Search() {
    return (
        <div className={`hidden md:block`}>
            <Input
                type="search"
                placeholder="Search..."
                className="md:w-[100px] lg:w-[300px]"
            />
        </div>
    );
}
