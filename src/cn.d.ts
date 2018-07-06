interface ClassDecorator {
    <TFunction extends Function>(target: TFunction): TFunction | void;
}

export default function cn(blockName: string): ClassDecorator;

type CnModifierMap = { [key: string]: boolean | string };

export interface CnFn {
    (map?: CnModifierMap): string;
    (elem: string, map?: CnModifierMap): string;
}
