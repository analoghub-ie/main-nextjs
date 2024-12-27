export const Table = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto w-full">
        <table
            className="rounded-lg overflow-hidden"
            style={{marginInline: "auto"}}
            {...props}
        >
            {children}
        </table>
    </div>
);

export const TableBody = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className=""
           {...props}>
    {children}
    </tbody>
);

export const TableCell = ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]/tr:text-foreground-300 group-data-[disabled=true]/tr:cursor-not-allowed before:bg-default/60 data-[selected=true]:text-default-foreground first:before:rounded-s-lg last:before:rounded-e-lg text-start"
        {...props}>
        {children}
    </td>
);

export const TableColumn = ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="group/th px-3 h-10 align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-s-lg last:rounded-e-lg data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-start"
        {...props}
    >
        {children}
    </th>
);

export const TableHeader = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="[&>tr]:first:rounded-lg" {...props}>
    {children}
    </thead>
);

export const TableRow = ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="group/tr outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2" {...props}>
        {children}
    </tr>
);