export interface ISelectProps {
    value: string | number;
    options: JSX.Element[];
    onChange: (e: React.FormEvent<HTMLSelectElement>) => void;
}

export function Select({ value, options, onChange }: ISelectProps) {
    return (
        <select value={value} onBlur={onChange} onChange={onChange}>
            {options}
        </select>
    );
}
