import {isString, isPlainObject, curry, reduce} from 'lodash';

export const block = (name) => (modifiers = []) => {

    if(!modifiers) return null;
    const args = modifiers.reduce((result, mod) => {
        if(isString(mod)) {
            result.push(name + '--' + mod);
        }

        if(isPlainObject(mod)) {
            result = result.concat(reduce(mod, (acc, value, key) => value ? [...acc, name + '--' + key] : acc, []));
        }

        return result;
    }, [name]);

    return args.join(' ');
};

//blockName - string or function
export const elementForBlock = (parentBlock) => (elementName, modifiers = []) => {
    const blockName = isString(parentBlock) ? parentBlock : parentBlock();
    return block(blockName + '__' + elementName)(modifiers);
};

