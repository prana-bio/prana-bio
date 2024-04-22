import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/app/components/molecules/avatar';
import { Button } from '@/app/components/molecules/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/app/components/molecules/dialog';

interface BadgePopupProps {
    badgeSVG?: string;
}

export const BadgePopup: React.FC<BadgePopupProps> = ({
    badgeSVG,
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {badgeSVG && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: badgeSVG,
                        }}
                        data-testid="badge-svg"
                    />
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Share Badge</DialogTitle>
                    <DialogDescription>
                        You can use the following code to
                        start integrating this badge into
                        your digital spaces.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="rounded-md bg-black p-6">
                        <pre>
                            <code className="grid gap-1 text-sm text-muted-foreground [&_span]:h-4">
                                <span>
                                    <span className="text-sky-300">
                                        import
                                    </span>{' '}
                                    os
                                </span>
                                <span>
                                    <span className="text-sky-300">
                                        import
                                    </span>{' '}
                                    openai
                                </span>
                                <span />
                                <span>
                                    openai.api_key =
                                    os.getenv(
                                    <span className="text-green-300">
                                        &quot;OPENAI_API_KEY&quot;
                                    </span>
                                    )
                                </span>
                                <span />
                                <span>
                                    response =
                                    openai.Completion.create(
                                </span>
                                <span>
                                    {' '}
                                    model=
                                    <span className="text-green-300">
                                        &quot;davinci&quot;
                                    </span>
                                    ,
                                </span>
                                <span>
                                    {' '}
                                    prompt=
                                    <span className="text-amber-300">
                                        &quot;&quot;
                                    </span>
                                    ,
                                </span>
                                <span>
                                    {' '}
                                    temperature=
                                    <span className="text-amber-300">
                                        0.9
                                    </span>
                                    ,
                                </span>
                                <span>
                                    {' '}
                                    max_tokens=
                                    <span className="text-amber-300">
                                        5
                                    </span>
                                    ,
                                </span>
                                <span>
                                    {' '}
                                    top_p=
                                    <span className="text-amber-300">
                                        1
                                    </span>
                                    ,
                                </span>
                                <span>
                                    {' '}
                                    frequency_penalty=
                                    <span className="text-amber-300">
                                        0
                                    </span>
                                    ,
                                </span>
                                <span>
                                    {' '}
                                    presence_penalty=
                                    <span className="text-green-300">
                                        0
                                    </span>
                                    ,
                                </span>
                                <span>)</span>
                            </code>
                        </pre>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Your API Key can be found here.
                            You should use environment
                            variables or a secret management
                            tool to expose your key to your
                            applications.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
