'use client';

// pages/markdown.tsx
import {useState} from 'react';
import {Breadcrumbs} from "@/components/breadcrumbs";
import {MarkdownRenderer} from "@/components/markdownWrapper";
import {Divider} from "@nextui-org/divider";
import {Textarea} from "@nextui-org/input";

export default function MarkdownPage() {
    const [markdown, setMarkdown] = useState(`# Hello 👋

This is **markdown** example with \`code\` and formulas:

<pre><code class="language-js">
var name = "World";
console.warn("Hello, " + name + "!")
</code></pre>


    `);

    return (
        <>
            <Breadcrumbs elements={[
                {title: 'Home', href: '/'},
                {title: 'Test your markdown', href: `/pageTester`}
            ]}/>

            <div className={'flex flex-grow'}>
                <div className="w-1/2 p-4 overflow-hidden flex flex-col">
                    <h2 className="text-xl font-bold mb-2">Markdown Input</h2>
                    <Textarea
                        classNames={{
                            inputWrapper: '!h-full',
                            input: '!h-full',
                        }}
                        // style={{
                        //     height: '100% !important',
                        // }}
                        disableAutosize
                        className="flex-grow"
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                    />
                </div>

                <Divider orientation={"vertical"} className={'h-auto'}/>

                <div className="w-1/2 p-4 overflow-hidden flex flex-col">
                    <h2 className="text-xl font-bold mb-2">Preview</h2>
                    <div className="prose dark:prose-invert max-w-none flex-grow overflow-auto">
                        <MarkdownRenderer>{markdown}</MarkdownRenderer>
                    </div>
                </div>
            </div>
        </>
    );
}
