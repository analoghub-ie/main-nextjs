'use client';

// pages/markdown.tsx
import {useState} from 'react';
import {Breadcrumbs} from "@/components/breadcrumbs";
import {MarkdownRenderer} from "@/components/markdownWrapper";
import {Divider} from "@heroui/divider";
import {Textarea} from "@heroui/input";
import {siteConfig} from "@/config/site";

export default function MarkdownPage() {
    const [markdown, setMarkdown] = useState(`# Hello 👋

This is **markdown** example with \`code\` and formulas:

<pre><code class="language-js">
var name = "World";
console.warn("Hello, " + name + "!")
</code></pre>


    `);

    const content = markdown
            .replace(/<(?!iframe)([a-zA-Z][^>]*)$/gm, '&lt;$1') // Escape all tags except iframe
            .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi,
                (match, codeContent) => {
                    const escaped = codeContent
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
                    return match.replace(codeContent, escaped);
                })
            .replace(/```(\w+)?\n([\s\S]*?)```/g,
                (match, lang, codeContent) => {
                    const escaped = codeContent
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
                    return `\`\`\`${lang ?? ''}\n${escaped}\`\`\``;
                })
            // .replace(/<([a-zA-Z][^>]*)$/gm, '&lt;$1')
            .replaceAll('PASTEURLHERE', siteConfig.env.hostUrl)
            .replaceAll('http://localhost:3000', siteConfig.env.hostUrl)
            .replaceAll('https://dev.analoghub.ie', siteConfig.env.hostUrl)
            .replaceAll('https://analoghub.ie', siteConfig.env.hostUrl)
        // .replaceAll('#000000', 'currentColor')
        // .replaceAll('#000', 'currentColor')
    ;

    return (
        <>
            <Breadcrumbs elements={[
                {title: 'Home', href: '/'},
                {title: 'Test your markdown', href: `/pageTester`}
            ]}/>

            <div className={'flex grow'}>
                <div className="w-1/2 p-4 overflow-hidden flex flex-col">
                    <h2 className="text-xl font-bold mb-2">Markdown Input</h2>
                    <Textarea
                        classNames={{
                            inputWrapper: 'h-full!',
                            input: 'h-full!',
                        }}
                        // style={{
                        //     height: '100% !important',
                        // }}
                        disableAutosize
                        className="grow"
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                    />
                </div>

                <Divider orientation={"vertical"} className={'h-auto'}/>

                <div className="w-1/2 p-4 overflow-hidden flex flex-col">
                    <h2 className="text-xl font-bold mb-2">Preview</h2>
                    <div className="prose dark:prose-invert max-w-none grow overflow-auto">
                        <MarkdownRenderer>{content}</MarkdownRenderer>
                    </div>
                </div>
            </div>
        </>
    );
}
