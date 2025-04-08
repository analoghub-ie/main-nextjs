import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {dracula} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {Code} from "@nextui-org/code";
import {Divider} from "@nextui-org/divider";
import {Link} from "@nextui-org/link";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@/components/table";
import {Image} from "@nextui-org/image";


export const components = {
    // Headings
    h1: ({ ...props }) => <h1 className="text-4xl font-bold mt-6 mb-4" {...props} />,
    h2: ({ ...props }) => <h2 className="text-3xl font-semibold mt-6 mb-4" {...props} />,
    h3: ({ ...props }) => <h3 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
    h4: ({ ...props }) => <h4 className="text-xl font-medium mt-6 mb-3" {...props} />,
    h5: ({ ...props }) => <h5 className="text-lg font-medium mt-4 mb-2" {...props} />,
    h6: ({ ...props }) => <h6 className="text-base font-medium mt-4 mb-2" {...props} />,

    // Paragraphs
    p: ({ ...props }) => <p className="text-base leading-relaxed my-4" {...props} />,
    span: ({ ...props }) => <span className="text-sm leading-relaxed" {...props} />,

    // Line Breaks
    br: ({ ...props }) => <br {...props} />,

    hr: ({ ...props }) => <Divider {...props} />,

    // Emphasis
    em: ({ style, ...props }: any) => <em style={{ fontStyle: "italic", ...style }} {...props} />,
    strong: ({ style, ...props }: any) => <strong style={{ fontWeight: 600, ...style }} {...props} />,

    // Blockquotes
    blockquote: ({ ...props }) => (
        <blockquote
            className="border-l-4 border-primary pl-4 italic text-primary"
            style={{
                margin: "1rem 0",
                color: "var(--nextui-colors-text)", // Основной текстовый цвет темы
            }}
            {...props}
        />
    ),


    // Images
    img: ({ style = {}, ...props }: any) => {
        const attributes = Object.keys(props?.node?.properties || {});
        const disableInvert = attributes.includes('disableinvert');
        const lightInvert = attributes.includes('lightinvert');
        return <Image removeWrapper style={{ maxWidth: "100%", ...style }} className={disableInvert ? '' : lightInvert ? 'invert dark:invert-0' : 'dark:invert'} {...props} />
    },

    pre({children}: any) {
        // console.log(children)
        return children
    },

    // Code
    code: ({ node, inline, className, children, ...props }: any) => {
        const match = /language-(\w+)/.exec(className || "");

        // Remove extra newlines
        const cleanedChildren = String(children)
            .replace(/^\n+/, "").replace(/\n+$/, "") // Remove leading and trailing newlines
            // .replace(/</g, '&lt;').replace(/>/g, '&gt;'); // Escape HTML tags
        
        return !inline && match ? (
            <SyntaxHighlighter
                style={dracula}
                PreTag="div"
                language={match[1]}
                showLineNumbers
                wrapLines
                {...props}
            >
                {cleanedChildren}
            </SyntaxHighlighter>
        ) : (
            <Code className={className} {...props}>{children}</Code>
        );
    },

    // Lists
    ol: ({ ...props }) => <ol {...props} className="list-decimal pl-6 space-y-2"/>,
    ul: ({ ...props }) => <ul {...props} className="list-disc pl-6 space-y-2"/>,
    li: ({ ...props }) => <li {...props} className="leading-relaxed"/>,

    // Links
    a: ({ ...props }) => <Link {...props} />,

    // Tables
    table: ({ ...props }: any) => <Table {...props}/>,
    thead: ({ ...props }: any) => <TableHeader {...props} />,
    tbody: ({ ...props }: any) => <TableBody {...props} />,
    tr: ({ ...props }: any) => <TableRow {...props} />,
    th: ({ ...props }: any) => <TableColumn {...props} />,
    td: ({ ...props }: any) => <TableCell {...props} />,

    iframe: ({ ...props }: any) => {
        // const ytId = props?.src?.split('/').pop();
        //
        // return (props?.src?.includes('youtube.com/embed/'))
        //     ? <YouTubeEmbed videoid={ytId} style={props?.style} params={'enablejsapi=1&rel=0'} />
        //     : <iframe {...props} />

        return <iframe {...props} />
    },
};