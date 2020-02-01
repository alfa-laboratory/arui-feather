interface ClassDecorator {
    <TFunction extends Function>(target: TFunction): TFunction | void;
}

export default function performance(useDeep?: boolean): ClassDecorator;
