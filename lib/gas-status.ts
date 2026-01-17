import { appStore$ } from "@/stores/app";
import { Gas } from "@/types/core";

type GasState = 'good' | 'moderate' | 'unhealthy_for_sensitive_groups' | 'unhealthy' | 'vunhealthy' | 'hazardous';

const compare: {
    [key: string]: (x: number, y: number) => boolean,
    'else': () => boolean,
} = {
    eq: (x: number, y: number) => (x === y),
    gt: (x: number, y: number) => (x > y),
    gte: (x: number, y: number) => (x >= y),
    lt: (x: number, y: number) => (x < y),
    lte: (x: number, y: number) => (x <= y),
    else: () => true,
}

export const getState = function (gas: Gas): GasState | undefined {
    const gases = appStore$.config.peek()?.gases

    const status = gases?.[gas.name]?.status;

    if (status === undefined || status == null) {
        return undefined;
    }

    for (const r of status) {
        /** expected value format:
         * gt,35,unhealthy
         * else,good */
        const [cmp, val, res] = r.split(',')

        if (val === undefined || cmp === undefined || !(cmp in compare)) continue

        if (compare[cmp]?.(parseFloat(gas.value), parseFloat(val))) {
            return (cmp === 'else' ? val : res) as GasState
        }
    }

    return undefined;
};
