import { computed, ref, watch, reactive  } from 'vue';
import {raw, deepGet, isObject} from '$core/utils/object.js';
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import { useEnvStore } from '$collector/stores/env.store.js';
import { useRouter } from 'vue-router';

export const useAppVuelidate = (rules, data, format) => {

    const {t, env} = useEnvStore();
    const $msg = (path) => {
        for (let i in $v.value.$errors) {
            const error = $v.value.$errors[i];
            
            if (path === error.$propertyPath) {
                if (isObject(error.$message)) {
                    return Object.values(error.$message)[0];
                }
                return error.$message;
            }
        }

        return null;
    };

    for (let rule in rules) {
        const _rules = rules[rule];
        for (let key in _rules) {
            const _rule = _rules[key];
            rules[rule][key] = helpers.withMessage(t(format.replace('{0}',_rule[0]), _rule[2] || ''), _rule[1]) || _rule[1].message;
        }
    }
    
    const $externalResults = ref({});
    const $v = useVuelidate(rules, data, {$externalResults});

    return { $v, $msg, $externalResults };
};