
export default (blockName: string) => ClassDecorator;

interface ClassDecorator {
    <TFunction extends Function>(target: TFunction): TFunction | void;
}

type CnModifierMap = { [key: string]: boolean | string };

export interface CnFn {
    (map?: CnModifierMap): string;
    (elem: string, map?: CnModifierMap): string;
}
