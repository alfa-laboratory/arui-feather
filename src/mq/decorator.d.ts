interface ClassDecorator {
    <TFunction extends Function>(target: TFunction): TFunction | void;
}

export default function mqDecorator(query: string, propName?: string): ClassDecorator;
