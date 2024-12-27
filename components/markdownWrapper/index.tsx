import {FC} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from "rehype-raw";

import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';
import css from './styles.module.css'

import {components} from "./components";


export const MarkdownRenderer: FC<{children: string | undefined}> = ({ children }) => {
    return (
        <ReactMarkdown
            components={components}
            className={css.markdownWrapper}

            children={children}
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[
                rehypeKatex,
                rehypeHighlight,
                rehypeRaw
            ]}
        />
    );
};
